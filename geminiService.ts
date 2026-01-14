
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeDashboardScreenshot(base64Image: string) {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: { mimeType: 'image/jpeg', data: base64Image }
          },
          {
            text: "Extract key advertising metrics from this screenshot. Return a JSON object with: clicks, leads, sales, spend, cpc, cpa, roi, ctr, cpm, cpcLink, avgDailySpend, frequency, and reach."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clicks: { type: Type.NUMBER },
            leads: { type: Type.NUMBER },
            sales: { type: Type.NUMBER },
            spend: { type: Type.NUMBER },
            cpc: { type: Type.NUMBER },
            cpa: { type: Type.NUMBER },
            roi: { type: Type.NUMBER },
            ctr: { type: Type.NUMBER },
            cpm: { type: Type.NUMBER },
            cpcLink: { type: Type.NUMBER },
            avgDailySpend: { type: Type.NUMBER },
            frequency: { type: Type.NUMBER },
            reach: { type: Type.NUMBER }
          },
          required: ["clicks", "leads", "sales", "spend", "cpc", "cpa", "roi", "ctr", "cpm", "cpcLink", "avgDailySpend", "frequency", "reach"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}

export async function getStrategicMarketingAdvice(project: any) {
  try {
    const prompt = `Atue como um Especialista Sênior de Marketing de Performance e Growth. 
    Analise o projeto: ${project.clientName} (${project.niche}). 
    Meta do cliente: ${project.targetMetric}. 
    Métricas atuais: ${JSON.stringify(project.metrics[project.metrics.length - 1] || {})}.
    Funil: ${project.funnelType}. 
    Gere um diagnóstico crítico e um plano de ação prático para melhorar o ROI e escalar os resultados.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['healthy', 'warning', 'critical', 'opportunity'] },
            summary: { type: Type.STRING },
            diagnosis: { type: Type.STRING },
            why: { type: Type.STRING },
            actionPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, enum: ['budget', 'creative', 'audience', 'copy'] },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING, enum: ['high', 'medium', 'low'] }
                }
              }
            }
          },
          required: ["status", "summary", "diagnosis", "why", "actionPlan"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Strategic Analysis Error:", error);
    throw error;
  }
}
