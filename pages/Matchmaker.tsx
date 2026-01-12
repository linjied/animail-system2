
import React, { useState } from 'react';
import { Pet, MatchProfile, AIRecommendation } from '../types';
import { MOCK_PETS } from '../constants';
import { getPetRecommendations } from '../services/geminiService';
import PetCard from '../components/PetCard';

const Matchmaker: React.FC = () => {
  const [profile, setProfile] = useState<MatchProfile>({
    livingSituation: '公寓',
    activityLevel: '一般',
    hasChildren: false,
    hasOtherPets: false,
    timeCommitment: '有限 (兼职照顾)'
  });
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const recs = await getPetRecommendations(profile, MOCK_PETS);
    setRecommendations(recs);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4">AI 宠物匹配助手</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          不确定哪种宠物适合您？让我们强大的 AI 分析您的生活方式，为您推荐最完美的灵魂伴侣。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* 表单部分 */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">居住环境</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                value={profile.livingSituation}
                onChange={e => setProfile({...profile, livingSituation: e.target.value})}
              >
                <option>公寓</option>
                <option>带小院的住宅</option>
                <option>带大院子的住宅</option>
                <option>农场/郊外</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">日常活动水平</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                value={profile.activityLevel}
                onChange={e => setProfile({...profile, activityLevel: e.target.value})}
              >
                <option>佛系/静止</option>
                <option>一般</option>
                <option>活泼/爱运动</option>
                <option>极其活跃</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">陪伴时间</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                value={profile.timeCommitment}
                onChange={e => setProfile({...profile, timeCommitment: e.target.value})}
              >
                <option>有限 (经常加班)</option>
                <option>兼职照顾</option>
                <option>全职陪伴</option>
                <option>居家办公</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500" 
                  checked={profile.hasChildren}
                  onChange={e => setProfile({...profile, hasChildren: e.target.checked})}
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">家里有小孩</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500" 
                  checked={profile.hasOtherPets}
                  onChange={e => setProfile({...profile, hasOtherPets: e.target.checked})}
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">家里有其他宠物</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-orange-500 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  计算中...
                </>
              ) : '寻找我的最佳匹配'}
            </button>
          </form>
        </div>

        {/* 结果部分 */}
        <div className="lg:col-span-2">
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recommendations.map(rec => {
                const pet = MOCK_PETS.find(p => p.id === rec.petId);
                if (!pet) return null;
                return (
                  <div key={pet.id} className="space-y-4">
                    <div className="bg-orange-100 p-4 rounded-2xl flex justify-between items-center">
                      <span className="font-bold text-orange-700">匹配度: {rec.matchScore}%</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg 
                            key={star} 
                            className={`h-4 w-4 ${star <= Math.round(rec.matchScore / 20) ? 'text-orange-500' : 'text-orange-200'}`} 
                            fill="currentColor" viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <PetCard pet={pet} />
                    <div className="p-4 bg-white border border-gray-100 rounded-2xl text-sm text-gray-600 italic leading-relaxed">
                      "AI 建议：{rec.reasoning}"
                    </div>
                  </div>
                );
              })}
            </div>
          ) : !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">准备好寻找了吗？</h3>
              <p className="text-gray-400 max-w-xs">在左侧填好您的个人资料，AI 将会为您智能推荐最合适的伙伴。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matchmaker;
