import React from 'react';
import SmartFarm3DView from '../components/SmartFarm3DView';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import DripSystemInfographic from '../components/DripSystemInfographic';

export default function HomePage({ onNavigate }) {
  return (
    <div className="space-y-12">
      {/* 3D Smart Farm Viewport */}
      <SmartFarm3DView />
      
      {/* Enterprise Hero */}
      <Hero onNavigate={onNavigate} />

      {/* Trust Stats Bar */}
      <Stats />

      {/* Technical System Infographic Diagram */}
      <DripSystemInfographic />
    </div>
  );
}
