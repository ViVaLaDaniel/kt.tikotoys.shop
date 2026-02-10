import React from 'react';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About Us - KT.TikoToys"
        description="Learn about our story, mission, and the passion behind our handmade knitted toys. A family-run business crafting joy since 2023."
      />
      <main className="flex-grow w-full px-4 md:px-8 pt-24 pb-20 bg-cream-bg">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-brown-dark mb-4 tracking-tight">
              About KT.TikoToys
            </h1>
            <p className="text-xl text-brown-light">
              Weaving warmth and joy into every stitch.
            </p>
          </header>

          {/* Our Mission Section */}
          <section className="mb-20 p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-sand/30">
            <h2 className="text-3xl md:text-4xl font-bold text-salmon mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-brown-dark leading-relaxed text-center max-w-3xl mx-auto">
              At KT.TikoToys, our mission is simple: to create beautiful,
              high-quality handmade products that bring comfort and happiness to
              our customers. We believe in the power of craftsmanship and the
              personal touch that goes into every item we create. From our family
              to yours, we&apos;re dedicated to delivering products made with love and
              care.
            </p>
          </section>

          {/* Our Story Section */}
          <section className="mb-20 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-brown-dark mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-brown-light text-lg">
                <p>
                  Founded in 2023, KT.TikoToys started as a small hobby in a cozy
                  living room. With a passion for knitting and a desire to create
                  something truly special, our founder began crafting chenille
                  beanies for friends and family. The overwhelmingly positive
                  feedback and the joy these beanies brought to people inspired the
                  creation of our brand.
                </p>
                <p>
                  Today, KT.TikoToys has grown, but our core values remain the same.
                  We are a family-run business committed to quality, sustainability,
                  and the timeless art of handmade goods. Each product is a piece of
                  our story, and we&apos;re thrilled to share it with you.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 bg-moccasin/30 p-4 rounded-3xl rotate-2">
              <img
                src="https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=800"
                alt="Knitting Workshop"
                className="rounded-2xl shadow-xl w-full h-auto object-cover -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </section>

          {/* Meet the Team Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-brown-dark mb-12 text-center">
              Meet the Creator
            </h2>
            <div className="max-w-md mx-auto text-center bg-white/60 p-8 rounded-3xl border border-sand/30 hover:shadow-lg transition-all">
              <div className="w-40 h-40 rounded-full mx-auto mb-6 p-1 bg-gradient-to-br from-salmon to-sand shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300"
                  alt="Yulia"
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              <h3 className="text-2xl font-bold text-brown-dark">Yulia</h3>
              <p className="text-salmon font-medium mb-4">Founder & Creator</p>
              <p className="text-brown-light italic">&quot;Every loop is a wish for happiness.&quot;</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
