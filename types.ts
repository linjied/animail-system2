
export type PetType = '狗狗' | '猫咪' | '其他';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: string;
  gender: '公' | '母';
  size: '小型' | '中型' | '大型';
  description: string;
  image: string;
  tags: string[];
  health: string;
  personality: string[];
}

export interface MatchProfile {
  livingSituation: string;
  activityLevel: string;
  hasChildren: boolean;
  hasOtherPets: boolean;
  timeCommitment: string;
}

export interface AIRecommendation {
  petId: string;
  matchScore: number;
  reasoning: string;
}
