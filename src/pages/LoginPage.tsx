
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc'; // Иконка Google

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, isAuthenticated, loading } = useAuth();

  // Откуда пользователь пришел? Если не указано, то на главную.
  const from = (location.state as any)?.from?.pathname || '/';

  // Этот эффект следит за состоянием аутентификации.
  // Как только пользователь вошел (isAuthenticated === true), перенаправляем его.
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // После вызова этой функции, onAuthStateChanged в AuthContext
      // обнаружит изменение и обновит isAuthenticated, что вызовет useEffect.
    } catch (error) {
      console.error("Не удалось войти через Google", error);
      // Здесь можно показать ошибку пользователю, если нужно
    }
  };

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Карточка */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Вход в аккаунт</h1>
            <p className="text-gray-400">Используйте Google для быстрого доступа</p>
          </div>

          {/* Кнопка входа через Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/20 disabled:bg-gray-600 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 border border-gray-700 shadow-lg"
          >
            <FcGoogle size={24} />
            <span>{loading ? 'Проверка...' : 'Войти через Google'}</span>
          </button>

          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
