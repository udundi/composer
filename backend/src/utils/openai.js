import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/src/.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FINE_TUNED_MODEL = process.env.OPENAI_FINE_TUNED_MODEL;

export async function generateCompletion(prompt, temperature = 0.8, useFineTuned = false) {
  const model = useFineTuned && FINE_TUNED_MODEL ? FINE_TUNED_MODEL : 'gpt-4o';
  const res = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature,
    max_tokens: 400,
  });
  return res.choices[0].message.content.trim();
}