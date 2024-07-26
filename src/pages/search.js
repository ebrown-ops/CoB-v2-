import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for search results
const mockResults = [
  { id: 1, name: 'CRM Software A', category: 'Software', description: 'A powerful CRM solution for small businesses', rating: 4.5 },
  { id: 2, name: 'Business Loan B', category: 'Loans', description: 'Flexible loan options for growing companies', rating: 4.2 },
  { id: 3, name: 'Credit Card C', category: 'Credit Cards', description: 'Rewards credit card for business expenses', rating: 4.7 },
  { id: 4, name: 'HR Platform D', category: 'HR Solutions', description: 'All-in-one HR management system', rating: 4.4 },
];

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [searchTerm, setSearchTerm] = useState(q || '');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (q) {
      setSearchTerm(q);
      // Simulate API call
      setTimeout(() => {
        setResults(mockResults.filter(item => 
          item.name.toLowerCase().includes(q.toLowerCase()) ||
          item.category.toLowerCase().includes(q.toLowerCase()) ||
          item.description.toLowerCase().includes(q.toLowerCase())
        ));
        setIsLoading(false);
      }, 1000);
    }
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{result.name}</CardTitle>
                  <CardDescription>{result.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{result.description}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{result.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}