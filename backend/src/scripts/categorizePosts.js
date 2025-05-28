// /backend/src/scripts/categorizePosts.js
const nlp = require('compromise');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../data/scraped_linkedin_posts.json');
const postData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const topicKeywords = {
  leadership: ['leader', 'leadership', 'manage', 'team'],
  ai: ['ai', 'artificial intelligence', 'machine learning', 'automation'],
  marketing: ['marketing', 'brand', 'campaign', 'ads', 'growth'],
  career: ['career', 'job', 'work', 'promotion', 'hire'],
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

function categorizeTopic(text) {
  text = text.toLowerCase();
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(kw => text.includes(kw))) return topic;
  }
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