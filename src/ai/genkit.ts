import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai'; // Gemini plugin removed

export const ai = genkit({
  plugins: [/* googleAI() removed */], // No plugins providing models are configured by default now
  // model: 'googleai/gemini-2.0-flash', // Default model removed
});
