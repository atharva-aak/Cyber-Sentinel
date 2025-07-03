import React, { useEffect, useState } from 'react';
import { Trophy, Target, Clock, Flame, Star, Award, TrendingUp, BookOpen, Shield, X } from 'lucide-react';
import { useProgress, Achievement } from '../contexts/ProgressContext';
import { useTheme } from '../App';

const ProgressDashboard: React.FC = () => {
  const { progress, getRecommendations, checkForNewAchievements } = useProgress();
  const { isDarkMode } = useTheme();
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  useEffect(() => {
    const achievements = checkForNewAchievements();
    if (achievements.length > 0) {
      setNewAchievements(achievements);
      setShowAchievementModal(true);
    }
  }, [progress.totalSimulationsCompleted, progress.averageScore, progress.currentStreak]);

  const recommendations = getRecommendations();

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-blue-400';
      case 'advanced': return 'text-purple-400';
      case 'expert': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getSkillLevelBg = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/10';
      case 'intermediate': return 'bg-blue-500/10';
      case 'advanced': return 'bg-purple-500/10';
      case 'expert': return 'bg-yellow-500/10';
      default: return 'bg-gray-500/10';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      play: Trophy,
      star: Star,
      flame: Flame,
      calendar: Clock,
      trophy: Trophy,
      award: Award,
      shield: Shield,
      'shield-check': Shield,
      crown: Award
    };
    return icons[iconName] || Trophy;
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your Learning Progress
          </h2>
          <p className={`text-xl leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Track your cybersecurity learning journey, view achievements, and get personalized recommendations.
          </p>
        </div>

        {/* Achievement Modal */}
        {showAchievementModal && newAchievements.length > 0 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-md rounded-2xl border shadow-2xl transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-900 border-green-400/30' 
                : 'bg-white border-green-500/30'
            }`}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
                <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Achievement Unlocked!
                </h2>
                <button
                  onClick={() => setShowAchievementModal(false)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Trophy className="h-16 w-16 text-yellow-400 animate-bounce" />
                    <div className="absolute inset-0 h-16 w-16 bg-yellow-400/20 rounded-full blur-xl"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {newAchievements.map((achievement) => {
                    const IconComponent = getIconComponent(achievement.icon);
                    return (
                      <div key={achievement.id} className={`p-4 rounded-lg border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-green-500/10 border-green-500/30' 
                          : 'bg-green-50 border-green-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-6 w-6 text-green-400" />
                          <div className="flex-1">
                            <h3 className={`font-bold transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{achievement.title}</h3>
                            <p className={`text-sm transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setShowAchievementModal(false)}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold rounded-lg hover:from-green-400 hover:to-green-300 transition-all duration-200"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`backdrop-blur-sm rounded-xl border p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20' 
                : 'bg-white border-green-500/30'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
                  <Trophy className="h-6 w-6 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{progress.totalSimulationsCompleted}</p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Simulations Completed</p>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-sm rounded-xl border p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20' 
                : 'bg-white border-green-500/30'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{progress.averageScore}%</p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Average Score</p>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-sm rounded-xl border p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20' 
                : 'bg-white border-green-500/30'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-orange-500/10 flex-shrink-0">
                  <Flame className="h-6 w-6 text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{progress.currentStreak}</p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Day Streak</p>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-sm rounded-xl border p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20' 
                : 'bg-white border-green-500/30'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                  <Clock className="h-6 w-6 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{formatTime(progress.timeSpent)}</p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Time Spent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Level & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`backdrop-blur-sm rounded-xl border p-8 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20' 
                : 'bg-white border-green-500/30'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Current Skill Level</h3>
              <div className={`p-6 rounded-lg border ${getSkillLevelBg(progress.skillLevel)} border-current`}>
                <div className="flex items-center space-x-4">
                  <Shield className={`h-10 w-10 ${getSkillLevelColor(progress.skillLevel)} flex-shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-3xl font-bold capitalize ${getSkillLevelColor(progress.skillLevel)}`}>
                      {progress.skillLevel}
                    </p>
                    <p className={`text-base mt-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {progress.skillLevel === 'beginner' && 'Keep learning to advance!'}
                      {progress.skillLevel === 'intermediate' && 'Great progress! Keep it up!'}
                      {progress.skillLevel === 'advanced' && 'Excellent skills! Almost there!'}
                      {progress.skillLevel === 'expert' && 'Master level achieved!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-sm rounded-xl border p-8 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20' 
                : 'bg-white border-green-500/30'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                Personalized Recommendations
              </h3>
              <div className="space-y-4">
                {recommendations.length > 0 ? recommendations.map((recommendation, index) => (
                  <div key={index} className={`p-4 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-green-50 border-green-300'
                  }`}>
                    <p className={`text-base leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{recommendation}</p>
                  </div>
                )) : (
                  <div className={`text-center py-6 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p>Complete more simulations to get personalized recommendations!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className={`backdrop-blur-sm rounded-xl border p-8 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-900/50 border-green-400/20' 
              : 'bg-white border-green-500/30'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Award className="h-6 w-6 text-yellow-400 mr-3" />
              Recent Achievements
            </h3>
            {progress.achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {progress.achievements.slice(-6).map((achievement) => {
                  const IconComponent = getIconComponent(achievement.icon);
                  return (
                    <div key={achievement.id} className={`p-6 rounded-lg border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-yellow-500/10 border-yellow-500/30' 
                        : 'bg-yellow-50 border-yellow-300'
                    }`}>
                      <div className="flex items-start space-x-4">
                        <IconComponent className="h-8 w-8 text-yellow-400 flex-shrink-0 mt-1" />
                        <div className="min-w-0 flex-1">
                          <h4 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{achievement.title}</h4>
                          <p className={`text-base leading-relaxed transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>{achievement.description}</p>
                          <p className={`text-sm mt-2 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            Unlocked {achievement.unlockedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`text-center py-12 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Complete your first simulation to earn achievements!</p>
              </div>
            )}
          </div>

          {/* Simulation History */}
          {progress.simulationResults.length > 0 && (
            <div className={`backdrop-blur-sm rounded-xl border p-8 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/50 border-green-400/20' 
                : 'bg-white border-green-500/30'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Recent Simulation Results</h3>
              <div className="space-y-4">
                {progress.simulationResults.slice(-5).reverse().map((result, index) => (
                  <div key={index} className={`p-6 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {result.simulationId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <p className={`text-base transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {result.completedAt.toLocaleDateString()} • {formatTime(result.timeSpent)} • Attempt #{result.attempts}
                        </p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className={`text-2xl font-bold ${
                          result.score / result.totalQuestions >= 0.8 ? 'text-green-400' : 
                          result.score / result.totalQuestions >= 0.6 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {Math.round((result.score / result.totalQuestions) * 100)}%
                        </p>
                        <p className={`text-base transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {result.score}/{result.totalQuestions} correct
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;