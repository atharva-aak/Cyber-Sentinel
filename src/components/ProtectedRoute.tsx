import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../App';
import { Shield, Lock, BarChart3, Target, Trophy } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onShowAuth: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onShowAuth }) => {
  const { currentUser } = useAuth();
  const { isDarkMode } = useTheme();

  if (!currentUser) {
    return (
      <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Lock className="h-20 w-20 text-green-400" />
              <div className="absolute inset-0 h-20 w-20 bg-green-400/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <h2 className={`text-4xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Authentication Required
          </h2>
          
          <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Please sign in to access this section and unlock all cybersecurity learning features.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onShowAuth}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold rounded-lg hover:from-green-400 hover:to-green-300 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-400/30"
            >
              Sign In to Continue
            </button>
          </div>

          <div className={`mt-12 p-8 rounded-xl border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-900/50 border-green-400/20' 
              : 'bg-white border-green-500/30'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Sign In?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Track Progress</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Monitor your learning journey and simulation scores with detailed analytics</p>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Personalized Content</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Get AI-powered recommendations based on your skill level and performance</p>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Save Achievements</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Unlock achievements and track your cybersecurity expertise growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;