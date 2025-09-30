import React, { useState, useEffect, useRef } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, Phone, Building, Eye, EyeOff, Github, Chrome, Apple } from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedElements, setClickedElements] = useState(new Set());
  const [selectedRole, setSelectedRole] = useState('ngo');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('success');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const handleElementClick = (elementId) => {
    setClickedElements(prev => new Set([...prev, elementId]));
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      try {
        if (isSignUp) {
          setFeedbackType('success');
          setFeedbackMessage(`Account created successfully! Welcome to BlueBlock MRV as ${selectedRole.toUpperCase()}.`);
        } else {
          setFeedbackType('success');
          setFeedbackMessage(`Welcome back! Signed in as ${selectedRole.toUpperCase()}.`);
        }

        setShowFeedback(true);
        
        setTimeout(() => {
          setShowFeedback(false);
        }, 3000);

      } catch (error) {
        setFeedbackType('error');
        setFeedbackMessage('Authentication failed. Please try again.');
        setShowFeedback(true);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    setFeedbackType('success');
    setFeedbackMessage(`Connecting to ${provider}...`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Smooth animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900/30 to-indigo-900/30 animate-pulse"></div>
      
      {/* Subtle background orbs - Blue theme */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-600/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Fine grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(96, 165, 250, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Cursor glow effect - Blue theme */}
      <div 
        ref={glowRef}
        className="fixed w-96 h-96 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(4px)'
        }}
      />
      
      {/* Custom cursor - Blue theme */}
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 border-2 border-blue-400 rounded-full pointer-events-none z-20 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-400/30"
        style={{
          boxShadow: '0 0 15px rgba(96, 165, 250, 0.4), inset 0 0 15px rgba(96, 165, 250, 0.2)'
        }}
      />

      {/* Floating particles - Blue theme */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            opacity: 0.4
          }}
        />
      ))}

      {/* Feedback notification */}
      {showFeedback && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <div className={`px-6 py-4 rounded-2xl backdrop-blur-xl border ${
            feedbackType === 'success' 
              ? 'bg-blue-900/90 border-blue-600 text-blue-100' 
              : 'bg-red-900/90 border-red-700 text-red-100'
          }`} style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
          }}>
            {feedbackMessage}
          </div>
        </div>
      )}

      {/* Main container */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-30">
        <div className="w-full max-w-2xl">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">BlueBlock MRV</h1>
            <p className="text-blue-300 text-lg">Blue Carbon Platform</p>
          </div>

          {/* Main form card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl relative overflow-hidden border border-blue-800/30"
               style={{
                 boxShadow: '0 0 40px rgba(30, 58, 138, 0.3), 0 0 80px rgba(30, 64, 175, 0.2)'
               }}>
            {/* Card subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 via-slate-800/10 to-indigo-800/10 rounded-3xl blur-xl"></div>
            
            <div className="relative z-10">
              {/* Toggle buttons */}
              <div className="flex bg-slate-800/60 rounded-2xl relative mb-8 overflow-hidden border border-blue-700/30">
                <div 
                  className={`absolute top-0 h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500 ease-out ${
                    isSignUp ? 'left-1/2 w-1/2' : 'left-0 w-1/2'
                  }`}
                  style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(37, 99, 235, 0.3)'
                  }}
                />
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-500 relative z-10 flex items-center justify-center ${
                    !isSignUp ? 'text-white' : 'text-blue-300 hover:text-blue-100'
                  }`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-500 relative z-10 flex items-center justify-center ${
                    isSignUp ? 'text-white' : 'text-blue-300 hover:text-blue-100'
                  }`}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </button>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-blue-200 mb-3">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedRole === 'admin'
                        ? 'border-blue-500 bg-blue-900/60 text-blue-100'
                        : 'border-blue-700/50 hover:border-blue-600 text-blue-300 bg-slate-800/40'
                    }`}
                    style={{
                      boxShadow: selectedRole === 'admin' 
                        ? '0 0 20px rgba(59, 130, 246, 0.4)' 
                        : '0 0 10px rgba(30, 64, 175, 0.2)'
                    }}
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-100" />
                      </div>
                      <div className="font-semibold">Admin</div>
                      <div className="text-xs mt-1 opacity-80">Full Access</div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedRole('ngo')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedRole === 'ngo'
                        ? 'border-blue-500 bg-blue-900/60 text-blue-100'
                        : 'border-blue-700/50 hover:border-blue-600 text-blue-300 bg-slate-800/40'
                    }`}
                    style={{
                      boxShadow: selectedRole === 'ngo' 
                        ? '0 0 20px rgba(59, 130, 246, 0.4)' 
                        : '0 0 10px rgba(30, 64, 175, 0.2)'
                    }}
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-lg flex items-center justify-center">
                        <Building className="w-4 h-4 text-cyan-100" />
                      </div>
                      <div className="font-semibold">NGO</div>
                      <div className="text-xs mt-1 opacity-80">Project Access</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {isSignUp && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-hover:text-blue-300 z-10" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          onClick={() => handleElementClick('firstName')}
                          className="w-full pl-12 pr-4 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                          style={{
                            borderColor: clickedElements.has('firstName') ? '#3b82f6' : '#1e3a8a',
                            boxShadow: clickedElements.has('firstName')
                              ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                              : '0 0 10px rgba(30, 64, 175, 0.2)'
                          }}
                          required={isSignUp}
                        />
                      </div>
                      <div className="relative group">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          onClick={() => handleElementClick('lastName')}
                          className="w-full px-4 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                          style={{
                            borderColor: clickedElements.has('lastName') ? '#3b82f6' : '#1e3a8a',
                            boxShadow: clickedElements.has('lastName')
                              ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                              : '0 0 10px rgba(30, 64, 175, 0.2)'
                          }}
                          required={isSignUp}
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-hover:text-blue-300 z-10" />
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Organization"
                        onClick={() => handleElementClick('organization')}
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                        style={{
                          borderColor: clickedElements.has('organization') ? '#3b82f6' : '#1e3a8a',
                          boxShadow: clickedElements.has('organization')
                            ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                            : '0 0 10px rgba(30, 64, 175, 0.2)'
                        }}
                      />
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="Role (e.g., Project Manager)"
                        onClick={() => handleElementClick('role')}
                        className="w-full px-4 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                        style={{
                          borderColor: clickedElements.has('role') ? '#3b82f6' : '#1e3a8a',
                          boxShadow: clickedElements.has('role')
                            ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                            : '0 0 10px rgba(30, 64, 175, 0.2)'
                        }}
                      />
                    </div>

                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-hover:text-blue-300 z-10" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        onClick={() => handleElementClick('phone')}
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                        style={{
                          borderColor: clickedElements.has('phone') ? '#3b82f6' : '#1e3a8a',
                          boxShadow: clickedElements.has('phone')
                            ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                            : '0 0 10px rgba(30, 64, 175, 0.2)'
                        }}
                      />
                    </div>
                  </>
                )}

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-hover:text-blue-300 z-10" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    onClick={() => handleElementClick('email')}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                    style={{
                      borderColor: clickedElements.has('email') ? '#3b82f6' : '#1e3a8a',
                      boxShadow: clickedElements.has('email')
                        ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                        : '0 0 10px rgba(30, 64, 175, 0.2)'
                    }}
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-hover:text-blue-300 z-10" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    onClick={() => handleElementClick('password')}
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                    style={{
                      borderColor: clickedElements.has('password') ? '#3b82f6' : '#1e3a8a',
                      boxShadow: clickedElements.has('password')
                        ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                        : '0 0 10px rgba(30, 64, 175, 0.2)'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-all duration-300 z-10"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {isSignUp && (
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-all duration-300 group-hover:text-blue-300 z-10" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      onClick={() => handleElementClick('confirmPassword')}
                      className="w-full pl-12 pr-12 py-4 bg-slate-800/60 rounded-2xl text-white placeholder-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                      style={{
                        borderColor: clickedElements.has('confirmPassword') ? '#3b82f6' : '#1e3a8a',
                        boxShadow: clickedElements.has('confirmPassword')
                          ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                          : '0 0 10px rgba(30, 64, 175, 0.2)'
                      }}
                      required={isSignUp}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-all duration-300 z-10"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-500 bg-slate-800 border-blue-700 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-300"
                      />
                      <span className="text-sm text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-300 hover:text-blue-100 transition-all duration-300"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden border border-blue-500/50 flex items-center justify-center"
                  style={{
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                    </>
                  ) : (
                    <>
                      {isSignUp ? <UserPlus className="w-5 h-5 mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-700/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-800/80 text-blue-300 rounded-xl backdrop-blur-sm">or continue with</span>
                  </div>
                </div>

                {/* Social login buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleSocialLogin('Google');
                      handleElementClick('google');
                    }}
                    className="flex items-center justify-center py-3 px-4 bg-slate-800/60 rounded-xl transition-all duration-300 group border hover:bg-slate-800"
                    style={{
                      borderColor: clickedElements.has('google') ? '#3b82f6' : '#1e3a8a',
                      boxShadow: clickedElements.has('google')
                        ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                        : '0 0 10px rgba(30, 64, 175, 0.2)'
                    }}
                  >
                    <Chrome className="w-5 h-5 text-blue-400 group-hover:text-white transition-all duration-300" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSocialLogin('Github');
                      handleElementClick('github');
                    }}
                    className="flex items-center justify-center py-3 px-4 bg-slate-800/60 rounded-xl transition-all duration-300 group border hover:bg-slate-800"
                    style={{
                      borderColor: clickedElements.has('github') ? '#3b82f6' : '#1e3a8a',
                      boxShadow: clickedElements.has('github')
                        ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                        : '0 0 10px rgba(30, 64, 175, 0.2)'
                    }}
                  >
                    <Github className="w-5 h-5 text-blue-400 group-hover:text-white transition-all duration-300" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSocialLogin('Apple');
                      handleElementClick('apple');
                    }}
                    className="flex items-center justify-center py-3 px-4 bg-slate-800/60 rounded-xl transition-all duration-300 group border hover:bg-slate-800"
                    style={{
                      borderColor: clickedElements.has('apple') ? '#3b82f6' : '#1e3a8a',
                      boxShadow: clickedElements.has('apple')
                        ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)'
                        : '0 0 10px rgba(30, 64, 175, 0.2)'
                    }}
                  >
                    <Apple className="w-5 h-5 text-blue-400 group-hover:text-white transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-blue-300 text-sm">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-1 text-blue-200 hover:text-white transition-all duration-300 font-semibold"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-blue-400/70 text-xs">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-all duration-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-all duration-300">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}