const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    responses: [
      {
        question: {
          type: String,
          required: true,
        },

        response: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
