import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Loader from './Loader';
import SummaryCard from './SummaryCard';
import summarizeEmail from '../api/summarize';
import '../styles/DarkTheme.css'; // 👈 Make sure to create this

const EmailInput = () => {
  const [emailText, setEmailText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!emailText.trim()) return;
    setLoading(true);
    setSummary('');

    try {
      const result = await summarizeEmail(emailText);
      setSummary(result);
    } catch (err) {
      setSummary('⚠️ Failed to summarize. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="email-input-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="mb-4 dark-card">
        <Card.Body>
          <Form>
            <Form.Group controlId="emailTextarea">
              <Form.Label className="form-label-light">Paste your email thread</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={emailText}
                className="dark-textarea"
                placeholder="e.g. Dear Team, Following up on the last meeting..."
                onChange={(e) => setEmailText(e.target.value)}
              />
            </Form.Group>

            <Button
              className="mt-3"
              variant="light"
              onClick={handleSummarize}
              disabled={loading || !emailText.trim()}
            >
              ✂️ Summarize
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {loading && <Loader />}
      {summary && <SummaryCard summary={summary} />}
    </motion.div>
  );
};

export default EmailInput;
