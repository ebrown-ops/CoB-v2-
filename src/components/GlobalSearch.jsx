import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";

const allProducts = [
  { id: 'sw1', name: 'CRM Pro', category: 'Software' },
  { id: 'sw2', name: 'ERP Suite', category: 'Software' },
  { id: 'ln1', name: 'Small Business Loan', category: 'Loans' },
  { id: 'ln2', name: 'Equipment Financing', category: 'Loans' },
  { id: 'cc1', name: 'Business Rewards Card', category: 'Credit Cards' },
  { id: 'cc2', name: 'Travel Points Card', category: 'Credit Cards' },
  { id: 'hr1', name: 'HR Management Suite', category: 'HR Solutions' },
  { id: 'hr2', name: 'Recruitment Tool', category: 'HR Solutions' },
];

export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
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
  };

  return (
    <div className="relative">
      <Command>
        <CommandInput
          placeholder="Search for products..."
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        {searchResults.length > 0 && (
          <CommandList>
            {searchResults.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => handleResultClick(result)}
              >
                <span>{result.name}</span>
                <span className="text-sm text-gray-500 ml-2">{result.category}</span>
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
}