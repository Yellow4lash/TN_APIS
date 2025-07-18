import React from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
};

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  onClick,
  interactive = false
}) => {
  const baseStyles = 'bg-white rounded-2xl shadow-md overflow-hidden';
  const cardStyles = `${baseStyles} ${className}`;
  
  if (interactive) {
    return (
      <motion.div 
        className={cardStyles}
        onClick={onClick}
        whileHover={{ 
          scale: 1.03,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;