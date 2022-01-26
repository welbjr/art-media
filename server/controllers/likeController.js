const models = require("../models");
const catchAsync = require("../utils/catchAsync");
const getUserIdByToken = require("../utils/getUserIdByToken");

exports.getLikes = catchAsync(async (req, res) => {
  const likes = await models.Like.findAll();
  return res.json({ status: "success", data: likes });
});

exports.getLike = catchAsync(async (req, res) => {
  const { artId } = req.params;
  const like = await models.Like.findAll({ where: { artId } });
  return res.json({ status: "success", data: like });
});

exports.countLikes = catchAsync(async (req, res) => {
  const { artId } = req.params;
  const likes = await models.Like.findAndCountAll({
    where: {
      artId,
    },
  });
  return res.json({
    status: "success",
    data: { numLikes: likes.count, artId },
  });
});

exports.createLike = catchAsync(async (req, res, next) => {
  // todo: status: already exist
  const { artId, userToken } = req.body;

  const userId = await getUserIdByToken(userToken);

  // todo: colocar em utils
  const [art, createdArt] = await models.Art.findOrCreate({
    where: {
      apiId: artId,
    },
    default: {
      apiId: artId,
    },
  });

  const [like, created] = await models.Like.findOrCreate({
    where: {
      artId,
      userId,
    },
    default: {
      artId,
      userId,
    },
  });

  if (!created) {
    const err = new Error(`User with id ${userId} already liked Art ${artId}`);
    err.status = 403;
    return next(err);
  }

  return res.json({
    status: "success",
    data: {
      like,
    },
  });
});

exports.deleteLike = catchAsync(async (req, res, next) => {
  const { artId, userToken } = req.body;

  const userId = await getUserIdByToken(userToken);

  const deleted = await models.Like.destroy({
    where: {
      artId,
      userId,
    },
  });

  if (!deleted) {
    const err = new Error("User or like does not exist");
    err.status = 404;
    return next(err);
  }

  return res.json({
    status: "success",
    data: null,
  });
});
