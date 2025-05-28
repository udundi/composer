// /backend/src/scripts/formatForLLM.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = path.join(__dirname, '../data/enriched_linkedin_posts.json');
const jsonOutPath = path.join(__dirname, '../data/llm_training_data.json');
const jsonlOutPath = path.join(__dirname, '../data/llm_training_data.jsonl');

// Load the enriched posts
const enriched = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Format for OpenAI fine-tuning v2 (messages array per line)
const formatted = enriched
  .filter(post => post.text && post.topic && post.tone && post.jobCategory)
  .map(post => ({
    messages: [
      {
        role: "user",
        content: `Write a viral LinkedIn post about ${post.topic}, in a ${post.tone} tone, for a ${post.jobCategory} (${post.authorTitle || 'Professional'}):`
      },
      {
        role: "assistant",
        content: post.text.trim()
      }
    ]
  }));

// Save as pretty JSON (for inspection)
fs.writeFileSync(jsonOutPath, JSON.stringify(formatted, null, 2));

// Save as JSONL (one object per line for OpenAI)
const jsonl = formatted.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync(jsonlOutPath, jsonl, 'utf8');

console.log(`Saved training data in new OpenAI format: ${formatted.length} examples to ${jsonOutPath} and ${jsonlOutPath}`);