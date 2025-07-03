import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, AlertTriangle, Mail, Link, Wifi, Shield, Users, CreditCard, ArrowRight, Clock } from 'lucide-react';
import { useTheme } from '../App';
import { useProgress } from '../contexts/ProgressContext';

const SimulationsSection: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [simulationStep, setSimulationStep] = useState(0);
  const [userChoices, setUserChoices] = useState<{ choice: number; isCorrect: boolean }[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { isDarkMode } = useTheme();
  const { updateSimulationResult, progress } = useProgress();

  const simulations = [
    {
      id: 'phishing-email',
      title: 'Phishing Email Detection',
      description: 'Learn to identify suspicious emails and protect yourself from phishing attacks.',
      icon: Mail,
      difficulty: 'Beginner',
      duration: '5-7 minutes',
      steps: [
        {
          title: 'Email Analysis',
          content: `From: security@yourbank.com
Subject: URGENT: Account Verification Required

Dear Valued Customer,

We have detected suspicious activity on your account. To protect your funds, please verify your account immediately by clicking the link below:

VERIFY NOW: http://yourbank-security.verify-now.com/login

If you don't verify within 24 hours, your account will be suspended.

Best regards,
Security Team`,
          question: 'Does this email look suspicious to you?',
          options: ['Yes, this looks suspicious', 'No, this looks legitimate'],
          correctAnswer: 0,
          explanation: 'This email contains several red flags: urgent language, suspicious URL domain, threats of account suspension, and requests for immediate action.'
        },
        {
          title: 'URL Inspection',
          content: 'Let\'s examine the URL more closely: http://yourbank-security.verify-now.com/login',
          question: 'What makes this URL suspicious?',
          options: [
            'The domain doesn\'t match the bank\'s official domain',
            'It uses HTTP instead of HTTPS',
            'The subdomain structure looks suspicious',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'All these factors make the URL suspicious. Legitimate banks use their official domains and HTTPS for security.'
        },
        {
          title: 'Sender Verification',
          content: 'Looking at the email headers:\nReturn-Path: <noreply@phishing-site.ru>\nReceived: from unknown-server.suspicious-domain.com',
          question: 'What does this header information tell us?',
          options: [
            'The email is legitimate',
            'The return path doesn\'t match the sender domain',
            'The server information looks normal',
            'Headers don\'t matter for verification'
          ],
          correctAnswer: 1,
          explanation: 'The return path shows a completely different domain (.ru) than the claimed sender, indicating this is a spoofed email.'
        },
        {
          title: 'Best Response',
          content: 'You\'ve identified this as a phishing email. What should you do next?',
          question: 'What is the best course of action?',
          options: [
            'Delete the email and report it as spam',
            'Click the link to see what happens',
            'Forward it to friends as a warning',
            'Reply asking for more information'
          ],
          correctAnswer: 0,
          explanation: 'Delete and report the email. Never click suspicious links or engage with phishing attempts.'
        }
      ]
    },
    {
      id: 'wifi-security',
      title: 'Public Wi-Fi Security',
      description: 'Learn about the risks of public Wi-Fi and how to stay safe.',
      icon: Wifi,
      difficulty: 'Intermediate',
      duration: '8-10 minutes',
      steps: [
        {
          title: 'Network Selection',
          content: 'You\'re at a coffee shop and see these Wi-Fi networks:\n\n1. "CoffeeShop_Guest" (Password protected)\n2. "FREE_WIFI_HERE" (Open network)\n3. "CoffeeShop_5G" (Open network)\n4. "Guest_Network" (Password protected)',
          question: 'Which network should you choose?',
          options: [
            'FREE_WIFI_HERE - it\'s free and open',
            'CoffeeShop_Guest - password protected and official name',
            'CoffeeShop_5G - sounds like the fastest option',
            'Guest_Network - it\'s for guests'
          ],
          correctAnswer: 1,
          explanation: 'Choose the official, password-protected network. Open networks and suspicious names could be honeypots set up by attackers.'
        },
        {
          title: 'Activity Assessment',
          content: 'You\'re now connected to the coffee shop\'s Wi-Fi. Which activities are safe to do?',
          question: 'Select the safest activity on public Wi-Fi:',
          options: [
            'Check your bank account balance',
            'Browse news websites with HTTPS',
            'Enter credit card information for online shopping',
            'Access your company\'s internal systems'
          ],
          correctAnswer: 1,
          explanation: 'Browsing HTTPS websites for general content is relatively safe. Avoid financial transactions and sensitive data access on public networks.'
        },
        {
          title: 'Security Measures',
          content: 'You need to access sensitive information while on public Wi-Fi. What\'s the best approach?',
          question: 'How can you protect your data?',
          options: [
            'Use a VPN to encrypt your connection',
            'Make sure the website uses HTTPS',
            'Use your phone\'s hotspot instead',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'All these measures provide layers of security. VPNs encrypt traffic, HTTPS secures website connections, and mobile hotspots avoid public networks entirely.'
        },
        {
          title: 'Suspicious Activity',
          content: 'You notice your browser is showing certificate warnings and some websites look different than usual.',
          question: 'What might be happening?',
          options: [
            'Normal network issues',
            'Possible man-in-the-middle attack',
            'Website maintenance',
            'Browser needs updating'
          ],
          correctAnswer: 1,
          explanation: 'Certificate warnings and altered websites could indicate a MITM attack where someone is intercepting your traffic.'
        },
        {
          title: 'Response Protocol',
          content: 'You suspect a security issue with the network. What should you do immediately?',
          question: 'Best immediate response:',
          options: [
            'Continue browsing but be careful',
            'Disconnect immediately and use mobile data',
            'Clear browser cache and continue',
            'Switch to a different public network'
          ],
          correctAnswer: 1,
          explanation: 'Disconnect immediately when you suspect compromise. Use mobile data or a trusted network instead.'
        }
      ]
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering Defense',
      description: 'Recognize and defend against social engineering attacks.',
      icon: Users,
      difficulty: 'Advanced',
      duration: '10-12 minutes',
      steps: [
        {
          title: 'Phone Call Scenario',
          content: 'You receive a call: "Hi, this is Mike from IT support. We\'re having server issues and need to verify your login credentials to maintain your access. Can you provide your username and password?"',
          question: 'How should you respond?',
          options: [
            'Provide the information to help resolve the issue',
            'Ask for their employee ID and callback number',
            'Hang up and contact IT through official channels',
            'Give them your username but not password'
          ],
          correctAnswer: 2,
          explanation: 'Never provide credentials over the phone. Legitimate IT will never ask for passwords. Always verify through official channels.'
        },
        {
          title: 'Urgency Pressure',
          content: 'The caller becomes insistent: "This is urgent! If we don\'t get your credentials now, your account will be locked and you\'ll lose access to all your work files!"',
          question: 'This pressure tactic is designed to:',
          options: [
            'Help you understand the severity',
            'Make you act without thinking',
            'Show they\'re legitimate IT staff',
            'Prioritize your account security'
          ],
          correctAnswer: 1,
          explanation: 'Urgency and fear tactics are classic social engineering techniques designed to bypass logical thinking and create panic responses.'
        },
        {
          title: 'Authority Impersonation',
          content: 'A person in a business suit approaches your desk: "I\'m the new security auditor. I need to check your computer for compliance. Please log in so I can run some tests."',
          question: 'What should you do?',
          options: [
            'Log in to help with the audit',
            'Ask to see their ID and verify with your manager',
            'Let them use a guest account instead',
            'Explain you\'re too busy right now'
          ],
          correctAnswer: 1,
          explanation: 'Always verify the identity of anyone requesting access to systems, even if they appear to have authority. Check with management first.'
        },
        {
          title: 'Information Gathering',
          content: 'Someone calls asking: "Hi, I\'m updating our employee directory. Can you confirm your manager\'s name, your department, and your work email?"',
          question: 'This request is:',
          options: [
            'Normal administrative work',
            'Potentially gathering information for future attacks',
            'Required for security compliance',
            'Harmless public information'
          ],
          correctAnswer: 1,
          explanation: 'Attackers often gather seemingly harmless information to build profiles for more sophisticated attacks later.'
        },
        {
          title: 'Physical Security',
          content: 'Someone follows you through a secure door, saying "Thanks for holding it! I forgot my badge again." They\'re carrying coffee and look like they belong.',
          question: 'What should you do?',
          options: [
            'Let them through - they seem legitimate',
            'Ask them to use their own badge or get a visitor pass',
            'Ignore them and continue walking',
            'Hold the door - it\'s just being polite'
          ],
          correctAnswer: 1,
          explanation: 'Tailgating is a common physical security attack. Everyone must use their own credentials, regardless of how legitimate they appear.'
        },
        {
          title: 'Reporting Protocol',
          content: 'You\'ve successfully identified and avoided a social engineering attempt. What should you do next?',
          question: 'Best follow-up action:',
          options: [
            'Nothing - you handled it correctly',
            'Report the incident to security team',
            'Warn only your immediate colleagues',
            'Post about it on social media'
          ],
          correctAnswer: 1,
          explanation: 'Always report social engineering attempts to your security team. This helps protect others and track attack patterns.'
        }
      ]
    },
    {
      id: 'password-security',
      title: 'Password Security Assessment',
      description: 'Learn to create and manage secure passwords effectively.',
      icon: Shield,
      difficulty: 'Beginner',
      duration: '6-8 minutes',
      steps: [
        {
          title: 'Password Strength',
          content: 'You need to create a new password. Which of these is the strongest?',
          question: 'Select the most secure password:',
          options: [
            'Password123!',
            'MyDog\'sName2024',
            'Tr0ub4dor&3',
            'correct-horse-battery-staple-2024'
          ],
          correctAnswer: 3,
          explanation: 'Long passphrases with random words are stronger than complex but shorter passwords. Length is more important than complexity.'
        },
        {
          title: 'Password Reuse',
          content: 'You have a strong password for your email account. A new shopping website asks you to create an account.',
          question: 'Should you reuse your email password?',
          options: [
            'Yes, it\'s already strong and secure',
            'No, each account should have a unique password',
            'Yes, but only for trusted websites',
            'It doesn\'t matter for shopping sites'
          ],
          correctAnswer: 1,
          explanation: 'Never reuse passwords. If one site is compromised, attackers will try the same credentials on other sites.'
        },
        {
          title: 'Two-Factor Authentication',
          content: 'A website offers two-factor authentication (2FA) options:\n1. SMS text messages\n2. Authenticator app\n3. Hardware security key\n4. Email verification',
          question: 'Which is the most secure 2FA method?',
          options: [
            'SMS text messages',
            'Email verification',
            'Authenticator app',
            'Hardware security key'
          ],
          correctAnswer: 3,
          explanation: 'Hardware security keys provide the strongest 2FA protection, followed by authenticator apps. SMS and email are vulnerable to interception.'
        },
        {
          title: 'Password Manager',
          content: 'You\'re considering using a password manager to store all your passwords.',
          question: 'What\'s the main benefit of a password manager?',
          options: [
            'You only need to remember one master password',
            'It generates unique, strong passwords for each site',
            'It can automatically fill in login forms',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'Password managers provide all these benefits, making it easy to use unique, strong passwords for every account.'
        },
        {
          title: 'Compromise Response',
          content: 'You receive a notification that one of your online accounts may have been compromised in a data breach.',
          question: 'What should you do first?',
          options: [
            'Wait to see if anything bad happens',
            'Change the password for that account only',
            'Change passwords for all accounts using the same password',
            'Delete the compromised account'
          ],
          correctAnswer: 2,
          explanation: 'If you reused the compromised password anywhere else, change it on all those accounts immediately. This is why unique passwords are crucial.'
        }
      ]
    }
  ];

  const startSimulation = (simulationId: string) => {
    setActiveSimulation(simulationId);
    setSimulationStep(0);
    setUserChoices([]);
    setSelectedChoice(null);
    setStartTime(new Date());
  };

  const handleChoice = (choiceIndex: number) => {
    const simulation = simulations.find(s => s.id === activeSimulation);
    if (!simulation) return;

    const currentStep = simulation.steps[simulationStep];
    const isCorrect = choiceIndex === currentStep.correctAnswer;
    
    setSelectedChoice(choiceIndex);
    setUserChoices([...userChoices, { choice: choiceIndex, isCorrect }]);
  };

  const resetSimulation = () => {
    setActiveSimulation(null);
    setSimulationStep(0);
    setUserChoices([]);
    setSelectedChoice(null);
    setStartTime(null);
  };

  const nextStep = () => {
    const simulation = simulations.find(s => s.id === activeSimulation);
    if (!simulation) return;

    if (simulationStep < simulation.steps.length - 1) {
      setSimulationStep(simulationStep + 1);
      setSelectedChoice(null);
    }
  };

  const completeSimulation = () => {
    if (!activeSimulation || !startTime) return;

    const simulation = simulations.find(s => s.id === activeSimulation);
    if (!simulation) return;

    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60); // minutes
    const score = userChoices.filter(choice => choice.isCorrect).length;
    const totalQuestions = simulation.steps.length;

    // Check if this is a retry (user has completed this simulation before)
    const previousAttempts = progress.simulationResults.filter(r => r.simulationId === activeSimulation).length;

    const result = {
      simulationId: activeSimulation,
      score,
      totalQuestions,
      completedAt: new Date(),
      timeSpent,
      attempts: previousAttempts + 1
    };

    updateSimulationResult(result);
  };

  useEffect(() => {
    const simulation = simulations.find(s => s.id === activeSimulation);
    if (simulation && simulationStep === simulation.steps.length - 1 && selectedChoice !== null) {
      completeSimulation();
    }
  }, [simulationStep, selectedChoice, activeSimulation]);

  if (activeSimulation) {
    const simulation = simulations.find(s => s.id === activeSimulation)!;
    const currentStep = simulation.steps[simulationStep];
    const hasAnswered = selectedChoice !== null;
    const currentChoice = userChoices[simulationStep];
    const isComplete = simulationStep === simulation.steps.length - 1 && hasAnswered;

    return (
      <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className={`backdrop-blur-sm rounded-xl border p-8 shadow-lg transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-900/50 border-green-400/30 shadow-green-400/10' 
              : 'bg-white border-green-500/30 shadow-green-500/10'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{simulation.title}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/30 font-medium">
                    {simulation.difficulty}
                  </span>
                  <span className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {simulation.duration}
                  </span>
                  {startTime && (
                    <span className={`text-sm flex items-center transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Clock className="h-4 w-4 mr-1" />
                      {Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60)}m
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={resetSimulation}
                className={`px-6 py-2 rounded-lg transition-all duration-200 border font-medium ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white hover:bg-gray-700 border-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                }`}
              >
                Exit Simulation
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Step {simulationStep + 1} of {simulation.steps.length}</span>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{Math.round(((simulationStep + 1) / simulation.steps.length) * 100)}% Complete</span>
              </div>
              <div className={`w-full rounded-full h-2 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((simulationStep + 1) / simulation.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{currentStep.title}</h3>
              
              {currentStep.content && (
                <div className={`border p-6 rounded-lg font-mono text-sm mb-6 whitespace-pre-line transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-black border-green-400/30 text-green-300' 
                    : 'bg-gray-50 border-green-300/50 text-gray-800'
                }`}>
                  {currentStep.content}
                </div>
              )}

              <p className={`text-base mb-6 leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>{currentStep.question}</p>

              {/* Options */}
              <div className="space-y-3">
                {currentStep.options.map((option, index) => {
                  const isSelected = selectedChoice === index;
                  const isCorrect = index === currentStep.correctAnswer;
                  const showResult = hasAnswered;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !hasAnswered && handleChoice(index)}
                      disabled={hasAnswered}
                      className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500/20 border-green-500 text-green-300'
                            : isSelected && !isCorrect
                            ? 'bg-red-500/20 border-red-500 text-red-300'
                            : isDarkMode
                            ? 'bg-gray-800/30 border-gray-600 text-gray-500'
                            : 'bg-gray-100/50 border-gray-300 text-gray-500'
                          : isDarkMode
                          ? 'bg-gray-800/50 border-gray-600 text-white hover:border-green-400 hover:bg-green-400/10'
                          : 'bg-white border-gray-300 text-gray-900 hover:border-green-400 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {showResult && isCorrect && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className="text-sm leading-relaxed font-medium">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {hasAnswered && (
                <div className={`mt-6 p-6 rounded-lg border transition-all duration-500 ${
                  isDarkMode 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-green-50 border-green-300'
                }`}>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-green-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-green-300 mb-2">Explanation</h4>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{currentStep.explanation}</p>
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {currentChoice?.isCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    
                    {!isComplete && (
                      <button
                        onClick={nextStep}
                        className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-all duration-200 font-medium"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Completion */}
                  {isComplete && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg border border-green-400/30">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-green-300 mb-1">Simulation Complete!</h3>
                        <p className="text-base text-green-300 font-semibold">
                          Final Score: {userChoices.filter(choice => choice.isCorrect).length}/{userChoices.length} 
                          ({Math.round((userChoices.filter(choice => choice.isCorrect).length / userChoices.length) * 100)}%)
                        </p>
                        {startTime && (
                          <p className={`text-sm mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Completed in {Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60)} minutes
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => startSimulation(activeSimulation)}
                          className="px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-all duration-200 font-medium"
                        >
                          Retry Simulation
                        </button>
                        <button
                          onClick={resetSimulation}
                          className={`px-6 py-2 rounded-lg transition-all duration-200 border font-medium ${
                            isDarkMode 
                              ? 'bg-gray-700 text-white hover:bg-gray-600 border-gray-600' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300'
                          }`}
                        >
                          Try Another Simulation
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Interactive Simulations
          </h2>
          <p className={`text-lg leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience realistic cybersecurity scenarios and learn how to respond to various threats through hands-on practice.
            Build your skills in a safe, controlled environment with immediate feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {simulations.map((simulation) => {
            const IconComponent = simulation.icon;
            const userResults = progress.simulationResults.filter(r => r.simulationId === simulation.id);
            const bestScore = userResults.length > 0 ? Math.max(...userResults.map(r => Math.round((r.score / r.totalQuestions) * 100))) : null;
            const attempts = userResults.length;
            
            return (
              <div
                key={simulation.id}
                className={`backdrop-blur-sm rounded-xl border p-6 transition-all duration-300 group hover:shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-900/50 border-green-400/20 hover:border-green-400/40 hover:shadow-green-400/20' 
                    : 'bg-white border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/20'
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-green-400/10 group-hover:bg-green-400/20' 
                      : 'bg-green-50 group-hover:bg-green-100'
                  }`}>
                    <IconComponent className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{simulation.title}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/30 font-medium">
                        {simulation.difficulty}
                      </span>
                      <span className={`text-xs font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{simulation.duration}</span>
                    </div>
                  </div>
                  {bestScore !== null && (
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        bestScore >= 80 ? 'text-green-400' : 
                        bestScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {bestScore}%
                      </div>
                      <div className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Best Score
                      </div>
                    </div>
                  )}
                </div>
                
                <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{simulation.description}</p>
                
                <div className="mb-6">
                  <div className={`text-xs mb-3 font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {simulation.steps.length} interactive steps
                    {attempts > 0 && ` • ${attempts} attempt${attempts > 1 ? 's' : ''}`}
                  </div>
                  <div className={`w-full rounded-full h-2 transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                  </div>
                </div>
                
                <button
                  onClick={() => startSimulation(simulation.id)}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 text-black font-medium rounded-lg hover:from-green-400 hover:to-green-300 transition-all duration-200"
                >
                  <Play className="h-4 w-4" />
                  <span>{attempts > 0 ? 'Try Again' : 'Start Simulation'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16">
          <h3 className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Ransomware Response', icon: AlertTriangle, description: 'Learn to respond to ransomware attacks and minimize damage to your organization' },
              { name: 'Data Breach Investigation', icon: Shield, description: 'Investigate and contain data breaches effectively with proper forensic techniques' },
              { name: 'Network Intrusion Detection', icon: Wifi, description: 'Detect and respond to network intrusions in real-time using advanced monitoring' }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className={`backdrop-blur-sm rounded-lg border p-6 opacity-75 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-900/30 border-gray-700/50' 
                    : 'bg-gray-100/50 border-gray-300/50'
                }`}>
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-600/20' : 'bg-gray-300/30'
                    }`}>
                      <IconComponent className={`h-5 w-5 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <h4 className={`text-lg font-semibold ml-3 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{item.name}</h4>
                  </div>
                  <p className={`mb-6 text-sm leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>{item.description}</p>
                  <div className={`w-full px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700/50 text-gray-500' 
                      : 'bg-gray-300/50 text-gray-400'
                  }`}>
                    Coming Soon
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulationsSection;