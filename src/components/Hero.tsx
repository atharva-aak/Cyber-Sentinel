import React from 'react';
import { Shield, Zap, Users, BookOpen, Play, Lock, Eye, AlertTriangle } from 'lucide-react';
import { useTheme } from '../App';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className={`pt-20 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="h-20 w-20 text-green-400 animate-pulse" />
                <div className="absolute inset-0 h-20 w-20 text-green-400 animate-ping opacity-20">
                  <Shield className="h-20 w-20" />
                </div>
                <div className="absolute inset-0 h-20 w-20 bg-green-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                Cyber Sentinel
              </span>
              <br />
              <span className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Defend Your Digital World
              </span>
            </h1>
            
            <p className={`text-xl mb-8 max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Master cybersecurity through interactive learning. Understand threats, explore cyber laws, 
              and experience realistic simulations to become a digital guardian.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={() => setActiveSection('threats')}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold rounded-lg hover:from-green-400 hover:to-green-300 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-400/30"
              >
                Start Learning
              </button>
              <button 
                onClick={() => setActiveSection('simulations')}
                className="px-8 py-3 border-2 border-green-400 text-green-400 font-semibold rounded-lg hover:bg-green-400 hover:text-black transition-all duration-200 shadow-lg shadow-green-400/20"
              >
                Try Simulation
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className={`backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 group hover:shadow-lg ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40 hover:shadow-green-400/10' 
                : 'bg-white/70 border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/10'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-green-400/10 group-hover:bg-green-400/20' 
                    : 'bg-green-500/10 group-hover:bg-green-500/20'
                }`}>
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className={`text-xl font-semibold ml-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Interactive Learning</h3>
              </div>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Experience hands-on simulations of real cyber attacks and learn how to defend against them.
              </p>
            </div>

            <div className={`backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 group hover:shadow-lg ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40 hover:shadow-green-400/10' 
                : 'bg-white/70 border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/10'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-green-400/10 group-hover:bg-green-400/20' 
                    : 'bg-green-500/10 group-hover:bg-green-500/20'
                }`}>
                  <BookOpen className="h-6 w-6 text-green-400" />
                </div>
                <h3 className={`text-xl font-semibold ml-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Comprehensive Education</h3>
              </div>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Learn about various cyber threats, from phishing to advanced persistent threats.
              </p>
            </div>

            <div className={`backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 group hover:shadow-lg ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40 hover:shadow-green-400/10' 
                : 'bg-white/70 border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/10'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-green-400/10 group-hover:bg-green-400/20' 
                    : 'bg-green-500/10 group-hover:bg-green-500/20'
                }`}>
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <h3 className={`text-xl font-semibold ml-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Expert Knowledge</h3>
              </div>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Access expert insights on cyber laws, compliance, and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cybersecurity Video Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100/50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Understanding Cybersecurity
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Watch this comprehensive introduction to cybersecurity fundamentals and learn why digital protection is crucial in today's world.
            </p>
          </div>

          <div className={`relative rounded-2xl border overflow-hidden shadow-2xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-900/50 border-green-400/30 shadow-green-400/10' 
              : 'bg-white/70 border-green-500/30 shadow-green-500/10'
          }`}>
            <div className="aspect-video relative">
              {/* Real Cybersecurity Video */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/inWWhr5tnEA"
                title="Cybersecurity Fundamentals - Complete Guide"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
              
              {/* Video Overlay Info */}
              <div className={`absolute top-4 left-4 backdrop-blur-sm rounded-lg px-3 py-2 border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-black/80 border-green-400/30' 
                  : 'bg-white/80 border-green-500/30'
              }`}>
                <span className="text-green-400 text-sm font-medium">Educational Content</span>
              </div>
              
              <div className={`absolute bottom-4 right-4 backdrop-blur-sm rounded-lg px-3 py-2 border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-black/80 border-green-400/30' 
                  : 'bg-white/80 border-green-500/30'
              }`}>
                <span className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>HD Quality</span>
              </div>
            </div>
          </div>

          {/* Video Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40' 
                : 'bg-white/70 border-green-500/30 hover:border-green-500/50'
            }`}>
              <div className="flex items-center mb-3">
                <Lock className="h-6 w-6 text-green-400 mr-3" />
                <h4 className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Data Protection</h4>
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Learn how to secure your personal and business data from cyber threats.</p>
            </div>

            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40' 
                : 'bg-white/70 border-green-500/30 hover:border-green-500/50'
            }`}>
              <div className="flex items-center mb-3">
                <Eye className="h-6 w-6 text-green-400 mr-3" />
                <h4 className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Threat Detection</h4>
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Identify and recognize common cybersecurity threats before they strike.</p>
            </div>

            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40' 
                : 'bg-white/70 border-green-500/30 hover:border-green-500/50'
            }`}>
              <div className="flex items-center mb-3">
                <Shield className="h-6 w-6 text-green-400 mr-3" />
                <h4 className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Defense Strategies</h4>
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Implement effective security measures to protect your digital assets.</p>
            </div>

            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40' 
                : 'bg-white/70 border-green-500/30 hover:border-green-500/50'
            }`}>
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-6 w-6 text-green-400 mr-3" />
                <h4 className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Incident Response</h4>
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Know how to respond quickly and effectively when security incidents occur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-green-500/10 to-black' 
          : 'bg-gradient-to-r from-green-500/10 to-gray-100'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Secure Your Digital Future?
          </h2>
          <p className={`text-xl mb-8 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of learners who have strengthened their cybersecurity knowledge through our interactive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveSection('threats')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-400 text-black font-bold rounded-lg hover:from-green-400 hover:to-green-300 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-400/30"
            >
              Explore Cyber Threats
            </button>
            <button 
              onClick={() => setActiveSection('simulations')}
              className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg hover:bg-green-400 hover:text-black transition-all duration-200"
            >
              Start Interactive Simulations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;