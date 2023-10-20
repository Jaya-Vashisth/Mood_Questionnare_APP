const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "Name must be given"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Email Address not valid"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    requried: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },

  photo: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

//compare confirm password with the password
userSchema.methods.correctPassword = async function (
  cadidatePassword,
  userPassword
) {
  return await bcrypt.compare(cadidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
