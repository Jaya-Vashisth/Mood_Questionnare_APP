const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "There must be a title for the content"],
  },

  category: {
    type: String,
    enum: [
      "Relaxation",
      "Stress Relief",
      "Productivity",
      "Wellness and Self-care",
      "Mental Health",
    ],
    required: [true, "There must be a category"],
  },

  type: {
    type: String,
    enum: ["Blog", "Video", "Podcast", "Article"],
    required: [true, "Type of content is must"],
  },

  source: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: [true, "There me link for the source"],
  },

  desription: {
    type: String,
  },
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
