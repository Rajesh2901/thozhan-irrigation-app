import React, { useEffect, useRef, useState } from 'react';

export default function SmartFarm3DView() {
  const canvasRef = useRef(null);
  const [pumpActive, setPumpActive] = useState(true);

  // HTML5 Canvas animation simulating animated glowing water pipeline flow and mist sprays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw animated water pipeline flow arcs
      if (pumpActive) {
        offset = (offset + 1.5) % 40;

        // Pipeline 1: Solar Station to Sprinkler Valve
        ctx.beginPath();
        ctx.setLineDash([12, 10]);
        ctx.lineDashOffset = -offset;
        ctx.moveTo(w * 0.25, h * 0.55);
        ctx.quadraticCurveTo(w * 0.45, h * 0.65, w * 0.85, h * 0.52);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 6;
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#4ade80';
        ctx.stroke();

        // Sprinkler Mist Arcs
        ctx.setLineDash([]);
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#06b6d4';
        
        for (let i = 0; i < 4; i++) {
          const startX = w * (0.55 + i * 0.08);
          const startY = h * (0.58 - i * 0.02);
          ctx.beginPath();
          ctx.arc(startX, startY, 35 + (offset % 15), Math.PI, 0);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pumpActive]);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-brand-800/80 shadow-2xl bg-gradient-to-br from-[#062c1e] via-[#041f14] to-[#02120b] min-h-[520px] md:min-h-[620px] flex flex-col justify-between p-4 md:p-8">
      
      {/* 3D Canvas Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Background Graphic Field Image Simulation Layer */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-black z-0"></div>

      {/* TOP HEADER CONTROLS & GOLDEN 100% GRANT BADGE (IMAGE 1 MATCH) */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Left: Pump Status Card */}
        <div className="glass-dashboard-card rounded-2xl p-4 space-y-2.5 w-full sm:w-auto min-w-[240px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-charging-station text-yellow-400 text-sm"></i>
              <span className="text-xs font-bold text-white">Pump Status</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Active</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono font-bold text-slate-200">
            <div className="flex items-center space-x-1">
              <i className="fa-solid fa-bolt text-emerald-400"></i>
              <span>8.2 kW</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fa-solid fa-droplet text-cyan-400"></i>
              <span>1450 L/h</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] font-medium text-slate-300">
            <span>Solar Input <strong>95%</strong></span>
            <button 
              onClick={() => setPumpActive(!pumpActive)}
              className={`w-8 h-4 rounded-full p-0.5 transition ${pumpActive ? 'bg-emerald-500' : 'bg-slate-600'}`}
              aria-label="Toggle Pump Power"
            >
              <div className={`w-3 h-3 rounded-full bg-white transition transform ${pumpActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        {/* Center: Title Header Pill */}
        <div className="hidden lg:flex flex-col items-center glass-dashboard-card px-6 py-2.5 rounded-2xl text-center border border-brand-500/30 shadow-lg">
          <h3 className="font-extrabold text-base text-white tracking-wide">Interactive Irrigation View</h3>
          <p className="text-xs font-semibold text-brand-300">3D நீர்ப்பாசன பார்வை</p>
        </div>

        {/* Right: Golden 3D Metallic 100% Grant Badge (IMAGE 1 MATCH) */}
        <div className="gold-grant-badge rounded-2xl px-5 py-3 flex items-center space-x-3.5 shadow-2xl shrink-0 self-end sm:self-auto hover-lift gpu-accelerated">
          <div className="w-10 h-10 rounded-full bg-yellow-100 text-amber-900 flex items-center justify-center text-lg font-black shadow-inner border border-amber-300">
            <i className="fa-solid fa-droplet text-amber-600"></i>
          </div>
          <div>
            <div className="text-base font-black text-amber-950 leading-tight">100% Grant</div>
            <div className="text-xs font-extrabold text-amber-900">100% மானியம்</div>
          </div>
        </div>

      </div>

      {/* CENTER SPATIAL LABELS & PIPELINE NODES (IMAGE 1 MATCH) */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        
        {/* Node 1: Solar Pump Station */}
        <div className="glass-dashboard-card rounded-xl p-3.5 space-y-1 border-l-4 border-yellow-400 shadow-md">
          <div className="text-[10px] text-yellow-300 uppercase font-bold tracking-wider">Solar Station</div>
          <div className="text-xs font-bold text-white">Solar Pump Station</div>
          <div className="text-[10px] text-slate-300">Capacity: 10 HP Dual</div>
        </div>

        {/* Node 2: Solar Energy Specs */}
        <div className="glass-dashboard-card rounded-xl p-3.5 space-y-1 border-l-4 border-emerald-400 shadow-md">
          <div className="flex justify-between items-center text-[10px] text-emerald-300 uppercase font-bold">
            <span>Solar Energy</span>
            <span>92% Eff.</span>
          </div>
          <div className="text-sm font-black font-mono text-white">9.8 kWh <span className="text-[10px] text-slate-400 font-normal">Today</span></div>
          <div className="text-[10px] text-slate-300">Drip Flow: <strong>75 L/min</strong></div>
        </div>

        {/* Node 3: Valve & Soil Sensor */}
        <div className="glass-dashboard-card rounded-xl p-3.5 space-y-1 border-l-4 border-cyan-400 shadow-md">
          <div className="text-[10px] text-cyan-300 uppercase font-bold tracking-wider">Smart Valve</div>
          <div className="text-xs font-bold text-white">Sprinkler Pipeline</div>
          <div className="text-[10px] text-slate-300">Soil Sensor: <strong>Moist (84%)</strong></div>
        </div>

        {/* Node 4: Sprinkler Valve */}
        <div className="glass-dashboard-card rounded-xl p-3.5 space-y-1 border-l-4 border-blue-400 shadow-md">
          <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">Sprinkler Valve</div>
          <div className="text-xs font-bold text-white">Pressure Regulated</div>
          <div className="text-[10px] text-slate-300">Radius: <strong>14 Meters</strong></div>
        </div>

      </div>

      {/* BOTTOM TELEMETRY BAR: CROP HEALTH & WATER USAGE (IMAGE 1 MATCH) */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        
        {/* Left: Crop Health & Water Usage Widget */}
        <div className="glass-dashboard-card rounded-2xl p-4 md:p-5 space-y-3 max-w-md w-full">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-200">Crop Health Index</span>
            <span className="text-emerald-400 font-mono font-black text-sm">98%</span>
          </div>

          <div className="w-full bg-slate-950/80 rounded-full h-2.5 p-0.5 border border-brand-900">
            <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full rounded-full w-[98%] transition-all duration-500 shadow"></div>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
              <span className="font-extrabold text-white">98% Optimal</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Water Usage</span>
              <span className="font-black text-yellow-300 font-mono text-sm">4.2 m³ Used</span>
            </div>
          </div>
        </div>

        {/* Right: Pipeline Control Badge */}
        <div className="flex items-center space-x-3 self-end md:self-auto">
          <span className="glass-dashboard-card px-4 py-2.5 rounded-xl text-xs font-bold text-brand-300 border border-brand-700 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Drip and Sprinkler Pipeline Active</span>
          </span>
        </div>

      </div>

    </div>
  );
}
