
import React from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  status?: 'applied' | 'adopted' | null;
}

const PetCard: React.FC<PetCardProps> = ({ pet, isFavorite, onToggleFavorite, status }) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/pet/${pet.id}`}>
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* 状态标签 */}
          {status === 'applied' && (
            <div className="absolute top-4 left-4 px-4 py-1.5 bg-blue-500 text-white text-xs font-black rounded-full shadow-lg z-10 animate-pulse">
              ⏳ 审核中
            </div>
          )}
          {status === 'adopted' && (
            <div className="absolute top-4 left-4 px-4 py-1.5 bg-green-500 text-white text-xs font-black rounded-full shadow-lg z-10">
              🎉 已领养
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={() => onToggleFavorite?.(pet.id)}
        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white active:scale-90 hover:scale-110 transition-all duration-200 z-10"
        title={isFavorite ? '取消收藏' : '添加收藏'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
            <p className="text-sm text-gray-500">{pet.breed} • {pet.age}</p>
          </div>
          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
            pet.type === '狗狗' ? 'bg-blue-50 text-blue-600' : 
            pet.type === '猫咪' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'
          }`}>
            {pet.type}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {pet.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-[10px] uppercase tracking-wider font-bold border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/pet/${pet.id}`}
          className={`mt-6 block w-full text-center py-3 font-bold rounded-2xl transition-colors shadow-sm ${
            status === 'adopted' 
              ? 'bg-green-50 text-green-700 hover:bg-green-100' 
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {status === 'adopted' ? '查看日记' : '查看详情'}
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
