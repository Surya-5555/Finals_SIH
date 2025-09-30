import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatsCard = ({ title, value, change, changeType, period }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group"
      style={{
        boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
      }}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-blue-300 text-sm font-medium mb-2">{title}</h3>
          <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{value}</div>
        </div>
        
        {change && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
            changeType === 'positive' 
              ? 'bg-green-900/40 text-green-400 border border-green-700/50' 
              : 'bg-red-900/40 text-red-400 border border-red-700/50'
          }`}>
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-semibold">{change}</span>
          </div>
        )}
      </div>
      
      <p className="text-blue-400 text-xs mt-2">{period}</p>
    </div>
  );
};

export default StatsCard;