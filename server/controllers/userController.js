const models = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.getUsers = catchAsync(async (_, res) => {
  const users = await models.User.findAll();
  return res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, googleId } = req.body;
  const user = await models.User.create({
    name,
    googleId,
  });

  return res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  // todo: deletar por id/jwt/email
  const { name } = req.body;
  const isDeleted = await models.User.destroy({
    where: { name },
  });

  if (!isDeleted) {
    const err = new Error("This user does not exist");
    err.status = 404;
    return next(err);
  }

  return res.status(410).json({
    status: "success",
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // todo: deletar por id/jwt/email
  const { oldName, newName } = req.body;
  const [created] = await models.User.update(
    { name: newName },
    {
      where: { name: oldName },
    }
  );

  if (!created) {
    const err = new Error("This user does not exist");
    err.status = 404;
    return next(err);
  }

  return res.status(201).json({
    status: "success",
    data: null,
  });
});
