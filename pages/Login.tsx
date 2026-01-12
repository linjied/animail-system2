
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 模拟登录过程
    setTimeout(() => {
      onLogin({
        id: 'u1',
        name: email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl border border-orange-50 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-orange-50 rounded-2xl mb-4">
              <span className="text-4xl">🐾</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">欢迎回来</h1>
            <p className="text-gray-500">开启您与毛孩子的新篇章</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">邮箱地址</label>
              <input
                required
                type="email"
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-0 transition-all outline-none"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">密码</label>
                <a href="#" className="text-xs font-bold text-orange-500 hover:underline">忘记密码？</a>
              </div>
              <input
                required
                type="password"
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-0 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white text-xl font-black rounded-2xl shadow-xl shadow-orange-100 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span>登录</span>
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="px-4 bg-white text-gray-400 font-bold">或者</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-3 px-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white transition-colors">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4 mr-2" alt="Google" />
                <span className="text-xs font-bold text-gray-700">Google</span>
              </button>
              <button className="flex items-center justify-center py-3 px-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white transition-colors">
                 <span className="text-sm mr-2">🍏</span>
                <span className="text-xs font-bold text-gray-700">Apple</span>
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-sm font-medium text-gray-500">
            还没有账号？{' '}
            <Link to="/register" className="text-orange-600 font-bold hover:underline">立即注册</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
