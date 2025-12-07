import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    setIsLoading(true);

    const success = await register(formData.email, formData.password, formData.name);
    
    if (success) {
      navigate('/', { replace: true });
    } else {
      setError('Пользователь с таким email уже существует');
    }
    
    setIsLoading(false);
  };

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Создать аккаунт</h1>
            <p className="text-gray-400">Присоединяйтесь к нам!</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Имя</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                placeholder="Ваше имя"
              />
            </div>

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
                minLength={6}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                placeholder="••••••••"
              />
              <p className="text-gray-500 text-xs mt-1">Минимум 6 символов</p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Подтвердите пароль</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" required className="mt-1 rounded" />
              <span>
                Я согласен с{' '}
                <a href="#" className="text-pink-400 hover:text-pink-300">
                  Условиями использования
                </a>{' '}
                и{' '}
                <a href="#" className="text-pink-400 hover:text-pink-300">
                  Политикой конфиденциальности
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-pink-500/30"
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium">
              Войти
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

export default RegisterPage;
