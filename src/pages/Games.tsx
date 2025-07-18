import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import Section from '../components/ui/Section';
import GameCard from '../components/ui/GameCard';
import Button from '../components/ui/Button';
import { games, categories } from '../data/games';

const Games: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold text-primary-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            44 Educational Games
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Discover our complete collection of curriculum-aligned games designed to make learning fun and effective for children aged 3-8.
          </motion.p>
        </div>
      </Section>

      {/* Filters and Search */}
      <Section className="bg-white pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Games
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500 text-lg">No games found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                }}
                color="primary"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </Section>

      {/* Game Categories Overview */}
      <Section 
        title="Learning Categories" 
        subtitle="Each category is designed to build specific skills and knowledge areas"
        centered
        className="bg-gray-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const categoryGames = games.filter(game => game.category === category);
            const categoryColors = {
              'Math': 'from-blue-400 to-blue-600',
              'Language': 'from-green-400 to-green-600',
              'Science': 'from-purple-400 to-purple-600',
              'Logic': 'from-red-400 to-red-600',
              'Creativity': 'from-pink-400 to-pink-600'
            };

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-400 to-gray-600'} rounded-xl mb-4`} />
                <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
                  {category}
                </h3>
                <p className="text-gray-600 mb-4">
                  {categoryGames.length} engaging games to master {category.toLowerCase()} skills
                </p>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  View {category} Games →
                </button>
              </motion.div>
            );
          })}
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
            Ready to Unlock All 44 Games?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Start your free trial today and give your child access to our complete library of educational games.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button color="white" size="lg" to="/pricing">
              Get Started
            </Button>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Games;