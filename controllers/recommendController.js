const catchAsync = require("./../utils/catchAsync");
const Response = require("./../models/ResponseModel");
const contentModel = require("./../models/contentModel");

exports.getRecommendations = catchAsync(async (req, res, next) => {
  const responseId = req.params.id;
  const response = Response.findById(responseId);

  const category = anaylseResponse(response);

  const recommendations = contentModel.find({ category: category });

  res.status(200).json({
    status: "success",
    results: recommendations.length,
    data: {
      recommendations,
    },
  });
});
