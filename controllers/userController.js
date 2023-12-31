const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const factory = require("./factorycontroller");
const appError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

//update user info
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError("This route is not for password updates", 400));

  const filterBody = filterObj(req.body, "name", "email");

  const updateduser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  if (!updateduser) {
    return next(new appError("No document with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: updateduser,
    },
  });
});

//delete user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not define! Please use sign up",
  });
};

//
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
