import { generateCompletion } from '../utils/openai.js';

export default {
  scorePost: async ({ idea, copy, mediaType }) => {
    const prompt = `Rate the viral potential (1-10, 10 is most viral) for this LinkedIn post idea:\nIdea: "${idea}"\nPost: "${copy}"\nMedia: "${mediaType || 'none'}". Only return the number.`;
    try {
      const result = await generateCompletion(prompt, 0.3, false);
      const score = parseFloat(result.match(/([0-9]+(\.[0-9]+)?)/)?.[0] || '5');
      return Math.max(1, Math.min(score, 10));
    } catch (e) {
      let score = 5.0;
      if (idea && idea.length > 40) score += 1;
      if (copy && copy.length > 100) score += 1;
      if (mediaType) score += 2;
      if (/question|myth|secret/i.test(copy)) score += 1;
      return Math.min(score, 10);
    }
  }
}