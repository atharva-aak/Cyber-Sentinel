import React, { useState, createContext, useContext } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ThreatsSection from './components/ThreatsSection';
import SimulationsSection from './components/SimulationsSection';
import CyberLawsSection from './components/CyberLawsSection';
import PreventionSection from './components/PreventionSection';
import ProgressDashboard from './components/ProgressDashboard';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';

// Theme Context
const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
}>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'threats':
        return (
          <ProtectedRoute onShowAuth={() => setShowAuthModal(true)}>
            <ThreatsSection />
          </ProtectedRoute>
        );
      case 'simulations':
        return (
          <ProtectedRoute onShowAuth={() => setShowAuthModal(true)}>
            <SimulationsSection />
          </ProtectedRoute>
        );
      case 'laws':
        return (
          <ProtectedRoute onShowAuth={() => setShowAuthModal(true)}>
            <CyberLawsSection />
          </ProtectedRoute>
        );
      case 'prevention':
        return (
          <ProtectedRoute onShowAuth={() => setShowAuthModal(true)}>
            <PreventionSection />
          </ProtectedRoute>
        );
      case 'progress':
        return (
          <ProtectedRoute onShowAuth={() => setShowAuthModal(true)}>
            <ProgressDashboard />
          </ProtectedRoute>
        );
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <AuthProvider>
      <ProgressProvider>
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
          <div className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? 'bg-black' : 'bg-gray-50'
          }`}>
            <Header 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              onShowAuth={() => setShowAuthModal(true)}
            />
            <main>
              {renderSection()}
            </main>
            <Footer />
            
            <AuthModal 
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        </ThemeContext.Provider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;