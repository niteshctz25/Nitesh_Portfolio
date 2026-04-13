import { motion } from 'framer-motion';

const HighlightCard = ({ icon: Icon, text, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-300 cursor-default"
    >
      <div 
        className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <p className="text-sm font-medium text-gray-300">
        {text}
      </p>
    </motion.div>
  );
};

export default HighlightCard;
