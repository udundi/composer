// /backend/src/agents/mediaResonanceAgent.js
import { generateCompletion } from '../utils/openai.js';
import { generateImage } from '../utils/dalle.js';

function normalizeMediaType(raw) {
  // Remove extra words, periods, spaces, articles
  if (!raw) return 'none';
  const cleaned = raw.trim().toLowerCase().replace(/[^a-z]/g, '');
  // Fuzzy match common variants
  if (cleaned.includes('diagram')) return 'diagram';
  if (cleaned.includes('image') || cleaned.includes('picture') || cleaned.includes('photo')) return 'image';
  if (cleaned.includes('video') || cleaned.includes('reel')) return 'video';
  if (cleaned.includes('meme')) return 'meme';
  if (cleaned.includes('none') || cleaned === '') return 'none';
  return 'none';
}

export default {
  /**
   * Suggests and generates media for a LinkedIn post.
   * @param {Object} params - idea (string), copy (string)
   * @returns {Object} - { mediaType, mediaUrl }
   */
  suggestMedia: async ({ idea, copy }) => {
    // Add more context/examples for reliability
    const prompt = `
Analyze the following LinkedIn post and suggest the SINGLE most effective type of media to increase virality. Only reply with: image, diagram, video, meme, or none.

Examples:
Idea: "Showcase SaaS growth trends"
Copy: "Top trends in SaaS for 2025…"
Best media: diagram

Idea: "Why humor matters at work"
Copy: "A little humor can change your team's culture."
Best media: meme

Idea: "How AI is transforming remote work"
Copy: "Here's how AI tools help distributed teams."
Best media: image

Idea: "Watch my video on morning routines"
Copy: "My 30-second routine for energy every day."
Best media: video

---

Now analyze this post:
Idea: "${idea}"
Copy: "${copy}"
Best media:
    `.trim();

    let mediaType = "none";
    let mediaUrl = null;

    try {
      const result = await generateCompletion(prompt, 0.3, false);
      mediaType = normalizeMediaType(result);
      console.log('[mediaResonanceAgent] OpenAI response:', result, '->', mediaType);
    } catch (e) {
      console.error('OpenAI error in mediaResonanceAgent:', e);
    }

    // Generate image/diagram if needed
    if (mediaType === "image" || mediaType === "diagram" || mediaType === "meme") {
      const imgPrompt = `Create a clear, minimal style ${mediaType} for LinkedIn, illustrating: ${idea}. Simplify the concept to just a few words and create a clean, professional look, do not use ANY text in the image.`;
      try {
        mediaUrl = await generateImage(imgPrompt);
      } catch (e) {
        console.error('DALL·E error in mediaResonanceAgent:', e);
      }
    }

    // If you later add video support, add code here

    return { mediaType, mediaUrl };
  }
};

// // /backend/src/agents/mediaResonanceAgent.js
// import { generateCompletion } from '../utils/openai.js';
// import { generateImage } from '../utils/dalle.js';
// // import { generateVideo } from '../utils/videoGen.js'; // Implement for your chosen video service

// /**
//  * Suggests and generates media for a LinkedIn post.
//  * @param {Object} params - idea (string), copy (string)
//  * @returns {Object} - { mediaType, mediaUrl }
//  */
// export default {
//   suggestMedia: async ({ idea, copy }) => {
//     // 1. Ask OpenAI for best media type
//     const prompt = `Given this LinkedIn post idea and content:\n"${idea}"\n"${copy}"\nWhat media would make this go viral? Respond with one word: image, diagram, video, meme, or none.`;
//     let mediaType = "none";
//     try {
//       const result = await generateCompletion(prompt, 0.2, false);
//       const mt = result.trim().toLowerCase();
//       if (["image", "diagram", "video", "meme", "none"].includes(mt)) mediaType = mt;
//     } catch (e) {
//       console.error('OpenAI error in mediaResonanceAgent:', e);
//     }

//     // 2. If image/diagram, generate via DALL·E
//     if (mediaType === "image" || mediaType === "diagram") {
//       const imgPrompt = `Create a clear, minimal SaaS-style diagram or image that illustrates this idea for LinkedIn: ${idea}. Keep it clean, blue/teal SaaS colors, LinkedIn ready.`;
//       try {
//         const mediaUrl = await generateImage(imgPrompt);
//         return { mediaType, mediaUrl };
//       } catch (e) {
//         console.error('DALL·E error in mediaResonanceAgent:', e);
//       }
//     }

//     // 3. If video, attempt to generate via Luma Labs/RunwayML/Pika (if API available)
//     // if (mediaType === "video") {
//     //   const videoPrompt = `Create a short, modern SaaS explainer video for LinkedIn about: ${idea}. Focus on business, tech, and viral engagement.`;
//     //   try {
//     //     const mediaUrl = await generateVideo(videoPrompt);
//     //     return { mediaType, mediaUrl };
//     //   } catch (e) {
//     //     console.error('VideoGen error in mediaResonanceAgent:', e);
//     //   }
//     // }

//     // 4. Otherwise, just return type
//     return { mediaType, mediaUrl: null };
//   }
// };