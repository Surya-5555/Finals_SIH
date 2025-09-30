import React from 'react';
import { useNavigate } from 'react-router-dom';

const MethodologyCard = ({ methodology }) => {
  const navigate = useNavigate();

  const handleStartForm = () => {
    navigate(`/methodologies/${methodology.id}`);
  };

  return (
    <div className="group relative">
      <div 
        className={`bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border ${methodology.borderColor} hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] h-full flex flex-col`}
        style={{
          boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${methodology.color} text-white mb-3`}>
              {methodology.code}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {methodology.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-blue-200 text-sm leading-relaxed mb-6 flex-1">
          {methodology.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <div className="text-blue-300 text-sm font-semibold mb-3 uppercase tracking-wide">
            {methodology.category} GARMENTS
          </div>
          <div className="space-y-2">
            {methodology.features.map((feature, index) => (
              <div key={index} className="text-blue-200 text-sm">{feature}</div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartForm}
          className="w-full bg-slate-800/60 hover:bg-slate-700/60 text-blue-300 hover:text-white py-3 px-4 rounded-xl border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group flex items-center justify-center font-semibold"
        >
          Start Form
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${methodology.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
    </div>
  );
};

export default MethodologyCard;