import OpenAI from 'openai';
import { TutorialCache } from './cacheService.js';

export class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.cache = new TutorialCache();
  }

  async generateTutorial(prompt, options = {}) {
    const cacheKey = `tutorial:${prompt}:${JSON.stringify(options)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: 'You are a expert tutorial creator. Generate step-by-step guides with clear explanations.'
        }, {
          role: 'user',
          content: prompt
        }],
        temperature: 0.7,
        max_tokens: 1500
      });

      const result = {
        content: completion.choices[0].message.content,
        timestamp: new Date().toISOString()
      };

      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
  }
}