import { generateCompletion } from '../utils/openai.js';
import fs from 'fs';
import path from 'path';

const postsPath = path.join(process.cwd(), 'src/data/enriched_linkedin_posts.json');
let posts = [];
try { posts = JSON.parse(fs.readFileSync(postsPath, 'utf8')); } catch { posts = []; }

export default {
  generateCopy: async ({ idea, tone = 'conversational', jobCategory }) => {
    const prompt = `Write a viral LinkedIn post for a ${jobCategory || 'professional'} using the idea: "${idea}". Use a ${tone} tone. The post should be authentic, engaging, and formatted like top-performing posts.`;
    try {
      return await generateCompletion(prompt, 1.0, true);
    } catch (e) {
      let filtered = posts.filter(
        p => (!idea || p.topic === idea) && (!jobCategory || p.jobCategory === jobCategory)
      );
      if (tone) filtered = filtered.filter(p => p.tone === tone);
      if (filtered.length) return filtered[Math.floor(Math.random() * filtered.length)].text;
      return `💡 ${idea}\nCurious to hear your perspective! #LinkedIn`;
    }
  }
}