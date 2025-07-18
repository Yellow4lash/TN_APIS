import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Users, Award, Download, Heart } from 'lucide-react';
import Section from '../components/ui/Section';
import FeatureCard from '../components/ui/FeatureCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import NewsletterSignup from '../components/ui/NewsletterSignup';
import Button from '../components/ui/Button';
import { testimonials } from '../data/testimonials';

const ForParents: React.FC = () => {
  const parentBenefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Safe Environment",
      description: "Ad-free, no in-app purchases, and completely child-safe content reviewed by education experts."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Curriculum-Aligned",
      description: "All games align with early childhood education standards and support what children learn in school."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Teacher Recommended",
      description: "Designed in collaboration with educators and recommended by teachers nationwide."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your child's learning progress and see which skills they're developing."
    }
  ];

  const educatorFeatures = [
    {
      title: "Classroom Integration",
      description: "Easy to implement in classroom settings with activities that complement your curriculum.",
      icon: "🏫"
    },
    {
      title: "Learning Reports",
      description: "Detailed insights into student progress and areas that may need additional attention.",
      icon: "📊"
    },
    {
      title: "Differentiated Learning",
      description: "Adaptive games that meet students at their individual learning levels.",
      icon: "🎯"
    },
    {
      title: "Offline Access",
      description: "Many games work offline, perfect for classrooms with limited internet access.",
      icon: "📱"
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
            Supporting Early Learning
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            TinyNinza provides parents and educators with powerful tools to support children's educational journey through safe, engaging, and effective digital learning experiences.
          </motion.p>
        </div>
      </Section>

      {/* For Parents Section */}
      <Section 
        title="Why Parents Choose TinyNinza" 
        subtitle="Everything you need to feel confident about your child's digital learning experience"
        centered
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {parentBenefits.map((benefit, index) => (
            <FeatureCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Safety Information */}
      <Section className="bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-800 mb-6">
              Your Child's Safety is Our Priority
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-success-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">No Advertisements</h3>
                  <p className="text-gray-600">Completely ad-free environment with no distracting or inappropriate content.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-success-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Age-Appropriate Content</h3>
                  <p className="text-gray-600">All content is carefully curated and reviewed by child development experts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-success-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Privacy Protected</h3>
                  <p className="text-gray-600">We never collect personal information and comply with all child privacy regulations.</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button color="primary" size="lg" icon={<Download className="w-5 h-5" />}>
                Download Safety Guide (PDF)
              </Button>
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
              src="https://images.pexels.com/photos/4144101/pexels-photo-4144101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Parent and child using TinyNinza safely"
              className="rounded-2xl shadow-xl w-full"
            />
          </motion.div>
        </div>
      </Section>

      {/* For Educators Section */}
      <Section 
        title="Designed for Educators" 
        subtitle="Powerful tools to enhance your classroom learning environment"
        centered
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {educatorFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-display font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button color="secondary" size="lg" icon={<Download className="w-5 h-5" />}>
            Download Educator Guide
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section 
        title="What Parents & Teachers Say" 
        subtitle="Real experiences from families and educators using TinyNinza"
        centered
        className="bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
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

      {/* Newsletter Signup */}
      <Section className="bg-white">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
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
            Join Thousands of Satisfied Families
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Give your child the gift of joyful learning with TinyNinza's safe, educational games.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button color="white" size="lg" to="/pricing">
              Start Free Trial Today
            </Button>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default ForParents;