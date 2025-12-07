import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'kt-tikotoys-users';
const CURRENT_USER_KEY = 'kt-tikotoys-current-user';

// Админ по умолчанию
const DEFAULT_ADMIN: User = {
  id: 1,
  email: 'admin@kt.tikotoys.shop',
  name: 'Юлия (Admin)',
  isAdmin: true,
  createdAt: new Date('2024-01-01'),
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Проверяем текущего пользователя при загрузке
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  // Инициализация: добавляем админа если его нет
  useEffect(() => {
    const users = getUsers();
    if (!users.find(u => u.id === 1)) {
      // Сохраняем пароль в простом виде для демо (в реальности использовать bcrypt!)
      localStorage.setItem('admin-password', 'admin123'); // Демо пароль
      saveUsers([DEFAULT_ADMIN, ...users]);
    }
  }, []);

  // Сохранение текущего пользователя
  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const getUsers = (): User[] => {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Симуляция задержки API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Проверка админа
    if (email === 'admin@kt.tikotoys.shop') {
      const adminPassword = localStorage.getItem('admin-password');
      if (password === adminPassword) {
        setUser(DEFAULT_ADMIN);
        return true;
      }
      return false;
    }

    // Проверка обычных пользователей
    const users = getUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      // В реальности проверять хеш пароля
      const userPassword = localStorage.getItem(`user-${foundUser.id}-password`);
      if (password === userPassword) {
        setUser(foundUser);
        return true;
      }
    }

    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Симуляция задержки API
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    
    // Проверка существования email
    if (users.find(u => u.email === email) || email === 'admin@kt.tikotoys.shop') {
      return false; // Email уже занят
    }

    // Создание нового пользователя
    const newUser: User = {
      id: Math.max(...users.map(u => u.id), 1) + 1,
      email,
      name,
      isAdmin: false,
      createdAt: new Date(),
    };

    // Сохранение пароля (в реальности хешировать!)
    localStorage.setItem(`user-${newUser.id}-password`, password);
    
    saveUsers([...users, newUser]);
    setUser(newUser);
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
