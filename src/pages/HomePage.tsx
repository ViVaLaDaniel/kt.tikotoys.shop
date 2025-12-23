import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import { sampleReviews } from '../data/reviews';

const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { t } = useTranslation();
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-pink-500/20 text-pink-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              {t('home.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('home.title')} <span className="bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent">{t('home.titleHighlight')}</span>
              <br />{t('home.titleEnd')}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-1"
              >
                {t('home.shopNow')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                {t('home.ourStory')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t('home.categories')} <span className="text-pink-500">{t('home.categoriesHighlight')}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: t('home.categoryToys'), icon: '🧸', desc: t('home.categoryToysDesc'), color: 'from-pink-500/20 to-pink-600/20', link: 'toys' },
              { name: t('home.categoryBeanies'), icon: '🧢', desc: t('home.categoryBeaniesDesc'), color: 'from-amber-500/20 to-amber-600/20', link: 'beanies' },
              { name: t('home.categoryAccessories'), icon: '🎀', desc: t('home.categoryAccessoriesDesc'), color: 'from-purple-500/20 to-purple-600/20', link: 'accessories' },
            ].map((cat) => (
              <Link
                key={cat.link}
                to={`/shop?category=${cat.link}`}
                className={`group bg-gradient-to-br ${cat.color} backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-500/10`}
              >
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-gray-400">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t('home.featured')} <span className="text-pink-500">{t('home.featuredHighlight')}</span>
            </h2>
            <Link
              to="/shop"
              className="text-pink-400 hover:text-pink-300 font-medium flex items-center gap-2 transition-colors"
            >
              {t('home.viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1"
              >
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                  <img
                    src={product.imageUrl[0]}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <div className="p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-gray-400">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-400">
                      {product.price}
                      <span className="text-lg">{product.currency}</span>
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/20"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t('home.whyChoose')} <span className="text-pink-500">{t('home.whyChooseHighlight')}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✨', title: t('home.handmade'), desc: t('home.handmadeDesc') },
              { icon: '🧶', title: t('home.premiumYarn'), desc: t('home.premiumYarnDesc') },
              { icon: '🚚', title: t('home.freeShipping'), desc: t('home.freeShippingDesc') },
              { icon: '💝', title: t('home.giftReady'), desc: t('home.giftReadyDesc') },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t('home.reviews')} <span className="text-pink-500">{t('home.reviewsHighlight')}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            {t('home.ctaSubtitle')}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {t('home.exploreCollection')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
