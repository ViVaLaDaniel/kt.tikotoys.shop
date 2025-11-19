import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaPinterestP, FaEtsy } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto text-center">
        <div className="flex justify-center gap-2 mb-4">
          <a href="https://www.facebook.com/profile.php?id=100023909207305" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="hover:text-amber-500 flex items-center justify-center min-w-[48px] min-h-[48px]">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.instagram.com/kt.tikotoys" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="hover:text-amber-500 flex items-center justify-center min-w-[48px] min-h-[48px]">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.youtube.com/@KT.TIKOTOYS" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="hover:text-amber-500 flex items-center justify-center min-w-[48px] min-h-[48px]">
            <FaYoutube size={24} />
          </a>
          <a href="https://tiktok.com/@kt_tiko_toys" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="hover:text-amber-500 flex items-center justify-center min-w-[48px] min-h-[48px]">
            <FaTiktok size={24} />
          </a>
          <a href="https://es.pinterest.com/kttikotoysshop/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Pinterest" className="hover:text-amber-500 flex items-center justify-center min-w-[48px] min-h-[48px]">
            <FaPinterestP size={24} />
          </a>
          <a href="https://kttikotoys.etsy.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Etsy shop" className="hover:text-amber-500 flex items-center justify-center min-w-[48px] min-h-[48px]">
            <FaEtsy size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Cards for Toys. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
