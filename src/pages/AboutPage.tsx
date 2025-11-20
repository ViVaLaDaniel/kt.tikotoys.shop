import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="flex-grow w-full px-4 md:px-8 pt-20 pb-20 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
            About KT.TikoToys
          </h1>
          <p className="text-xl text-gray-600">
            Weaving warmth and joy into every stitch.
          </p>
        </header>

        {/* Our Mission Section */}
        <section className="mb-20 p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold text-pink-600 mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
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
            <h2 className="text-4xl font-bold text-amber-800 mb-6">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2023, KT.TikoToys started as a small hobby in a cozy
              living room. With a passion for knitting and a desire to create
              something truly special, our founder began crafting chenille
              beanies for friends and family. The overwhelmingly positive
              feedback and the joy these beanies brought to people inspired the
              creation of our brand.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, KT.TikoToys has grown, but our core values remain the same.
              We are a family-run business committed to quality, sustainability,
              and the timeless art of handmade goods. Each product is a piece of
              our story, and we&apos;re thrilled to share it with you.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/500x500.png?text=Our+Workshop"
              alt="Our Workshop"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
        </section>

        {/* Meet the Team Section */}
        <section>
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150.png?text=Team+Member"
                alt="Team Member 1"
                className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800">Jane Doe</h3>
              <p className="text-pink-600">Founder & Lead Designer</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150.png?text=Team+Member"
                alt="Team Member 2"
                className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800">John Smith</h3>
              <p className="text-amber-800">Marketing & Operations</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150.png?text=Team+Member"
                alt="Team Member 3"
                className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800">Emily White</h3>
              <p className="text-gray-600">Customer Happiness</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
