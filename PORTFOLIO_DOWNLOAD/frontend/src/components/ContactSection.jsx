import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Mail, Phone, Linkedin, Github, Instagram, Download } from 'lucide-react';

const ContactSection = ({ personalInfo }) => {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      color: '#00d4ff'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
      color: '#00ffff'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      link: personalInfo.linkedin,
      color: '#00d4ff'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View Repositories',
      link: personalInfo.github,
      color: '#00ffff'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@ne_tej_',
      link: personalInfo.instagram,
      color: '#ff00ff'
    }
  ];

  const handleDownloadResume = () => {
    window.open(personalInfo.resumeLink, '_blank');
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden jarvis-bg">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 glow-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto mb-16" />
        </motion.div>

        {/* Download Resume Button */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={handleDownloadResume}
            className="neon-button text-lg px-8 py-6"
          >
            <Download className="w-5 h-5 mr-3" />
            Download Resume
          </Button>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            
            return (
              <motion.a
                key={method.label}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass glow-border h-full hover-lift smooth-transition hover-glow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="p-3 rounded-lg glow-border"
                        style={{ backgroundColor: `${method.color}10` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: method.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {method.label}
                        </p>
                        <p className="text-gray-200 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            );
          })}
        </div>

        {/* Additional CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl text-gray-300 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Let's build something incredible together
          </p>
          <p className="text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            // Open for opportunities and collaborations
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
