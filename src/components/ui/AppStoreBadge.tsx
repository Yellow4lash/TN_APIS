import React from 'react';
import { motion } from 'framer-motion';

type AppStoreBadgeProps = {
  store: 'apple' | 'google';
  className?: string;
};

const AppStoreBadge: React.FC<AppStoreBadgeProps> = ({ 
  store, 
  className = '' 
}) => {
  const appleStoreUrl = 'https://www.apple.com/app-store/';
  const googlePlayUrl = 'https://play.google.com/store';
  
  const badgeContent = {
    apple: {
      url: appleStoreUrl,
      imgSrc: 'https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg',
      altText: 'Download on the App Store'
    },
    google: {
      url: googlePlayUrl,
      imgSrc: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
      altText: 'Get it on Google Play'
    }
  };

  const { url, imgSrc, altText } = badgeContent[store];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src={imgSrc} 
        alt={altText} 
        className="h-12 w-auto"
      />
    </motion.a>
  );
};

export default AppStoreBadge;