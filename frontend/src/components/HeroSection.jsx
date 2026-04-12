import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Code, Database, Zap } from 'lucide-react';
import AnimatedBackground from './hero/AnimatedBackground';
import ProfileImage from './hero/ProfileImage';
import StatCard from './hero/StatCard';

const HeroSection = ({ personalInfo }) => {
  const [text, setText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fullText = `Hi, I'm ${personalInfo.name}`;

  useEffect(() => {
    let index = 0;
    let timeout;

    const typeText = () => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
        timeout = setTimeout(typeText, 80);
      }
    };

    typeText();

    return () => clearTimeout(timeout);
  }, [fullText]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const stats = [
    { icon: Code, label: 'Experience', value: personalInfo.experience, color: '#3b82f6' },
    { icon: Database, label: 'Role', value: 'QA Engineer', color: '#8b5cf6' },
    { icon: Zap, label: 'Focus', value: 'Driver Testing', color: '#10b981' }
  ];

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden px-4"
      onMouseMove={handleMouseMove}
    >
      <AnimatedBackground mousePosition={mousePosition} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <ProfileImage profileImage={personalInfo.profileImage} name={personalInfo.name} />

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text}
          <motion.span 
            className="inline-block w-1 h-16 bg-blue-600 ml-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-blue-400 mb-4 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {personalInfo.role}
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {personalInfo.bio.slice(0, 150)}...
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
