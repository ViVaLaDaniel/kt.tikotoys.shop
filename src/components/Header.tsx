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

  // Close menus on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
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
      className="bg-cream-bg/95 backdrop-blur-md text-brown-dark fixed top-0 left-0 right-0 z-50 border-b border-moccasin"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🧸</span>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-salmon to-sand bg-clip-text text-transparent group-hover:opacity-90 transition-all">
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
                  ? 'bg-sand/80 text-brown-dark'
                  : 'text-brown-light hover:text-brown-dark hover:bg-moccasin'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Auth + Cart + Mobile menu */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-moccasin transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name || 'User Avatar'} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-sand to-salmon rounded-full flex items-center justify-center font-bold text-sm text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : ' '}
                    </div>
                  )}
                  <span className="text-brown-light">{user.name || 'User'}</span>
                  <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-cream-bg border border-moccasin rounded-xl shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-moccasin">
                      <p className="text-brown-dark font-medium">{user.name || 'User'}</p>
                      <p className="text-brown-light text-sm">{user.email || 'No email'}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/profile" className="block px-4 py-2 text-brown-light hover:bg-moccasin hover:text-brown-dark transition-colors">👤 My Profile</Link>
                      <Link to="/orders" className="block px-4 py-2 text-brown-light hover:bg-moccasin hover:text-brown-dark transition-colors">📦 My Orders</Link>
                      {user.isAdmin && (
                        <Link to="/admin" className="block px-4 py-2 text-salmon hover:bg-moccasin transition-colors">⚙️ Admin Dashboard</Link>
                      )}
                    </div>
                    <div className="border-t border-moccasin py-2">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-moccasin hover:text-red-600 transition-colors">🚪 Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-medium bg-sand hover:bg-salmon text-white transition-all shadow-lg shadow-sand/30"
                >
                  Login
                </Link>
            )}
          </div>

          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-moccasin transition-colors group" aria-label="Shopping cart">
            <svg className="w-6 h-6 text-brown-light group-hover:text-brown-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-salmon text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          <button className="md:hidden p-2 rounded-lg hover:bg-moccasin transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`md:hidden border-t border-moccasin transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 bg-moccasin/50 rounded-lg mb-2">
                {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name || 'User Avatar'} className="w-10 h-10 rounded-full" />
                ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-sand to-salmon rounded-full flex items-center justify-center font-bold text-lg text-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : ' '}
                    </div>
                )}
                <div>
                    <p className="text-brown-dark font-medium">{user.name || 'User'}</p>
                    <p className="text-brown-light text-sm">{user.email || 'No email'}</p>
                </div>
              </div>
              <Link to="/profile" className="px-4 py-3 rounded-lg font-medium text-brown-light hover:text-brown-dark hover:bg-moccasin transition-all">👤 My Profile</Link>
              <Link to="/orders" className="px-4 py-3 rounded-lg font-medium text-brown-light hover:text-brown-dark hover:bg-moccasin transition-all">📦 My Orders</Link>
              {user.isAdmin && (
                <Link to="/admin" className="px-4 py-3 rounded-lg font-medium text-salmon hover:text-brown-dark hover:bg-moccasin transition-all">⚙️ Admin Dashboard</Link>
              )}
            </>
          ) : (
              <Link to="/login" className="px-4 py-3 rounded-lg font-medium bg-sand/80 text-brown-dark hover:bg-sand transition-all">Login</Link>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? 'bg-sand/80 text-brown-dark'
                  : 'text-brown-light hover:text-brown-dark hover:bg-moccasin'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <Link to="/cart" className="px-4 py-3 rounded-lg font-medium text-brown-light hover:text-brown-dark hover:bg-moccasin transition-all duration-300 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
            {itemCount > 0 && (
              <span className="bg-salmon text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated && (
            <button onClick={handleLogout} className="px-4 py-3 rounded-lg font-medium text-red-500 hover:text-red-600 hover:bg-moccasin transition-all text-left">🚪 Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
