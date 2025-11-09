import React from 'react';
import type { View } from '../App';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  return (
    <header className="navbar navbar-expand-sm navbar-dark bg-secondary border-bottom border-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="#">Qusay's CV</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto nav-pills">
            <li className="nav-item">
              <button
                onClick={() => setCurrentView('form')}
                className={`nav-link ${currentView === 'form' ? 'active' : ''}`}
              >
                <i className="bi bi-file-earmark-text me-1"></i> Request Form
              </button>
            </li>
            <li className="nav-item ms-sm-2 mt-2 mt-sm-0">
              <button
                onClick={() => setCurrentView('admin')}
                className={`nav-link ${currentView === 'admin' ? 'active' : ''}`}
              >
                <i className="bi bi-shield-lock me-1"></i> Admin View
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;