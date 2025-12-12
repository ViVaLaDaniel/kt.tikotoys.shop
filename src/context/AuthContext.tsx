
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

// Определяем, как выглядит объект пользователя в нашем приложении
export interface AppUser {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged следит за состоянием аутентификации пользователя
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Пользователь вошел в систему
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          // Временное простое правило для админа. Позже мы сделаем это надежнее.
          isAdmin: firebaseUser.email === 'admin@kt.tikotoys.shop',
        };
        setUser(appUser);
      } else {
        // Пользователь вышел
        setUser(null);
      }
      setLoading(false); // Загрузка состояния завершена
    });

    // Отписываемся от слушателя при размонтировании компонента
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // setUser не нужен, onAuthStateChanged сделает это за нас
    } catch (error) {
      console.error("Ошибка входа через Google: ", error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      // setUser(null) не нужен, onAuthStateChanged сделает это за нас
    } catch (error) {
      console.error("Ошибка выхода: ", error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signInWithGoogle,
    logout,
  };

  // Не рендерим дочерние компоненты, пока не определено состояние аутентификации
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
