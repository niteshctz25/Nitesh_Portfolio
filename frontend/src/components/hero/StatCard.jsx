import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color, index }) => {
  return (
    <motion.div
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm cursor-pointer relative overflow-hidden group"
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        borderColor: color,
        boxShadow: `0 10px 30px ${color}40`
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Hover Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
      />
      
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-8 h-8 mx-auto mb-3" style={{ color }} />
      </motion.div>
      <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-gray-100">
        {value}
      </p>
    </motion.div>
  );
};

export default StatCard;
