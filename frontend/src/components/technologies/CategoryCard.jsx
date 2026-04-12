import { motion } from 'framer-motion';
import { Card } from '../ui/card';

const CategoryCard = ({ category, categoryTechs, Icon, colors, categoryIndex }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
    >
      <Card className="bg-gray-800 border-gray-700 p-6 hover:border-gray-600 transition-all duration-300">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-100">
            {category}
          </h3>
        </div>

        {/* Tech Pills Grid */}
        <div className="flex flex-wrap gap-3">
          {categoryTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-5 py-2.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} font-medium text-sm cursor-default transition-all duration-200 hover:shadow-lg`}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;
