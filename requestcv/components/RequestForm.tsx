import React, { useState, useEffect } from 'react';
import { submitRequest } from '../services/apiService';
import type { CVRequestData } from '../types';
import { GoogleGenAI } from "@google/genai";

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState<CVRequestData>({
    name: '',
    justification: '',
    mobileNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (submitStatus) {
      setShowAlert(true);
      const timer = setTimeout(() => {
          setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImproveJustification = async () => {
    if (!formData.justification) return;
    setIsImproving(true);
    setSubmitStatus(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const model = 'gemini-2.5-flash';
      const prompt = `Rewrite and improve the following justification for a CV request to be more professional and compelling. Return only the improved text, without any introductory phrases like "Here is the improved text:":\n\n"${formData.justification}"`;
      
      const response = await ai.models.generateContent({ model, contents: prompt });
      const improvedText = response.text;
      
      setFormData(prevState => ({ ...prevState, justification: improvedText.trim() }));
    } catch (error) {
      console.error('Error improving justification:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setSubmitStatus({ success: false, message: `Failed to improve justification: ${errorMessage}` });
    } finally {
      setIsImproving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await submitRequest(formData);
      setSubmitStatus({ success: true, message: "Thank you, the request submitted successfully, you will receive the CV through WhatsApp once the request is approved" });
      setFormData({ name: '', justification: '', mobileNumber: '' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        setSubmitStatus({ success: false, message: `Submission failed: ${errorMessage}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm border-secondary" style={{ maxWidth: '600px', margin: 'auto' }}>
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4 text-primary">Request for Qusay's CV</h2>
        {showAlert && submitStatus && (
          <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'} alert-enter alert-enter-active`} role="alert">
            {submitStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jane Doe"
                />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="justification" className="form-label">Justification</label>
            <div className="input-group">
                <span className="input-group-text"><i className="bi bi-text-paragraph"></i></span>
                <textarea
                  className="form-control"
                  id="justification"
                  name="justification"
                  rows={4}
                  value={formData.justification}
                  onChange={handleChange}
                  required
                  placeholder="Briefly explain why you are requesting the CV..."
                ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm mt-2"
              onClick={handleImproveJustification}
              disabled={isImproving || !formData.justification || isSubmitting}
            >
              {isImproving ? (
                <><span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>Improving...</>
              ) : (
                <><i className="bi bi-stars me-1"></i>Improve with AI</>
              )}
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">International Mobile Number</label>
            <div className="input-group">
                 <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
                <input
                  type="tel"
                  className="form-control"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  pattern="^\+[1-9]\d{1,14}$"
                  placeholder="+[Country Code][Number]"
                  title="Please enter the number in international format, e.g., +14155552671"
                />
            </div>
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...</>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;