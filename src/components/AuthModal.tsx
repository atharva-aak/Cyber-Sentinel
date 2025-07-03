import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  bgColor: string;
  rules: {
    minLength: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
    noSpaces: boolean;
  };
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  
  const { login, signup, loginWithGoogle } = useAuth();
  const { isDarkMode } = useTheme();

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Enhanced password validation with strength calculation
  const validatePassword = (password: string): { isValid: boolean; message: string; strength: PasswordStrength } => {
    const rules = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      noSpaces: !/\s/.test(password)
    };

    const satisfiedRules = Object.values(rules).filter(Boolean).length;
    
    let strength: PasswordStrength;
    
    if (!rules.noSpaces) {
      strength = {
        score: 0,
        label: 'Invalid',
        color: 'text-red-400',
        bgColor: 'bg-red-400',
        rules
      };
    } else if (satisfiedRules < 4) {
      strength = {
        score: 1,
        label: 'Weak',
        color: 'text-red-400',
        bgColor: 'bg-red-400',
        rules
      };
    } else if (satisfiedRules === 4) {
      strength = {
        score: 2,
        label: 'Medium',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400',
        rules
      };
    } else if (satisfiedRules === 5) {
      strength = {
        score: 3,
        label: 'Strong',
        color: 'text-green-400',
        bgColor: 'bg-green-400',
        rules
      };
    } else {
      strength = {
        score: 4,
        label: 'Very Strong',
        color: 'text-green-400',
        bgColor: 'bg-green-400',
        rules
      };
    }

    // Required rules for validity
    const requiredRules = ['minLength', 'uppercase', 'lowercase', 'number', 'noSpaces'];
    const isValid = requiredRules.every(rule => rules[rule as keyof typeof rules]);

    let message = '';
    if (!isValid) {
      const missingRules = [];
      if (!rules.minLength) missingRules.push('at least 8 characters');
      if (!rules.uppercase) missingRules.push('one uppercase letter');
      if (!rules.lowercase) missingRules.push('one lowercase letter');
      if (!rules.number) missingRules.push('one number');
      if (!rules.noSpaces) missingRules.push('no spaces');
      
      message = `Password must contain ${missingRules.join(', ')}`;
    }

    return { isValid, message, strength };
  };

  // Display name validation
  const validateDisplayName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  // Real-time field validation
  const validateFields = () => {
    const errors: {[key: string]: string} = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!isLogin) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.message;
      }
    }

    if (!isLogin && !displayName) {
      errors.displayName = 'Full name is required';
    } else if (!isLogin && !validateDisplayName(displayName)) {
      errors.displayName = 'Name must be at least 2 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Convert Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address. Please check your email or create a new account.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or reset your password.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support for assistance.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a few minutes before trying again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password with at least 8 characters.';
      case 'auth/invalid-credential':
        return 'Invalid login credentials. Please check your email and password.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled. Please try again.';
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled. Please try again.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email using a different sign-in method.';
      case 'auth/invalid-api-key':
        return 'Authentication service is temporarily unavailable. Please try again later.';
      case 'auth/app-deleted':
        return 'Authentication service is unavailable. Please contact support.';
      case 'auth/expired-action-code':
        return 'The action code has expired. Please try again.';
      case 'auth/invalid-action-code':
        return 'The action code is invalid. Please try again.';
      case 'auth/invalid-verification-code':
        return 'Invalid verification code. Please try again.';
      case 'auth/missing-verification-code':
        return 'Verification code is required.';
      case 'auth/quota-exceeded':
        return 'Service quota exceeded. Please try again later.';
      case 'auth/requires-recent-login':
        return 'Please sign out and sign in again to complete this action.';
      case 'auth/timeout':
        return 'Request timed out. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate fields before submission
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        setSuccess('Successfully signed in! Welcome back.');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      } else {
        await signup(email, password, displayName);
        setSuccess('Account created successfully! Welcome to Cyber Sentinel.');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      const errorMessage = getErrorMessage(error.code || 'unknown');
      setError(errorMessage);
      
      // Clear password field on error for security
      setPassword('');
      setShowPassword(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      await loginWithGoogle();
      setSuccess('Successfully signed in with Google! Welcome.');
      setTimeout(() => {
        onClose();
        resetForm();
      }, 1500);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      const errorMessage = getErrorMessage(error.code || 'unknown');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
    setSuccess('');
    setShowPassword(false);
    setFieldErrors({});
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFieldErrors({});
    // Keep email but clear other fields when switching
    setPassword('');
    setDisplayName('');
    setShowPassword(false);
  };

  // Real-time validation on field change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (fieldErrors.email) {
      const newErrors = { ...fieldErrors };
      if (value && validateEmail(value)) {
        delete newErrors.email;
        setFieldErrors(newErrors);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (fieldErrors.password && !isLogin) {
      const newErrors = { ...fieldErrors };
      const passwordValidation = validatePassword(value);
      if (passwordValidation.isValid) {
        delete newErrors.password;
        setFieldErrors(newErrors);
      }
    }
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayName(value);
    
    if (fieldErrors.displayName) {
      const newErrors = { ...fieldErrors };
      if (validateDisplayName(value)) {
        delete newErrors.displayName;
        setFieldErrors(newErrors);
      }
    }
  };

  // Get password strength for display
  const passwordStrength = !isLogin && password ? validatePassword(password).strength : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-lg rounded-2xl border shadow-2xl transition-colors duration-300 max-h-[90vh] overflow-y-auto ${
        isDarkMode 
          ? 'bg-gray-900 border-green-400/30' 
          : 'bg-white border-green-500/30'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/20">
          <h2 className={`text-xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-sm leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name *
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                    fieldErrors.displayName 
                      ? 'text-red-400' 
                      : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 ${
                      fieldErrors.displayName
                        ? 'border-red-500 focus:ring-red-400'
                        : 'focus:ring-green-400'
                    } ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your full name"
                    disabled={loading}
                    required
                  />
                </div>
                {fieldErrors.displayName && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors.displayName}</p>
                )}
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address *
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                  fieldErrors.email 
                    ? 'text-red-400' 
                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 ${
                    fieldErrors.email
                      ? 'border-red-500 focus:ring-red-400'
                      : 'focus:ring-green-400'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter your email"
                  disabled={loading}
                  required
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password *
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                  fieldErrors.password 
                    ? 'text-red-400' 
                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 ${
                    fieldErrors.password
                      ? 'border-red-500 focus:ring-red-400'
                      : 'focus:ring-green-400'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Strength Meter (only for signup) */}
              {!isLogin && password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Strength:
                    </span>
                    <span className={`text-sm font-bold ${passwordStrength?.color}`}>
                      {passwordStrength?.label}
                    </span>
                  </div>
                  
                  {/* Strength Bar */}
                  <div className={`w-full h-2 rounded-full transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${passwordStrength?.bgColor}`}
                      style={{ width: `${(passwordStrength?.score || 0) * 25}%` }}
                    ></div>
                  </div>
                  
                  {/* Compact Password Rules */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center space-x-2 ${
                      passwordStrength?.rules.minLength ? 'text-green-400' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        passwordStrength?.rules.minLength 
                          ? 'border-green-400 bg-green-400' 
                          : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        {passwordStrength?.rules.minLength && <Check className="h-2 w-2 text-black" />}
                      </div>
                      <span>8+ chars</span>
                    </div>
                    
                    <div className={`flex items-center space-x-2 ${
                      passwordStrength?.rules.uppercase ? 'text-green-400' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        passwordStrength?.rules.uppercase 
                          ? 'border-green-400 bg-green-400' 
                          : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        {passwordStrength?.rules.uppercase && <Check className="h-2 w-2 text-black" />}
                      </div>
                      <span>Uppercase</span>
                    </div>
                    
                    <div className={`flex items-center space-x-2 ${
                      passwordStrength?.rules.lowercase ? 'text-green-400' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        passwordStrength?.rules.lowercase 
                          ? 'border-green-400 bg-green-400' 
                          : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        {passwordStrength?.rules.lowercase && <Check className="h-2 w-2 text-black" />}
                      </div>
                      <span>Lowercase</span>
                    </div>
                    
                    <div className={`flex items-center space-x-2 ${
                      passwordStrength?.rules.number ? 'text-green-400' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        passwordStrength?.rules.number 
                          ? 'border-green-400 bg-green-400' 
                          : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        {passwordStrength?.rules.number && <Check className="h-2 w-2 text-black" />}
                      </div>
                      <span>Number</span>
                    </div>
                    
                    <div className={`flex items-center space-x-2 ${
                      passwordStrength?.rules.specialChar ? 'text-green-400' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        passwordStrength?.rules.specialChar 
                          ? 'border-green-400 bg-green-400' 
                          : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        {passwordStrength?.rules.specialChar && <Check className="h-2 w-2 text-black" />}
                      </div>
                      <span>Special (opt)</span>
                    </div>
                    
                    <div className={`flex items-center space-x-2 ${
                      passwordStrength?.rules.noSpaces ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        passwordStrength?.rules.noSpaces 
                          ? 'border-green-400 bg-green-400' 
                          : 'border-red-400 bg-red-400'
                      }`}>
                        {passwordStrength?.rules.noSpaces && <Check className="h-2 w-2 text-black" />}
                        {!passwordStrength?.rules.noSpaces && <X className="h-2 w-2 text-white" />}
                      </div>
                      <span>No spaces</span>
                    </div>
                  </div>
                </div>
              )}
              
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || Object.keys(fieldErrors).length > 0}
              className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold rounded-lg hover:from-green-400 hover:to-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-500 disabled:hover:to-green-400"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className={`flex-1 h-px transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
            <span className={`px-4 text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>or</span>
            <div className={`flex-1 h-px transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full py-2.5 border rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode 
                ? 'border-gray-600 text-white hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span>{loading ? 'Please wait...' : 'Continue with Google'}</span>
          </button>

          {/* Switch Mode */}
          <div className="mt-4 text-center">
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={switchMode}
                disabled={loading}
                className="ml-2 text-green-400 hover:text-green-300 font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;