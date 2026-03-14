import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Image as ImageIcon, CheckCircle, Clock, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscription: true,
      configuration: true,
      publications: {
        take: 5,
        orderBy: { timestamp: "desc" },
      },
    },
  });

  if (!user) return null;

  return (
    <div className="animate-fade-in max-w-6xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Hola, {user.name} 👋</h1>
        <p className="text-slate-400">Aquí tienes el resumen de tu automatización hoy.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Plan Actual</span>
            <CheckCircle className="text-green-400" size={20} />
          </div>
          <div className="text-2xl font-bold text-white uppercase">{user.subscription?.plan || "LITE"}</div>
          <p className="text-xs text-slate-500 mt-2">Vence el {user.subscription?.endDate.toLocaleDateString()}</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Publicaciones Hoy</span>
            <ImageIcon className="text-blue-400" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">0 / {user.configuration?.imagesPerDay || 6}</div>
          <p className="text-xs text-slate-500 mt-2">Límite diario respetado</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Estado del Sistema</span>
            <TrendingUp className="text-indigo-400" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">ACTIVO</div>
          <p className="text-xs text-slate-500 mt-2">Flujo n8n conectado</p>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={20} className="text-primary" /> Historial Reciente
          </h2>
          <div className="glass-card overflow-hidden">
            {user.publications.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                Aún no hay publicaciones. ¡Tu flujo empezará pronto!
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {user.publications.map((pub) => (
                  <div key={pub.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                        <ImageIcon size={20} className="text-slate-600" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm line-clamp-1">{pub.caption}</div>
                        <div className="text-slate-500 text-xs">{pub.timestamp.toLocaleString()}</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                      {pub.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Config Summary */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Configuración</h2>
          <div className="glass-card p-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Página de Facebook</span>
              <div className="text-sm font-medium text-slate-300 truncate">
                {user.configuration?.fbPageId || "No vinculada"}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Marca de Agua</span>
              <div className="text-sm font-medium text-slate-300">
                {user.configuration?.watermark || "Predeterminada"}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Nicho</span>
              <div className="text-sm font-medium text-slate-300">
                {user.configuration?.niche || "General"}
              </div>
            </div>
            <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold transition border border-white/10">
              Editar Ajustes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
