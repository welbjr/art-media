const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({ host: "redis" });

const { Art, Comment, Like } = require("../models");
const catchAsync = require("../utils/catchAsync");

const EXPIRATION = 60 * 60 * 6; // 6 horas

// todo: limpar

// Retorna todos os IDs de obras com imagens
const getArtsIDs = async () => {
  const { data } = await axios.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=%22%22"
  );
  return data.objectIDs;
};

// Retorna um objeto com os dados da obra (título, autor, link da imagem, etc)
const getImg = async (id) => {
  const { data } = await axios.get(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  );
  return data;
};

// Recebe uma lista de ids e retorna os objetos de cada um em uma lista
const getIDData = async (IDs, daily = false) => {
  // obs: é entregue um arr diferente para as daily,
  // para não ficar { data: [data{}, data{}] }
  const arr = [];
  if (!daily) {
    for (let i = 0; i < IDs.length; i++) {
      let obj = {};
      obj.data = await getImg(IDs[i]);
      arr.push(obj);
    }
    return arr;
  } else {
    for (let i = 0; i < IDs.length; i++) {
      const obj = await getImg(IDs[i]);
      arr.push(obj);
    }
    return arr;
  }
};

const prepareData = (data, artsLikes, artsComments) => {
  const arr = [];
  const findByID = (attribute) =>
    attribute.dataValues.artId == el.data?.objectID;

  for (el of data) {
    let obj = {};
    obj = el.data;
    obj.Likes = artsLikes.filter(findByID);
    obj.Comments = artsComments.filter(findByID);
    arr.push(obj);
  }

  return arr;
};

exports.queryArt = async (req, res) => {
  const { query } = req.params;

  let { data } = await axios.get(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
  );

  // Limita a quantidade de artes
  data = data.objectIDs.slice(0, 10);

  const arts = await getIDData(data);

  return res.json({ status: "success", data: arts });
};

// Retorna uma lista de objetos com obras aleatórias do dia
exports.getDailyArts = catchAsync(async (_, res) => {
  // Primeiro é verificado se existem dados no cache,
  // e os retorna se existir
  const cache = JSON.parse(await redis.get("daily"));
  const haveCache = cache === null;

  if (!haveCache) return res.json({ status: "success", data: cache });

  // Se não possuir cache, é feito uma get por todos
  // os ids de artes com imagens
  const artIDs = await getArtsIDs();
  const randIDs = [];

  // O tamanho da lista de ids é calculado de antemão para
  // não precisar ser feito em toda iteração do loop abaixo
  const IDS_LENGTH = artIDs.length;

  // popula a lista "items" com 20 ids aleatórios
  for (let i = 1; i <= 20; i++) {
    const randID = Math.round(Math.random() * IDS_LENGTH);
    randIDs.push(artIDs[randID]);
  }

  // Pega os dados de cada um dos IDs
  const arts = await getIDData(randIDs, true);

  // Salva esses dados em cache, com expiração de 6 horas
  redis.set("daily", JSON.stringify(arts), "EX", EXPIRATION);

  return res.json({ status: "success", data: arts });
});

// Retorna as artes que os usuários interagiram, com likes e comentários
exports.getPopularArts = catchAsync(async (req, res) => {
  const artsData = await Art.findAll({ include: [Comment, Like] });
  let [artsIDs, artsComments, artsLikes] = [[], [], []];

  // Popula as listas com os dados
  for (let el of artsData) {
    artsIDs.push(el.dataValues.apiId);
    artsComments.push(el.dataValues.Comments);
    artsLikes.push(el.dataValues.Likes);
  }

  // Já que essas duas listas possuiam mais listas dentro, é usado o flat()
  artsLikes = artsLikes.flat();
  artsComments = artsComments.flat();

  // Procura pelas artes no cache
  const cache = JSON.parse(await redis.get("popular"));

  // Se o número de items no cache for o mesmo dos ids,
  // (lembrando que a tabela "Arts" apenas guarda os ids
  // de obras que os usuários interagiram, e que essas
  // não são deletadas)
  // então estes ids já foram hidratados
  const haveCache = cache ? cache.length === artsIDs.length : false;

  if (haveCache) {
    // const completeArts = prepareData(cache, artsLikes, artsComments);
    // return res.json(completeArts);
    return res.json({ status: "success", data: cache });
  }

  const arts = await getIDData(artsIDs);

  const completeArts = prepareData(arts, artsLikes, artsComments);

  // Coloca no cache
  redis.set("popular", JSON.stringify(completeArts), "EX", EXPIRATION);

  return res.json({ status: "success", data: completeArts });
});

exports.getPopularArt = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cache = JSON.parse(await redis.get("popular"));

  const haveCache = cache !== false;

  if (haveCache) {
    // Procura a arte pelo id no cache
    for (let item of cache) {
      if (item.objectID == id) {
        return res.json({ status: "success", data: item });
      }
    }
  }

  const art = await getImg(id);
  cache.push(art);
  redis.set("popular", JSON.stringify(cache), "EX", EXPIRATION);

  return res.json({ status: "success", data: art });

  // const art = await getImg(id);
  // return res.json({ status: "success", data: art });
});
