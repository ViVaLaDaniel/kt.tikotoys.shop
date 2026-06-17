import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaTiktok,
  FaInstagram,
  FaPinterest,
  FaChevronRight,
  FaCheck,
  FaStar,
} from 'react-icons/fa6';

// Configurable Storefront URLs
const SMALL_BOX_ETSY_URL = 'https://kttikotoys.etsy.com';
const SMALL_BOX_WALLAPOP_URL = 'https://es.wallapop.com';
const LARGE_BOX_ETSY_URL = 'https://kttikotoys.etsy.com';
const LARGE_BOX_WALLAPOP_URL = 'https://es.wallapop.com';

const WHATSAPP_NUMBER = '34642841240';
const WHATSAPP_BASE_MSG =
  'Hello Yulia! I am visiting your website and would love to inquire about your handmade knitted toy chests.';
const WHATSAPP_SMALL_MSG =
  'Hello Yulia! I would like to order the Charming Toy Gift Box (Small, €500).';
const WHATSAPP_LARGE_MSG =
  'Hello Yulia! I would like to order the Royal Toy Gift Box (Large, €1000).';

const createWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 15 },
    },
  };

  const scaleUpImage = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 20, delay: 0.1 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Sample Reviews for Social Proof
  const reviews = [
    {
      name: 'Elena Rostova',
      location: 'Madrid, Spain',
      rating: 5,
      text: 'Absolutely magical! The Small Box was the highlight of my niece’s birthday. The knitted unicorn and deer are incredibly soft, and the wooden chest is beautifully crafted.',
    },
    {
      name: 'Markus Weber',
      location: 'Berlin, Germany',
      rating: 5,
      text: 'We ordered the Royal Large Box for our newborn daughter. It is a true heirloom piece. The customization call with Yulia was wonderful, allowing us to align on the perfect characters.',
    },
    {
      name: 'Sofia Lopez',
      location: 'Marbella, Spain',
      rating: 5,
      text: 'Yulia’s attention to detail is unmatched. Every toy is flawless, and they use safety eyes which is so important for kids. Shipped quickly and safely. Worth every euro!',
    },
  ];

  return (
    <main
      ref={containerRef}
      className="flex-grow w-full bg-transparent font-sans overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-12 px-4 text-center">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-24 left-1/4 w-80 h-80 bg-pastel-pink/15 rounded-full blur-3xl" />
          <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-pastel-lavender/15 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-1.5 bg-white/70 border border-pastel-pink/50 text-cocoa-dark text-xs font-bold px-4 py-2 rounded-full shadow-sm tracking-wider uppercase"
          >
            🧸 Premium Handmade Keepsakes
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-cocoa-dark leading-[1.08] tracking-tight"
          >
            Chests of{' '}
            <span className="bg-gradient-to-r from-sand to-cocoa-light bg-clip-text text-transparent italic">
              Magic
            </span>
            <br />
            Handcrafted with Love
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-cocoa-light max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Step into a fairytale. Discover luxury wooden chests filled with
            Yulia&apos;s custom-knitted amigurumi toys. Crafted in Marbella,
            Spain, and shipped worldwide.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <a
              href="#boxes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-pastel-caramel hover:bg-cocoa-light text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-300 shadow-md hover:-translate-y-0.5"
            >
              Explore Our Chests
              <FaChevronRight size={12} />
            </a>
            <a
              href={createWhatsAppLink(WHATSAPP_BASE_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-pastel-sand/20 border border-pastel-sand text-cocoa-dark font-bold px-8 py-4 rounded-2xl text-base transition-all duration-300 shadow-sm hover:-translate-y-0.5"
            >
              <FaWhatsapp size={18} color="#10b981" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="pt-16 hidden sm:flex flex-col items-center gap-1.5 text-cocoa-light/65 text-xs font-semibold cursor-pointer"
            onClick={() =>
              document
                .getElementById('boxes')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <span>Scroll to Discover</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Flagship Showcases Section */}
      <section
        id="boxes"
        className="py-24 px-4 bg-white/40 border-y border-moccasin/30"
      >
        <div className="max-w-6xl mx-auto space-y-32">
          {/* Small Box (Charming Chest) */}
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              variants={scaleUpImage}
              className="md:col-span-6 order-last md:order-first"
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-3xl border border-pastel-sand bg-cream-bg/35 shadow-sm hover:shadow-xl transition-all duration-500">
                <a
                  href={SMALL_BOX_ETSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/box_small.webp"
                    alt="Charming Toy Gift Box (Small)"
                    className="w-full h-auto object-cover aspect-square group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              className="md:col-span-6 space-y-6"
            >
              <span className="text-xs font-bold tracking-widest text-pastel-caramel uppercase">
                The Perfect Gift Chest
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-cocoa-dark leading-tight">
                Charming Box <br />
                <span className="text-cocoa-light italic">€500 (Small)</span>
              </h2>
              <p className="text-cocoa-light text-base md:text-lg leading-relaxed">
                A beautiful hand-crocheted collection nestled in our custom
                small wooden chest. Perfectly suited for baby showers,
                birthdays, and room decoration.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '6-8 custom handmade knitted toys (choose characters)',
                  'Premium small wooden storage & memory box',
                  'Customized handwritten calligraphy greeting card',
                  'Worldwide express shipping from Spain included',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-cocoa-dark font-medium"
                  >
                    <span className="text-emerald-500 mt-0.5 shrink-0">
                      <FaCheck size={14} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <a
                  href={SMALL_BOX_ETSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow text-center bg-pastel-caramel hover:bg-cocoa-light text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  Buy on Etsy 🛍️
                </a>
                <a
                  href={SMALL_BOX_WALLAPOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow text-center bg-white hover:bg-pastel-sand/20 border border-pastel-sand text-cocoa-dark font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-300 shadow-sm hover:-translate-y-0.5"
                >
                  Order on Wallapop 🧸
                </a>
              </div>
              <a
                href={createWhatsAppLink(WHATSAPP_SMALL_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cocoa-light hover:text-cocoa-dark font-bold pt-1 transition-colors"
              >
                Inquire or Customize via WhatsApp <FaChevronRight size={10} />
              </a>
            </motion.div>
          </div>

          {/* Large Box (Royal Chest) */}
          <div className="grid md:grid-cols-12 gap-12 items-center pt-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              className="md:col-span-6 space-y-6"
            >
              <span className="text-xs font-bold tracking-widest text-pastel-caramel uppercase">
                The Luxury Heirloom
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-cocoa-dark leading-tight">
                Royal Chest <br />
                <span className="text-cocoa-light italic">€1000 (Large)</span>
              </h2>
              <p className="text-cocoa-light text-base md:text-lg leading-relaxed">
                Our ultimate heirloom chest. A massive collection of bespoke
                toys designed in direct consultation with Yulia, housed in an
                engraved wooden keepsake chest.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '12-15 premium large custom handmade knitted toys',
                  'Personal style consultation call with Yulia',
                  'Deluxe custom-engraved wooden toy chest with name',
                  'Priority worldwide express shipping & luxury wrapping',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-cocoa-dark font-medium"
                  >
                    <span className="text-emerald-500 mt-0.5 shrink-0">
                      <FaCheck size={14} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <a
                  href={LARGE_BOX_ETSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow text-center bg-pastel-caramel hover:bg-cocoa-light text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  Buy on Etsy 🛍️
                </a>
                <a
                  href={LARGE_BOX_WALLAPOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow text-center bg-white hover:bg-pastel-sand/20 border border-pastel-sand text-cocoa-dark font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-300 shadow-sm hover:-translate-y-0.5"
                >
                  Order on Wallapop 🧸
                </a>
              </div>
              <a
                href={createWhatsAppLink(WHATSAPP_LARGE_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cocoa-light hover:text-cocoa-dark font-bold pt-1 transition-colors"
              >
                Inquire or Customize via WhatsApp <FaChevronRight size={10} />
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              variants={scaleUpImage}
              className="md:col-span-6"
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-3xl border border-pastel-sand bg-cream-bg/35 shadow-sm hover:shadow-xl transition-all duration-500">
                <a
                  href={LARGE_BOX_ETSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/box_large.webp"
                    alt="Royal Toy Gift Box (Large)"
                    className="w-full h-auto object-cover aspect-square group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Philosophy Section */}
      <section className="py-24 px-4 bg-white/70">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cocoa-dark">
              Юлина Сказка —{' '}
              <span className="text-pastel-caramel italic">
                Сделано с душой
              </span>
            </h2>
            <p className="text-cocoa-light text-sm md:text-base max-w-xl mx-auto">
              Каждая деталь — от выбора нежнейшей гипоаллергенной плюшевой пряжи
              до кастомной гравировки на деревянных сундучках — создается
              индивидуально.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '100% Ручная работа',
                text: 'Юля лично провязывает каждую игрушку в нашей мастерской в Сан-Педро-Алькантара (Испания). Только ручная вязка.',
                icon: '🧵',
              },
              {
                title: 'Абсолютная безопасность',
                text: 'Мы используем исключительно сертифицированную гипоаллергенную пряжу премиум-класса и надежные глазки-заглушки.',
                icon: '🛡️',
              },
              {
                title: 'Кастомный дизайн',
                text: 'Полная свобода выбора персонажей, цветовых гамм и индивидуальных гравировок на памятных сундуках.',
                icon: '🎨',
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-cream-bg/40 border border-moccasin rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl bg-white border border-pastel-sand/50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  {feature.icon}
                </span>
                <h3 className="text-lg font-serif font-bold text-cocoa-dark">
                  {feature.title}
                </h3>
                <p className="text-sm text-cocoa-light leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 px-4 bg-cream-bg/20 border-t border-moccasin/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cocoa-dark">
              Fairytale{' '}
              <span className="text-pastel-caramel italic">Memories</span>
            </h2>
            <p className="text-cocoa-light text-sm md:text-base">
              See what families around the world say about our custom boxes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-pastel-sand rounded-3xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>
                        <FaStar size={14} />
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-cocoa-light italic leading-relaxed">
                    &quot;{review.text}&quot;
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-cream-bg">
                  <h4 className="font-bold text-cocoa-dark text-sm">
                    {review.name}
                  </h4>
                  <p className="text-xs text-cocoa-light font-medium">
                    {review.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="py-28 px-4 bg-gradient-to-t from-pastel-pink/10 to-transparent text-center relative border-t border-moccasin/20">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="text-6xl block">🐰</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-cocoa-dark leading-tight">
            Let&apos;s Build Your Custom Dream Chest
          </h2>
          <p className="text-cocoa-light text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            Have a specific character, color palette, or children&apos;s theme
            in mind? Discuss it directly with Yulia to create a unique
            personalized keepsake.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href={createWhatsAppLink(WHATSAPP_BASE_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5"
            >
              <FaWhatsapp size={22} /> Talk to Yulia on WhatsApp
            </a>
          </div>

          <div className="pt-8 flex justify-center gap-6 text-sm text-cocoa-light/80 font-bold">
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
              <FaInstagram /> Instagram Gallery
            </a>
            <span>•</span>
            <a
              href="https://es.pinterest.com/kttikotoysshop/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cocoa-dark transition-colors flex items-center gap-1.5"
            >
              <FaPinterest /> Pinterest
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
