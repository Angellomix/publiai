"use client";

import React from "react";
import { Zap, Shield, Rocket, CheckCircle, Mail } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-12 md:pt-32 md:pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Publicaciones con <span className="gradient-text">IA</span> <br className="hidden md:block" /> 
            en Piloto Automático
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 mx-auto max-w-2xl px-4">
            PubliAI genera, marca y publica contenido viral en tus redes sociales mientras tú duermes. Multi-tenant, Blindado y Rentable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <button className="btn-primary flex items-center justify-center gap-2 text-base md:text-lg">
              Empezar Ahora <Rocket size={20} />
            </button>
            <button className="glass-card px-8 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition flex items-center justify-center">
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-900/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap className="text-blue-400" />, title: "IA Viral", desc: "Generación de texto y selección de imágenes con Groq y Pexels." },
              { icon: <Shield className="text-purple-400" />, title: "Marca Blindada", desc: "Marcas de agua automáticas y control total sobre el nicho." },
              { icon: <Rocket className="text-cyan-400" />, title: "Full Automático", desc: "Configura horarios una vez y deja que el flujo n8n trabaje." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 group">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Paquetes <span className="gradient-text">Rentables</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Lite", price: "2,000", features: ["6 Publicaciones diarias", "Marca de agua básica", "Nicho específico", "Soporte Mail"], color: "blue" },
              { name: "Pro", price: "5,000", features: ["12 Publicaciones diarias", "Múltiples Fanpages", "Marcas avanzadas", "Estadísticas en vivo"], color: "purple", recommended: true },
              { name: "Advanced", price: "10,000", features: ["Ilimitado", "IA Personalizada", "Gestión de multi-usuarios", "Soporte Prioritario"], color: "cyan" },
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-8 flex flex-col relative ${plan.recommended ? 'ring-2 ring-indigo-500' : ''}`}>
                {plan.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs py-1 px-3 rounded-full font-bold">RECOMENDADO</div>}
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl md:text-4xl font-bold text-white mb-6">${plan.price} <span className="text-base font-normal text-slate-400">/ mes</span></div>
                <ul className="text-left space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle size={16} className="text-green-500 shrink-0" /> <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition ${plan.recommended ? 'btn-primary' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="py-16 md:py-24 border-t border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">¿Listo para escalar?</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">El sistema multi-tenant te permite gestionar múltiples clientes o proyectos desde una sola suscripción.</p>
              <div className="flex items-center gap-4 text-slate-300">
                <Mail size={20} className="text-indigo-400" /> <span className="text-lg">contacto@publiai.com</span>
              </div>
            </div>
            <div className="glass-card p-8">
              <h4 className="text-xl font-bold text-white mb-6">Mándanos un mensaje</h4>
              <div className="space-y-4">
                <input type="text" placeholder="Tu Nombre" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition" />
                <textarea placeholder="Tu mensaje..." className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 h-32 text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition resize-none"></textarea>
                <button className="btn-primary w-full py-4 text-lg">Enviar Consulta</button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
            © 2026 PubliAI. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
