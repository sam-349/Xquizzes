const express = require("express");
const router = express.Router();
const TestReport = require("../models/TestReport");

/**
 * POST /api/reports
 * Save test report
 */
router.post("/", async (req, res) => {
  try {
    const report = new TestReport(req.body);
    await report.save();

    res.status(201).json({ message: "Report saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save report" });
  }
});

/**
 * GET /api/reports/:userId
 * Get all reports for a user
 */
router.get("/:userId", async (req, res) => {
  try {
    const reports = await TestReport.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
                      
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

module.exports = router;
