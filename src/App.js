import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';

import LandingScreen from './components/LandingScreen';
import EmailInput from './components/EmailInput';
import OCRUploader from './components/OCRUploader';
import summarizeEmail from './api/summarize';

import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles/DarkTheme.css'; // 🔥 Include the style

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [ocrSummary, setOcrSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOCRExtract = async (text) => {
    setIsLoading(true);
    try {
      const summary = await summarizeEmail(text);
      setOcrSummary(summary);
    } catch (err) {
      console.error("❌ Error summarizing:", err);
    }
    setIsLoading(false);
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <LandingScreen onFinish={() => setShowLanding(false)} />
      ) : (
        <motion.div
          className="dark-background min-vh-100 py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                <h1 className="text-center mb-4 text-light display-5 fw-bold">📬 InboxZen</h1>

                <EmailInput />

                <hr className="my-4 border-light" />

                <h5 className="text-center mb-3 text-light">
                  📸 Or upload a screenshot to summarize:
                </h5>
                <OCRUploader onExtractedText={handleOCRExtract} />

                {isLoading && <p className="text-center text-light mt-3">⏳ Summarizing image...</p>}

                {ocrSummary && !isLoading && (
                  <motion.div
                    className="card mt-4 p-3 bg-dark border-light text-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h5>🧠 Summary from Image:</h5>
                    <p>{ocrSummary}</p>
                    <div className="d-flex gap-2 mt-2">
                      <Button variant="secondary" onClick={() => speakText(ocrSummary)}>
                        🔊 Speak
                      </Button>
                      <Button variant="outline-danger" onClick={stopSpeaking}>
                        🛑 Stop
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Col>
            </Row>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
