import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Download, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import AppStoreBadge from '../components/ui/AppStoreBadge';

const Success: React.FC = () => {
  useEffect(() => {
    // Add confetti effect or celebration animation here if desired
    console.log('Payment successful!');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 via-primary-50 to-secondary-50">
      <Section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-success-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
              Welcome to TinyNinza!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your subscription is now active. Let the learning adventure begin!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">
              What's Next?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Download the App</h3>
                <p className="text-gray-600 mb-4">
                  Get the TinyNinza app on your device to start playing educational games
                </p>
                <div className="flex flex-col space-y-2">
                  <AppStoreBadge store="apple" className="mx-auto" />
                  <AppStoreBadge store="google" className="mx-auto" />
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Explore 44 Games</h3>
                <p className="text-gray-600 mb-4">
                  Access our complete library of curriculum-aligned educational games
                </p>
                <Button color="secondary" size="sm" to="/games">
                  Browse Games
                </Button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Track Progress</h3>
                <p className="text-gray-600 mb-4">
                  Monitor your child's learning journey with detailed progress reports
                </p>
                <Button color="accent" size="sm" to="/dashboard">
                  View Progress
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl font-display font-bold mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Our support team is here to help you make the most of TinyNinza
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button color="white" size="lg" to="/contact">
                Contact Support
              </Button>
              <Button color="white" variant="outline" size="lg" to="/parents">
                Parent Guide
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12"
          >
            <p className="text-gray-600">
              Want to return to the homepage?{' '}
              <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
                Go to Home
              </Link>
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Success;