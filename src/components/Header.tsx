import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const location = useLocation();

  // Close menus on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Yulia' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      ref={headerRef}
      className="bg-cream-bg/95 backdrop-blur-md text-brown-dark fixed top-0 left-0 right-0 z-50 border-b border-moccasin"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🐰</span>
          <h1 className="text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-salmon to-sand bg-clip-text text-transparent group-hover:opacity-90 transition-all">
            Yulia&apos;s Toy Chest
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

        {/* Right side: WhatsApp CTA + Mobile menu */}
        <div className="flex items-center gap-3">
          {/* Desktop WhatsApp CTA */}
          <a
            href="https://wa.me/34642841240?text=Hello%20Yulia!%20I%20would%20like%20to%20inquire%20about%20your%20handmade%20knitted%20toy%20chests."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md shadow-emerald-500/20"
          >
            Inquire on WhatsApp 💬
          </a>

          {/* Mobile WhatsApp Icon */}
          <a
            href="https://wa.me/34642841240?text=Hello%20Yulia!%20I%20would%20like%20to%20inquire%20about%20your%20handmade%20knitted%20toy%20chests."
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden p-2 rounded-lg text-emerald-600 hover:bg-moccasin transition-colors"
            aria-label="Contact on WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.407 1.461 5.45.003 9.885-4.432 9.888-9.886.002-2.642-1.027-5.125-2.897-6.999-1.87-1.874-4.353-2.906-6.996-2.908-5.46 0-9.894 4.434-9.897 9.89-.001 1.83.479 3.619 1.392 5.195l-.952 3.478 3.565-.936zm10.743-7.412c-.29-.145-1.716-.848-1.98-.942-.262-.096-.453-.145-.642.145-.19.29-.735.942-.9.1.137-.184.272-.453.54-.596.268-.145.536-.073.804.073.268.145 1.14 1.185 1.74 1.723.33.294.615.54.843.705.29.207.45.197.64.12.19-.077.848-.348.97-.676.12-.33.12-.612.06-.676-.06-.064-.25-.145-.54-.29zm-5.13 5.105c-.333-.08-.947-.323-1.872-1.15-.717-.64-1.203-1.432-1.344-1.674-.14-.243-.015-.374.107-.495.11-.11.252-.293.378-.44.126-.145.168-.25.252-.416.084-.166.042-.31-.021-.454-.063-.14-.54-1.3-.74-1.785-.194-.475-.39-.413-.54-.42l-.46-.008c-.16 0-.418.06-.637.298-.22.24-.837.818-.837 1.996 0 1.18.86 2.32.98 2.48.12.162 1.69 2.58 4.095 3.618.572.247 1.018.396 1.366.507.576.183 1.1.157 1.513.097.46-.067 1.417-.58 1.618-1.14.202-.56.202-1.04.14-1.14-.06-.1-.24-.162-.53-.306z" />
            </svg>
          </a>

          {/* Burger Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-moccasin transition-colors text-brown-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
                d={
                  isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-moccasin bg-cream-bg/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
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

          <a
            href="https://wa.me/34642841240?text=Hello%20Yulia!%20I%20would%20like%20to%20inquire%20about%20your%20handmade%20knitted%20toy%20chests."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-3 rounded-lg font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all text-center flex items-center justify-center gap-2"
          >
            Chat on WhatsApp 💬
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
