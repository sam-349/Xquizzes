const mongoose = require("mongoose");

const testReportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    subject: String,

    total: Number,
    score: Number,
    wrong: Number,
    percentage: Number,

    selectedAnswers: [Number],
    flagged: [Boolean],

    questions: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        correctAnswer: Number,
        userAnswer: Number,
      },
    ],

    suggestions: String, // AI generated later
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestReport", testReportSchema);
