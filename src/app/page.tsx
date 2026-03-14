"use client";

import React from "react";
import { Zap, Shield, Rocket, CheckCircle, Mail, DollarSign } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero container mx-auto px-6 pt-24 pb-16 text-center max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          Publicaciones con <span className="gradient-text">IA</span> <br className="hidden md:block" /> 
          en Piloto Automático
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          PubliAI genera, marca y publica contenido viral en tus redes sociales mientras tú duermes. Multi-tenant, Blindado y Rentable.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary flex items-center gap-2 text-lg">
            Empezar Ahora <Rocket size={20} />
          </button>
          <button className="glass-card px-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">
            Ver Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-primary" />, title: "IA Viral", desc: "Generación de texto y selección de imágenes con Groq y Pexels." },
            { icon: <Shield className="text-secondary" />, title: "Marca Blindada", desc: "Marcas de agua automáticas y control total sobre el nicho." },
            { icon: <Rocket className="text-accent" />, title: "Full Automático", desc: "Configura horarios una vez y deja que el flujo n8n trabaje." },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 hover:-translate-y-2 transition duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Paquetes <span className="gradient-text">Rentables</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Lite", price: "2,000", features: ["6 Publicaciones diarias", "Marca de agua básica", "Nicho específico", "Soporte Mail"], color: "blue" },
              { name: "Pro", price: "5,000", features: ["12 Publicaciones diarias", "Múltiples Fanpages", "Marcas avanzadas", "Estadísticas en vivo"], color: "purple", recommended: true },
              { name: "Advanced", price: "10,000", features: ["Ilimitado", "IA Personalizada", "Gestión de multi-usuarios", "Soporte Prioritario"], color: "cyan" },
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-8 flex flex-col ${plan.recommended ? 'border-primary ring-2 ring-primary/20 scale-105' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">${plan.price} <span className="text-lg font-normal text-slate-400">/ mes</span></div>
                <ul className="text-left space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle size={16} className="text-green-400" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition ${plan.recommended ? 'btn-primary' : 'bg-white/10 hover:bg-white/20'}`}>
                  Seleccionar {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">¿Listo para escalar?</h2>
            <p className="text-slate-400 mb-8">El sistema multi-tenant te permite gestionar múltiples clientes o proyectos desde una sola suscripción.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <Mail size={20} /> <span className="text-lg">contacto@publiai.com</span>
            </div>
          </div>
          <div className="glass-card p-8">
            <h4 className="text-xl font-bold mb-4">Mándanos un mensaje</h4>
            <div className="space-y-4">
              <input type="text" placeholder="Tu Nombre" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition" />
              <textarea placeholder="Tu mensaje..." className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 h-32 focus:border-primary outline-none transition"></textarea>
              <button className="btn-primary w-full">Enviar Consulta</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
