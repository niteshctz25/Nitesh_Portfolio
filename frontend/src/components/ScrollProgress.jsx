import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.05);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 origin-left z-50"
      style={{
        scaleX: scrollYProgress,
        boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default ScrollProgress;
