import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaEtsy,
} from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cream-bg text-brown-dark border-t border-moccasin">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧸</span>
              <h2 className="text-xl font-bold bg-gradient-to-r from-salmon to-sand bg-clip-text text-transparent">
                KT.TikoToys
              </h2>
            </Link>
            <p className="text-brown-light text-sm mb-4">
              Handmade knitted toys and accessories, crafted with love in Europe.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=100023909207305" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="w-10 h-10 bg-moccasin rounded-lg flex items-center justify-center hover:bg-sand transition-colors text-brown-dark">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.instagram.com/kt.tikotoys" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-10 h-10 bg-moccasin rounded-lg flex items-center justify-center hover:bg-sand transition-colors text-brown-dark">
                <FaInstagram size={16} />
              </a>
              <a href="https://www.youtube.com/@KT.TIKOTOYS" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="w-10 h-10 bg-moccasin rounded-lg flex items-center justify-center hover:bg-sand transition-colors text-brown-dark">
                <FaYoutube size={16} />
              </a>
              <a href="https://tiktok.com/@kt_tiko_toys" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="w-10 h-10 bg-moccasin rounded-lg flex items-center justify-center hover:bg-sand transition-colors text-brown-dark">
                <FaTiktok size={16} />
              </a>
              <a href="https://es.pinterest.com/kttikotoysshop/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Pinterest" className="w-10 h-10 bg-moccasin rounded-lg flex items-center justify-center hover:bg-sand transition-colors text-brown-dark">
                <FaPinterestP size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-brown-dark font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-brown-light hover:text-salmon transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-brown-light hover:text-salmon transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-brown-light hover:text-salmon transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-brown-light hover:text-salmon transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-brown-dark font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/cart" className="text-brown-light hover:text-salmon transition-colors">Shopping Cart</Link></li>
              <li><a href="#" className="text-brown-light hover:text-salmon transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-brown-light hover:text-salmon transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-brown-light hover:text-salmon transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-brown-dark font-bold mb-4">Newsletter</h3>
            <p className="text-brown-light text-sm mb-4">
              Subscribe for updates on new products and special offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow bg-moccasin text-brown-dark px-4 py-2 rounded-lg border border-moccasin focus:border-sand focus:outline-none text-sm placeholder-brown-light"
              />
              <button
                type="submit"
                className="bg-sand hover:bg-salmon text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
            <div className="mt-4">
              <a
                href="https://kttikotoys.etsy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-salmon hover:opacity-80 transition-colors"
              >
                <FaEtsy size={20} />
                <span className="text-sm">Visit our Etsy Shop</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-moccasin">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brown-light text-sm">
            © {new Date().getFullYear()} KT.TikoToys. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-sm text-brown-light">
            <a href="#" className="hover:text-brown-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brown-dark transition-colors">Terms of Service</a>
            <Link to="/admin" className="hover:text-salmon transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
