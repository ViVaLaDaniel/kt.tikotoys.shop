import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductsContext';
import ReviewCard from '../components/ReviewCard';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { sampleReviews } from '../data/reviews';

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <SEO />
      <main className="flex-grow w-full min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-20 left-10 w-72 h-72 bg-salmon/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-sand/10 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-sand/20 text-sand text-sm font-medium px-4 py-2 rounded-full mb-6"
              >
                ✨ Handmade with Love
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-brown-dark mb-6 leading-tight"
              >
                Adorable <span className="bg-gradient-to-r from-salmon to-sand bg-clip-text text-transparent">Knitted Toys</span>
                <br />& Cozy Accessories
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-brown-light max-w-2xl mx-auto mb-10"
              >
                Discover our collection of lovingly handcrafted amigurumi toys, soft beanies, and unique accessories. Each piece is made with premium yarn and lots of love.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-sand hover:bg-salmon text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-sand/40 hover:shadow-xl hover:shadow-salmon/40 hover:-translate-y-1"
                >
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 bg-moccasin hover:bg-sand/50 text-brown-dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                >
                  Our Story
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-brown-light"
              >
                {[
                  { label: '5+ years of crafting', icon: '🧵' },
                  { label: 'Premium hypoallergenic yarn', icon: '🧶' },
                  { label: 'Gift-ready packaging', icon: '🎁' },
                  { label: 'Made by Yulia', icon: '💗' },
                ].map((badge) => (
                  <span key={badge.label} className="inline-flex items-center gap-2 bg-cream-bg/70 border border-moccasin rounded-full px-4 py-2 shadow-sm">
                    <span>{badge.icon}</span>
                    {badge.label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Highlight */}
        <section className="px-4 -mt-6 z-20 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-gradient-to-br from-cream-bg via-moccasin/30 to-sand/20 border border-sand/40 rounded-3xl p-8 md:p-10 shadow-xl shadow-sand/10"
            >
              <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
                <div>
                  <p className="uppercase tracking-[0.2em] text-xs text-brown-light font-semibold mb-3">Handmade for your happiest moments</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-brown-dark mb-4">
                    Юличкины игрушки — тёплая история в каждой петле
                  </h2>
                  <p className="text-brown-light text-lg leading-relaxed mb-6">
                    Мы создаём игрушки, которые хочется обнимать. Каждая работа проходит путь от эскиза до идеальной упаковки —
                    чтобы ваш подарок выглядел безупречно и радовал долгие годы.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Мягкие, безопасные материалы', 'Проверка качества перед отправкой', 'Персональные рекомендации'].map((item) => (
                      <span key={item} className="inline-flex items-center gap-2 bg-white/60 border border-moccasin rounded-full px-4 py-2 text-sm text-brown-light">
                        ✨ {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-cream-bg/80 border border-sand/30 rounded-2xl p-6 shadow-inner">
                  <div className="grid gap-4">
                    {[
                      { title: 'Limited collections', text: 'Small batches for уникальность и внимание к деталям.' },
                      { title: 'Fast gifting', text: 'Подарочная упаковка уже включена — останется только вручить.' },
                      { title: 'Support with heart', text: 'Помогаем выбрать идеальный размер и цвет.' },
                    ].map((card) => (
                      <motion.div
                        key={card.title}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        className="rounded-xl border border-moccasin/70 bg-white/70 p-4 transition-all duration-300"
                      >
                        <h3 className="font-semibold text-brown-dark mb-1">{card.title}</h3>
                        <p className="text-sm text-brown-light">{card.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-brown-dark text-center mb-12"
            >
              Shop by <span className="text-salmon">Category</span>
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { name: 'Toys', icon: '🧸', desc: 'Cute amigurumi friends', color: 'from-salmon/20 to-sand/20' },
                { name: 'Beanies', icon: '🧢', desc: 'Warm & cozy hats', color: 'from-sand/20 to-moccasin/20' },
                { name: 'Accessories', icon: '🎀', desc: 'Unique handmade items', color: 'from-salmon/10 to-moccasin/30' },
              ].map((cat) => (
                <motion.div key={cat.name} variants={fadeIn}>
                  <Link
                    to={`/shop?category=${cat.name.toLowerCase()}`}
                    className={`block h-full group bg-gradient-to-br ${cat.color} backdrop-blur-sm border border-sand/50 rounded-2xl p-8 text-center hover:border-salmon/50 transition-all duration-300 hover:shadow-xl hover:shadow-sand/20`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl mb-4 block inline-block"
                    >
                      {cat.icon}
                    </motion.span>
                    <h3 className="text-xl font-bold text-brown-dark mb-2">{cat.name}</h3>
                    <p className="text-brown-light">{cat.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 px-4 bg-moccasin/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brown-dark">
                Featured <span className="text-salmon">Products</span>
              </h2>
              <Link to="/shop" className="text-salmon hover:opacity-80 font-medium flex items-center gap-2 transition-colors">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={fadeIn}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-brown-dark text-center mb-12"
            >
              Why Choose <span className="text-salmon">Us</span>
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { icon: '✨', title: 'Handmade', desc: 'Each item is carefully crafted by hand' },
                { icon: '🧶', title: 'Premium Yarn', desc: 'Hypoallergenic, soft materials' },
                { icon: '🚚', title: 'Free Shipping', desc: 'On orders over 50€' },
                { icon: '💝', title: 'Gift Ready', desc: 'Beautiful packaging included' },
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-bold text-brown-dark mb-2">{feature.title}</h3>
                  <p className="text-brown-light text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 px-4 bg-moccasin/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brown-dark text-center mb-12">What Our <span className="text-salmon">Customers</span> Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-salmon/10 to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brown-dark mb-6">Ready to Find Your Perfect Gift?</h2>
            <p className="text-brown-light text-lg mb-8">Browse our collection of handmade treasures and find something special for yourself or a loved one.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-salmon to-sand hover:opacity-90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Collection
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
