import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  const handleSearch = (e) => {
    e.preventDefault();
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

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
      <form onSubmit={handleSearch} className="flex items-center">
        <Input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" className="ml-2">Search</Button>
      </form>
      {searchResults.length > 0 && (
        <Card className="absolute z-10 w-full mt-2">
          <CardContent className="p-2">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <p className="font-semibold">{result.name}</p>
                <p className="text-sm text-gray-500">{result.category}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}