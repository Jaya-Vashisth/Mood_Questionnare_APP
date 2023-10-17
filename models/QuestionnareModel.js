const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String, // You can use this to define the question type (e.g., input, Yes/No, slider, multiple-choice, open-ended)
        required: true,
      },
      options: [
        {
          text: {
            type: String,
          },
          // You can add more properties specific to the question type here
        },
      ],
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model who created this questionnaire
    select: false,
  },
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;
