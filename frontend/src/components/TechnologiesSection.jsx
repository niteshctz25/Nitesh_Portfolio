import { motion } from 'framer-motion';
import { Code, Database, Lock, TestTube, Brain, Globe } from 'lucide-react';
import CategoryCard from './technologies/CategoryCard';

const TechnologiesSection = ({ technologies }) => {
  const categories = [...new Set(technologies.map(tech => tech.category))];

  const categoryIcons = {
    'Languages': Code,
    'Web': Globe,
    'Backend/APIs': Database,
    'Auth': Lock,
    'Testing': TestTube,
    'AI/LLM': Brain
  };

  const categoryColors = {
    'Languages': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    'Web': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    'Backend/APIs': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    'Auth': { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
    'Testing': { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
    'AI/LLM': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' }
  };

  const statsData = [
    { label: 'Languages', count: technologies.filter(t => t.category === 'Languages').length },
    { label: 'Technologies', count: technologies.length },
    { label: 'Specialties', count: categories.length },
    { label: 'Years Exp.', count: '2+' }
  ];

  return (
    <section id="technologies" className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-3 text-gray-100">
            Technologies & Skills
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Technical expertise and proficiencies across various domains
          </p>
        </motion.div>

        <div className="space-y-8">
          {categories.map((category, categoryIndex) => {
            const categoryTechs = technologies.filter(tech => tech.category === category);
            const Icon = categoryIcons[category] || Code;
            const colors = categoryColors[category] || categoryColors['Languages'];
            
            return (
              <CategoryCard
                key={category}
                category={category}
                categoryTechs={categoryTechs}
                Icon={Icon}
                colors={colors}
                categoryIndex={categoryIndex}
              />
            );
          })}
        </div>

        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-3xl font-bold text-blue-500 mb-1">
                {stat.count}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
