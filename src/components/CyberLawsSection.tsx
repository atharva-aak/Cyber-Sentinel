import React, { useState } from 'react';
import { Scale, FileText, Globe, Building, Users, AlertCircle } from 'lucide-react';
import { useTheme } from '../App';

const CyberLawsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { isDarkMode } = useTheme();

  const lawCategories = [
    {
      id: 'data-protection',
      name: 'Data Protection',
      icon: FileText,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      laws: [
        {
          name: 'GDPR (General Data Protection Regulation)',
          region: 'European Union',
          description: 'Comprehensive data protection regulation covering all EU member states.',
          keyPoints: [
            'Right to be forgotten',
            'Data portability rights',
            'Consent requirements',
            'Data breach notifications within 72 hours',
            'Fines up to 4% of annual revenue'
          ],
          compliance: [
            'Implement privacy by design',
            'Conduct data protection impact assessments',
            'Appoint a Data Protection Officer if required',
            'Maintain records of processing activities'
          ]
        },
        {
          name: 'CCPA (California Consumer Privacy Act)',
          region: 'California, USA',
          description: 'California state law enhancing privacy rights for California residents.',
          keyPoints: [
            'Right to know what personal information is collected',
            'Right to delete personal information',
            'Right to opt-out of sale of personal information',
            'Right to non-discrimination for exercising privacy rights'
          ],
          compliance: [
            'Update privacy policies',
            'Implement consumer request processes',
            'Train staff on privacy rights',
            'Implement opt-out mechanisms'
          ]
        }
      ]
    },
    {
      id: 'cybercrime',
      name: 'Cybercrime Laws',
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      laws: [
        {
          name: 'Computer Fraud and Abuse Act (CFAA)',
          region: 'United States',
          description: 'Federal law criminalizing computer-related offenses.',
          keyPoints: [
            'Unauthorized access to computers',
            'Trafficking in passwords',
            'Threatening to damage computers',
            'Computer fraud and related activity'
          ],
          compliance: [
            'Implement proper access controls',
            'Monitor system access',
            'Report security incidents',
            'Train employees on authorized use'
          ]
        },
        {
          name: 'Cybercrime Act',
          region: 'Various Countries',
          description: 'Laws addressing various forms of cybercrime and digital offenses.',
          keyPoints: [
            'Hacking and unauthorized access',
            'Identity theft',
            'Online fraud',
            'Cyberbullying and harassment'
          ],
          compliance: [
            'Implement cybersecurity measures',
            'Report cybercrimes to authorities',
            'Maintain digital evidence',
            'Cooperate with law enforcement'
          ]
        }
      ]
    },
    {
      id: 'sector-specific',
      name: 'Sector-Specific',
      icon: Building,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      laws: [
        {
          name: 'HIPAA (Health Insurance Portability and Accountability Act)',
          region: 'United States',
          description: 'Protects health information in the healthcare sector.',
          keyPoints: [
            'Protected Health Information (PHI) security',
            'Administrative, physical, and technical safeguards',
            'Business associate agreements',
            'Breach notification requirements'
          ],
          compliance: [
            'Implement HIPAA security rule requirements',
            'Conduct risk assessments',
            'Train workforce on HIPAA compliance',
            'Maintain audit logs'
          ]
        },
        {
          name: 'PCI DSS (Payment Card Industry Data Security Standard)',
          region: 'Global',
          description: 'Security standard for organizations handling credit card information.',
          keyPoints: [
            'Build and maintain secure networks',
            'Protect cardholder data',
            'Maintain vulnerability management',
            'Implement strong access control measures'
          ],
          compliance: [
            'Regular security testing',
            'Maintain information security policies',
            'Network segmentation',
            'Encrypt cardholder data'
          ]
        }
      ]
    }
  ];

  const selectedLaws = lawCategories[selectedCategory];
  const IconComponent = selectedLaws.icon;

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100/50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Cyber Laws & Compliance
          </h2>
          <p className={`text-xl leading-relaxed max-w-4xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Understand the legal landscape of cybersecurity and ensure compliance with relevant regulations.
            Stay informed about your legal obligations and rights in the digital world.
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {lawCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(index)}
                className={`flex items-center space-x-4 px-8 py-4 rounded-lg border transition-all duration-300 ${
                  selectedCategory === index
                    ? isDarkMode
                      ? `${category.bgColor} border-current ${category.color} shadow-lg`
                      : 'bg-green-50 border-green-400 text-green-600 shadow-lg'
                    : isDarkMode
                    ? 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-green-400/30'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-green-400/50 hover:bg-green-50/50'
                }`}
              >
                <CategoryIcon className={`h-6 w-6 ${selectedCategory === index ? category.color : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className="font-medium text-lg">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Laws Display */}
        <div className="space-y-10">
          {selectedLaws.laws.map((law, index) => (
            <div key={index} className={`backdrop-blur-sm rounded-xl border overflow-hidden shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20 shadow-green-400/5' 
                : 'bg-white border-green-500/30 shadow-green-500/10'
            }`}>
              <div className={`p-8 border-b transition-colors duration-300 ${
                isDarkMode ? 'border-green-400/20' : 'border-green-500/20'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{law.name}</h3>
                    <div className="flex items-center space-x-3">
                      <Globe className={`h-5 w-5 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-lg transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{law.region}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg border transition-colors duration-300 ${
                    isDarkMode
                      ? `${selectedLaws.bgColor} ${selectedLaws.color.replace('text-', 'border-')}/30`
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${selectedLaws.color}`} />
                  </div>
                </div>
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{law.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-10 p-8">
                <div>
                  <h4 className={`text-xl font-semibold mb-6 flex items-center transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Scale className="h-6 w-6 text-green-400 mr-3" />
                    Key Provisions
                  </h4>
                  <ul className="space-y-4">
                    {law.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <span className={`text-base leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`text-xl font-semibold mb-6 flex items-center transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FileText className="h-6 w-6 text-cyan-400 mr-3" />
                    Compliance Requirements
                  </h4>
                  <ul className="space-y-4">
                    {law.compliance.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                        <span className={`text-base leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Checklist */}
        <div className={`mt-16 backdrop-blur-sm rounded-xl border p-10 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/30' 
            : 'bg-gradient-to-r from-green-50 to-cyan-50 border-green-300'
        }`}>
          <h3 className={`text-3xl font-bold mb-8 flex items-center transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <FileText className="h-8 w-8 text-green-400 mr-4" />
            General Compliance Best Practices
          </h3>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h4 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Assessment & Documentation</h4>
              <ul className={`space-y-3 text-base leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>• Conduct regular compliance audits</li>
                <li>• Maintain detailed documentation</li>
                <li>• Document all security incidents</li>
                <li>• Keep records of employee training</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Implementation & Monitoring</h4>
              <ul className={`space-y-3 text-base leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>• Implement policy and procedure frameworks</li>
                <li>• Regular security monitoring and testing</li>
                <li>• Employee training and awareness programs</li>
                <li>• Incident response and breach notification procedures</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberLawsSection;