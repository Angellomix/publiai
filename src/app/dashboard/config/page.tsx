"use client";

import React, { useState, useEffect } from "react";
import { Save, Facebook, BadgeCheck, Type, Loader2 } from "lucide-react";

export default function ConfigPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    fbToken: "",
    fbPageId: "",
    watermark: "",
    niche: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      if (data) setConfig(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify(config),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) setStatus("Configuración guardada 🚀");
      else setStatus("Error al guardar");
    } catch (err) {
      setStatus("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="animate-fade-in max-w-4xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Configuración Técnica</h1>
        <p className="text-slate-400">Vincula tus redes y personaliza tu marca.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Facebook Config */}
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Facebook className="text-blue-400" size={20} /> Facebook API
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Facebook Page Token</label>
                <input
                  type="password"
                  value={config.fbToken}
                  onChange={(e) => setConfig({ ...config, fbToken: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition"
                  placeholder="EAA..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Facebook Page ID</label>
                <input
                  type="text"
                  value={config.fbPageId}
                  onChange={(e) => setConfig({ ...config, fbPageId: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition"
                  placeholder="102934..."
                />
              </div>
            </div>
          </div>

          {/* AI & Content Config */}
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Type className="text-primary" size={20} /> Personalización IA
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Nicho de Contenido</label>
                <input
                  type="text"
                  value={config.niche}
                  onChange={(e) => setConfig({ ...config, niche: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary transition"
                  placeholder="Ej: Emprendimiento, Fitness, Memes..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Texto de Marca / Watermark</label>
                <input
                  type="text"
                  value={config.watermark}
                  onChange={(e) => setConfig({ ...config, watermark: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary transition"
                  placeholder="@TuAgencia"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between glass-card p-6 border-indigo-500/30">
          <div className="text-sm text-slate-400 max-w-md">
            Asegúrate de que el Token de Facebook tenga permisos de <code className="text-indigo-400">pages_manage_posts</code> y <code className="text-indigo-400">pages_read_engagement</code>.
          </div>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2 px-10 py-4 shadow-xl shadow-primary/20"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Guardar Cambios</>}
          </button>
        </div>
      </form>
      
      {status && (
        <div className={`mt-6 p-4 rounded-xl text-center font-bold animate-fade-in ${status.includes("Error") ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {status}
        </div>
      )}
    </div>
  );
}
