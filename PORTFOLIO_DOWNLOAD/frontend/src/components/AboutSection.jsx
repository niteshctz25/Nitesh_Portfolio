import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Zap, Lock, Globe, Bot } from 'lucide-react';

const AboutSection = ({ personalInfo }) => {
  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hex-pattern opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 glow-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass glow-border overflow-hidden hover-glow smooth-transition">
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff] opacity-5 rounded-full blur-3xl" />
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      System Status: Active
                    </p>
                    <h3 className="text-3xl font-bold text-[#00d4ff] mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {personalInfo.name}
                    </h3>
                    <p className="text-xl text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {personalInfo.role}
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

                  <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {personalInfo.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['QA Engineering', 'API Testing', 'AI Automation', 'OAuth/JWT'].map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20 smooth-transition"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'API Testing', Icon: Zap, color: '#00d4ff' },
              { label: 'OAuth/JWT', Icon: Lock, color: '#00ffff' },
              { label: 'REST/SOAP', Icon: Globe, color: '#00ff88' },
              { label: 'AI Agents', Icon: Bot, color: '#00d4ff' }
            ].map((skill, index) => {
              const SkillIcon = skill.Icon;
              return (
                <motion.div
                  key={skill.label}
                  className="glass glow-border p-6 text-center hover-lift smooth-transition cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <SkillIcon className="w-12 h-12 mx-auto mb-3" style={{ color: skill.color }} />
                  <p className="text-lg font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', color: skill.color }}>
                    {skill.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
