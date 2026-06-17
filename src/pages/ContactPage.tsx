import React, { useRef, useState, FormEvent } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaTiktok,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from 'react-icons/fa6';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(mapRef, { freezeOnceVisible: true });
  const isMapVisible = !!entry?.isIntersecting;
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');

    // Simulate a network request
    setTimeout(() => {
      setFormStatus('success');
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);
  };

  const whatsappNumber = '34642841240';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Yulia! I am reaching out through your contact page.')}`;

  return (
    <main className="flex-grow w-full px-4 md:px-8 pt-28 pb-32 bg-cream-bg font-sans">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-brown-dark mb-4 tracking-tight"
          >
            Say <span className="text-salmon italic">Hello</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-brown-light"
          >
            We&apos;d love to hear from you! Reach out for custom requests or
            order consultations.
          </motion.p>
        </header>

        <div className="bg-white rounded-3xl border border-moccasin shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[600px]">
          {/* Contact Form */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 text-3xl">
                  ✓
                </div>
                <h2 className="text-3xl font-serif font-bold text-brown-dark mb-4">
                  Thank You!
                </h2>
                <p className="text-sm md:text-base text-brown-light leading-relaxed">
                  Your message has been sent successfully. We&apos;ll get back
                  to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brown-dark mb-2">
                  Send a Message
                </h2>
                <p className="text-xs text-brown-light mb-8">
                  We will reply via email within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-brown-dark uppercase tracking-wider mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-cream-bg/30 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-sm text-brown-dark transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-brown-dark uppercase tracking-wider mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-cream-bg/30 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-sm text-brown-dark transition-colors"
                      placeholder="jane.doe@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-brown-dark uppercase tracking-wider mb-1"
                    >
                      Message / Custom requests
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full p-3.5 rounded-xl bg-cream-bg/30 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-sm text-brown-dark transition-colors resize-none"
                      placeholder="Describe the toys, colors, sizes, or gift box theme you are interested in..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-sand hover:bg-salmon text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer disabled:bg-zinc-400"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting'
                      ? 'Sending...'
                      : 'Send Email Inquiry'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="md:w-1/2 bg-gradient-to-br from-brown-dark to-zinc-900 text-white p-8 md:p-12 flex flex-col justify-between border-l border-moccasin/20">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-sand mb-2">
                Get in Touch Directly
              </h2>
              <p className="text-xs text-white/60 mb-8 font-light">
                Skip the form and chat with Yulia on WhatsApp or follow her
                portfolio.
              </p>

              <div className="space-y-6">
                {/* Location */}
                <div ref={mapRef} className="flex items-start gap-4">
                  <span className="text-sand shrink-0 mt-1">
                    <FaLocationDot size={20} />
                  </span>
                  <div className="space-y-2.5 flex-grow">
                    <div>
                      <h4 className="font-bold text-sm leading-none text-sand/90">
                        Our Studio Location
                      </h4>
                      <a
                        href="https://maps.app.goo.gl/1Jt4Nz4FktEovJsv9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-xs text-white/80 leading-normal block mt-1"
                      >
                        C. las Gitanillas, 14, 29670 Marbella / San Pedro
                        Alcántara, Málaga, Spain
                      </a>
                    </div>
                    {isMapVisible && (
                      <div className="w-full h-32 rounded-xl overflow-hidden shadow-inner border border-white/10">
                        <iframe
                          title="Location of KT.TIKOTOYS on Google Maps"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3206.23352960268!2d-5.04451368471968!3d36.52339198000658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd73206a34155555%3A0x55ab2635f5d78c6!2sC.%20las%20Gitanillas%2C%2014%2C%2029670%20Marbella%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email info */}
                <div className="flex items-center gap-4">
                  <span className="text-sand shrink-0">
                    <FaEnvelope size={20} />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm leading-none text-sand/90">
                      Email Support
                    </h4>
                    <a
                      href="mailto:kt.tikotoys.shop@gmail.com"
                      className="hover:underline text-xs text-white/80 mt-1 block"
                    >
                      kt.tikotoys.shop@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone info */}
                <div className="flex items-center gap-4">
                  <span className="text-sand shrink-0">
                    <FaPhone size={20} />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm leading-none text-sand/90">
                      WhatsApp / Phone
                    </h4>
                    <a
                      href="tel:+34642841240"
                      className="hover:underline text-xs text-white/80 mt-1 block"
                    >
                      +34 642 841 240
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant Channels Card */}
            <div className="mt-10 pt-6 border-t border-white/10 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <FaWhatsapp size={16} /> Chat Instantly on WhatsApp
              </a>
              <a
                href="https://tiktok.com/@kt_tiko_toys"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <FaTiktok size={14} /> Follow on TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
