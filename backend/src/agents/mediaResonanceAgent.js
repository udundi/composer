// /backend/src/agents/mediaResonanceAgent.js
import { generateCompletion } from '../utils/openai.js';
import { generateImage } from '../utils/dalle.js';
// import { generateVideo } from '../utils/videoGen.js'; // Implement for your chosen video service

/**
 * Suggests and generates media for a LinkedIn post.
 * @param {Object} params - idea (string), copy (string)
 * @returns {Object} - { mediaType, mediaUrl }
 */
export default {
  suggestMedia: async ({ idea, copy }) => {
    // 1. Ask OpenAI for best media type
    const prompt = `Given this LinkedIn post idea and content:\n"${idea}"\n"${copy}"\nWhat media would make this go viral? Respond with one word: image, diagram, video, meme, or none.`;
    let mediaType = "none";
    try {
      const result = await generateCompletion(prompt, 0.2, false);
      const mt = result.trim().toLowerCase();
      if (["image", "diagram", "video", "meme", "none"].includes(mt)) mediaType = mt;
    } catch (e) {
      console.error('OpenAI error in mediaResonanceAgent:', e);
    }

    // 2. If image/diagram, generate via DALL·E
    if (mediaType === "image" || mediaType === "diagram") {
      const imgPrompt = `Create a clear, minimal SaaS-style diagram or image that illustrates this idea for LinkedIn: ${idea}. Keep it clean, blue/teal SaaS colors, LinkedIn ready.`;
      try {
        const mediaUrl = await generateImage(imgPrompt);
        return { mediaType, mediaUrl };
      } catch (e) {
        console.error('DALL·E error in mediaResonanceAgent:', e);
      }
    }

    // 3. If video, attempt to generate via Luma Labs/RunwayML/Pika (if API available)
    // if (mediaType === "video") {
    //   const videoPrompt = `Create a short, modern SaaS explainer video for LinkedIn about: ${idea}. Focus on business, tech, and viral engagement.`;
    //   try {
    //     const mediaUrl = await generateVideo(videoPrompt);
    //     return { mediaType, mediaUrl };
    //   } catch (e) {
    //     console.error('VideoGen error in mediaResonanceAgent:', e);
    //   }
    // }

    // 4. Otherwise, just return type
    return { mediaType, mediaUrl: null };
  }
};