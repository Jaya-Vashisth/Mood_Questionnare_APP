const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },

  category: {
    type: String,
    enum: [
      "Relaxation",
      "Stress Relief",
      "Productivity and Motivation",
      "Wellness and Self-care",
      "Mental Health",
    ],
    required: [true, "Please provide category name"],
  },

  type: {
    type: String,
    enum: ["Blog", "Video", "Podcast", "Article"],
    required: [true, "Please spicify type of the content"],
  },

  source: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: [true, "Please Provide the link"],
  },

  desription: {
    type: String,
  },
});

const Content = mongoose.Model("Content", contentSchema);
module.exports = Content;
