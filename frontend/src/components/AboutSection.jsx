import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Zap, Lock, Globe, Bot, Briefcase, MapPin, Mail } from 'lucide-react';
import HighlightCard from './about/HighlightCard';
import KeyFocusCard from './about/KeyFocusCard';
import CurrentWorkCard from './about/CurrentWorkCard';

const AboutSection = ({ personalInfo }) => {
  const highlights = [
    { icon: Zap, text: 'Driver & Connector Testing', color: '#38bdf8' },
    { icon: Lock, text: 'OAuth/JWT/SSO', color: '#7dd3fc' },
    { icon: Globe, text: 'REST/SOAP APIs', color: '#0ea5e9' },
    { icon: Bot, text: 'AI-Driven QA', color: '#bae6fd' }
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
          <h2 className="text-4xl font-bold text-center mb-3 text-white">
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
            <Card className="bg-gradient-to-br from-gray-800 to-gray-800/50 border-gray-700 h-full hover:border-sky-400/50 transition-all duration-300">
              <CardContent className="p-8">
                {/* Name & Role */}
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {personalInfo.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sky-400 mb-3">
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

                <div className="h-px bg-gradient-to-r from-sky-400/50 via-sky-300/30 to-transparent mb-6" />

                {/* Bio Text */}
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-sky-300/30 to-sky-400/50 my-6" />

                {/* Contact Info */}
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                      className="text-sm hover:text-sky-400 transition-colors"
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
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-sky-400 to-sky-300 rounded" />
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
