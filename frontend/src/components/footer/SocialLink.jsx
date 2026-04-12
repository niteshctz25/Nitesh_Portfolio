import { motion } from 'framer-motion';

const SocialLink = ({ social }) => {
  const Icon = social.icon;
  
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
      title={social.name}
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
};

export default SocialLink;
