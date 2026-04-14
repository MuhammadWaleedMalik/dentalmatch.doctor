"use client";

import Link from "next/link";
import { MegaMenu } from "./mega-menu";
import { Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex py-2 md:py-0 w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo Placeholder */}
            <div className="flex items-center text-xl font-bold text-slate-800">
               <span className="text-teal-500 mr-2 rounded-full border-2 border-teal-500 border-l-orange-500 w-8 h-8 flex items-center justify-center tracking-tighter italic">D</span>
               DentalPost
            </div>
          </Link>

          <div className="hidden md:flex ml-8 items-center flex-1">
             <MegaMenu />
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-600 hover:text-slate-900">
              <Search className="w-6 h-6" />
            </button>
            {session ? (
              <div className="flex items-center gap-4">
                 <Link href={`/dashboard/${(session.user as any).role}`} className="text-sm font-medium hover:text-orange-500">
                   Dashboard
                 </Link>
                 <button onClick={() => signOut()} className="text-sm font-medium hover:text-orange-500">
                   Logout
                 </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium hover:text-orange-500 text-slate-600">
                  Sign In
                </Link>
                <Link href="/register" className="px-5 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-50 transition-colors">
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
