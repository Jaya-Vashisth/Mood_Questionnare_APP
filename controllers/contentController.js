const factory = require("./factorycontroller");
const ContentModel = require("./../models/contentModel");
const catchAsync = require("./../utils/catchAsync");

exports.getByCategory = catchAsync(async (req, res, next) => {
  const category = req.params.category;
  const content = ContentModel.find({ category: category });

  res.status(200).json({
    status: "success",
    results: content.length,
    data: {
      content,
    },
  });
});

exports.getByid = factory.getOne(ContentModel); //questionnaire by id
exports.createContent = factory.createOne(ContentModel); //create questionnaire
exports.deleteContent = factory.deleteOne(ContentModel); //delete questionnaire
exports.updateContent = factory.updateOne(ContentModel); //update questionnaire
exports.getAll = factory.getAll(ContentModel); //get all the questionnaire
