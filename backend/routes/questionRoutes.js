const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

/**
 * GET /api/questions
 * Query params:
 *  - subject
 *  - difficulty
 *  - limit
 */
router.get("/", async (req, res) => {
  try {
    const { subject, difficulty, limit = 10 } = req.query;

    const filter = {};
    if (subject) filter.subject = subject;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: Number(limit) } }, // random questions
    ]);

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

router.post("/generate", async (req, res) => {
  try {
    const data = await generateMCQs(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "MCQ generation failed" });
  }
});

module.exports = router;

