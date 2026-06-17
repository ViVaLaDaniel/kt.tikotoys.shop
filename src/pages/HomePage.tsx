import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import { sampleReviews } from '../data/reviews';
import { motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaTiktok,
  FaCompass,
  FaChevronRight,
  FaGift,
  FaBoxesPacking,
  FaHeart,
  FaCertificate,
} from 'react-icons/fa6';

const HomePage: React.FC = () => {
  const { addToCart, items } = useCart();
  const { products } = useProducts();

  // Filter for regular toys and premium boxes
  const toyBoxes = products.filter((p) => p.category === 'boxes');
  const featuredToys = products
    .filter((p) => p.category === 'toys')
    .slice(0, 4);

  // Stagger animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 15 },
    },
  };

  return (
    <main className="flex-grow w-full min-h-screen bg-cream-bg font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 overflow-hidden bg-gradient-to-b from-moccasin/30 to-cream-bg">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-salmon/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sand/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/80 border border-moccasin text-brown-dark text-xs md:text-sm font-bold px-5 py-2.5 rounded-full mb-6 shadow-sm uppercase tracking-wider"
            >
              <FaHeart className="text-rose-500 animate-pulse" /> Handmade with
              Love in Spain
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-brown-dark mb-6 leading-[1.15]"
            >
              Adorable{' '}
              <span className="bg-gradient-to-r from-salmon to-sand bg-clip-text text-transparent italic">
                Knitted Toys
              </span>
              <br />& Custom Gift Boxes
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-brown-light max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            >
              Discover our collection of lovingly handcrafted amigurumi toys and
              luxury collectible boxes. Hand-crocheted by Yulia in San Pedro /
              Marbella, Spain, and shipped worldwide.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sand hover:bg-salmon text-white px-8 py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg shadow-sand/30 hover:shadow-xl hover:shadow-salmon/40 hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Collection
                <FaChevronRight size={14} />
              </Link>
              <a
                href="https://wa.me/34642841240"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <FaWhatsapp size={18} />
                Chat with Yulia
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-brown-light"
            >
              {[
                { label: 'Crafted in San Pedro, Spain', icon: '📍' },
                { label: 'Hypoallergenic chenille yarn', icon: '🧶' },
                { label: 'Worldwide express shipping', icon: '🌍' },
                { label: 'Direct custom orders', icon: '✨' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 bg-white/70 border border-moccasin rounded-full px-4 py-2 shadow-sm font-medium"
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Gift Boxes Showcase Section */}
      <section className="py-20 px-4 bg-white border-y border-moccasin">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-salmon uppercase flex items-center justify-center gap-1">
              <FaGift /> Curated Collections
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brown-dark mt-2">
              Bespoke <span className="text-salmon italic">Toy Gift Boxes</span>
            </h2>
            <p className="text-brown-light text-sm md:text-base max-w-xl mx-auto mt-3">
              Celebrate special occasions with a premium assortment of Yulia\'s
              finest creations, custom engraved and wrapped.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {toyBoxes.map((box, index) => {
              const isInCart = items.some((item) => item.product.id === box.id);

              return (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="bg-cream-bg/30 border border-moccasin rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-lg hover:border-salmon/50 transition-all duration-300"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-moccasin">
                      <img
                        src={box.imageUrl[0]}
                        alt={box.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-brown-dark">
                        {box.name}
                      </h3>
                      <span className="text-2xl font-bold text-salmon shrink-0">
                        {box.price}
                        {box.currency}
                      </span>
                    </div>
                    <p className="text-brown-light text-sm leading-relaxed mb-6">
                      {box.description}
                    </p>

                    <ul className="space-y-2.5 mb-8 text-sm text-brown-dark/90 font-medium">
                      {box.id === 9 ? (
                        <>
                          <li className="flex items-center gap-2">
                            ✨ 6-8 custom handmade knitted toys
                          </li>
                          <li className="flex items-center gap-2">
                            🎁 Handcrafted wooden storage box
                          </li>
                          <li className="flex items-center gap-2">
                            📝 Calligraphy greeting card included
                          </li>
                          <li className="flex items-center gap-2">
                            🌍 Express shipping from Spain
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center gap-2">
                            ✨ 12-15 premium large knitted toys
                          </li>
                          <li className="flex items-center gap-2">
                            📞 Personal design alignment call with Yulia
                          </li>
                          <li className="flex items-center gap-2">
                            🎁 Engraved wooden keepsake toy chest
                          </li>
                          <li className="flex items-center gap-2">
                            ✈️ Priority worldwide shipping included
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/product/${box.id}`}
                      className="flex-1 text-center bg-white border border-sand text-brown-dark hover:bg-moccasin/30 font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5"
                    >
                      View Package Details
                    </Link>
                    <button
                      onClick={() => addToCart(box)}
                      className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                        isInCart
                          ? 'bg-emerald-500 text-white'
                          : 'bg-sand hover:bg-salmon text-white'
                      }`}
                    >
                      {isInCart ? 'In Inquiry List 🧸' : 'Add to Selection'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Toys Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12 border-b border-moccasin pb-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-salmon uppercase flex items-center gap-1">
                <FaBoxesPacking /> Fine Selection
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brown-dark mt-2">
                Popular <span className="text-salmon italic">Toys</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-salmon hover:text-sand font-bold flex items-center gap-1 text-sm md:text-base transition-colors group"
            >
              View Entire Collection{' '}
              <FaChevronRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredToys.map((toy) => {
              const isInCart = items.some((item) => item.product.id === toy.id);

              return (
                <motion.div
                  key={toy.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl overflow-hidden border border-moccasin shadow-sm hover:border-salmon/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <Link
                    to={`/product/${toy.id}`}
                    className="block relative overflow-hidden aspect-square"
                  >
                    <img
                      src={toy.imageUrl[0]}
                      alt={toy.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-salmon mb-1 block">
                      {toy.category}
                    </span>
                    <Link to={`/product/${toy.id}`}>
                      <h3 className="font-serif font-bold text-brown-dark text-base md:text-lg mb-1 group-hover:text-salmon transition-colors line-clamp-1">
                        {toy.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-4">
                      <StarRating rating={toy.rating} />
                      <span className="text-xs text-brown-light">
                        ({toy.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-cream-bg">
                      <span className="text-xl font-bold text-brown-dark">
                        {toy.price}
                        {toy.currency}
                      </span>
                      <button
                        onClick={() => addToCart(toy)}
                        className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                          isInCart
                            ? 'bg-emerald-500 text-white'
                            : 'bg-sand hover:bg-salmon text-white shadow-sm'
                        }`}
                        aria-label={`Select ${toy.name}`}
                      >
                        {isInCart ? (
                          <span className="text-xs font-semibold px-1">
                            Selected
                          </span>
                        ) : (
                          'Select'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Crafting & Quality Philosophy Section */}
      <section className="py-20 px-4 bg-moccasin/20 border-t border-moccasin">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Story text */}
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-widest text-salmon uppercase flex items-center gap-1.5">
                <FaCertificate /> Artisanal Values
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown-dark">
                Юлины игрушки —{' '}
                <span className="text-salmon italic">Тёплая история</span> в
                каждой петле
              </h2>
              <p className="text-brown-light leading-relaxed text-sm md:text-base">
                Мы создаём не просто мягкие игрушки, а настоящих друзей, которые
                дарят уют. Каждый стежок, каждая пуговица и упаковочная коробка
                подбираются индивидуально с огромным вниманием к качеству.
              </p>
              <p className="text-brown-light leading-relaxed text-sm md:text-base">
                Находясь в солнечной Испании, в Сан-Педро-Алькантара (Марбелья),
                мы отправляем наши вязаные шедевры ручной работы по всему миру.
                Мы используем только гипоаллергенную пряжу премиум-класса,
                безопасную для самых маленьких.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  '100% безопасные материалы',
                  'Уникальный дизайн под заказ',
                  'Подарочное оформление',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex bg-white border border-moccasin rounded-full px-4 py-2 text-xs font-medium text-brown-dark shadow-sm"
                  >
                    ✨ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Showcase grid of features */}
            <div className="bg-white border border-moccasin rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="grid gap-6">
                {[
                  {
                    title: 'Лимитированные тиражи',
                    text: 'Каждая игрушка уникальна. Мы не работаем на массовый поток — только персональный подход.',
                    icon: '🧵',
                  },
                  {
                    title: 'Доставка по всему миру',
                    text: 'Мы находимся в Испании, Сан-Педро, и отправляем посылки с полным отслеживанием в любую точку планеты.',
                    icon: '🌍',
                  },
                  {
                    title: 'Личная кастомизация',
                    text: 'Свяжитесь с Юлей напрямую, чтобы выбрать цвета, размеры или заказать уникального персонажа по фото.',
                    icon: '📞',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start p-4 hover:bg-cream-bg/25 rounded-2xl transition-all duration-300"
                  >
                    <span className="text-3xl bg-cream-bg border border-moccasin w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-brown-dark mb-1 font-serif">
                        {item.title}
                      </h3>
                      <p className="text-xs text-brown-light leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 px-4 bg-white border-t border-moccasin">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brown-dark">
              What Our <span className="text-salmon italic">Clients</span> Say
            </h2>
            <p className="text-brown-light text-sm md:text-base mt-2">
              Read real feedback from custom orders delivered worldwide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="py-24 px-4 bg-gradient-to-t from-moccasin/30 to-cream-bg border-t border-moccasin text-center relative">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-5xl block animate-bounce">🧸</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brown-dark">
            Ready to Order a Personalized Gift?
          </h2>
          <p className="text-brown-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Browse our catalog, build your inquiry list, or click below to
            message Yulia directly via WhatsApp. She will help you design the
            perfect knitted friend!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sand hover:bg-salmon text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              Browse Collection
            </Link>
            <a
              href="https://wa.me/34642841240"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <FaWhatsapp size={20} /> Inquire via WhatsApp
            </a>
          </div>

          <div className="pt-8 flex justify-center gap-6 text-sm text-brown-light/75">
            <a
              href="https://tiktok.com/@kt_tiko_toys"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brown-dark transition-colors flex items-center gap-1.5"
            >
              <FaTiktok /> TikTok Portfolio
            </a>
            <span>•</span>
            <a
              href="https://www.instagram.com/kt.tikotoys"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brown-dark transition-colors flex items-center gap-1.5"
            >
              <FaCompass /> Instagram Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
