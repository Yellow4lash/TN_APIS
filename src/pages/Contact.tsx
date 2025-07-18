import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import ContactForm from '../components/ui/ContactForm';
import NewsletterSignup from '../components/ui/NewsletterSignup';
import Accordion from '../components/ui/Accordion';
import { faqs } from '../data/faqs';

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@tinyninja.com",
      action: "Send Email"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak with our support team",
      contact: "1-800-NINJA-FUN",
      action: "Call Now"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with us during business hours",
      contact: "Monday - Friday, 9AM - 6PM PST",
      action: "Start Chat"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Office Location",
      description: "Visit our headquarters",
      contact: "San Francisco, CA",
      action: "Get Directions"
    }
  ];

  const faqItems = faqs.map(faq => ({
    title: faq.question,
    content: <p className="text-gray-600">{faq.answer}</p>
  }));

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
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Have questions about TinyNinza? We're here to help! Reach out to our support team or browse our frequently asked questions below.
          </motion.p>
        </div>
      </Section>

      {/* Contact Methods */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {method.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {method.description}
                </p>
                <p className="font-medium text-gray-800 mb-4">
                  {method.contact}
                </p>
                <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  {method.action} →
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-bold text-primary-800 mb-6">
                Send us a Message
              </h2>
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-primary-800 mb-6">
                  Stay Connected
                </h2>
                <NewsletterSignup />
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-display font-bold text-gray-800 mb-4">
                  Response Times
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email Support</span>
                    <span className="font-medium text-gray-800">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Live Chat</span>
                    <span className="font-medium text-gray-800">Immediate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone Support</span>
                    <span className="font-medium text-gray-800">Business hours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section 
        title="Frequently Asked Questions" 
        subtitle="Find quick answers to common questions about TinyNinza"
        centered
        className="bg-gray-50"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Accordion items={faqItems} />
          </motion.div>
        </div>
      </Section>

      {/* Support Hours */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-2xl font-display font-bold text-primary-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Support Hours
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="font-bold text-gray-800 mb-2">Email Support</h3>
              <p className="text-gray-600">24/7 • Responses within 24 hours</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800 mb-2">Live Chat & Phone</h3>
              <p className="text-gray-600">Monday - Friday<br />9:00 AM - 6:00 PM PST</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800 mb-2">Emergency Support</h3>
              <p className="text-gray-600">Critical issues • 24/7 availability</p>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;