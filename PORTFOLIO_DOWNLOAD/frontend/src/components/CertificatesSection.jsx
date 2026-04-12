import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const CertificatesSection = ({ certificates }) => {
  return (
    <section id="certificates" className="py-20 px-4 relative overflow-hidden">
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
            Certificates
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass glow-border h-full hover-lift smooth-transition hover-glow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-lg bg-[#00d4ff]/10 glow-border">
                      <Award className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <Calendar className="w-4 h-4" />
                      {cert.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-100" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {cert.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Issued by <span className="text-[#00d4ff] font-semibold">{cert.issuer}</span>
                  </p>
                  <Button
                    className="w-full bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 smooth-transition"
                    onClick={() => window.open(cert.link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
