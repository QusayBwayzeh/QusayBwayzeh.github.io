import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RequestForm from './components/RequestForm';
import AdminView from './components/AdminView';

export type View = 'form' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('form');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayView, setDisplayView] = useState<View>('form');

  const handleSetView = (view: View) => {
    if (view === currentView) return;
    setIsAnimating(true);
    setCurrentView(view);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setDisplayView(currentView);
        setIsAnimating(false);
      }, 200); // Half of the animation duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating, currentView]);

  return (
    <div>
      <Header currentView={currentView} setCurrentView={handleSetView} />
      <main className="container my-4">
        <div className={`view-container ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            {displayView === 'form' ? <RequestForm /> : <AdminView />}
        </div>
      </main>
    </div>
  );
};

export default App;