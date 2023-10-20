const Response = require("./../models/ResponseModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./factorycontroller");

//save the response
exports.saveResponse = catchAsync(async (req, res, next) => {
  user = req.user.id;
  const { title, responses } = req.body;

  //create new response document
  const newResponse = new Response({
    user: user,
    title,
    responses,
  });

  await newResponse.save();

  res.status(201).json({
    status: "success",
    message: "Response submitted successfully",
    data: newResponse,
  });
});

//show all responses
exports.myResponses = catchAsync(async (req, res, next) => {
  user = req.user.id;

  const responses = await Response.find({ user: user });

  res.status(200).json({
    status: "success",
    results: responses.length,
    data: responses,
  });
});

//return all the responses available in the database
exports.returnAll = factory.getAll(Response);
