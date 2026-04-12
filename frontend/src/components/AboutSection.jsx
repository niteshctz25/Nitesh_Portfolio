import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Zap, Lock, Globe, Bot, Briefcase, MapPin, Mail } from 'lucide-react';
import HighlightCard from './about/HighlightCard';
import KeyFocusCard from './about/KeyFocusCard';
import CurrentWorkCard from './about/CurrentWorkCard';

const AboutSection = ({ personalInfo }) => {
  const highlights = [
    { icon: Zap, text: 'Driver & Connector Testing', color: '#3b82f6' },
    { icon: Lock, text: 'OAuth/JWT/SSO', color: '#8b5cf6' },
    { icon: Globe, text: 'REST/SOAP APIs', color: '#10b981' },
    { icon: Bot, text: 'AI-Driven QA', color: '#f59e0b' }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-3 text-gray-100">
            About Me
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate QA Engineer specializing in driver testing and AI-powered automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-gray-800 to-gray-800/50 border-gray-700 h-full hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-8">
                {/* Name & Role */}
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-100 mb-2">
                    {personalInfo.name}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-400 mb-3">
                    <Briefcase className="w-5 h-5" />
                    <p className="text-xl font-semibold">
                      {personalInfo.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm">
                      {personalInfo.experience} of Professional Experience
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent mb-6" />

                {/* Bio Text */}
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-blue-500/50 my-6" />

                {/* Contact Info */}
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Expertise Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Core Expertise */}
            <div>
              <h4 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded" />
                Core Expertise
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <HighlightCard key={item.text} {...item} index={index} />
                ))}
              </div>
            </div>

            {/* Key Focus Areas */}
            <KeyFocusCard />

            {/* Current Work */}
            <CurrentWorkCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
