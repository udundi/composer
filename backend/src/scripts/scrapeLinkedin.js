// /backend/src/scripts/scrapeLinkedin.js
require('dotenv').config({ path: __dirname + '/../.env' });
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = 'curious_coder~linkedin-post-search-scraper';

const INPUT = {
  search: "leadership OR AI OR marketing OR remote work",
  maxPostCount: 50,
  resultsType: "posts"
};

async function runApifyActor() {
  const runRes = await axios.post(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
    { input: INPUT }
  );
  return runRes.data.data;
}

async function waitForRunToFinish(runId) {
  let status = 'RUNNING';
  while (status === 'RUNNING' || status === 'READY') {
    const res = await axios.get(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    status = res.data.data.status;
    if (status === 'SUCCEEDED') return res.data.data;
    if (status === 'FAILED' || status === 'ABORTED') throw new Error('Apify run failed');
    await new Promise(r => setTimeout(r, 5000));
  }
}

async function fetchDataset(datasetId) {
  const res = await axios.get(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&format=json`
  );
  return res.data;
}

(async () => {
  try {
    const run = await runApifyActor();
    console.log('Started Apify run:', run.id);
    const finished = await waitForRunToFinish(run.id);
    const items = await fetchDataset(finished.defaultDatasetId);
    const outputPath = path.join(__dirname, '../data/scraped_linkedin_posts.json');
    fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));
    console.log('Saved LinkedIn posts:', items.length);
  } catch (err) {
    console.error('Error scraping LinkedIn:', err);
  }
})();