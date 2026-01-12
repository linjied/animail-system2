
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PETS } from '../constants';
import { Pet } from '../types';
import { generatePetAdvice } from '../services/geminiService';

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pet = MOCK_PETS.find(p => p.id === id);
  const [advice, setAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  useEffect(() => {
    if (pet) {
      setLoadingAdvice(true);
      generatePetAdvice(pet.name, pet.breed).then(res => {
        setAdvice(res);
        setLoadingAdvice(false);
      });
    }
  }, [pet]);

  if (!pet) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">未找到该宠物</h2>
        <Link to="/" className="text-orange-500 mt-4 inline-block font-bold">返回浏览</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-500 font-bold mb-8 transition-colors">
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回浏览
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img src={pet.image} alt={pet.name} className="w-full h-auto" />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-orange-50 p-4 rounded-2xl text-center">
               <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">年龄</p>
               <p className="font-bold text-gray-800">{pet.age}</p>
             </div>
             <div className="bg-blue-50 p-4 rounded-2xl text-center">
               <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">性别</p>
               <p className="font-bold text-gray-800">{pet.gender}</p>
             </div>
             <div className="bg-purple-50 p-4 rounded-2xl text-center">
               <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">体型</p>
               <p className="font-bold text-gray-800">{pet.size}</p>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2">{pet.name}</h1>
            <p className="text-xl text-orange-500 font-bold">{pet.breed}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-3">关于 {pet.name}</h3>
            <p className="text-gray-600 leading-relaxed">{pet.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {pet.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center text-orange-400">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                AI 养宠助手
              </h3>
              {loadingAdvice ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ) : (
                <div className="text-gray-300 whitespace-pre-line leading-relaxed text-sm">
                  {advice}
                </div>
              )}
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-20 blur-2xl"></div>
          </div>

          <button 
            onClick={() => navigate(`/adopt/${pet.id}`)}
            className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white text-xl font-black rounded-[2rem] shadow-xl transition-all transform hover:-translate-y-1"
          >
            申请领养
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
