import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Footer from './Footer';
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import Notifications from './Notifications';
import GlobalSearch from './GlobalSearch';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Software</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/software/crm">CRM</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/software/erp">ERP</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/software/accounting">Accounting</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Loans</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/loans/business">Business Loans</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/loans/equipment">Equipment Financing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/loans/line-of-credit">Line of Credit</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/credit-cards" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Credit Cards
                </Link>
                <Link href="/hr-solutions" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  HR Solutions
                </Link>
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
                <Link href="/software" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Software</Link>
                <Link href="/loans" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Loans</Link>
                <Link href="/credit-cards" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Credit Cards</Link>
                <Link href="/hr-solutions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">HR Solutions</Link>
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