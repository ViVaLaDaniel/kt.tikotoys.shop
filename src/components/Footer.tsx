import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaPinterestP, FaEtsy } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.facebook.com/profile.php?id=100023909207305" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.instagram.com/kt.tikotoys" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.youtube.com/@KT.TIKOTOYS" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
            <FaYoutube size={24} />
          </a>
          <a href="https://tiktok.com/@kt_tiko_toys" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
            <FaTiktok size={24} />
          </a>
          <a href="https://es.pinterest.com/kttikotoysshop/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
            <FaPinterestP size={24} />
          </a>
          <a href="https://kttikotoys.etsy.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
            <FaEtsy size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Cards for Toys. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
