import React from 'react';
import { motion } from 'framer-motion';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  animate?: boolean;
};

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  title,
  subtitle,
  centered = false,
  animate = true
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section
      id={id}
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {(title || subtitle) && (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
          {title && (
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold text-primary-800 mb-4"
              variants={childVariants}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={childVariants}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      <div className={centered ? 'text-center' : ''}>
        {children}
      </div>
    </motion.section>
  );
};

export default Section;