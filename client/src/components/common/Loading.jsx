import { motion } from "framer-motion";

const LoadingSpinner = ({ size = 40, color = "var(--primary)" }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <motion.div
        style={{
          width: size,
          height: size,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

const LoadingDots = ({ color = "var(--primary)" }) => {
  const dotVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '20px' }}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={{
            width: 8,
            height: 8,
            backgroundColor: color,
            borderRadius: '50%',
          }}
          variants={dotVariants}
          animate="animate"
          transition={{ delay: index * 0.2 }}
        />
      ))}
    </div>
  );
};

const LoadingCard = () => {
  return (
    <motion.div
      className="dish-card loading-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="loading-shimmer" style={{ height: '180px', borderRadius: '12px', marginBottom: '16px' }} />
      <div className="loading-text" style={{ height: '20px', width: '80%', marginBottom: '8px' }} />
      <div className="loading-text" style={{ height: '16px', width: '60%', marginBottom: '8px' }} />
      <div className="loading-text" style={{ height: '14px', width: '40%' }} />
    </motion.div>
  );
};

export { LoadingSpinner, LoadingDots, LoadingCard };