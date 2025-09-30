import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome, Apple } from 'lucide-react';

export default function FarmerLoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [clickedElements, setClickedElements] = useState(new Set());
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  const handleElementClick = (elementId) => {
    setClickedElements(prev => new Set([...prev, elementId]));
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-950 relative overflow-hidden">
      {/* Smooth animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/40 via-zinc-800/40 to-slate-900/40 animate-pulse"></div>
      
      {/* Subtle background orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neutral-700/20 to-zinc-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-700/20 to-neutral-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-zinc-700/20 to-slate-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Fine grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(161, 161, 170, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Cursor glow effect - grey theme */}
      <div 
        ref={glowRef}
        className="fixed w-96 h-96 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(161, 161, 170, 0.15) 0%, rgba(113, 113, 122, 0.1) 30%, transparent 70%)',
          filter: 'blur(4px)'
        }}
      />
      
      {/* Custom cursor - grey theme */}
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 border-2 border-zinc-400 rounded-full pointer-events-none z-20 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-zinc-400/30"
        style={{
          boxShadow: '0 0 15px rgba(161, 161, 170, 0.4), inset 0 0 15px rgba(161, 161, 170, 0.2)'
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-zinc-500 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            opacity: 0.3
          }}
        />
      ))}

      {/* Main container */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-30">
        <div className="w-full max-w-2xl">
          {/* Main form card */}
          <div className="bg-neutral-900/40 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl relative overflow-hidden border border-zinc-800/50"
               style={{
                 boxShadow: '0 0 40px rgba(39, 39, 42, 0.3), 0 0 80px rgba(24, 24, 27, 0.2)'
               }}>
            {/* Card subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 via-neutral-800/10 to-slate-800/10 rounded-3xl blur-xl"></div>
            
            <div className="relative z-10">
              {/* Toggle buttons */}
              <div className="flex bg-neutral-800/60 rounded-2xl relative mb-8 overflow-hidden border border-zinc-700/30">
                <div 
                  className={`absolute top-0 h-full bg-gradient-to-r from-zinc-700 to-neutral-700 transition-all duration-500 ease-out ${
                    isSignUp ? 'left-1/2 w-1/2' : 'left-0 w-1/2'
                  }`}
                  style={{
                    boxShadow: '0 0 20px rgba(82, 82, 91, 0.4), inset 0 0 20px rgba(63, 63, 70, 0.2)'
                  }}
                />
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-500 relative z-10 ${
                    !isSignUp ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-500 relative z-10 ${
                    isSignUp ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5 transition-all duration-300 group-hover:text-zinc-300 z-10" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      onClick={() => handleElementClick('name')}
                      className="w-full pl-12 pr-4 py-4 bg-neutral-800/60 rounded-2xl text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                      style={{
                        borderColor: clickedElements.has('name') ? '#52525b' : '#3f3f46',
                        boxShadow: clickedElements.has('name')
                          ? '0 0 0 3px rgba(82, 82, 91, 0.2), 0 0 20px rgba(63, 63, 70, 0.3)'
                          : '0 0 10px rgba(63, 63, 70, 0.2)'
                      }}
                      required
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5 transition-all duration-300 group-hover:text-zinc-300 z-10" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    onClick={() => handleElementClick('email')}
                    className="w-full pl-12 pr-4 py-4 bg-neutral-800/60 rounded-2xl text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                    style={{
                      borderColor: clickedElements.has('email') ? '#52525b' : '#3f3f46',
                      boxShadow: clickedElements.has('email')
                        ? '0 0 0 3px rgba(82, 82, 91, 0.2), 0 0 20px rgba(63, 63, 70, 0.3)'
                        : '0 0 10px rgba(63, 63, 70, 0.2)'
                    }}
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5 transition-all duration-300 group-hover:text-zinc-300 z-10" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onClick={() => handleElementClick('password')}
                    className="w-full pl-12 pr-12 py-4 bg-neutral-800/60 rounded-2xl text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                    style={{
                      borderColor: clickedElements.has('password') ? '#52525b' : '#3f3f46',
                      boxShadow: clickedElements.has('password')
                        ? '0 0 0 3px rgba(82, 82, 91, 0.2), 0 0 20px rgba(63, 63, 70, 0.3)'
                        : '0 0 10px rgba(63, 63, 70, 0.2)'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-all duration-300 z-10"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-zinc-500 bg-neutral-800 border-zinc-700 rounded focus:ring-zinc-500 focus:ring-2 transition-all duration-300"
                      />
                      <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-all duration-300"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={() => handleElementClick('submit')}
                  className="w-full py-4 bg-gradient-to-r from-zinc-700 to-neutral-700 hover:from-zinc-600 hover:to-neutral-600 text-white font-semibold rounded-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden border"
                  style={{
                    borderColor: clickedElements.has('submit') ? '#52525b' : '#3f3f46',
                    boxShadow: clickedElements.has('submit')
                      ? '0 0 0 3px rgba(82, 82, 91, 0.2), 0 0 30px rgba(63, 63, 70, 0.4)'
                      : '0 0 20px rgba(63, 63, 70, 0.3)'
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-neutral-800/80 text-zinc-400 rounded-xl backdrop-blur-sm">or continue with</span>
                  </div>
                </div>

                {/* Social login buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleSocialLogin('google');
                      handleElementClick('google');
                    }}
                    className="flex items-center justify-center py-3 px-4 bg-neutral-800/60 rounded-xl transition-all duration-300 group border hover:bg-neutral-800"
                    style={{
                      borderColor: clickedElements.has('google') ? '#52525b' : '#3f3f46',
                      boxShadow: clickedElements.has('google')
                        ? '0 0 0 3px rgba(82, 82, 91, 0.2), 0 0 20px rgba(63, 63, 70, 0.3)'
                        : '0 0 10px rgba(63, 63, 70, 0.2)'
                    }}
                  >
                    <Chrome className="w-5 h-5 text-zinc-400 group-hover:text-white transition-all duration-300" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSocialLogin('github');
                      handleElementClick('github');
                    }}
                    className="flex items-center justify-center py-3 px-4 bg-neutral-800/60 rounded-xl transition-all duration-300 group border hover:bg-neutral-800"
                    style={{
                      borderColor: clickedElements.has('github') ? '#52525b' : '#3f3f46',
                      boxShadow: clickedElements.has('github')
                        ? '0 0 0 3px rgba(82, 82, 91, 0.2), 0 0 20px rgba(63, 63, 70, 0.3)'
                        : '0 0 10px rgba(63, 63, 70, 0.2)'
                    }}
                  >
                    <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-all duration-300" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSocialLogin('apple');
                      handleElementClick('apple');
                    }}
                    className="flex items-center justify-center py-3 px-4 bg-neutral-800/60 rounded-xl transition-all duration-300 group border hover:bg-neutral-800"
                    style={{
                      borderColor: clickedElements.has('apple') ? '#52525b' : '#3f3f46',
                      boxShadow: clickedElements.has('apple')
                        ? '0 0 0 3px rgba(82, 82, 91, 0.2), 0 0 20px rgba(63, 63, 70, 0.3)'
                        : '0 0 10px rgba(63, 63, 70, 0.2)'
                    }}
                  >
                    <Apple className="w-5 h-5 text-zinc-400 group-hover:text-white transition-all duration-300" />
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-zinc-400 text-sm">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-1 text-zinc-300 hover:text-white transition-all duration-300 font-semibold"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-zinc-500 text-xs">
              By continuing, you agree to our{' '}
              <a href="#" className="text-zinc-400 hover:text-zinc-300 transition-all duration-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-zinc-400 hover:text-zinc-300 transition-all duration-300">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}