import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  animate?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  color = 'primary',
  size = 'md',
  variant = 'solid',
  className = '',
  icon,
  iconPosition = 'right',
  onClick,
  animate = true,
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const colorStyles = {
    primary: {
      solid: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    },
    secondary: {
      solid: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400',
      outline: 'border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 focus:ring-secondary-400',
      ghost: 'text-secondary-500 hover:bg-secondary-50 focus:ring-secondary-400',
    },
    accent: {
      solid: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400',
      outline: 'border-2 border-accent-500 text-accent-500 hover:bg-accent-50 focus:ring-accent-400',
      ghost: 'text-accent-500 hover:bg-accent-50 focus:ring-accent-400',
    },
    white: {
      solid: 'bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-200',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-800 focus:ring-white',
      ghost: 'text-white hover:bg-white/10 focus:ring-white',
    },
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonStyles = `${baseStyles} ${colorStyles[color][variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  const motionProps = animate ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={buttonStyles} onClick={onClick}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={buttonStyles} onClick={onClick} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button 
      className={buttonStyles} 
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};

export default Button;