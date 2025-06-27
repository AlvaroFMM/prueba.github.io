
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        } else {
            reject(new Error("Failed to read file as string."));
        }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  const base64EncodedData = await base64EncodedDataPromise;

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const transcribeAudio = async (file: File): Promise<string> => {
  try {
    const audioPart = await fileToGenerativePart(file);
    const textPart = {
      text: "Transcribe this audio file to text. Provide only the transcribed text, without any additional comments or explanations.",
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: { parts: [audioPart, textPart] }
    });

    const transcription = response.text;
    if (!transcription) {
      throw new Error("The API returned an empty transcription. The audio might be silent or unsupported.");
    }
    
    return transcription;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the API.");
  }
};
