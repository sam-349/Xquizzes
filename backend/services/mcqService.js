// backend/services/mcqService.js
const model = require("../utils/geminiClient");

async function generateMCQs({ topic, difficulty, count, content }) {
  const prompt = `
You are an expert exam question setter.

Generate ONLY MCQs in valid JSON.

Topic: ${topic}
Difficulty: ${difficulty}
Number of questions: ${count}

${content ? `Document content:\n${content}` : ""}

Return JSON only.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
}

module.exports = generateMCQs;
