const catchAsync = require("./../utils/catchAsync");
const Response = require("./../models/ResponseModel");
const Content = require("./../models/contentModel");

exports.getRecommendations = catchAsync(async (req, res, next) => {
  const responseId = req.params.responseId;
  const response = await Response.findById(responseId);

  // const category = anaylseResponse(response);
  // const recommendations = contentModel.find({ category: category });

  const numberOfRandomDocuments = 3; // You can change this to 2 if you want 2 random documents.

  const recommendations = await Content.aggregate([
    { $sample: { size: numberOfRandomDocuments } },
  ]);

  // console.log(randomDocuments);

  res.status(200).json({
    status: "success",
    results: recommendations.length,
    data: {
      recommendations: recommendations,
      yourResponse: response,
    },
  });
});
