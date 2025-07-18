import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Target, Users, Lightbulb, Calculator, BookOpen, Microscope, Puzzle, Palette, Rocket, Shield } from 'lucide-react';
import Section from '../components/ui/Section';
import FeatureCard from '../components/ui/FeatureCard';
import Card from '../components/ui/Card';

const OurApproach: React.FC = () => {
  const principles = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Brain-Based Learning",
      description: "Our games are designed based on cognitive development research to maximize learning potential at each stage."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Emotional Engagement",
      description: "We create positive emotional connections to learning through celebration, encouragement, and achievement."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Active Participation",
      description: "Interactive gameplay keeps children engaged and motivated to explore, experiment, and discover."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Progressive Challenge",
      description: "Adaptive difficulty ensures appropriate challenges that build confidence while promoting growth."
    }
  ];

  const subjects = [
    {
      icon: <Calculator className="w-12 h-12" />,
      title: "Mathematics",
      description: "Number recognition, counting, basic operations, patterns, and logical reasoning",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Language Arts",
      description: "Letter recognition, phonics, vocabulary building, reading comprehension, and communication skills",
      color: "from-green-400 to-green-600"
    },
    {
      icon: <Microscope className="w-12 h-12" />,
      title: "Science",
      description: "Natural world exploration, cause and effect, observation skills, and scientific thinking",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: <Puzzle className="w-12 h-12" />,
      title: "Logic & Reasoning",
      description: "Problem-solving, critical thinking, pattern recognition, and analytical skills",
      color: "from-red-400 to-red-600"
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Creativity",
      description: "Artistic expression, imagination, creative thinking, and self-expression",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Social-Emotional",
      description: "Empathy, cooperation, emotional intelligence, and social skills development",
      color: "from-teal-400 to-teal-600"
    }
  ];

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
            Our Educational Philosophy
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            At TinyNinza, we believe that learning should be joyful, meaningful, and effective. Our approach combines proven educational methodologies with engaging gameplay to create an optimal learning environment for young minds.
          </motion.p>
        </div>
      </Section>

      {/* Core Principles */}
      <Section 
        title="Our Core Learning Principles" 
        subtitle="The foundation of every TinyNinza game is built on these key educational principles"
        centered
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {principles.map((principle, index) => (
            <FeatureCard
              key={index}
              icon={principle.icon}
              title={principle.title}
              description={principle.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Learning Through Play */}
      <Section className="bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-800 mb-6">
              Why Learning Through Play Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Lightbulb className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Natural Learning State</h3>
                  <p className="text-gray-600">Children learn best when they're relaxed, engaged, and having fun. Play creates the optimal emotional state for memory formation and skill development.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Multi-Sensory Engagement</h3>
                  <p className="text-gray-600">Interactive games engage multiple senses simultaneously, creating stronger neural pathways and improving retention of learned concepts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Intrinsic Motivation</h3>
                  <p className="text-gray-600">Games naturally motivate children to persist through challenges, building resilience and a growth mindset toward learning.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Children learning through play"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-20" />
          </motion.div>
        </div>
      </Section>

      {/* Subject Areas */}
      <Section 
        title="Comprehensive Learning Areas" 
        subtitle="Our curriculum covers all essential areas of early childhood development"
        centered
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
                  {subject.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-gray-800 mb-4">
                  {subject.title}
                </h3>
                <p className="text-gray-600">
                  {subject.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Safety & Privacy */}
      <Section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Safety & Privacy First
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We're committed to providing a completely safe digital environment for children. TinyNinza is 100% ad-free, contains no in-app purchases, and never collects personal information. Your child can explore and learn with complete peace of mind.
          </motion.p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Ad-Free</h3>
              <p className="opacity-90">No advertisements or external distractions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Child-Safe Content</h3>
              <p className="opacity-90">All content reviewed by education experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Privacy Protected</h3>
              <p className="opacity-90">No personal data collection or sharing</p>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default OurApproach;