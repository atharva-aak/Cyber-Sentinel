import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Smartphone, Wifi, HardDrive } from 'lucide-react';
import { useTheme } from '../App';

const PreventionSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const preventionCategories = [
    {
      title: 'Personal Security',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      tips: [
        {
          title: 'Strong Authentication',
          description: 'Use unique, complex passwords and enable two-factor authentication wherever possible.',
          details: [
            'Use password managers to generate and store unique passwords',
            'Enable 2FA/MFA on all important accounts',
            'Avoid using personal information in passwords',
            'Change default passwords immediately'
          ]
        },
        {
          title: 'Safe Browsing',
          description: 'Practice safe browsing habits to avoid malicious websites and downloads.',
          details: [
            'Verify URLs before clicking links',
            'Look for HTTPS and valid SSL certificates',
            'Avoid downloading software from untrusted sources',
            'Keep browsers and plugins updated'
          ]
        },
        {
          title: 'Email Security',
          description: 'Protect yourself from phishing and malicious email attachments.',
          details: [
            'Verify sender identity before clicking links',
            'Be suspicious of urgent or threatening language',
            'Never provide sensitive information via email',
            'Use email filtering and spam protection'
          ]
        }
      ]
    },
    {
      title: 'Device Security',
      icon: Smartphone,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      tips: [
        {
          title: 'System Updates',
          description: 'Keep all devices and software updated with the latest security patches.',
          details: [
            'Enable automatic updates for operating systems',
            'Regularly update applications and browsers',
            'Install security patches promptly',
            'Remove outdated or unused software'
          ]
        },
        {
          title: 'Antivirus & Security Software',
          description: 'Use reputable security software to protect against malware and threats.',
          details: [
            'Install reputable antivirus software',
            'Enable real-time scanning and protection',
            'Run regular full system scans',
            'Keep security software updated'
          ]
        },
        {
          title: 'Device Protection',
          description: 'Secure your devices against theft and unauthorized access.',
          details: [
            'Use screen locks and encryption',
            'Enable remote wipe capabilities',
            'Avoid leaving devices unattended',
            'Use secure storage for sensitive data'
          ]
        }
      ]
    },
    {
      title: 'Network Security',
      icon: Wifi,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      tips: [
        {
          title: 'Secure Networks',
          description: 'Use secure network connections and avoid public Wi-Fi for sensitive activities.',
          details: [
            'Use VPN on public networks',
            'Avoid sensitive activities on public Wi-Fi',
            'Verify network authenticity before connecting',
            'Turn off automatic Wi-Fi connections'
          ]
        },
        {
          title: 'Home Network Security',
          description: 'Secure your home network against unauthorized access.',
          details: [
            'Change default router passwords',
            'Use WPA3 encryption',
            'Regularly update router firmware',
            'Disable WPS and unnecessary services'
          ]
        },
        {
          title: 'Firewall Protection',
          description: 'Use firewalls to control network traffic and prevent unauthorized access.',
          details: [
            'Enable built-in firewalls',
            'Configure firewall rules properly',
            'Monitor network traffic regularly',
            'Block unnecessary ports and services'
          ]
        }
      ]
    },
    {
      title: 'Data Protection',
      icon: HardDrive,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      tips: [
        {
          title: 'Data Backup',
          description: 'Regularly backup important data to protect against loss or ransomware.',
          details: [
            'Follow the 3-2-1 backup rule',
            'Test backup restoration regularly',
            'Store backups offline or air-gapped',
            'Encrypt backup data'
          ]
        },
        {
          title: 'Data Encryption',
          description: 'Encrypt sensitive data both at rest and in transit.',
          details: [
            'Use full disk encryption',
            'Encrypt sensitive files and folders',
            'Use encrypted communication channels',
            'Securely dispose of old storage devices'
          ]
        },
        {
          title: 'Privacy Settings',
          description: 'Configure privacy settings on all devices and online accounts.',
          details: [
            'Review and adjust social media privacy settings',
            'Limit data sharing with third parties',
            'Use privacy-focused browsers and search engines',
            'Regularly review app permissions'
          ]
        }
      ]
    }
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Prevention Strategies
          </h2>
          <p className={`text-xl leading-relaxed max-w-4xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Learn essential cybersecurity practices to protect yourself and your organization from cyber threats.
            Prevention is always better than cure when it comes to cybersecurity.
          </p>
        </div>

        <div className="space-y-16">
          {preventionCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className={`backdrop-blur-sm rounded-xl border overflow-hidden shadow-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-green-400/20 shadow-green-400/5' 
                  : 'bg-white border-green-500/30 shadow-green-500/10'
              }`}>
                <div className={`p-8 border-b transition-colors duration-300 ${
                  isDarkMode
                    ? `${category.bgColor} ${category.borderColor}`
                    : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-lg border transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-gray-900/50 border-gray-700'
                        : 'bg-white border-green-200'
                    }`}>
                      <CategoryIcon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <h3 className={`text-3xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{category.title}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid lg:grid-cols-3 gap-10">
                    {category.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className={`rounded-lg p-8 border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-black/50 border-gray-700/50' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-start space-x-4 mb-6">
                          <CheckCircle className="h-7 w-7 text-green-400 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{tip.title}</h4>
                            <p className={`text-base leading-relaxed mb-6 transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>{tip.description}</p>
                          </div>
                        </div>
                        
                        <ul className="space-y-3">
                          {tip.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-3 text-sm">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-colors duration-300 ${
                                category.color.replace('text-', 'bg-')
                              }`}></div>
                              <span className={`text-base leading-relaxed transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Checklist */}
        <div className={`mt-16 backdrop-blur-sm rounded-xl border p-10 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/30' 
            : 'bg-gradient-to-r from-green-50 to-cyan-50 border-green-300'
        }`}>
          <h3 className={`text-3xl font-bold mb-8 flex items-center transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <AlertTriangle className="h-8 w-8 text-yellow-400 mr-4" />
            Essential Security Checklist
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Enable two-factor authentication',
              'Use unique, strong passwords',
              'Keep software updated',
              'Regular data backups',
              'Verify email senders',
              'Use secure networks',
              'Enable automatic screen locks',
              'Install reputable antivirus',
              'Review privacy settings'
            ].map((item, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-green-400/20' 
                  : 'bg-white border-green-300'
              }`}>
                <div className="w-5 h-5 border-2 border-green-400 rounded"></div>
                <span className={`text-base transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreventionSection;