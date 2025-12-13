
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc'; // Иконка Google

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, isAuthenticated, loading } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Не удалось войти через Google", error);
    }
  };

  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Карточка */}
        <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-8 border border-sand">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brown-dark mb-2">Вход в аккаунт</h1>
            <p className="text-brown-light">Используйте Google для быстрого доступа</p>
          </div>

          {/* Кнопка входа через Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-moccasin disabled:bg-cream-bg text-brown-dark py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 border border-sand shadow-lg shadow-sand/30"
          >
            <FcGoogle size={24} />
            <span>{loading ? 'Проверка...' : 'Войти через Google'}</span>
          </button>

          <div className="mt-8 text-center">
            <Link to="/" className="text-brown-light hover:text-salmon text-sm transition-colors">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
