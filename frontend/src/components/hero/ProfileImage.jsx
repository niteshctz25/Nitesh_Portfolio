import { motion } from 'framer-motion';

const ProfileImage = ({ profileImage, name }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 relative group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative inline-block"
      >
        {/* Rotating Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #38bdf8, #7dd3fc, #38bdf8)',
            padding: '4px',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-gray-950" />
        </motion.div>

          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-transparent relative z-10 shadow-2xl shadow-sky-400/20">
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileImage;
