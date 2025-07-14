// src/components/OCRUploader.jsx
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRUploader = ({ onExtractedText }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m), // logs progress
      });

      const text = result.data.text;
      onExtractedText(text); // send to parent
    } catch (err) {
      console.error("❌ OCR failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center mt-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>🔄 Extracting text...</p>}
      {imagePreview && <img src={imagePreview} alt="Uploaded" width="200" />}
    </div>
  );
};

export default OCRUploader;
