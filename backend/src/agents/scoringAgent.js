import { generateCompletion } from '../utils/openai.js';

export default {
  scorePost: async ({ idea, copy, mediaType }) => {
    const prompt = `
You are a strict, data-driven LinkedIn content expert. Rate the viral potential (1-10, 10 = most viral) of a LinkedIn post. Most average posts score between 3 and 6. Posts should only score 8-10 if they are exceptionally bold, controversial, timely, or creative. Do NOT be generous. Never score a post as 7; use 7 only if you are unsure. Boring, overly self-promotional, or generic posts should score 1–3. Output only: { "score": <number> }

Examples:
Idea: "Join our webinar"
Post: "Register now for our exciting new product launch webinar next week!"
Media: none
Viral Score: { "score": 2 }

Idea: "Monday motivation"
Post: "Start your week with positivity! #mondaymotivation"
Media: none
Viral Score: { "score": 3 }

Idea: "Productivity hack"
Post: "My 5 favorite morning rituals for getting focused."
Media: none
Viral Score: { "score": 4 }

Idea: "Why AI is transforming remote work"
Post: "AI tools are making remote teams faster than ever. Here’s how..."
Media: image
Viral Score: { "score": 9 }

Idea: "The company's Q2 update"
Post: "We met our goals for Q2. Thank you to all team members."
Media: none
Viral Score: { "score": 1 }

Idea: "Why listening beats talking"
Post: "The biggest leadership myth? That leaders need to talk more."
Media: meme
Viral Score: { "score": 8 }

---

Now rate this post:
Idea: "${idea}"
Post: "${copy}"
Media: "${mediaType || 'none'}"
Viral Score:
    `.trim();

    try {
      const result = await generateCompletion(prompt, 0.15, false);

      // Parse JSON score, fallback if needed
      const match = result.match(/"score"\s*:\s*([0-9]+)/);
      let score = match ? parseInt(match[1]) : (
        parseInt(result.match(/([0-9]+)/)?.[0] || '5')
      );

      // Strict post-processing to discourage high scores
      if (score > 8) score = 8 + Math.round(Math.random() * 2); // 9-10 only for truly epic
      if (score === 7) score = 6; // discourage 7
      if (score > 6 && Math.random() > 0.7) score = 6; // limit 8s
      return Math.max(1, Math.min(score, 10));
    } catch (e) {
      // Fallback heuristic
      let score = 5;
      if (idea && idea.length > 40) score += 1;
      if (copy && copy.length > 100) score += 1;
      if (mediaType && mediaType !== 'none') score += 1;
      if (/question|myth|secret/i.test(copy)) score += 1;
      return Math.min(score, 10);
    }
  }
}