
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PETS } from '../constants';
import { evaluateAdoptionApplication } from '../services/geminiService';

interface AdoptionFormProps {
  onApplySuccess: (id: string) => void;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ onApplySuccess }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pet = MOCK_PETS.find(p => p.id === id);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    homeEnv: '公寓',
    experience: '新手',
    reason: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  if (!pet) return <div className="p-20 text-center">未找到宠物信息</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟数据提交并获取 AI 反馈
    const feedback = await evaluateAdoptionApplication(pet, formData);
    setAiFeedback(feedback);
    setIsSubmitting(false);
    
    // 通知 App 组件更新状态
    onApplySuccess(pet.id);
  };

  if (aiFeedback) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-orange-50 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">申请已成功提交！</h1>
          <p className="text-gray-500 mb-10">我们的审核员将在 1-3 个工作日内通过电话与您联系。</p>
          
          <div className="bg-orange-50 rounded-3xl p-8 text-left relative overflow-hidden mb-10">
            <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center">
              <span className="mr-2">✨</span> AI 助手初步评估
            </h3>
            <p className="text-orange-900/80 leading-relaxed italic">
              "{aiFeedback}"
            </p>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
          </div>

          <button 
            onClick={() => navigate('/favorites')}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-orange-500 transition-all"
          >
            去我的收藏查看进度
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* 左侧：宠物信息卡片 */}
        <div className="md:w-1/3 w-full sticky top-24">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img src={pet.image} alt={pet.name} className="w-full aspect-square object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-1">领养 {pet.name}</h2>
              <p className="text-orange-500 font-bold mb-4">{pet.breed}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>📍 所在地：领养中心 A 区</p>
                <p>🆔 编号：#PET-{pet.id}024</p>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：申请表单 */}
        <div className="md:w-2/3 w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-50">
          <h1 className="text-3xl font-black text-gray-900 mb-8">填写领养申请</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">您的姓名</label>
                <input 
                  required
                  type="text"
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-0 transition-all"
                  placeholder="请输入姓名"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">联系电话</label>
                <input 
                  required
                  type="tel"
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-0 transition-all"
                  placeholder="请输入手机号"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">居住环境</label>
                <select 
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 transition-all"
                  value={formData.homeEnv}
                  onChange={e => setFormData({...formData, homeEnv: e.target.value})}
                >
                  <option>公寓</option>
                  <option>带院子的住宅</option>
                  <option>农村自建房</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">养宠经验</label>
                <select 
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 transition-all"
                  value={formData.experience}
                  onChange={e => setFormData({...formData, experience: e.target.value})}
                >
                  <option>新手 (第一次养)</option>
                  <option>一般 (养过 1-2 只)</option>
                  <option>丰富 (资深铲屎官)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">为什么想领养 {pet.name}？</label>
              <textarea 
                required
                rows={4}
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 transition-all resize-none"
                placeholder="请分享您的初衷，例如您的生活习惯、能提供给它的照顾等..."
                value={formData.reason}
                onChange={e => setFormData({...formData, reason: e.target.value})}
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white text-xl font-black rounded-[2rem] shadow-xl transition-all flex items-center justify-center space-x-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>正在处理申请...</span>
                  </>
                ) : (
                  <span>提交申请</span>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">提交申请即代表您同意我们的领养协议和隐私政策</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
