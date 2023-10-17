const factory = require("./factorycontroller");
const QuesModel = require("./../models/QuestionnareModel");
const catchAsync = require("./../utils/catchAsync");
const router = require("../routes/questionareRoutes");

//return the list of title of all the quesstionare present in database
exports.getlist = catchAsync(async (req, res, next) => {
  const titles = await QuesModel.find({}, "title");

  res.status(200).json({
    status: "success",
    results: titles.length,
    data: titles,
  });
});

//return the quesstionare having particular title
exports.getOne = catchAsync(async (req, res, next) => {
  const title = req.params.title;

  const questionare = await QuesModel.find({ title: title });

  res.status(200).json({
    status: "success",
    data: questionare,
  });
});

exports.getByid = factory.getOne(QuesModel); //questionnaire by id
exports.createQuestionaries = factory.createOne(QuesModel); //create questionnaire
exports.deleteQuestionaries = factory.deleteOne(QuesModel); //delete questionnaire
exports.updateQuestionaries = factory.updateOne(QuesModel); //update questionnaire
exports.getAll = factory.getAll(QuesModel); //get all the questionnaire
