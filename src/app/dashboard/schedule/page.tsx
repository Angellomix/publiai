"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar as CalendarIcon, Save, Loader2, Info } from "lucide-react";

export default function SchedulePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    imagesPerDay: 6,
    scheduledDays: "1,2,3,4,5,6,0",
    scheduledHours: "9,12,15,18,21,0",
  });
  const [status, setStatus] = useState("");

  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      if (data) setConfig({ ...config, ...data });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (dayIndex: number) => {
    const selected = config.scheduledDays.split(",").filter(d => d !== "");
    let newDays;
    if (selected.includes(dayIndex.toString())) {
      newDays = selected.filter(d => d !== dayIndex.toString());
    } else {
      newDays = [...selected, dayIndex.toString()];
    }
    setConfig({ ...config, scheduledDays: newDays.sort().join(",") });
  };

  const toggleHour = (hour: number) => {
    const selected = config.scheduledHours.split(",").filter(h => h !== "");
    let newHours;
    if (selected.includes(hour.toString())) {
      newHours = selected.filter(h => h !== hour.toString());
    } else {
      newHours = [...selected, hour.toString()];
    }
    setConfig({ ...config, scheduledHours: newHours.sort((a, b) => parseInt(a) - parseInt(b)).join(",") });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify(config),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) setStatus("Horarios actualizados");
      else setStatus("Error al guardar");
    } catch (err) {
      setStatus("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="animate-fade-in max-w-5xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Gestión de Horarios</h1>
        <p className="text-slate-400">Define cuándo quieres que PubliAI trabaje por ti.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Days Selection */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <CalendarIcon className="text-primary" size={20} /> Días de Publicación
            </h3>
            <div className="flex flex-wrap gap-3">
              {days.map((day, i) => (
                <button
                  key={day}
                  onClick={() => toggleDay(i)}
                  className={`px-4 py-2 rounded-xl border transition text-sm font-medium ${
                    config.scheduledDays.split(",").includes(i.toString())
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Hours Selection */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Clock className="text-primary" size={20} /> Horas del Día (Formato 24h)
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {hours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => toggleHour(hour)}
                  className={`py-3 rounded-xl border transition text-center font-mono ${
                    config.scheduledHours.split(",").includes(hour.toString())
                      ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {hour.toString().padStart(2, "0")}:00
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Limits & Info */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent">
            <h3 className="font-bold text-white mb-4">Resumen de Límites</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Plan:</span>
                <span className="text-indigo-400 font-bold text-sm uppercase">Lite</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Máx. Diarias:</span>
                <span className="text-white font-bold text-sm">6 imágenes</span>
              </div>
              <div className="h-px bg-white/5 my-2" />
              <div className="text-xs text-slate-500 leading-relaxed italic">
                <Info size={14} className="inline mr-1 mb-1" />
                Si configuras más de 6 horas, el sistema solo tomará las primeras 6 de cada día para cumplir con tu suscripción.
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg shadow-2xl shadow-primary/30"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Aplicar Horarios</>}
          </button>
          
          {status && (
            <div className={`p-4 rounded-xl text-center text-sm font-bold animate-fade-in ${status.includes("Error") ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
