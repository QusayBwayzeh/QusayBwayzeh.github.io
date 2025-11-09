import React, { useState, useEffect, useCallback } from 'react';
import { getRequests } from '../services/apiService';
import type { CVRequest } from '../types';

const ADMIN_PASSWORD = 'get9062';

const AdminView: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        
        // Simple password check
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            setError('Incorrect password. Please try again.');
        }

        setIsLoggingIn(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto mt-10 animate-fade-in">
                <div className="bg-surface rounded-xl shadow-2xl p-8 border border-outline">
                    <h2 className="text-center text-2xl font-bold text-on-surface">Admin Access</h2>
                    <p className="text-center text-sm text-on-surface-variant mt-1">Enter password to view requests.</p>
                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none block w-full px-3 py-3 border border-outline rounded-md shadow-sm placeholder-on-surface-variant focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-on-surface transition-colors"
                                placeholder="Password"
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <button type="submit" disabled={isLoggingIn} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors disabled:bg-gray-600">
                            {isLoggingIn ? 'Verifying...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <RequestList />;
};

const RequestList: React.FC = () => {
    const [requests, setRequests] = useState<CVRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
            const data = await getRequests();
            setRequests(data);
        } catch (err) {
            setFetchError('Failed to fetch requests.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    if (isLoading) {
        return (
            <div className="text-center p-10">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-on-surface-variant">Loading Requests...</p>
            </div>
        );
    }

    if (fetchError) {
        return <p className="text-center text-red-500">{fetchError}</p>;
    }
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-3xl font-bold text-on-surface">CV Requests</h2>
                 <button onClick={fetchRequests} disabled={isLoading} className="p-2 rounded-full hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-wait" aria-label="Refresh requests">
                    <RefreshIcon className={`h-6 w-6 text-on-surface-variant ${isLoading ? 'animate-spin' : ''}`} />
                 </button>
            </div>
           
            {requests.length === 0 ? (
                <div className="text-center py-16 bg-surface rounded-lg shadow-md border border-outline">
                    <DocumentIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-sm font-medium text-on-surface">No requests</h3>
                    <p className="mt-1 text-sm text-on-surface-variant">There are currently no CV requests to display.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {requests.map((req, index) => (
                        <div key={req.id} 
                             className="bg-surface rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1 animate-slide-up border border-outline"
                             style={{ animationDelay: `${index * 50}ms` }}>
                            <div className="p-6">
                                 <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                                        {new Date(req.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <div className="space-y-4">
                                     <div className="flex items-center space-x-3">
                                        <UserIcon className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-on-surface-variant">Name</p>
                                            <p className="font-semibold text-lg text-on-surface">{req.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-on-surface-variant">Mobile</p>
                                            <p className="font-semibold text-lg text-on-surface">{req.mobileNumber}</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start space-x-3">
                                        <ChatBubbleIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-sm text-on-surface-variant">Justification</p>
                                            <p className="text-on-surface-variant">
                                                {req.justification}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.917-.464-1.257A9.037 9.037 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183" />
  </svg>
);

const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);


export default AdminView;