
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import Matchmaker from './pages/Matchmaker';
import AdoptionForm from './pages/AdoptionForm';
import Login from './pages/Login';
import Register from './pages/Register';
import PetCard from './components/PetCard';
import { MOCK_PETS } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [appliedPetIds, setAppliedPetIds] = useState<string[]>([]);
  const [adoptedPetIds, setAdoptedPetIds] = useState<string[]>(['4']); 

  // 从本地存储恢复用户状态（模拟）
  useEffect(() => {
    const savedUser = localStorage.getItem('paws_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    localStorage.setItem('paws_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('paws_user');
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const addAppliedPet = (id: string) => {
    if (!appliedPetIds.includes(id)) {
      setAppliedPetIds(prev => [...prev, id]);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={currentUser} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/pet/:id" element={<PetDetail />} />
            <Route path="/adopt/:id" element={<AdoptionForm onApplySuccess={addAppliedPet} />} />
            <Route path="/matchmaker" element={<Matchmaker />} />
            <Route path="/favorites" element={
              <div className="max-w-6xl mx-auto px-4 py-12">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                   <h1 className="text-4xl font-black text-gray-900 tracking-tight">我的中心</h1>
                   <Link to="/" className="text-orange-500 font-bold hover:underline flex items-center">
                     去发现更多新伙伴 <span className="ml-2">→</span>
                   </Link>
                 </div>
                 
                 <div className="space-y-16">
                   {/* 1. 已领养板块 */}
                   {adoptedPetIds.length > 0 && (
                     <section>
                       <div className="flex items-center space-x-3 mb-6">
                         <div className="bg-green-100 p-2 rounded-xl text-green-600">
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                         </div>
                         <h2 className="text-2xl font-bold text-gray-800">成功领养 ({adoptedPetIds.length})</h2>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                         {MOCK_PETS.filter(p => adoptedPetIds.includes(p.id)).map(pet => (
                           <PetCard 
                             key={pet.id} 
                             pet={pet} 
                             status="adopted" 
                             isFavorite={favorites.includes(pet.id)}
                             onToggleFavorite={toggleFavorite}
                           />
                         ))}
                       </div>
                     </section>
                   )}

                   {/* 2. 申请中板块 */}
                   {appliedPetIds.length > 0 && (
                     <section>
                       <div className="flex items-center space-x-3 mb-6">
                         <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                         </div>
                         <h2 className="text-2xl font-bold text-gray-800">正在申请中 ({appliedPetIds.length})</h2>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                         {MOCK_PETS.filter(p => appliedPetIds.includes(p.id)).map(pet => (
                           <PetCard 
                             key={pet.id} 
                             pet={pet} 
                             status="applied" 
                             isFavorite={favorites.includes(pet.id)}
                             onToggleFavorite={toggleFavorite}
                           />
                         ))}
                       </div>
                     </section>
                   )}

                   {/* 3. 收藏夹板块 */}
                   <section>
                     <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center space-x-3">
                         <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                           </svg>
                         </div>
                         <h2 className="text-2xl font-bold text-gray-800">心愿清单 ({favorites.length})</h2>
                       </div>
                     </div>
                     
                     {favorites.length === 0 ? (
                       <div className="p-16 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 text-center shadow-sm">
                         <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                         </div>
                         <p className="text-gray-400">点击爱心按钮，将喜欢的宠物添加到这里。</p>
                       </div>
                     ) : (
                       <Home favorites={favorites} toggleFavorite={toggleFavorite} petIds={favorites} />
                     )}
                   </section>

                   {/* 底部空状态显示 */}
                   {adoptedPetIds.length === 0 && appliedPetIds.length === 0 && favorites.length === 0 && (
                     <div className="py-20 text-center bg-white rounded-[3rem] shadow-xl border border-gray-50">
                        <div className="max-w-xs mx-auto">
                          <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" className="w-full rounded-full grayscale opacity-30 mb-8" alt="empty" />
                          <h3 className="text-xl font-bold text-gray-800 mb-2">这里空空如也</h3>
                          <p className="text-gray-500 mb-8">开启您的领养之旅，让这里填满温暖的回忆吧！</p>
                          <Link to="/" className="inline-block px-10 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 shadow-lg transition-all">
                             去看看宠物
                          </Link>
                        </div>
                     </div>
                   )}
                 </div>
              </div>
            } />
            <Route path="/about" element={
              <div className="max-w-3xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-black mb-8">关于 宠缘 PawsConnect</h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  宠缘 PawsConnect 是一个致力于让宠物领养更智能、更具同理心的平台。
                  通过 AI 技术，我们帮助潜在的主人找到真正契合自己生活方式的动物，从而降低宠物被退回救助站的概率。
                </p>
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                   <h3 className="font-bold text-orange-800 mb-4">我们的使命</h3>
                   <p className="text-orange-900/80">
                     通过建立基于深度兼容性和专业指导的连接，确保每一只宠物都能找到相伴一生的温馨家园。
                   </p>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-100 py-12 px-4 mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-orange-500 p-2 rounded-xl text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a1 1 0 00.896-1.447l-2.147-4.294a1 1 0 00-.896-.553H7.443a1 1 0 00-.896.553L4.4 8.553A1 1 0 005.296 10H10m4 0v10a1 1 0 01-1 1h-2a1 1 0 01-1-1V10m4 0H10" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-800">宠缘 PawsConnect</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                始于 2024 年，致力于帮助宠物寻找永远的家。今天就开始寻找您的新伙伴。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500 transition-colors">搜索宠物</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">成功案例</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">领养贴士</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">捐赠支持</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">联系我们</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>邮箱: hello@pawsconnect.org</li>
                <li>电话: +86 (555) 123-4567</li>
                <li>地址: 中国 领养中心路 123 号</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border-t border-gray-200 mt-12 pt-8 text-center text-xs text-gray-400">
            &copy; 2024 宠缘 PawsConnect 宠物领养平台. 由 Gemini AI 提供智能支持.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
