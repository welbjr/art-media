const { Art, Comment, Like } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.getArts = catchAsync(async (req, res) => {
  const arts = await Art.findAll({ include: [Comment, Like] });
  return res.status(200).json({
    status: "success",
    data: {
      arts,
    },
  });
});

exports.getArt = catchAsync(async (req, res) => {
  const { artId } = req.params;
  const art = await Art.findOne({
    where: { apiId: artId },
  });
  return res.status(200).json({
    status: "success",
    data: {
      art,
    },
  });
});
