
import { GoogleGenAI, Type } from "@google/genai";
import { Pet, MatchProfile, AIRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPetRecommendations = async (profile: MatchProfile, pets: Pet[]): Promise<AIRecommendation[]> => {
  const prompt = `
    请根据以下用户信息和待领养宠物列表，推荐前3个最匹配的宠物。
    
    用户信息：
    - 居住环境：${profile.livingSituation}
    - 活动水平：${profile.activityLevel}
    - 是否有小孩：${profile.hasChildren ? '是' : '否'}
    - 是否有其他宠物：${profile.hasOtherPets ? '是' : '否'}
    - 时间投入：${profile.timeCommitment}
    
    待领养宠物：
    ${JSON.stringify(pets.map(p => ({ id: p.id, name: p.name, type: p.type, breed: p.breed, description: p.description, tags: p.tags })))}
    
    请仔细分析兼容性。必须使用中文回复。
    请为每个推荐提供一个匹配分数（0-100）和简短的中文推荐理由。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              petId: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              reasoning: { type: Type.STRING }
            },
            required: ["petId", "matchScore", "reasoning"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("获取 AI 推荐出错:", error);
    return [];
  }
};

export const generatePetAdvice = async (petName: string, breed: string): Promise<string> => {
  const prompt = `请为 ${breed} "${petName}" 的新主人提供3条简短且至关重要的照顾建议。语气要亲切。请使用中文。`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "暂时没有可用建议。";
  } catch (error) {
    return "生成建议出错。";
  }
};

export const evaluateAdoptionApplication = async (pet: Pet, applicationData: any): Promise<string> => {
  const prompt = `
    你是一名资深的宠物领养审核员。请针对用户对宠物 "${pet.name}" (${pet.breed}) 的领养申请进行初步点评。
    
    申请人资料：
    - 居住环境：${applicationData.homeEnv}
    - 养宠经验：${applicationData.experience}
    - 领养初衷：${applicationData.reason}
    
    宠物的性格特点：${pet.personality.join(', ')}
    
    请给出一个温馨、鼓励但客观的点评（200字以内）。
    1. 评价申请人与宠物的契合点。
    2. 针对宠物性格给申请人提一个针对性的建议。
    3. 语气要像真诚的沟通，最后表达审核员正在快马加鞭处理。
    用中文回复。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "感谢您的申请，我们会尽快处理。";
  } catch (error) {
    return "您的申请已提交，AI 评估暂时不可用，人工审核员将直接与您联系。";
  }
};
