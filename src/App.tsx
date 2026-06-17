import './styles/snow.css';
import './styles/tailwind.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import FloatingContact from './components/FloatingContact';
import ErrorBoundary from './components/ErrorBoundary';

// Динамический импорт страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

import { SpeedInsights } from '@vercel/speed-insights/react';
import Analytics from './components/Analytics';

// Loading component
const LoadingSpinner = () => (
  <div className="flex-grow w-full min-h-screen bg-cream-bg flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-sand border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <div className="flex flex-col min-h-screen bg-transparent text-brown-dark">
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback to home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
          <FloatingContact />
          <Footer />
        </div>
        <SpeedInsights />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
