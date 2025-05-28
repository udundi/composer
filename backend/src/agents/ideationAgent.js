import fs from 'fs';
import path from 'path';
import { generateCompletion } from '../utils/openai.js';

const postsPath = path.join(process.cwd(), 'src/data/enriched_linkedin_posts.json');
let posts = [];
try { posts = JSON.parse(fs.readFileSync(postsPath, 'utf8')); } catch { posts = []; }

export default {
  generateIdea: async ({ profession, topic }) => {
    const prompt = `Generate a creative, engaging LinkedIn post idea for a ${profession || 'professional'} on the topic of ${topic || 'career development'}. Make sure it's something likely to go viral. Just give the idea/outline.`;
    try {
      return await generateCompletion(prompt, 0.9, true);
    } catch (e) {
      console.error('OpenAI error in ideationAgent:', e);
      let filtered = posts;
      if (topic) filtered = filtered.filter(p => p.topic === topic);
      if (profession) filtered = filtered.filter(p => p.jobCategory === profession);
      if (filtered.length) {
        const picked = filtered[Math.floor(Math.random() * filtered.length)];
        return picked.text || picked.topic;
      }
      return "Share a personal lesson from your industry experience.";
    }
  }
}