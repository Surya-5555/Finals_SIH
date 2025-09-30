import React from 'react';
import MethodologyCard from './MethodologyCard';
import { methodologiesData } from '../../data/methodologiesData';

const MethodologiesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {methodologiesData.map((methodology) => (
        <MethodologyCard 
          key={methodology.id} 
          methodology={methodology} 
        />
      ))}
    </div>
  );
};

export default MethodologiesGrid;