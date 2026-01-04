const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    question: { type: String, required: true, unique: true },

    options: {
      type: [String],
      validate: v => v.length === 4,
    },

    answer: { type: Number, required: true }, 

    explanation: { type: String }, 

    source: {
      type: String,
      enum: ["manual", "ai"],
      default: "manual",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
