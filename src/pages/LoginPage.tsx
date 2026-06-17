import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, isAuthenticated, loading } = useAuth();
  const [error, setError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to sign in with Google';
      setError(message);
    }
  };

  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-8 border border-sand">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brown-dark mb-2">
              Sign In
            </h1>
            <p className="text-brown-light">
              Use Google for quick access
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Google sign-in button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-moccasin disabled:bg-cream-bg text-brown-dark py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 border border-sand shadow-lg shadow-sand/30"
          >
            <FcGoogle size={24} />
            <span>{loading ? 'Checking...' : 'Sign in with Google'}</span>
          </button>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-brown-light hover:text-salmon text-sm transition-colors"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
