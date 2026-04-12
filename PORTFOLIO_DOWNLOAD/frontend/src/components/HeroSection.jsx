import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Zap } from 'lucide-react';

const HeroSection = ({ personalInfo }) => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const canvasRef = useRef(null);

  const fullText1 = `Hello, I am ${personalInfo.name}`;
  const fullText2 = 'QA Engineer | API Specialist | AI Testing Enthusiast';

  // Typing animation
  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    let timeout1, timeout2;

    const typeText1 = () => {
      if (index1 < fullText1.length) {
        setText1(fullText1.slice(0, index1 + 1));
        index1++;
        timeout1 = setTimeout(typeText1, 80);
      } else {
        setShowCursor1(false);
        setShowCursor2(true);
        timeout2 = setTimeout(() => {
          typeText2();
        }, 500);
      }
    };

    const typeText2 = () => {
      if (index2 < fullText2.length) {
        setText2(fullText2.slice(0, index2 + 1));
        index2++;
        timeout2 = setTimeout(typeText2, 60);
      }
    };

    typeText1();

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw connections
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden jarvis-bg">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Scan Line */}
      <div className="scan-line" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Profile Image with HUD */}
        <motion.div
          className="relative inline-block mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          {/* Rotating Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="absolute w-64 h-64 rounded-full border-2 border-[#00d4ff] opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                borderStyle: 'dashed',
                borderSpacing: '10px'
              }}
            />
            <motion.div
              className="absolute w-72 h-72 rounded-full border border-[#00ffff] opacity-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Profile Image */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden glow-border bg-black">
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Corner HUD Elements */}
          <div className="hud-corner top-left" />
          <div className="hud-corner top-right" />
          <div className="hud-corner bottom-left" />
          <div className="hud-corner bottom-right" />

          {/* Floating Icons */}
          <motion.div
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#00d4ff]/20 backdrop-blur-sm flex items-center justify-center glow-border"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Terminal className="w-6 h-6 text-[#00d4ff]" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-[#00ffff]/20 backdrop-blur-sm flex items-center justify-center glow-border"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Code className="w-6 h-6 text-[#00ffff]" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-8 w-12 h-12 rounded-full bg-[#00ff88]/20 backdrop-blur-sm flex items-center justify-center glow-border"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Zap className="w-6 h-6 text-[#00ff88]" />
          </motion.div>
        </motion.div>

        {/* Typing Text */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold glow-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {text1}
            {showCursor1 && <span className="inline-block w-1 h-12 bg-[#00d4ff] ml-2 animate-pulse" />}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}>
            {text2}
            {showCursor2 && <span className="inline-block w-1 h-8 bg-[#00d4ff] ml-2 animate-pulse" />}
          </p>
        </motion.div>

        {/* Stats HUD */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {[
            { label: 'Experience', value: personalInfo.experience },
            { label: 'Position', value: 'QA-1 Engineer' },
            { label: 'Company', value: 'CData' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass glow-border p-6 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00d4ff] to-transparent" />
              <p className="text-sm text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-[#00d4ff] mt-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[#00d4ff] rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-[#00d4ff] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
