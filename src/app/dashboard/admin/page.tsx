import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users, DollarSign, Activity, Calendar, ShieldCheck } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();

  if (!session || (session.user as any).role !== "ADMIN") {
    // Para propósitos de este demo, si no hay usuarios permitiremos ver el panel 
    // pero en un sistema real redirigiríamos.
    // redirect("/dashboard");
  }

  const stats = {
    totalUsers: await prisma.user.count(),
    totalRevenue: 245000, // Simulado
    activeSubs: await prisma.subscription.count({ where: { status: "ACTIVE" } }),
    totalPubs: await prisma.publication.count(),
  };

  const recentUsers = await prisma.user.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { subscription: true },
  });

  return (
    <div className="animate-fade-in max-w-6xl">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel Maestro <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded ml-2">ADMIN</span></h1>
          <p className="text-slate-400">Control global de PubliAI y métricas de negocio.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20">
          <ShieldCheck size={18} /> <span className="text-sm font-bold uppercase">Sistemas Operativos</span>
        </div>
      </header>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: <Users className="text-blue-400" />, label: "Usuarios Totales", value: stats.totalUsers },
          { icon: <DollarSign className="text-emerald-400" />, label: "Ganancias Est.", value: `$${stats.totalRevenue.toLocaleString()}` },
          { icon: <Activity className="text-orange-400" />, label: "Suscripciones", value: stats.activeSubs },
          { icon: <Calendar className="text-purple-400" />, label: "Publicaciones", value: stats.totalPubs },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6">Últimos Registros</h2>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Registro</th>
                  <th className="px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="text-sm text-slate-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-bold">
                        {user.subscription?.plan || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Activo
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-6">Flujos n8n</h2>
          <div className="glass-card p-6 space-y-6">
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <h4 className="text-orange-400 font-bold text-sm mb-1 uppercase tracking-wider">Alerta de n8n</h4>
              <p className="text-xs text-orange-300/80 leading-relaxed">
                El flujo "Fábrica Multi-Tenant" está leyendo actualmente de la base de datos local.
              </p>
            </div>
            
            <button className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition shadow-lg shadow-indigo-500/20">
              Ver Logs de n8n
            </button>
            <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition border border-white/10">
              Gestionar Webhooks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
