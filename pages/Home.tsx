
import React, { useState } from 'react';
import PetCard from '../components/PetCard';
import { MOCK_PETS } from '../constants';
import { PetType } from '../types';

interface HomeProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  petIds?: string[]; // 新增：可选的宠物 ID 列表，用于展示特定范围的宠物（如收藏列表）
}

const Home: React.FC<HomeProps> = ({ favorites, toggleFavorite, petIds }) => {
  const [filter, setFilter] = useState<PetType | '全部'>('全部');
  const [search, setSearch] = useState('');

  // 1. 如果传入了 petIds，则基础列表仅包含这些 ID 的宠物，否则使用全部宠物
  const basePets = petIds 
    ? MOCK_PETS.filter(p => petIds.includes(p.id)) 
    : MOCK_PETS;

  // 2. 在基础列表之上应用搜索和分类过滤
  const filteredPets = basePets.filter(pet => {
    const matchesType = filter === '全部' || pet.type === filter;
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 仅在非收藏模式下显示英雄区 */}
      {!petIds && (
        <section className="mb-12 relative rounded-[2rem] bg-orange-50 overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              找到您相伴一生的 <br/><span className="text-orange-500 underline decoration-orange-200 decoration-8 underline-offset-4">毛茸茸好友</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              领养一个可爱的小生命，给它们一个温暖的家。上千只待领养宠物正在等待您的到来。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-lg">
                立即开启
              </button>
              <button className="bg-white border-2 border-orange-200 text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-colors shadow-sm">
                领养流程
              </button>
            </div>
          </div>
          <div className="hidden lg:block md:w-1/2">
             <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" 
              alt="快乐的宠物" 
              className="rounded-3xl shadow-2xl rotate-3"
             />
          </div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        </section>
      )}

      {/* 搜索和过滤 */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={petIds ? "在收藏中搜索..." : "搜索姓名、品种..."}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto whitespace-nowrap">
          {(['全部', '狗狗', '猫咪', '其他'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                filter === type 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'text-gray-500 hover:text-orange-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 宠物网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPets.map(pet => (
          <PetCard 
            key={pet.id} 
            pet={pet} 
            isFavorite={favorites.includes(pet.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
        {filteredPets.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
               <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <p className="text-gray-400 font-medium">
              {petIds ? "收藏夹中没有匹配的宠物。" : "没有找到符合条件的宠物。"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
