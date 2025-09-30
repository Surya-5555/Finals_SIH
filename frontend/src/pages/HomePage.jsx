import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, Phone, Building, Eye, EyeOff, Github, Chrome, Apple, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedElements, setClickedElements] = useState(new Set());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('success');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  const handleGetStarted = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setFeedbackType('success');
      setFeedbackMessage('Welcome to BlueBlock MRV! Redirecting to login...');
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        navigate('/login');
      }, 1500);
    }, 1000);
  };

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

  const features = [
    {
      title: 'Verified Standards',
      description: 'Comply with international carbon credit methodologies including Verra and Gold Standard frameworks',
      gradient: 'from-blue-600/20 to-cyan-600/20',
      icon: '🔒'
    },
    {
      title: 'Global Impact',
      description: 'Contribute to worldwide climate change mitigation with measurable environmental outcomes',
      gradient: 'from-blue-700/20 to-indigo-600/20',
      icon: '🌍'
    },
    {
      title: 'Blue Carbon Focus',
      description: 'Specialized in marine and coastal ecosystem restoration with proven carbon sequestration',
      gradient: 'from-cyan-600/20 to-teal-600/20',
      icon: '🌊'
    },
    {
      title: 'Community Driven',
      description: 'Support local communities through sustainable projects and shared value creation',
      gradient: 'from-indigo-600/20 to-purple-600/20',
      icon: '👥'
    }
  ];

  const stats = [
    { label: 'Projects Verified', value: '500+' },
    { label: 'Carbon Credits Issued', value: '2.5M+' },
    { label: 'Active Countries', value: '45+' },
    { label: 'Global Partners', value: '200+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-x-hidden">
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
        <div className="fixed top-4 right-4 z-[60] animate-pulse">
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

      {/* Navigation */}
      <nav className="bg-slate-900/40 backdrop-blur-2xl border-b border-blue-800/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-white">BlueBlock MRV</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span 
                className="px-4 py-2 bg-blue-900/40 text-blue-300 text-sm font-medium rounded-full border border-blue-700/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500"
                style={{
                  boxShadow: '0 0 20px rgba(30, 64, 175, 0.3)'
                }}
              >
                Professional Carbon Credit Platform
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Blue Carbon Credits
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Verified & Compliant
              </span>
            </h1>
            
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Transform marine conservation projects into internationally recognized carbon credits. 
              Built for organizations committed to measurable climate action.
            </p>

            <div className="pt-4">
              <button 
                onClick={handleGetStarted}
                disabled={isLoading}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-blue-600/50 transition-all duration-500 transform hover:scale-105 overflow-hidden border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Getting Started...
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group"
                onClick={() => handleElementClick(`stat-${index}`)}
              >
                <div 
                  className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl"
                  style={{
                    boxShadow: clickedElements.has(`stat-${index}`)
                      ? '0 0 30px rgba(59, 130, 246, 0.4)'
                      : '0 0 20px rgba(30, 64, 175, 0.2)'
                  }}
                >
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-blue-300 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 lg:px-8 bg-slate-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Enterprise-Grade Platform
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Comprehensive tools for carbon credit development, verification, and management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => handleElementClick(`feature-${index}`)}
                className="group relative"
              >
                <div 
                  className={`relative bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 border border-blue-800/30 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm`}
                  style={{
                    boxShadow: clickedElements.has(`feature-${index}`)
                      ? '0 0 40px rgba(59, 130, 246, 0.5)'
                      : hoveredFeature === index
                      ? '0 0 30px rgba(59, 130, 246, 0.3)'
                      : '0 0 20px rgba(30, 64, 175, 0.2)'
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-2xl">{feature.icon}</div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded opacity-90"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-blue-200 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-sm text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(96, 165, 250, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span 
                className="px-4 py-2 bg-blue-900/40 text-blue-300 text-sm font-medium rounded-full border border-blue-700/50 backdrop-blur-sm"
                style={{
                  boxShadow: '0 0 20px rgba(30, 64, 175, 0.3)'
                }}
              >
                About BlueBlock MRV
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6">
                Leading the Future of Blue Carbon
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed mb-6">
                BlueBlock MRV is a comprehensive platform designed to streamline the development and verification of blue carbon projects. We provide the infrastructure for organizations to transform marine conservation efforts into verified carbon credits.
              </p>
              <p className="text-blue-300 leading-relaxed">
                Our platform integrates cutting-edge monitoring, reporting, and verification (MRV) technologies with internationally recognized carbon credit standards, ensuring your projects meet the highest compliance requirements while maximizing environmental impact.
              </p>
            </div>
            
            <div className="space-y-6">
              <div 
                className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Mission</h3>
                <p className="text-blue-200">
                  Accelerate global climate action through accessible, verified blue carbon credit solutions that benefit ecosystems and communities.
                </p>
              </div>
              <div 
                className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Vision</h3>
                <p className="text-blue-200">
                  Become the world's most trusted platform for marine and coastal carbon credit development and verification.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {['ISO Certified', 'Verra Approved', 'Gold Standard', 'Blockchain Secured'].map((badge, i) => (
              <div 
                key={i} 
                className="bg-slate-900/40 backdrop-blur-xl rounded-xl p-6 border border-blue-800/30 text-center hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800/40"
                style={{
                  boxShadow: '0 0 15px rgba(30, 64, 175, 0.2)'
                }}
              >
                <span className="text-sm font-semibold text-blue-300">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 lg:p-16 border border-blue-800/30 text-center"
            style={{
              boxShadow: '0 0 40px rgba(30, 58, 138, 0.3), 0 0 80px rgba(30, 64, 175, 0.2)'
            }}
          >
            {/* Removed CTA logo icon */}
            
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Launch Your Project?
            </h3>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the leading organizations transforming marine conservation into verified climate solutions. Start your carbon credit journey today.
            </p>
            
            <button 
              onClick={handleGetStarted}
              disabled={isLoading}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-blue-600/50 transition-all duration-500 transform hover:scale-105 overflow-hidden border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Starting Project...
                  </>
                ) : (
                  <>
                    Start Your Project
                    <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-sm text-white py-16 border-t border-blue-800/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold">BlueBlock MRV</span>
            </div>
            <p className="text-blue-300 text-center max-w-md">
              Professional blue carbon platform for verified climate solutions
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-400">
              <span className="hover:text-blue-200 transition-colors cursor-pointer">Secure</span>
              <span className="hover:text-blue-200 transition-colors cursor-pointer">Compliant</span>
              <span className="hover:text-blue-200 transition-colors cursor-pointer">Verified</span>
              <span className="hover:text-blue-200 transition-colors cursor-pointer">Professional</span>
            </div>
            <div className="pt-6 border-t border-blue-800/30 w-full text-center">
              <p className="text-blue-500 text-sm">
                © 2025 BlueBlock MRV. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};