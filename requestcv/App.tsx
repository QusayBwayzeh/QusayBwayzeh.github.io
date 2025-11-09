import React, { useState } from 'react';
import Header from './components/Header';
import RequestForm from './components/RequestForm';
import AdminView from './components/AdminView';

export type View = 'form' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('form');

  return (
    <div className="min-h-screen bg-background text-on-surface-variant font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === 'form' && <RequestForm />}
        {currentView === 'admin' && <AdminView />}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CV Request Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;