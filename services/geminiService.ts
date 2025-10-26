
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

async function runAi(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while communicating with the AI. Please check the console for details.";
  }
}

export const summarizeJournal = async (text: string): Promise<string> => {
  const prompt = `
    Analyze the following journal entry based on the principles of Ikigai (what you love, what you're good at, what the world needs, what you can be paid for). 
    Provide a summary and a sentiment analysis (e.g., Positive, Neutral, Negative, Mixed) with a brief explanation. 
    Format the output in clean markdown.

    Journal Entry:
    ---
    ${text}
    ---
  `;
  return runAi(prompt);
};

export const generateSocialPosts = async (update: string): Promise<string> => {
  const prompt = `
    You are a career coach helping a professional build their personal brand.
    Generate a LinkedIn post and a Twitter post based on the following project update.
    The tone should be professional, engaging, and inspiring.
    Include relevant hashtags for the AI/tech industry.
    Format the output in clean markdown with "### LinkedIn Post" and "### Twitter Post" headers.

    Project Update:
    ---
    ${update}
    ---
  `;
  return runAi(prompt);
};


export const analyzeFeedback = async (feedback: string): Promise<string> => {
  const prompt = `
    Analyze the following feedback and identify key strengths and areas for improvement.
    Present the analysis in two markdown lists: "#### Strengths" and "#### Areas for Improvement".
    Be constructive and focus on actionable insights.

    Feedback:
    ---
    ${feedback}
    ---
  `;
  return runAi(prompt);
};

export const runDelta4Analysis = async (situation: string): Promise<string> => {
  const prompt = `
    Analyze the following situation using the Delta 4 framework.
    Identify the 'Friction Points' (what went wrong or was difficult) and 'Delight Points' (what went right or was surprisingly good).
    Present the analysis in two markdown lists: "#### Friction Points (What went wrong?)" and "#### Delight Points (What went right?)".

    Situation:
    ---
    ${situation}
    ---
  `;
  return runAi(prompt);
};
