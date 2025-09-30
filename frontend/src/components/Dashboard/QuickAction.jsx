import React from 'react';
import { ArrowRight } from 'lucide-react';

const QuickAction = ({ title, description, action }) => {
  return (
    <button className="w-full bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group text-left"
      style={{
        boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
      }}
      onClick={() => console.log('Navigate to:', action)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
      </div>
      
      <p className="text-blue-300 text-sm leading-relaxed">
        {description}
      </p>
    </button>
  );
};

export default QuickAction;