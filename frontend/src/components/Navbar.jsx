import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';
import ContactModal from './ContactModal';
import { personalInfo as mockPersonalInfo } from '../mock';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Technologies', id: 'technologies' },
    { name: 'Roadmap', id: 'roadmap' },
    { name: 'Certificates', id: 'certificates' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname, navigate]);

  const handleHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              onClick={handleHomeClick}
              className="text-xl font-bold text-white hover:text-sky-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Nitesh Singh
            </motion.button>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-sky-400 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <motion.button
                onClick={() => setIsContactOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300 transition-all duration-300 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
                Contact
              </motion.button>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-sky-400 hover:text-sky-300 p-2"
              >
                <Mail size={22} />
              </button>
              <button
                className="text-gray-300 hover:text-sky-400 p-2"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gray-950/98 backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-2xl text-gray-300 hover:text-sky-400 transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
                className="text-2xl text-sky-400 hover:text-sky-300 transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        personalInfo={mockPersonalInfo}
      />
    </>
  );
};

export default Navbar;
