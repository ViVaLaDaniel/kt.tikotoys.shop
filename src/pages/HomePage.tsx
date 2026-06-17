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

  // Filter for boxes and toys
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
        staggerChildren: 0.12,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 16 },
    },
  };

  return (
    <main className="flex-grow w-full min-h-screen bg-transparent font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 overflow-hidden bg-gradient-to-b from-pastel-pink/10 via-pastel-lavender/5 to-transparent">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pastel-pink/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pastel-lavender/20 rounded-full blur-3xl" />
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
              className="inline-flex items-center gap-2 bg-white/80 border border-pastel-pink text-cocoa-dark text-xs md:text-sm font-bold px-5 py-2.5 rounded-full mb-6 shadow-sm uppercase tracking-wider"
            >
              <span className="text-rose-400 animate-pulse">
                <FaHeart />
              </span>{' '}
              Handmade Fairytale Plushies in Spain
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-cocoa-dark mb-6 leading-[1.12]"
            >
              Yulia&apos;s{' '}
              <span className="bg-gradient-to-r from-pastel-pink to-cocoa-light bg-clip-text text-transparent italic">
                Toy Chest
              </span>
              <br />
              Magical Crochet Friends
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-cocoa-light max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            >
              Step into a magical fairytale world of soft, hand-crocheted
              amigurumi toys and curated gift chests. Handcrafted by Yulia in
              San Pedro, Spain, and shipped worldwide.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pastel-pink hover:bg-pastel-lavender text-cocoa-dark font-bold px-8 py-4 rounded-2xl text-base md:text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                Browse Toy Gallery
                <FaChevronRight size={14} />
              </Link>
              <Link
                to="/cart"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pastel-sand hover:bg-pastel-pink/40 text-cocoa-dark font-bold px-8 py-4 rounded-2xl text-base md:text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <FaGift size={18} />
                Box Builder 🎁
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-cocoa-light"
            >
              {[
                { label: 'Crafted in San Pedro, Spain', icon: '📍' },
                { label: 'Hypoallergenic plush yarn', icon: '🧶' },
                { label: 'Worldwide tracked shipping', icon: '🌍' },
                { label: 'Bespoke customization call', icon: '✨' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 bg-white/80 border border-pastel-sand rounded-full px-4 py-2 shadow-sm font-medium"
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bespoke Gift Boxes Section */}
      <section className="py-20 px-4 bg-white border-y border-pastel-sand">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-pastel-pink uppercase flex items-center justify-center gap-1">
              <FaGift /> Curated Collections
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cocoa-dark mt-2">
              Bespoke{' '}
              <span className="text-pastel-pink italic">Toy Gift Chests</span>
            </h2>
            <p className="text-cocoa-light text-sm md:text-base max-w-xl mx-auto mt-3">
              Celebrate your happiest moments with a magical selection of
              Yulia&apos;s creations, nestled in custom engraved wooden toy
              chests.
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
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  className="bg-cream-bg/30 border border-pastel-sand rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-md hover:border-pastel-pink/60 transition-all duration-300"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-pastel-sand">
                      <img
                        src={box.imageUrl[0]}
                        alt={box.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-cocoa-dark">
                        {box.name}
                      </h3>
                      <span className="text-2xl font-bold text-cocoa-dark shrink-0">
                        {box.price}
                        {box.currency}
                      </span>
                    </div>
                    <p className="text-cocoa-light text-sm leading-relaxed mb-6">
                      {box.description}
                    </p>

                    <ul className="space-y-2.5 mb-8 text-sm text-cocoa-dark/90 font-medium">
                      {box.id === 9 ? (
                        <>
                          <li className="flex items-center gap-2">
                            ✨ Select up to *8 slots* in our Box Builder
                          </li>
                          <li className="flex items-center gap-2">
                            🎁 Premium handcrafted wooden storage box
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
                            ✨ Select up to *15 slots* in our Box Builder
                          </li>
                          <li className="flex items-center gap-2">
                            📞 Personal customization call with Yulia
                          </li>
                          <li className="flex items-center gap-2">
                            🎁 Engraved wooden keepsake toy chest
                          </li>
                          <li className="flex items-center gap-2">
                            ✈️ Priority worldwide express shipping included
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/product/${box.id}`}
                      className="flex-1 text-center bg-white border border-pastel-sand text-cocoa-dark hover:bg-pastel-sand/30 font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5"
                    >
                      View Package Details
                    </Link>
                    <button
                      onClick={() => addToCart(box)}
                      className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                        isInCart
                          ? 'bg-emerald-500 text-white shadow-emerald-500/10'
                          : 'bg-pastel-pink hover:bg-pastel-lavender text-cocoa-dark'
                      }`}
                    >
                      {isInCart ? 'In Box Builder 🎁' : 'Add to Builder'}
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12 border-b border-pastel-sand pb-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-pastel-pink uppercase flex items-center gap-1">
                <FaBoxesPacking /> Fairytale Friends
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-cocoa-dark mt-2">
                Adorable{' '}
                <span className="text-pastel-pink italic">Plushies</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-pastel-pink hover:text-pastel-lavender font-bold flex items-center gap-1 text-sm md:text-base transition-colors group"
            >
              View Entire Gallery{' '}
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                <FaChevronRight size={12} />
              </span>
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
                  className="group bg-white rounded-3xl overflow-hidden border border-pastel-sand shadow-sm hover:border-pastel-pink/60 transition-all duration-300 flex flex-col justify-between"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pastel-pink mb-1 block">
                      {toy.category}
                    </span>
                    <Link to={`/product/${toy.id}`}>
                      <h3 className="font-serif font-bold text-cocoa-dark text-base md:text-lg mb-1 group-hover:text-pastel-pink transition-colors line-clamp-1">
                        {toy.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-4">
                      <StarRating rating={toy.rating} />
                      <span className="text-xs text-cocoa-light">
                        ({toy.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-cream-bg">
                      <span className="text-xl font-bold text-cocoa-dark">
                        {toy.price}
                        {toy.currency}
                      </span>
                      <button
                        onClick={() => addToCart(toy)}
                        className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                          isInCart
                            ? 'bg-emerald-500 text-white'
                            : 'bg-pastel-pink hover:bg-pastel-lavender text-cocoa-dark shadow-sm'
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
      <section className="py-20 px-4 bg-pastel-sand/20 border-t border-pastel-sand">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Story text */}
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-widest text-pastel-pink uppercase flex items-center gap-1.5">
                <FaCertificate /> Yulia&apos;s Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-cocoa-dark">
                Юлина Сказка —{' '}
                <span className="text-pastel-pink italic">Тепло и уют</span> в
                каждой петельке
              </h2>
              <p className="text-cocoa-light leading-relaxed text-sm md:text-base font-normal">
                Мы создаем уникальные вязаные игрушки ручной работы, которые
                становятся семейными реликвиями. Каждая деталь — от выбора
                нежнейшей гипоаллергенной плюшевой пряжи до кастомной гравировки
                на деревянных сундучках — создается индивидуально.
              </p>
              <p className="text-cocoa-light leading-relaxed text-sm md:text-base font-normal">
                Каждая петелька провязывается вручную в нашей уютной мастерской
                в Сан-Педро-Алькантара (Марбелья, Испания). Мы надежно
                упаковываем и отправляем наши игрушки по всему миру, чтобы они
                радовали детей и взрослых.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  '100% гипоаллергенно',
                  'Кастомный деревянный сундучок',
                  'Шерсть и велюр премиум-класса',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex bg-white border border-pastel-sand rounded-full px-4 py-2 text-xs font-medium text-cocoa-dark shadow-sm"
                  >
                    ✨ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Showcase grid of features */}
            <div className="bg-white border border-pastel-sand rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="grid gap-6">
                {[
                  {
                    title: 'Эксклюзивная ручная работа',
                    text: 'Юля лично провязывает каждую игрушку. Никакого массового конвейера — только тепло человеческих рук.',
                    icon: '🧵',
                  },
                  {
                    title: 'Кастомизация под ключ',
                    text: 'Вы можете выбрать цвета, попросить вышить инициалы ребенка или заказать персонажа по любимой сказке.',
                    icon: '🎨',
                  },
                  {
                    title: 'Доставка по всему миру',
                    text: 'Быстрая экспресс-доставка из Marbella, Spain с полным отслеживанием пути вашего сундучка.',
                    icon: '🌍',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start p-4 hover:bg-cream-bg/25 rounded-2xl transition-all duration-300"
                  >
                    <span className="text-3xl bg-cream-bg border border-pastel-sand w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-cocoa-dark mb-1 font-serif">
                        {item.title}
                      </h3>
                      <p className="text-xs text-cocoa-light leading-relaxed font-normal">
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
      <section className="py-20 px-4 bg-white border-t border-pastel-sand">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cocoa-dark">
              Fairytale{' '}
              <span className="text-pastel-pink italic">Memories</span>
            </h2>
            <p className="text-cocoa-light text-sm md:text-base mt-2">
              See how our custom toy boxes bring joy to families worldwide.
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
      <section className="py-24 px-4 bg-gradient-to-t from-pastel-pink/10 to-cream-bg border-t border-pastel-sand text-center relative">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-5xl block animate-bounce">🐰</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cocoa-dark">
            Let&apos;s Build Your Child&apos;s Dream Toy Box
          </h2>
          <p className="text-cocoa-light text-sm md:text-base max-w-xl mx-auto leading-relaxed font-normal">
            Choose your box size in our Box Builder, select Yulia&apos;s magical
            characters to fill it, and consult directly on custom details via
            WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link
              to="/cart"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pastel-pink hover:bg-pastel-lavender text-cocoa-dark px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <FaGift /> Open Box Builder
            </Link>
            <a
              href="https://wa.me/34642841240"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <FaWhatsapp size={20} /> Order Custom Toy
            </a>
          </div>

          <div className="pt-8 flex justify-center gap-6 text-sm text-cocoa-light/75 font-medium">
            <a
              href="https://tiktok.com/@kt_tiko_toys"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cocoa-dark transition-colors flex items-center gap-1.5"
            >
              <FaTiktok /> TikTok Portfolio
            </a>
            <span>•</span>
            <a
              href="https://www.instagram.com/kt.tikotoys"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cocoa-dark transition-colors flex items-center gap-1.5"
            >
              <FaCompass /> Instagram Gallery
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
