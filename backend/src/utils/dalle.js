import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/src/.env' });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateImage(prompt) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024"
  });
  return response.data[0].url;
}