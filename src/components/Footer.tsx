import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaEtsy,
} from 'react-icons/fa6';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧸</span>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-amber-500 bg-clip-text text-transparent">
                KT.TikoToys
              </h2>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100023909207305"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.instagram.com/kt.tikotoys"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://www.youtube.com/@KT.TIKOTOYS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to our YouTube channel"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaYoutube size={16} />
              </a>
              <a
                href="https://tiktok.com/@kt_tiko_toys"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaTiktok size={16} />
              </a>
              <a
                href="https://es.pinterest.com/kttikotoysshop/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Pinterest"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaPinterestP size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-pink-400 transition-colors">{t('header.shop')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-pink-400 transition-colors">{t('header.about')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">{t('header.contact')}</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-pink-400 transition-colors">{t('header.blog')}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-2">
              <li><Link to="/cart" className="text-gray-400 hover:text-pink-400 transition-colors">{t('footer.shoppingCart')}</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">{t('footer.shippingInfo')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">{t('footer.returns')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">{t('footer.faq')}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
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
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
              >
                <FaEtsy size={20} />
                <span className="text-sm">{t('footer.visitEtsy')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KT.TikoToys. {t('footer.allRightsReserved')}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.termsOfService')}</a>
            <Link to="/admin" className="hover:text-pink-400 transition-colors">{t('header.admin')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
