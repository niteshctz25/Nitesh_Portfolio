import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Brain, Briefcase, Sparkles } from 'lucide-react';

const RoadmapSection = ({ roadmapEvents }) => {
  const iconMap = {
    rocket: Rocket,
    code: Code,
    brain: Brain,
    briefcase: Briefcase,
    sparkles: Sparkles
  };

  return (
    <section id="roadmap" className="py-20 px-4 relative overflow-hidden jarvis-bg">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 glow-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Journey Roadmap
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto mb-16" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent transform md:-translate-x-1/2" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {roadmapEvents.map((event, index) => {
              const Icon = iconMap[event.icon];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    isEven ? '' : 'md:text-right'
                  }`}>
                    <motion.div
                      className="glass glow-border p-6 hover-lift smooth-transition"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {Icon && (
                          <div className="p-2 rounded-lg bg-[#00d4ff]/10 glow-border">
                            <Icon className="w-5 h-5 text-[#00d4ff]" />
                          </div>
                        )}
                        <span className="text-2xl font-bold text-[#00d4ff]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-100 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {event.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-[#00d4ff] z-10"
                      style={{
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.4)'
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-[#00d4ff] animate-ping opacity-75" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
