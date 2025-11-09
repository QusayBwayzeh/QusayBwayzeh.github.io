import React from 'react';
import type { View } from '../App';
import { DocumentIcon } from './icons/DocumentIcon';
import { AdminIcon } from './icons/AdminIcon';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItemClasses = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeClasses = "bg-primary text-black";
  const inactiveClasses = "text-on-surface-variant hover:bg-surface/50 hover:text-on-surface";

  return (
    <header className="bg-surface shadow-lg border-b border-outline">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-on-surface tracking-wider">RequestCV</h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setCurrentView('form')}
                className={`${navItemClasses} ${currentView === 'form' ? activeClasses : inactiveClasses}`}
              >
                <DocumentIcon className="h-5 w-5" />
                <span>Request Form</span>
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`${navItemClasses} ${currentView === 'admin' ? activeClasses : inactiveClasses}`}
              >
                <AdminIcon className="h-5 w-5" />
                <span>Admin View</span>
              </button>
            </div>
          </div>
           <div className="md:hidden flex items-center">
            <button onClick={() => setCurrentView('form')} className={`p-2 rounded-md ${currentView === 'form' ? 'text-black bg-primary' : 'text-on-surface-variant'}`}>
                <DocumentIcon className="h-6 w-6" />
            </button>
             <button onClick={() => setCurrentView('admin')} className={`p-2 rounded-md ${currentView === 'admin' ? 'text-black bg-primary' : 'text-on-surface-variant'}`}>
                <AdminIcon className="h-6 w-6" />
            </button>
           </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;