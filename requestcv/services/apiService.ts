import type { CVRequest, CVRequestData } from '../types';

const API_URL = "https://requestcv.runasp.net/api/request";

export const submitRequest = async (data: CVRequestData): Promise<{ success: boolean }> => {
    console.log('Submitting request to API:', data);
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        let errorMessage = 'Failed to submit request. Please try again.';
        try {
            // Try to parse the error response from the server
            const errorData = await response.json();
            if (errorData && (errorData.message || (errorData.errors && Object.keys(errorData.errors).length > 0))) {
                errorMessage = errorData.message || Object.values(errorData.errors).flat().join(' ');
            }
        } catch (e) {
            // The response might not be JSON, fall back to status text
            errorMessage = response.statusText;
        }
        console.error('API submission error:', errorMessage);
        throw new Error(errorMessage);
    }

    return { success: true };
};

export const getRequests = async (): Promise<CVRequest[]> => {
    console.log('Fetching requests from API...');
    
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('API fetch error:', response.statusText);
        throw new Error('Failed to fetch requests.');
    }

    const data: CVRequest[] = await response.json();
    // Sort by createdAt descending to show the newest requests first
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};