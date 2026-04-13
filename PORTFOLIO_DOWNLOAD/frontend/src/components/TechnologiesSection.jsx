import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

const TechnologiesSection = ({ technologies }) => {
  const [visibleBars, setVisibleBars] = useState({});
  const sectionRef = useRef(null);

  const categories = [...new Set(technologies.map(tech => tech.category))];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              const newVisibleBars = {};
              technologies.forEach((tech) => {
                newVisibleBars[tech.name] = true;
              });
              setVisibleBars(newVisibleBars);
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [technologies]);

  return (
    <section id="technologies" className="py-20 px-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 glow-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto mb-16" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categoryTechs = technologies.filter(tech => tech.category === category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-[#00d4ff] mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}>
                  <span className="text-gray-500">//</span> {category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTechs.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                    >
                      <Card className="glass glow-border hover-lift smooth-transition">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-semibold text-gray-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                              {tech.name}
                            </span>
                            <span className="text-sm text-[#00d4ff] font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {tech.proficiency}%
                            </span>
                          </div>
                          
                          <div className="skill-bar">
                            <motion.div
                              className="skill-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: visibleBars[tech.name] ? `${tech.proficiency}%` : 0 }}
                              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
