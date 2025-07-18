import React from 'react';
import { motion } from 'framer-motion';
import { Play, Shield, Star, Users, Brain, Gamepad2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import FeatureCard from '../components/ui/FeatureCard';
import GameCard from '../components/ui/GameCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import AppStoreBadge from '../components/ui/AppStoreBadge';
import { games } from '../data/games';
import { testimonials } from '../data/testimonials';

const Home: React.FC = () => {
  const featuredGames = games.slice(0, 4);
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Curriculum-Aligned Learning",
      description: "44 educational games covering math, language, science, logic, and creativity"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Safe & Ad-Free",
      description: "Child-safe environment with no ads, in-app purchases, or external links"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Engaging Gameplay",
      description: "Fun, interactive games that keep children motivated to learn and explore"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Teacher Approved",
      description: "Designed by educators and aligned with early childhood learning standards"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <motion.h1 
                className="text-4xl md:text-6xl font-display font-bold text-primary-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Learn through Play,{' '}
                <span className="text-gradient bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent">
                  the Ninja Way!
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mt-6 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Educational games designed for children aged 3-8. Master foundational skills in math, language, science, and more through 44 engaging, curriculum-aligned adventures.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button color="primary" size="lg" icon={<Play className="w-5 h-5" />} to="/pricing">
                Get Started
              </Button>
              <Button color="secondary" size="lg" variant="outline">
                Watch Demo
              </Button>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="flex space-x-2">
                <AppStoreBadge store="apple" />
                <AppStoreBadge store="google" />
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">4.8/5 rating • 10,000+ downloads</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full opacity-20"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full opacity-20"
              />
              <img 
                src="https://images.pexels.com/photos/6424585/pexels-photo-6424585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Children learning with TinyNinza app"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Features Section */}
      <Section 
        title="Why Parents & Educators Love TinyNinza" 
        subtitle="Discover what makes our educational games perfect for young learners"
        centered
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Featured Games Section */}
      <Section 
        title="Featured Learning Games" 
        subtitle="Explore some of our most popular educational adventures"
        centered
        className="bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button color="primary" size="lg" to="/games">
              Explore All 44 Games
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section 
        title="What Parents & Teachers Say" 
        subtitle="Real feedback from families and educators using TinyNinza"
        centered
        className="bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Child's Learning Adventure?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of families who trust TinyNinza for safe, educational fun. Start your free trial today!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-4">
              <AppStoreBadge store="apple" />
              <AppStoreBadge store="google" />
            </div>
            <Button color="white" size="lg" to="/pricing">
              Get Started
            </Button>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Home;