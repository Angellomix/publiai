import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";
import { LayoutDashboard, Settings, Calendar, LogOut, Image as ImageIcon, BarChart3 } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 hidden md:flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
          <span className="text-xl font-bold tracking-tight">PubliAI</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-primary font-medium">
            <LayoutDashboard size={20} />
            Inicio
          </Link>
          <Link href="/dashboard/config" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 transition">
            <Settings size={20} />
            Configuración
          </Link>
          <Link href="/dashboard/schedule" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 transition">
            <Calendar size={20} />
            Horarios
          </Link>
          <Link href="/dashboard/stats" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 transition">
            <BarChart3 size={20} />
            Estadísticas
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5 italic text-sm text-slate-500">
          Plan: {(session.user as any).role === "ADMIN" ? "Administrador" : "Lite"}
        </div>
        
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between mb-8">
          <span className="text-xl font-bold">PubliAI</span>
          <LogoutButton iconOnly />
        </header>
        
        {children}
      </main>
    </div>
  );
}
