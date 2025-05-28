import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const router = express.Router();

router.post('/scrape', (req, res) => {
  exec('node ./src/scripts/scrapeLinkedin.js', (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: stdout });
  });
});

router.post('/categorize', (req, res) => {
  exec('node ./src/scripts/categorizePosts.js', (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: stdout });
  });
});

router.post('/format', (req, res) => {
  exec('node ./src/scripts/formatForLLM.js', (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: stdout });
  });
});

export default router;