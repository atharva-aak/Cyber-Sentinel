import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../App';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black border-green-400/30' 
        : 'bg-white border-green-500/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                Cyber Sentinel
              </span>
            </div>
            <p className={`max-w-md transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Empowering individuals and organizations with the knowledge and tools needed to protect 
              against cyber threats in our increasingly digital world.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'
              }`}>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'
              }`}>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'
              }`}>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'
              }`}>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Learning</h3>
            <ul className={`space-y-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>Cyber Threats</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>Simulations</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>Prevention Tips</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>Best Practices</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Legal & Compliance</h3>
            <ul className={`space-y-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>Cyber Laws</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>GDPR Compliance</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>Privacy Policy</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500'
              }`}>Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div className={`border-t mt-12 pt-8 transition-colors duration-300 ${
          isDarkMode ? 'border-green-400/30' : 'border-green-500/30'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2025 Cyber Sentinel. All rights reserved.
            </p>
            <p className={`text-sm mt-4 md:mt-0 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Built with security and education in mind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;