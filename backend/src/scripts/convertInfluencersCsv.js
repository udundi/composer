// /backend/src/scripts/convertInfluencersCsv.js
import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const INPUT_CSV = path.resolve('./src/data/influencers_data.csv');
const OUTPUT_JSON = path.resolve('./src/data/scraped_linkedin_posts.json');

(async () => {
  const posts = await csv().fromFile(INPUT_CSV);

  // Clean and map the columns to a generic structure your pipeline expects
  const result = posts
    .filter(row => row.content && row.headline) // Only keep real posts
    .map(row => ({
      text: row.content,
      authorJobTitle: row.headline,
      name: row.name,
      about: row.about,
      mediaType: row.media_type,
      mediaUrl: row.media_url,
      reactions: Number(row.reactions || 0),
      comments: Number(row.comments || 0),
      views: Number(row.views || 0),
      hashtags: row.hashtags,
      timeSpent: row.time_spent
    }));

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  console.log(`Wrote ${result.length} posts to scraped_linkedin_posts.json`);
})();