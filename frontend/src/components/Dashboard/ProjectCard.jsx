import React from 'react';

const ProjectCard = ({ project }) => {
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'from-green-500 to-emerald-500';
    if (progress >= 75) return 'from-blue-500 to-cyan-500';
    if (progress >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group"
      style={{
        boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
      }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-blue-300 text-sm mb-2">{project.methodology}</p>
          <p className="text-blue-400 text-xs">{project.location}</p>
        </div>
        
        <div className="text-right">
          <div className="text-white font-bold text-lg">{project.credits}</div>
          <div className={`text-xs ${
            project.creditsChange.includes('+') ? 'text-green-400' : 'text-red-400'
          }`}>
            {project.creditsChange}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-blue-300 mb-2">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(project.progress)} transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
          project.status === 'active' 
            ? 'bg-blue-900/40 text-blue-400 border border-blue-700/50'
            : 'bg-green-900/40 text-green-400 border border-green-700/50'
        }`}>
          {project.status === 'active' ? 'In Progress' : 'Completed'}
        </span>
        
        <button className="text-blue-400 hover:text-white text-sm font-medium transition-colors duration-300">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;