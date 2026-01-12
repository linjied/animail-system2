
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegister: (userData: any) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("两次输入的密码不一致！");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onRegister({
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
      });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl border border-orange-50 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 mb-2">创建账号</h1>
            <p className="text-gray-500">加入我们，为流浪毛孩子寻找温暖家园</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">昵称</label>
              <input
                required
                type="text"
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 transition-all outline-none"
                placeholder="您的称呼"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">邮箱</label>
              <input
                required
                type="email"
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 transition-all outline-none"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">设置密码</label>
              <input
                required
                type="password"
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 transition-all outline-none"
                placeholder="至少 8 位字符"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">确认密码</label>
              <input
                required
                type="password"
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 transition-all outline-none"
                placeholder="再次输入密码"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 mb-4">
              <p className="text-xs text-orange-800 leading-relaxed font-medium">
                ✨ <strong>AI 助手提示：</strong> 注册成功后，建议前往“AI 匹配助手”填写您的居住环境，我们将更精准地为您推荐毛茸茸的伴侣。
              </p>
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
                <span>注册账号</span>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            已有账号？{' '}
            <Link to="/login" className="text-orange-600 font-bold hover:underline">返回登录</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
