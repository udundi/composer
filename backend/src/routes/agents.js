import express from 'express';
import ideationAgent from '../agents/ideationAgent.js';
import copyAgent from '../agents/copyAgent.js';
import mediaResonanceAgent from '../agents/mediaResonanceAgent.js';
import scoringAgent from '../agents/scoringAgent.js';

const router = express.Router();

router.post('/ideate', async (req, res) => {
  const { profession, topic } = req.body;
  const idea = await ideationAgent.generateIdea({ profession, topic });
  res.json({ idea });
});

router.post('/copy', async (req, res) => {
  const { idea, tone, jobCategory } = req.body;
  const text = await copyAgent.generateCopy({ idea, tone, jobCategory });
  res.json({ text });
});

router.post('/media', async (req, res) => {
  const { idea, copy } = req.body;
  const mediaType = await mediaResonanceAgent.suggestMedia({ idea, copy });
  res.json({ mediaType });
});

router.post('/score', async (req, res) => {
  const { idea, copy, mediaType } = req.body;
  const score = await scoringAgent.scorePost({ idea, copy, mediaType });
  res.json({ score });
});

export default router;