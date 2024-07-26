import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
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
                <Link href="/credit-cards" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Credit Cards
                </Link>
                <Link href="/hr-solutions" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  HR Solutions
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" className="ml-4">
                Sign In
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/privacy" className="text-base text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="text-base text-gray-300 hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">&copy; 2023 SMB Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}