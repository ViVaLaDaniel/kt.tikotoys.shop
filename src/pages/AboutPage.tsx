import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCertificate, FaCompass } from 'react-icons/fa6';
import PageHeader from '../components/PageHeader';

const AboutPage: React.FC = () => {
  return (
    <main className="flex-grow w-full px-4 md:px-8 pt-28 pb-32 bg-transparent font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <PageHeader
          title="Our"
          highlight="Story"
          subtitle="Weaving warmth, love, and childhood dreams into every stitch."
        />

        {/* Our Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-8 md:p-12 bg-white rounded-3xl border border-moccasin shadow-sm"
        >
          <h2 className="text-3xl font-serif font-bold text-brown-dark mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-sm md:text-base text-brown-light leading-relaxed text-center max-w-3xl mx-auto">
            At KT.TikoToys, our mission is simple: to create beautiful,
            premium-quality handmade products that bring comfort and happiness
            to children and collectors around the world. We believe in the power
            of craftsmanship and the personal touch that goes into every loop.
            From our cozy home in San Pedro, Spain, to yours, we are dedicated
            to delivering toys made with pure love and care.
          </p>
        </motion.section>

        {/* Our Story Section */}
        <section className="mb-20 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-4"
          >
            <h2 className="text-3xl font-serif font-bold text-brown-dark">
              From Hobby to Bespoke Gifts
            </h2>
            <p className="text-brown-light leading-relaxed text-sm md:text-base">
              Founded by Yulia, KT.TikoToys started as a small passion project
              in a cozy living room in Marbella. Inspired by the soft, soothing
              feel of premium chenille yarn, Yulia began crafting toys for
              friends and family. The joy and warmth these creations brought to
              people led to the birth of our brand.
            </p>
            <p className="text-brown-light leading-relaxed text-sm md:text-base">
              Today, KT.TikoToys has shipped custom boxes and individual
              amigurumi toys to clients globally. We remain a family-centric,
              local business committed to sustainability, premium hypoallergenic
              fibers, and the timeless art of handmade goods.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <img
              src="https://images.unsplash.com/photo-1584992208118-a61d2bcbb7e5?w=600&h=600&fit=crop&q=80"
              alt="Yulia's Workshop and Craft Materials"
              className="rounded-3xl border border-moccasin shadow-md w-full h-auto object-cover aspect-square"
            />
          </motion.div>
        </section>

        {/* Meet the Founder Section */}
        <section className="bg-white border border-moccasin rounded-3xl p-8 md:p-12 mb-10 shadow-sm text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-brown-dark">
              Meet the Crafter
            </h2>
            <div className="w-36 h-36 rounded-full mx-auto overflow-hidden border-2 border-salmon shadow-lg bg-cream-bg flex items-center justify-center text-5xl">
              👩‍🎨
            </div>
            <div>
              <h3 className="text-2xl font-bold text-brown-dark">Yulia</h3>
              <p className="text-salmon font-medium text-sm">
                Founder & Lead Designer
              </p>
            </div>
            <p className="text-brown-light text-sm md:text-base leading-relaxed">
              &quot;Every toy I make carries a piece of my heart. I select the
              softest, safest chenille yarn and carefully sew every details to
              make sure each character has its own cute, distinct personality.
              When you order a custom box, I work closely with you to make sure
              your dream selection comes to life perfectly.&quot;
            </p>
            <div className="flex justify-center gap-6 text-salmon text-sm pt-4">
              <span className="flex items-center gap-1.5 font-bold">
                <FaHeart /> 100% Handcrafted
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <FaCertificate /> Hypoallergenic
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <FaCompass /> Based in Spain
              </span>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
