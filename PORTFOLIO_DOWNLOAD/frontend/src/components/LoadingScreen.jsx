import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  const loadingSteps = [
    { progress: 20, status: 'Loading system components...' },
    { progress: 40, status: 'Establishing secure connection...' },
    { progress: 60, status: 'Fetching data streams...' },
    { progress: 80, status: 'Rendering interface...' },
    { progress: 100, status: 'System ready.' }
  ];

  useEffect(() => {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress);
        setStatus(loadingSteps[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center jarvis-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-md mx-auto">
        {/* Logo/Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#00d4ff] opacity-20 blur-2xl" />
            <Terminal className="w-20 h-20 text-[#00d4ff] relative z-10" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl font-bold mb-2 glow-text"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          NITESH SINGH
        </motion.h1>
        
        <motion.p
          className="text-gray-400 mb-12"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          // Portfolio System v2.0
        </motion.p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-black/50 rounded-full overflow-hidden glow-border">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00ffff]"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Status Text */}
        <motion.p
          className="text-[#00d4ff] text-sm"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
          key={status}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {status}
        </motion.p>

        {/* Percentage */}
        <p className="text-gray-500 text-xs mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {progress}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
