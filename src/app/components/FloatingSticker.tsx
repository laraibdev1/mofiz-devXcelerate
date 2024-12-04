import React from 'react';
import { motion } from 'framer-motion';

interface FloatingStickerProps {
  text: string;
  className?: string;
}

export const FloatingSticker: React.FC<FloatingStickerProps> = ({ text, className }) => {
  return (
    <motion.div
      className={`absolute bg-primary text-primary-foreground p-3 rounded-full shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-lg font-semibold">{text}</span>
    </motion.div>
  );
};

