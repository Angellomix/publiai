"use client";

import React from "react";
import { BarChart3, TrendingUp, Image as ImageIcon, Calendar, ArrowUpRight } from "lucide-react";

export default function StatsPage() {
  return (
    <div className="animate-fade-in max-w-6xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Análisis y Estadísticas</h1>
        <p className="text-slate-400">Rendimiento de tus publicaciones automáticas.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Mockup */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" /> Alcance Estimado
              </h3>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-slate-400 outline-none">
                <option>Últimos 7 días</option>
                <option>Últimos 30 días</option>
              </select>
            </div>
            
            {/* Simulated Chart */}
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-grow flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-lg transition-all duration-500 group-hover:brightness-125" 
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-slate-500 mt-2 uppercase">{['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="text-slate-500 text-xs font-bold uppercase mb-4">Total Publicado</div>
              <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                0 <span className="text-sm font-normal text-slate-500 tracking-normal">Imágenes</span>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="text-slate-500 text-xs font-bold uppercase mb-4">Eficiencia IA</div>
              <div className="text-4xl font-bold text-emerald-400">98%</div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="glass-card p-8 space-y-8">
          <h3 className="text-xl font-bold text-white">Distribución</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Publicaciones Exitosas</span>
                <span className="text-white font-bold">100%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-full" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Pendientes</span>
                <span className="text-white font-bold">0%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-0" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-indigo-300">
              <ArrowUpRight size={20} />
              <div className="text-xs">
                Tu alcance ha subido un <strong>12%</strong> esta semana gracias a la automatización constante.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
