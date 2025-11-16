import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <main className="flex-grow w-full px-4 md:px-8 pt-20 pb-20 bg-gray-100">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">Get In Touch</h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Contact Form */}
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
                <input type="text" id="name" name="name" className="w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-pink-500 transition-colors" placeholder="Jane Doe" />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-pink-500 transition-colors" placeholder="jane.doe@example.com" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-pink-500 transition-colors" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-pink-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="md:w-1/2 bg-gray-800 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-amber-500 mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <p>123 Crafty Lane<br />Knitville, KV 12345<br />United States</p>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <p>hello@kt-tikotoys.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <p>+1 (234) 567-8900</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <img src="https://via.placeholder.com/400x250.png?text=Map+Location" alt="Map" className="rounded-lg w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
