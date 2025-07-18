import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Testimonial } from '../../types';

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className = '' }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <svg className="h-8 w-8 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{testimonial.content}</p>
        <div className="flex items-center">
          {testimonial.imageUrl && (
            <img 
              src={testimonial.imageUrl} 
              alt={testimonial.name} 
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          )}
          <div>
            <p className="font-bold text-gray-800">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;