import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(formData.email, formData.password);
    
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Неверный email или пароль');
    }
    
    setIsLoading(false);
  };

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать!</h1>
            <p className="text-gray-400">Войдите в свой аккаунт</p>
          </div>

          {/* Демо подсказка */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-400 text-sm">
              <strong>Демо доступ:</strong>
              <br />
              Email: admin@kt.tikotoys.shop
              <br />
              Пароль: admin123
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Пароль</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span>Запомнить меня</span>
              </label>
              <a href="#" className="text-pink-400 hover:text-pink-300">
                Забыли пароль?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-pink-500/30"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-pink-400 hover:text-pink-300 font-medium">
              Зарегистрироваться
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
