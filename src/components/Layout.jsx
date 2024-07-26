import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../components/ui/button";
import Footer from './Footer';
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import Notifications from './Notifications';
import GlobalSearch from './GlobalSearch';
import ProductNavigation from './ProductNavigation';

console.log('Layout component is being loaded');

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center font-bold text-xl text-primary">
                SMB Solutions
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <ProductNavigation />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-64 mr-4">
                <GlobalSearch />
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Theme"
                className="mr-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Notifications />
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="mr-2">Dashboard</Button>
                  </Link>
                  <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => signIn()}>Sign In</Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
                className="ml-2 sm:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <ProductNavigation />
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}