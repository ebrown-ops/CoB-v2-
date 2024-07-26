import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Loader2 } from 'lucide-react';

const allProducts = [
  { id: 'sw1', name: 'CRM Pro', category: 'Software' },
  { id: 'sw2', name: 'ERP Suite', category: 'Software' },
  { id: 'sw3', name: 'AccountMaster', category: 'Software' },
  { id: 'ln1', name: 'Small Business Loan', category: 'Loans' },
  { id: 'ln2', name: 'Equipment Financing', category: 'Loans' },
  { id: 'ln3', name: 'Business Line of Credit', category: 'Loans' },
  { id: 'cc1', name: 'Business Rewards Card', category: 'Credit Cards' },
  { id: 'cc2', name: 'Travel Points Card', category: 'Credit Cards' },
  { id: 'cc3', name: 'Cash Flow Card', category: 'Credit Cards' },
  { id: 'hr1', name: 'HR Management Suite', category: 'HR Solutions' },
  { id: 'hr2', name: 'Recruitment Tool', category: 'HR Solutions' },
  { id: 'hr3', name: 'Employee Engagement Platform', category: 'HR Solutions' },
];

export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setIsLoading(true);
        const results = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setIsLoading(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleResultClick = (result) => {
    let url;
    switch (result.category) {
      case 'Software':
        url = `/software/${result.id.slice(2)}`;
        break;
      case 'Loans':
        url = `/loans/${result.id.slice(2)}`;
        break;
      case 'Credit Cards':
        url = `/credit-cards/${result.id.slice(2)}`;
        break;
      case 'HR Solutions':
        url = `/hr-solutions/${result.id.slice(2)}`;
        break;
      default:
        url = '/';
    }
    router.push(url);
    setIsOpen(false);
    // Log search analytics
    console.log('Search clicked:', { term: searchTerm, result: result.name });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      // Log search analytics
      console.log('Search submitted:', { term: searchTerm });
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search products..." value={searchTerm} onValueChange={setSearchTerm} />
            <CommandList>
              {isLoading ? (
                <CommandItem>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </CommandItem>
              ) : (
                searchResults.map((result) => (
                  <CommandItem
                    key={result.id}
                    onSelect={() => handleResultClick(result)}
                  >
                    <span>{result.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">{result.category}</span>
                  </CommandItem>
                ))
              )}
              {searchResults.length === 0 && !isLoading && (
                <CommandItem>No results found</CommandItem>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button type="submit" size="sm" className="absolute right-0 top-0 h-full">
        Search
      </Button>
    </form>
  );
}