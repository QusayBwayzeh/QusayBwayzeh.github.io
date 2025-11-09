import React, { useState } from 'react';
import { submitRequest } from '../services/apiService';

const RequestForm: React.FC = () => {
    const [name, setName] = useState('');
    const [justification, setJustification] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        setIsSubmitted(false);

        if (!name || !justification || !mobileNumber) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            await submitRequest({ name, justification, mobileNumber });
            setIsSubmitted(true);
            setName('');
            setJustification('');
            setMobileNumber('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto animate-fade-in text-center">
                <div className="bg-surface rounded-xl shadow-2xl p-8 border border-outline">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-900 mb-4">
                        <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Request Submitted!</h2>
                    <p className="mt-2 text-on-surface-variant">Thank you, the request submitted successfully, you will receive the CV through WhatsApp once the request is approved.</p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors"
                    >
                        Submit Another Request
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline">
                <div className="p-8">
                    <h2 className="text-center text-3xl font-extrabold text-on-surface">Request for Qusay's CV</h2>
                    <p className="mt-2 text-center text-sm text-on-surface-variant">
                        Please fill in the details below to proceed.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">Your Name</label>
                                <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                                className="appearance-none relative block w-full px-3 py-3 border border-outline placeholder-on-surface-variant text-on-surface bg-background rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" placeholder="Your Name" />
                            </div>
                             <div>
                                <label htmlFor="mobileNumber" className="sr-only">Mobile Number</label>
                                <input id="mobileNumber" name="mobileNumber" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required 
                                pattern="\+?\d{10,15}"
                                title="Please enter a valid international mobile number with country code, e.g., +962791234567"
                                className="appearance-none relative block w-full px-3 py-3 border border-outline placeholder-on-surface-variant text-on-surface bg-background rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" placeholder="Mobile Number (e.g., +962...)" />
                            </div>
                            <div>
                                <label htmlFor="justification" className="sr-only">Justification</label>
                                <textarea id="justification" name="justification" rows={4} value={justification} onChange={(e) => setJustification(e.target.value)} required 
                                className="appearance-none relative block w-full px-3 py-3 border border-outline placeholder-on-surface-variant text-on-surface bg-background rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" placeholder="Justification for request..." />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500 text-center animate-fade-in">{error}</p>}

                        <div>
                            <button type="submit" disabled={isLoading} 
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Request'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestForm;