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
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

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
        // Log analytics for search attempt
        console.log('Search attempt:', { term: searchTerm, resultsCount: results.length });
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
    addToRecentSearches(searchTerm);
    // Log search analytics
    console.log('Search result clicked:', { term: searchTerm, result: result.name });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      addToRecentSearches(searchTerm);
      // Log search analytics
      console.log('Search submitted:', { term: searchTerm });
    }
  };

  const addToRecentSearches = (term) => {
    const updatedSearches = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(searchResults[selectedIndex]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-8 pr-4 w-full"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search products..." value={searchTerm} onValueChange={setSearchTerm} />
            <CommandList>
              {isLoading ? (
                <CommandItem>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </CommandItem>
              ) : (
                <>
                  {searchResults.map((result, index) => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleResultClick(result)}
                      className={selectedIndex === index ? 'bg-accent' : ''}
                    >
                      <span>{result.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">{result.category}</span>
                    </CommandItem>
                  ))}
                  {searchResults.length === 0 && searchTerm && (
                    <CommandItem>No results found</CommandItem>
                  )}
                  {!searchTerm && recentSearches.length > 0 && (
                    <>
                      <CommandItem disabled>Recent Searches</CommandItem>
                      {recentSearches.map((term, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => setSearchTerm(term)}
                        >
                          {term}
                        </CommandItem>
                      ))}
                    </>
                  )}
                </>
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