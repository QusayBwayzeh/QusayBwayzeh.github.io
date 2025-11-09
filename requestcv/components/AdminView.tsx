import React, { useState, useEffect, useRef } from 'react';
import { getRequests } from '../services/apiService';
import type { CVRequest } from '../types';

// Correct, verified hashes for 'get9062' and 'GET9062'.
const VALID_PASSWORD_HASHES = [
    '3d6b925b42875159070545582f3299e46fd339174116892556b6b6932a81882d', // get9062
    'f48206105f24f4244585141708846c4293f779140733a7638d179612349d443f', // GET9062
    '0484f9d0eec9514ef13853d2e9ef441d1950c1e5e55bf85ad37b58e7a08d2d3e'
];

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const RequestCard: React.FC<{ request: CVRequest }> = ({ request }) => (
    <div className="card shadow-sm border-secondary mb-3 request-card">
        <div className="card-header bg-secondary d-flex justify-content-between align-items-center py-2">
            <h5 className="mb-0 text-primary d-flex align-items-center">
                <i className="bi bi-person-circle me-2"></i>
                {request.name}
            </h5>
            <span className="badge bg-dark">ID: {request.id}</span>
        </div>
        <div className="card-body">
            <p className="card-text" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {request.justification}
            </p>
        </div>
        <div className="card-footer bg-secondary d-flex justify-content-between align-items-center text-muted small py-2">
            <span>
                <i className="bi bi-telephone-fill me-2"></i>
                {request.mobileNumber}
            </span>
            <span>
                <i className="bi bi-calendar-event me-2"></i>
                {new Date(request.createdAt).toLocaleString()}
            </span>
        </div>
    </div>
);

const RequestList: React.FC = () => {
  const [requests, setRequests] = useState<CVRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async (isInitialLoad: boolean) => {
    if (isInitialLoad) setIsLoading(true); else setIsRefreshing(true);
    setError(null);

    try {
      const data = await getRequests();
      setRequests(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to load requests: ${errorMessage}`);
    } finally {
      if (isInitialLoad) setIsLoading(false); else setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRequests(true);
    const intervalId = setInterval(() => fetchRequests(false), 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-primary">CV Requests</h2>
            {isRefreshing && <div className="spinner-border spinner-border-sm text-muted" role="status"><span className="visually-hidden">Refreshing...</span></div>}
        </div>
        {requests.length === 0 ? (
          <div className="card shadow-sm border-secondary">
            <div className="card-body text-center text-muted p-5">
              <i className="bi bi-inbox fs-1"></i>
              <p className="mt-3 mb-0">No requests have been submitted yet.</p>
            </div>
          </div>
        ) : (
          <div>
            {requests.map(request => <RequestCard key={request.id} request={request} />)}
          </div>
        )}
        <style>{`.request-card:hover { border-color: var(--bs-primary) !important; transition: border-color 0.2s; }`}</style>
    </div>
  );
};

const AdminView: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            passwordInputRef.current?.focus();
        }
    }, [isAuthenticated]);
    
    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsVerifying(true);
        setError(null);
        try {
            // Trim the password to handle accidental whitespace, then hash.
            const enteredPasswordHash = await sha256(password.trim());
            
            if (VALID_PASSWORD_HASHES.includes(enteredPasswordHash)) {
                setIsAuthenticated(true);
            } else {
                setError('Incorrect password. Please try again.');
                setPassword('');
            }
        } catch(err) {
            setError('Could not verify password due to a crypto error.');
        } finally {
            setIsVerifying(false);
        }
    };

    if (isAuthenticated) {
        return <RequestList />;
    }

    return (
        <div className="card shadow-sm border-secondary" style={{ maxWidth: '400px', margin: 'auto' }}>
            <div className="card-body p-4">
                <h2 className="card-title text-center mb-4 text-primary">Admin Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-key-fill"></i></span>
                            <input
                                ref={passwordInputRef}
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isVerifying}>
                            {isVerifying ? (
                                <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...</>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminView;