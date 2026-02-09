import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
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
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="bg-cream-bg/95 backdrop-blur-md text-brown-dark fixed top-0 left-0 right-0 z-50 border-b border-moccasin shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.span
            whileHover={{ rotate: 20 }}
            className="text-2xl"
          >
            🧸
          </motion.span>
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
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative ${
                isActive(link.to)
                  ? 'text-brown-dark'
                  : 'text-brown-light hover:text-brown-dark hover:bg-moccasin/50'
              }`}
            >
              {isActive(link.to) && (
                <motion.div
                  layoutId="activeLink"
                  className="absolute inset-0 bg-sand/20 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Auth + Cart + Mobile menu toggle */}
        <div className="flex items-center gap-3">

          {/* Desktop User Menu */}
          <div className="hidden md:block relative" ref={userMenuRef}>
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-moccasin/50 transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name || 'User'} className="w-8 h-8 rounded-full border border-sand" />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-sand to-salmon rounded-full flex items-center justify-center font-bold text-sm text-white border border-white shadow-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-sm font-medium text-brown-dark max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
                  <motion.svg
                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                    className="w-4 h-4 text-brown-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-sand/30 rounded-2xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="px-5 py-4 border-b border-sand/10 bg-cream-bg/30">
                        <p className="text-brown-dark font-bold truncate">{user.name}</p>
                        <p className="text-brown-light text-xs truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        {[
                          { to: '/profile', icon: '👤', label: 'My Profile' },
                          { to: '/orders', icon: '📦', label: 'My Orders' },
                        ].map(item => (
                           <Link key={item.to} to={item.to} className="flex items-center gap-3 px-5 py-2.5 text-sm text-brown-dark hover:bg-moccasin/30 transition-colors">
                             <span>{item.icon}</span> {item.label}
                           </Link>
                        ))}
                        {user.isAdmin && (
                          <Link to="/admin" className="flex items-center gap-3 px-5 py-2.5 text-sm text-salmon font-medium hover:bg-salmon/5 transition-colors">
                            <span>⚙️</span> Admin Dashboard
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-sand/10 p-2">
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl font-bold text-sm bg-sand hover:bg-salmon text-white transition-all shadow-lg shadow-sand/20 hover:shadow-salmon/30"
              >
                Login
              </Link>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-moccasin/50 transition-colors group" aria-label="Shopping cart">
            <motion.svg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 h-6 text-brown-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </motion.svg>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-salmon text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-moccasin/50 text-brown-dark transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
            >
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                className="w-full h-0.5 bg-current rounded-full origin-center"
              />
              <motion.span
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                className="w-full h-0.5 bg-current rounded-full"
              />
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                className="w-full h-0.5 bg-current rounded-full origin-center"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-sand/20 bg-cream-bg/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <div className="mb-4 p-4 bg-white/50 rounded-2xl border border-sand/20 flex items-center gap-4">
                  {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name || 'User'} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-sand to-salmon rounded-full flex items-center justify-center font-bold text-xl text-white shadow-sm">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                  )}
                  <div className="overflow-hidden">
                      <p className="text-brown-dark font-bold truncate">{user.name}</p>
                      <p className="text-brown-light text-xs truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                   <Link
                     to="/login"
                     className="block w-full text-center py-3 rounded-xl font-bold bg-sand text-white hover:bg-salmon transition-colors shadow-md"
                     onClick={() => setIsMenuOpen(false)}
                   >
                     Login / Register
                   </Link>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-sand/20 text-brown-dark'
                      : 'text-brown-light hover:bg-moccasin/30 hover:text-brown-dark'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="h-px bg-sand/20 my-2" />
                  <Link to="/profile" className="px-4 py-3 rounded-xl font-medium text-brown-light hover:bg-moccasin/30 transition-all" onClick={() => setIsMenuOpen(false)}>👤 My Profile</Link>
                  <Link to="/orders" className="px-4 py-3 rounded-xl font-medium text-brown-light hover:bg-moccasin/30 transition-all" onClick={() => setIsMenuOpen(false)}>📦 My Orders</Link>
                  {user?.isAdmin && (
                    <Link to="/admin" className="px-4 py-3 rounded-xl font-medium text-salmon hover:bg-salmon/5 transition-all" onClick={() => setIsMenuOpen(false)}>⚙️ Admin Dashboard</Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all text-left mt-2"
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
