'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MegaMenu } from '@/components/mega-menu';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">DentalPost</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <MegaMenu />
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            
            {session ? (
              <>
                 <Button variant="ghost" asChild>
                   <Link href={`/dashboard/${(session.user as any).role}`}>Dashboard</Link>
                 </Button>
                 <Button className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500" onClick={() => signOut()}>
                   Sign Out
                 </Button>
              </>
            ) : (
              <>
                 <Button variant="ghost" asChild>
                   <Link href="/login">Sign In</Link>
                 </Button>
                 <Button className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500" asChild>
                   <Link href="/register">Create Account</Link>
                 </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
