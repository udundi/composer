// /backend/src/scripts/categorizePosts.js
import Sentiment from 'sentiment';
const sentiment = new Sentiment();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module support for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = path.join(__dirname, '../data/scraped_linkedin_posts.json');
const postData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const topicKeywords = {
  leadership: ['leader', 'leadership', 'manage', 'management', 'team', 'mentor', 'coach'],
  ai: ['ai', 'artificial intelligence', 'machine learning', 'automation', 'chatgpt'],
  marketing: ['marketing', 'brand', 'campaign', 'ads', 'advertising', 'growth', 'social media'],
  career: ['career', 'job', 'work', 'promotion', 'hire', 'hiring'],
  productivity: ['productivity', 'focus', 'time management', 'efficiency'],
  sales: ['sales', 'selling', 'pitch', 'close', 'negotiation'],
  hr: ['hr', 'human resources', 'recruit', 'talent', 'people'],
  entrepreneurship: ['entrepreneur', 'startup', 'founder', 'business'],
  development: ['development', 'coding', 'programming', 'engineer', 'software'],
  // Add more as needed
};

const jobMappings = {
  ceo: 'executive',
  founder: 'executive',
  manager: 'management',
  engineer: 'engineering',
  developer: 'engineering',
  marketer: 'marketing',
  sales: 'sales',
  hr: 'human resources',
};

function categorizeTopic(text, hashtagsRaw) {
  // Convert everything to lower case
  text = (text || '').toLowerCase();
  // Convert hashtags to array and lowercase for matching
  let hashtags = [];
  if (hashtagsRaw) {
    if (typeof hashtagsRaw === 'string') {
      // Remove brackets/quotes if needed and split by comma, space, or #
      hashtags = hashtagsRaw
        .replace(/[\[\]'"#]/g, '')
        .split(/[ ,]+/)
        .map(h => h.trim().toLowerCase())
        .filter(h => h.length > 1);
    } else if (Array.isArray(hashtagsRaw)) {
      hashtags = hashtagsRaw.map(h => h.toLowerCase());
    }
  }

  // 1. Hashtag-based topic detection
  for (const topic of Object.keys(topicKeywords)) {
    if (hashtags.some(h => topicKeywords[topic].includes(h) || h === topic)) {
      return topic;
    }
  }

  // 2. Text-based topic detection
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(kw => text.includes(kw))) return topic;
  }

  // 3. No match, fallback
  return 'other';
}

function categorizeJob(title) {
  if (!title) return 'other';
  title = title.toLowerCase();
  for (const [key, group] of Object.entries(jobMappings)) {
    if (title.includes(key)) return group;
  }
  return 'other';
}

function categorizeTone(text) {
  const s = sentiment.analyze(text);
  if (s.score > 2) return 'inspirational';
  if (s.score < -2) return 'critical';
  return 'neutral/informative';
}

const enrichedPosts = postData.map(post => {
  const text = post.text || post.content || '';
  const title = post.authorJobTitle || post.position || '';
  return {
    ...post,
    topic: categorizeTopic(text),
    tone: categorizeTone(text),
    authorTitle: title,
    jobCategory: categorizeJob(title),
    source: 'linkedin'
  };
});

const outputPath = path.join(__dirname, '../data/enriched_linkedin_posts.json');
fs.writeFileSync(outputPath, JSON.stringify(enrichedPosts, null, 2));
console.log(`Enriched and saved ${enrichedPosts.length} posts.`);