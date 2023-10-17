const catchAsync = require("./../utils/catchAsync");
// const APIFeatures = require("./../utils/apiFeatures");
// const apiFeatures = require("./../utils/apiFeatures");
const appError = require("./../utils/appError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new appError("No document found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  });

//update the document
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new appError("No document with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

//create the document
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

//get one by id
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new appError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

//get all documents
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    // const doc = await features.query.explain();

    //send RESPONSE
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
