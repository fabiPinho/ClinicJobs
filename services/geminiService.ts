
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client using the provided API key from environment variables
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizeBio = async (currentBio: string, specialty: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Melhore esta biografia profissional de um dentista especializado em ${specialty}. Deixe-a mais profissional e atraente para clínicas de alto padrão. Biografia atual: "${currentBio}"`,
    config: {
      temperature: 0.7,
    },
  });
  return response.text;
};

export const suggestJobDescription = async (title: string, clinicDetails: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Crie uma descrição detalhada e atraente de vaga de emprego para o cargo de ${title} em uma clínica com estas características: ${clinicDetails}. Inclua requisitos técnicos, diferenciais e tom profissional.`,
    config: {
      temperature: 0.8,
    },
  });
  return response.text;
};
