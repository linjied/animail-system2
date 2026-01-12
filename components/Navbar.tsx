
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { name: '寻找宠物', path: '/' },
    { name: 'AI 匹配助手', path: '/matchmaker' },
    { name: '我的中心', path: '/favorites' },
    { name: '关于我们', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-orange-500 p-2 rounded-xl text-white transform group-hover:rotate-12 transition-transform shadow-md shadow-orange-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a1 1 0 00.896-1.447l-2.147-4.294a1 1 0 00-.896-.553H7.443a1 1 0 00-.896.553L4.4 8.553A1 1 0 005.296 10H10m4 0v10a1 1 0 01-1 1h-2a1 1 0 01-1-1V10m4 0H10" />
            </svg>
          </div>
          <span className="text-2xl font-black text-gray-800 tracking-tight">宠缘</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-bold transition-all duration-200 ${
                location.pathname === item.path
                  ? 'text-orange-600'
                  : 'text-gray-500 hover:text-orange-400'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
              <div className="flex items-center space-x-2">
                <img 
                  src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"} 
                  className="w-8 h-8 rounded-full border-2 border-orange-200"
                  alt="Avatar"
                />
                <span className="text-sm font-bold text-gray-700">{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
              >
                注销
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-200"
            >
              登录 / 注册
            </Link>
          )}
        </div>

        <button className="md:hidden text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
