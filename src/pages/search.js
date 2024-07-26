import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Mock data for search results
const mockResults = [
  { id: 1, name: 'CRM Software A', category: 'Software', description: 'A powerful CRM solution for small businesses' },
  { id: 2, name: 'Business Loan B', category: 'Loans', description: 'Flexible loan options for growing companies' },
  { id: 3, name: 'Credit Card C', category: 'Credit Cards', description: 'Rewards credit card for business expenses' },
  { id: 4, name: 'HR Platform D', category: 'HR Solutions', description: 'All-in-one HR management system' },
];

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [searchTerm, setSearchTerm] = useState(q || '');

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search for software, loans, credit cards, or HR solutions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockResults.map((result) => (
            <Card key={result.id}>
              <CardHeader>
                <CardTitle>{result.name}</CardTitle>
                <CardDescription>{result.category}</CardDescription>
                <p className="mt-2">{result.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}