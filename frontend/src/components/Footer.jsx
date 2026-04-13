import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Instagram, Download, Mail } from 'lucide-react';
import SocialLink from './footer/SocialLink';

const Footer = ({ personalInfo }) => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: personalInfo.github,
      color: 'hover:text-gray-100'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: personalInfo.linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: personalInfo.instagram,
      color: 'hover:text-pink-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${personalInfo.email}`,
      color: 'hover:text-green-400'
    }
  ];

  const quickLinks = ['About', 'Projects', 'Technologies', 'Certificates'];

  return (
    <footer className="relative py-12 px-4 border-t border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              {personalInfo.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              QA Engineer specializing in driver and connector testing, automation, and AI-driven solutions.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for opportunities
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-sky-400 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            
            <motion.a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-4 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.a>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.name} social={social} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <p>© 2025 {personalInfo.name}. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <p>Built with</p>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <p>and React</p>
          </div>

          <a 
            href={`mailto:${personalInfo.email}`}
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            {personalInfo.email}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
