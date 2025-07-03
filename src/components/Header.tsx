import React from 'react';
import { Shield, Menu, X, Sun, Moon, LogOut, User, BarChart3 } from 'lucide-react';
import { useTheme } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onShowAuth: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, onShowAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'threats', label: 'Cyber Threats' },
    { id: 'simulations', label: 'Simulations' },
    { id: 'laws', label: 'Cyber Laws' },
    { id: 'prevention', label: 'Prevention' },
  ];

  // Add progress dashboard to nav items if user is logged in
  if (currentUser) {
    navItems.push({ id: 'progress', label: 'Progress' });
  }

  const handleNavClick = (sectionId: string) => {
    if (sectionId !== 'home' && !currentUser) {
      onShowAuth();
      return;
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setActiveSection('home');
      setShowUserMenu(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className={`fixed top-0 w-full backdrop-blur-sm border-b z-50 shadow-lg transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black/95 border-green-400/30 shadow-green-400/10' 
        : 'bg-white/95 border-green-500/30 shadow-green-500/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setActiveSection('home')}
          >
            <Shield className="h-8 w-8 text-green-400 group-hover:text-green-300 transition-colors duration-200" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              Cyber Sentinel
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative flex items-center space-x-1 ${
                  activeSection === item.id
                    ? 'text-green-400 bg-green-400/10 shadow-lg shadow-green-400/20'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-400/5'
                } ${item.id !== 'home' && item.id !== 'progress' && !currentUser ? 'opacity-75' : ''}`}
              >
                {item.id === 'progress' && <BarChart3 className="h-4 w-4" />}
                <span>{item.label}</span>
                {item.id !== 'home' && item.id !== 'progress' && !currentUser && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                )}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-all duration-200 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/10'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-400/10'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-200 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/10'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-400/10'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{currentUser.displayName || 'User'}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="p-3 border-b border-gray-200/20">
                      <p className={`text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{currentUser.displayName}</p>
                      <p className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveSection('progress');
                        setShowUserMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-green-400' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                      }`}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>View Progress</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
                      }`}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onShowAuth}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-black font-medium rounded-lg hover:from-green-400 hover:to-green-300 transition-all duration-200"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-all duration-200 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/10'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-400/10'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {currentUser ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`p-2 rounded-md transition-all duration-200 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/10'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-400/10'
                }`}
              >
                <User className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={onShowAuth}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-400 text-black text-sm font-medium rounded-lg hover:from-green-400 hover:to-green-300 transition-all duration-200"
              >
                Sign In
              </button>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-all duration-200 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/10'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-400/10'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 border transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-900/90 border-green-400/20'
                : 'bg-white/90 border-green-500/20'
            }`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 relative flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'text-green-400 bg-green-400/10'
                      : isDarkMode
                      ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-400/5'
                  } ${item.id !== 'home' && item.id !== 'progress' && !currentUser ? 'opacity-75' : ''}`}
                >
                  {item.id === 'progress' && <BarChart3 className="h-4 w-4" />}
                  <span>{item.label}</span>
                  {item.id !== 'home' && item.id !== 'progress' && !currentUser && (
                    <div className="absolute top-2 right-3 w-2 h-2 bg-yellow-400 rounded-full"></div>
                  )}
                </button>
              ))}
              
              {currentUser && (
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-red-400 hover:bg-red-400/5' 
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-400/5'
                  }`}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile User Menu */}
        {showUserMenu && currentUser && (
          <div className={`md:hidden absolute right-4 top-16 w-48 rounded-lg border shadow-lg transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-3 border-b border-gray-200/20">
              <p className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{currentUser.displayName}</p>
              <p className={`text-xs transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>{currentUser.email}</p>
            </div>
            <button
              onClick={() => {
                setActiveSection('progress');
                setShowUserMenu(false);
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-green-400' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>View Progress</span>
            </button>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
              }`}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;