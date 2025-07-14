import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: '#0d0d0d', // softened black
        color: '#f2f2f2',            // softened white
        fontFamily: "'Inter', sans-serif",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        style={{
          fontSize: '6rem',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: '#f2f2f2', // off-white heading
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        InboxZen
      </motion.h1>

      <motion.p
        style={{
          fontSize: '1.5rem',
          textAlign: 'center',
          maxWidth: '600px',
          marginTop: '1rem',
          fontWeight: 500,
          color: '#bfbfbf', // softer gray
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Your calm corner for chaotic email threads.
      </motion.p>
    </motion.div>
  );
};

export default LandingScreen;
