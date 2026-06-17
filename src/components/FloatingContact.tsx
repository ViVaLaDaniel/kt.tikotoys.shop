import React, { useState } from 'react';
import { FaWhatsapp, FaTiktok, FaCommentDots, FaXmark } from 'react-icons/fa6';
import { SOCIAL_URLS } from '../constants';
import { createWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp';

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = createWhatsAppLink(WHATSAPP_MESSAGES.default);
  const tiktokUrl = SOCIAL_URLS.tiktok;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Contact Options Panel */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-bounce-short">
          {/* TikTok Button */}
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-black hover:bg-zinc-800 text-white px-4 py-3 rounded-full shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <span className="text-sm font-medium tracking-wide">TikTok</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white flex items-center justify-center">
                <FaTiktok size={20} />
              </span>
            </div>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <span className="text-sm font-medium tracking-wide">
              WhatsApp Chat
            </span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white flex items-center justify-center">
                <FaWhatsapp size={20} />
              </span>
            </div>
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-rose-500 hover:bg-rose-600 rotate-90'
            : 'bg-sand hover:bg-salmon animate-pulse-slow'
        }`}
        aria-label="Contact Yulia"
      >
        {isOpen ? (
          <FaXmark size={24} />
        ) : (
          <span className="animate-pulse-quick flex items-center justify-center">
            <FaCommentDots size={24} />
          </span>
        )}
      </button>

      {/* Custom Styles inside Component to ensure no Tailwind conflicts */}
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 25px -5px rgba(244, 164, 96, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 20px 25px -5px rgba(244, 164, 96, 0.6); }
        }
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulseQuick {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite ease-in-out;
        }
        .animate-bounce-short {
          animation: bounceShort 2s infinite ease-in-out;
        }
        .animate-pulse-quick {
          animation: pulseQuick 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingContact;
