const models = require("../models");
const catchAsync = require("../utils/catchAsync");
const getUserIdByToken = require("../utils/getUserIdByToken");

exports.getComments = catchAsync(async (_, res) => {
  const comments = await models.Comment.findAll();
  return res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});

exports.getArtsComments = catchAsync(async (req, res) => {
  const { artId } = req.params;
  const comments = await models.Comment.findAll({
    where: {
      artId,
    },
    include: [models.User],
  });
  return res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});

exports.createComment = catchAsync(async (req, res) => {
  // const { artId, userId, content } = req.body;
  const { artId, userToken, content } = req.body;

  const userId = await getUserIdByToken(userToken);

  // todo: colocar em uma export (findOrCreate)
  const [art, created] = await models.Art.findOrCreate({
    where: {
      apiId: artId,
    },
    default: {
      apiId: artId,
    },
  });
  const comment = await models.Comment.create({
    artId,
    userId,
    content,
  });
  return res.status(201).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const isDeleted = await models.Comment.destroy({
    where: {
      id,
    },
  });

  if (!isDeleted) {
    const err = new Error("This comment does not exist");
    err.status = 404;
    return next(err);
  }

  return res.status(410).json({
    status: "success",
    data: null,
  });
});
