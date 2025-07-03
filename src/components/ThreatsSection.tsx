import React, { useState } from 'react';
import { Mail, Wifi, Bug, Users, Server, CreditCard, AlertTriangle, Eye } from 'lucide-react';
import { useTheme } from '../App';

const ThreatsSection: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState(0);
  const { isDarkMode } = useTheme();

  const threats = [
    {
      id: 'phishing',
      name: 'Phishing Attacks',
      icon: Mail,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      description: 'Deceptive attempts to steal sensitive information through fake communications.',
      details: 'Phishing attacks use fraudulent emails, websites, or messages to trick users into revealing passwords, credit card numbers, or other sensitive information. Attackers often impersonate trusted organizations.',
      examples: [
        'Fake banking emails asking for login credentials',
        'Fraudulent shopping websites collecting payment information',
        'Social media messages with malicious links',
        'SMS phishing (smishing) targeting mobile users'
      ],
      prevention: [
        'Verify sender authenticity before clicking links',
        'Check URLs carefully for misspellings',
        'Enable two-factor authentication',
        'Use email filters and security software',
        'Never provide sensitive info via email'
      ]
    },
    {
      id: 'mitm',
      name: 'Man-in-the-Middle',
      icon: Wifi,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      description: 'Intercepting communications between two parties without their knowledge.',
      details: 'MITM attacks occur when attackers secretly intercept and potentially alter communications between two parties who believe they are directly communicating with each other.',
      examples: [
        'Unsecured Wi-Fi network exploitation',
        'SSL certificate spoofing',
        'DNS spoofing attacks',
        'Evil twin Wi-Fi hotspots',
        'ARP poisoning on local networks'
      ],
      prevention: [
        'Use VPN on public networks',
        'Verify SSL certificates',
        'Avoid unsecured Wi-Fi for sensitive activities',
        'Use HTTPS websites only',
        'Enable certificate pinning where available'
      ]
    },
    {
      id: 'malware',
      name: 'Malware',
      icon: Bug,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      description: 'Malicious software designed to damage, disrupt, or gain unauthorized access.',
      details: 'Malware includes viruses, worms, trojans, ransomware, and spyware that can steal data, damage systems, or provide unauthorized access to attackers.',
      examples: [
        'Ransomware encrypting files for payment',
        'Keyloggers stealing passwords',
        'Trojans disguised as legitimate software',
        'Cryptominers using system resources',
        'Rootkits hiding malicious activities'
      ],
      prevention: [
        'Keep software and OS updated',
        'Use reputable antivirus software',
        'Avoid downloading from untrusted sources',
        'Regular system backups',
        'Enable real-time protection'
      ]
    },
    {
      id: 'social',
      name: 'Social Engineering',
      icon: Users,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      description: 'Manipulating people to divulge confidential information or perform actions.',
      details: 'Social engineering exploits human psychology rather than technical vulnerabilities, tricking people into breaking security procedures.',
      examples: [
        'Pretexting to gain trust and information',
        'Baiting with infected USB drives',
        'Tailgating to gain physical access',
        'Vishing (voice phishing) phone calls',
        'Authority impersonation attacks'
      ],
      prevention: [
        'Verify identity before sharing information',
        'Follow security protocols strictly',
        'Be suspicious of unsolicited requests',
        'Regular security awareness training',
        'Implement multi-person authorization'
      ]
    },
    {
      id: 'ddos',
      name: 'DDoS Attacks',
      icon: Server,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      description: 'Overwhelming systems with traffic to make them unavailable.',
      details: 'Distributed Denial of Service attacks use multiple compromised systems to flood targets with traffic, making services unavailable to legitimate users.',
      examples: [
        'Volumetric attacks flooding bandwidth',
        'Protocol attacks exploiting network protocols',
        'Application layer attacks targeting specific services',
        'Botnet-powered coordinated attacks',
        'Amplification attacks using third-party services'
      ],
      prevention: [
        'Use DDoS protection services',
        'Implement rate limiting',
        'Monitor traffic patterns',
        'Have incident response plans',
        'Use content delivery networks (CDNs)'
      ]
    },
    {
      id: 'financial',
      name: 'Financial Fraud',
      icon: CreditCard,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      description: 'Fraudulent activities targeting financial information and transactions.',
      details: 'Financial cyber fraud involves stealing credit card information, banking credentials, or conducting unauthorized transactions through various digital means.',
      examples: [
        'Credit card skimming devices',
        'Fake banking websites',
        'Business email compromise (BEC)',
        'Cryptocurrency theft and scams',
        'Invoice fraud and payment redirection'
      ],
      prevention: [
        'Monitor accounts regularly',
        'Use secure payment methods',
        'Verify payment requests independently',
        'Enable transaction alerts',
        'Use multi-factor authentication for financial accounts'
      ]
    }
  ];

  const ThreatIcon = threats[selectedThreat].icon;

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100/50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Understanding Cyber Threats
          </h2>
          <p className={`text-xl leading-relaxed max-w-4xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Learn about the most common cybersecurity threats and how they can impact you or your organization. 
            Understanding these threats is the first step in building effective defenses.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Threat Selection */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {threats.map((threat, index) => {
                const IconComponent = threat.icon;
                return (
                  <button
                    key={threat.id}
                    onClick={() => setSelectedThreat(index)}
                    className={`w-full p-6 rounded-xl border transition-all duration-300 text-left group ${
                      selectedThreat === index
                        ? isDarkMode
                          ? `${threat.bgColor} ${threat.borderColor} border-2 shadow-lg shadow-green-400/10`
                          : `bg-green-50 border-green-300 border-2 shadow-lg shadow-green-500/20`
                        : isDarkMode
                        ? 'bg-gray-900/50 border-gray-700 hover:border-green-400/30 hover:bg-gray-800/50'
                        : 'bg-white border-gray-200 hover:border-green-400/50 hover:bg-green-50/50 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <IconComponent className={`h-7 w-7 ${threat.color} group-hover:scale-110 transition-transform duration-200`} />
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{threat.name}</h3>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{threat.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Threat Details */}
          <div className="lg:col-span-2">
            <div className={`backdrop-blur-sm rounded-xl border p-8 shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 shadow-green-400/5' 
                : 'bg-white/80 border-green-500/30 shadow-green-500/10'
            }`}>
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-4 rounded-lg border transition-colors duration-300 ${
                  isDarkMode
                    ? `${threats[selectedThreat].bgColor} ${threats[selectedThreat].borderColor}`
                    : 'bg-green-50 border-green-200'
                }`}>
                  <ThreatIcon className={`h-8 w-8 ${threats[selectedThreat].color}`} />
                </div>
                <h3 className={`text-3xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{threats[selectedThreat].name}</h3>
              </div>

              <p className={`text-lg leading-relaxed mb-10 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>{threats[selectedThreat].details}</p>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className={`text-xl font-semibold mb-6 flex items-center transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                    Common Examples
                  </h4>
                  <ul className="space-y-4">
                    {threats[selectedThreat].examples.map((example, index) => (
                      <li key={index} className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                        <span className={`text-base leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`text-xl font-semibold mb-6 flex items-center transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Eye className="h-6 w-6 text-green-400 mr-3" />
                    Prevention Tips
                  </h4>
                  <ul className="space-y-4">
                    {threats[selectedThreat].prevention.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <span className={`text-base leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreatsSection;