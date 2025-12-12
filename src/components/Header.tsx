import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { getItemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const itemCount = getItemCount();

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen, isUserMenuOpen]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="bg-gray-900/95 backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50 border-b border-gray-800"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🧸</span>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-amber-500 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:to-amber-400 transition-all">
            KT.TikoToys
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? 'bg-pink-500/20 text-pink-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Auth + Cart + Mobile menu */}
        <div className="flex items-center gap-2">
          {/* Auth buttons / User menu - Скрыть на мобильных */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name || 'User Avatar'} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-amber-500 rounded-full flex items-center justify-center font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : ' '}
                    </div>
                  )}
                  <span className="text-gray-300">{user.name || 'User'}</span>
                  <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-white font-medium">{user.name || 'User'}</p>
                      <p className="text-gray-400 text-sm">{user.email || 'No email'}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        👤 My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        📦 My Orders
                      </Link>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-pink-400 hover:bg-gray-700 hover:text-pink-300 transition-colors"
                        >
                          ⚙️ Admin Dashboard
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-700 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-medium bg-pink-500 hover:bg-pink-600 text-white transition-all shadow-lg shadow-pink-500/20"
                >
                  Login
                </Link>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            aria-label="Shopping cart"
          >
            <svg
              className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {/* Auth links mobile */}
          {isAuthenticated && user ? (
            <>
             <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg mb-2">
                {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name || 'User Avatar'} className="w-10 h-10 rounded-full" />
                ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-amber-500 rounded-full flex items-center justify-center font-bold text-lg">
                        {user.name ? user.name.charAt(0).toUpperCase() : ' '}
                    </div>
                )}
                <div>
                    <p className="text-white font-medium">{user.name || 'User'}</p>
                    <p className="text-gray-400 text-sm">{user.email || 'No email'}</p>
                </div>
              </div>
              <Link
                to="/profile"
                className="px-4 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
              >
                👤 My Profile
              </Link>
              <Link
                to="/orders"
                className="px-4 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
              >
                📦 My Orders
              </Link>
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-3 rounded-lg font-medium text-pink-400 hover:text-white hover:bg-gray-800 transition-all"
                >
                  ⚙️ Admin Dashboard
                </Link>
              )}
            </>
          ) : (
              <Link
                to="/login"
                className="px-4 py-3 rounded-lg font-medium bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition-all"
              >
                Login
              </Link>
          )}

          {/* Regular nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? 'bg-pink-500/20 text-pink-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <Link
            to="/cart"
            className="px-4 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Cart
            {itemCount > 0 && (
              <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Logout button mobile */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-3 rounded-lg font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all text-left"
            >
              🚪 Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
