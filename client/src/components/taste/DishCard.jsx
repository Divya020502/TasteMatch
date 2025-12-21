import { motion } from "framer-motion";
import "../../styles/dishCard.css";

const DishCard = ({ dish, index = 0 }) => {
  const percentage = Math.round(dish.score * 100);

  return (
    <motion.div
      className="dish-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <motion.img
        src={dish.imageUrl || "https://via.placeholder.com/300"}
        alt={dish.name}
        className="dish-image"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <div className="dish-header">
        <motion.h4
          className="dish-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {dish.name}
        </motion.h4>
        <motion.span
          className="score"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3 + index * 0.1,
            type: "spring",
            stiffness: 200
          }}
        >
          {percentage}%
        </motion.span>
      </div>

      <motion.p
        className="muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.1 }}
      >
        🍽️ {dish.cuisine} • 🥗 {dish.diet}
      </motion.p>

      {dish.description && (
        <motion.p
          className="dish-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {dish.description}
        </motion.p>
      )}

      <motion.div
        className="taste-tags"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + index * 0.1 }}
      >
        <span className="taste-tag">🌶️ Spicy: {dish.tasteVector?.spicy || 0}</span>
        <span className="taste-tag">🍬 Sweet: {dish.tasteVector?.sweet || 0}</span>
        <span className="taste-tag">🍄 Umami: {dish.tasteVector?.umami || 0}</span>
      </motion.div>

      <motion.div
        className="taste-values"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 + index * 0.1 }}
      >
        <div className="taste-value">
          <span>Sour</span>
          {dish.tasteVector?.sour || 0}
        </div>
        <div className="taste-value">
          <span>Bitter</span>
          {dish.tasteVector?.bitter || 0}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DishCard;
