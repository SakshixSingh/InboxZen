import React from 'react';
import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';

const SummaryCard = ({ summary }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-sm summary-card">
        <Card.Header className="fw-bold">🧠 Summary</Card.Header>
        <Card.Body>
          <p style={{ whiteSpace: 'pre-line' }}>{summary}</p>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default SummaryCard;
