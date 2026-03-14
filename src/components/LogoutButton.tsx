"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton({ iconOnly }: { iconOnly?: boolean }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={`flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition w-full ${iconOnly ? 'justify-center w-auto' : ''}`}
    >
      <LogOut size={20} />
      {!iconOnly && <span>Cerrar Sesión</span>}
    </button>
  );
}
