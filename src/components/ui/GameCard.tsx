import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Game } from '../../types';

type GameCardProps = {
  game: Game;
  className?: string;
};

const GameCard: React.FC<GameCardProps> = ({ game, className = '' }) => {
  return (
    <Card interactive className={`h-full flex flex-col ${className}`}>
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {game.category}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-display font-bold text-gray-800 mb-2">{game.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{game.description}</p>
        <div className="flex flex-wrap gap-2">
          {game.skills.map((skill, index) => (
            <span 
              key={index} 
              className="text-xs bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GameCard;