import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MapPin, Send, Instagram, Linkedin, Loader2, CheckCircle } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const ContactModal = ({ isOpen, onClose, personalInfo }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await portfolioAPI.submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2000);
    } catch {
      // Fallback: open mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left: Contact Info */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-gray-900 to-gray-800">
                <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">
                  Get in Touch
                </p>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Let's Connect & {' '}
                  <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                    Collaborate
                  </span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Whether you want to discuss testing, automation, AI-driven QA, or potential collaborations, I'd love to hear from you.
                </p>

                <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-cyan-300 rounded mb-8" />

                {/* Email */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider">Email</p>
                    <p className="text-white text-sm">{personalInfo.email}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider">Location</p>
                    <p className="text-white text-sm">Lucknow, India</p>
                  </div>
                </div>

                {/* Social */}
                <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">Follow Me</p>
                <div className="flex gap-3">
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 hover:bg-sky-500/20 transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 hover:bg-sky-500/20 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right: Form */}
              <div className="p-8 md:p-10 bg-gray-850">
                {status === 'success' ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">Thank you! I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share your thoughts, ideas, or just say hello..."
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-sm resize-none"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-red-400 text-sm">{errorMsg}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold flex items-center justify-center gap-2 hover:from-sky-600 hover:to-cyan-500 transition-all disabled:opacity-60"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === 'sending' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
