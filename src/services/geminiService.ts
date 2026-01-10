import { initializeApp } from "firebase/app"; // Assuming standard firebase app setup exists or will be imported
// Note: We'll use the existing firebase config if available, or just mocking for now if the file structure suggests a specific firebase file.
// Integrating based on project structure. Checking if there is a firebase config file.
// I will assume standard firebase usage or just pass the data directly as requested.
// The user prompt says "Analyze Firebase waste data... Live Firebase snapshot data".
// The service functions will take *context data* passed from the components, which fetch from Firebase.

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are an AI assistant for the Tamil Nadu Smart Bin Waste Management System.
Answer ONLY using waste management, bin monitoring, collection logistics,
household waste data, recycling, and sanitation operations.
If the question is unrelated, refuse politely.`;

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface UserContext {
  role: string;
  uid?: string;
  assignedWard?: string;
  householdId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSnapshot?: any; // The actual data from Firebase relevant to the user
}

export const Geminiservice = {
  sendMessage: async (message: string, history: ChatMessage[], userContext: UserContext) => {
    if (!GEMINI_API_KEY) {
      console.error("Gemini API Key is missing!");
      return "Error: API Key missing. Please check configuration.";
    }

    try {
      // Construct context string based on role
      let contextString = `User Role: ${userContext.role}\n`;
      if (userContext.assignedWard) contextString += `Assigned Ward: ${userContext.assignedWard}\n`;
      if (userContext.householdId) contextString += `Household ID: ${userContext.householdId}\n`;

      if (userContext.dataSnapshot) {
        contextString += `\nLIVE SYSTEM DATA:\n${JSON.stringify(userContext.dataSnapshot, null, 2)}\n`;
      }

      // Merge context and history into the contents format expected by Gemini
      // Following the user's provided logic: single turn with system prompt prefix for now to ensure compatibility
      // although we maintain turn-based structure if history exists.
      const contents = history.length === 0
        ? [
          {
            role: 'user',
            parts: [
              { text: `${SYSTEM_PROMPT}\n\nContext:\n${contextString}\n\nUser Question: ${message}` }
            ]
          }
        ]
        : [
          ...history,
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ];

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Gemini API Error:", response.status, errText);
        return "I'm sorry, I'm having trouble connecting to the intelligence server right now.";
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts.map((p: any) => p.text).join(' ');
      }

      return "I couldn't generate a response based on that.";

    } catch (error) {
      console.error("Gemini Service Exception:", error);
      return "An underlying error occurred while processing your request.";
    }
  },

  analyzeImage: async (base64Image: string, mimeType: string) => {
    if (!GEMINI_API_KEY) return null;

    try {
      const prompt = `Analyze this image of waste/garbage. 
      1. Classify the waste type: 'overflow', 'damage', 'hazardous', 'mixed', or 'other'.
      2. Assess urgency: 'Low', 'Medium', or 'High'.
      3. Provide a short description (max 2 sentences).
      RETURN JSON format: { "issueType": "...", "urgency": "...", "description": "..." }`;

      const contents = [{
        role: 'user',
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          }
        ]
      }];

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 500 } // Lower temp for factual analysis
        })
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      // Extract JSON from markdown code block if present
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;

    } catch (error) {
      console.error("Image Analysis Error:", error);
      return null;
    }
  }
};
