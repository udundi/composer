import { generateCompletion } from '../utils/openai.js';

export default {
  suggestMedia: async ({ idea, copy }) => {
    const prompt = `Given this LinkedIn post idea and text: "${idea}\n${copy}", what media would make this post more viral: [image, chart, meme, video, none]? Return only the type.`;
    try {
      const out = await generateCompletion(prompt, 0.2, false);
      const type = out.toLowerCase();
      if (type.includes('image')) return 'image';
      if (type.includes('chart')) return 'chart';
      if (type.includes('meme')) return 'meme';
      if (type.includes('video')) return 'video';
      return null;
    } catch (e) {
      if (/chart|data|trend|stats/i.test(idea + ' ' + copy)) return 'chart';
      if (/meme|funny|humor|joke/i.test(idea + ' ' + copy)) return 'meme';
      if (/video|story|journey/i.test(idea + ' ' + copy)) return 'video';
      if (/visual|image|picture|scene/i.test(idea + ' ' + copy)) return 'image';
      return null;
    }
  }
}