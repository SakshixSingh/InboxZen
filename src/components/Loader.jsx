import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center my-4">
      <motion.div
        className="spinner-border text-primary"
        role="status"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <span className="visually-hidden">Loading...</span>
      </motion.div>
    </div>
  );
};

export default Loader;
