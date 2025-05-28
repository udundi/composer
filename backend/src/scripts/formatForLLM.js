// /backend/src/scripts/formatForLLM.js
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../data/enriched_linkedin_posts.json');
const enriched = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const formatted = enriched.map(post => ({
  prompt: `Write a viral LinkedIn post about ${post.topic}, in a ${post.tone} tone, for a ${post.jobCategory} (${post.authorTitle}):`,
  completion: post.text
}));

const outputPath = path.join(__dirname, '../data/llm_training_data.json');
fs.writeFileSync(outputPath, JSON.stringify(formatted, null, 2));
console.log('Saved training data:', formatted.length);