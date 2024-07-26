import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// Expanded mock data for search results
const mockResults = [
  { id: 1, name: 'CRM Software A', category: 'Software', description: 'A powerful CRM solution for small businesses', rating: 4.5, price: 49 },
  { id: 2, name: 'Business Loan B', category: 'Loans', description: 'Flexible loan options for growing companies', rating: 4.2, interestRate: 5.99 },
  { id: 3, name: 'Credit Card C', category: 'Credit Cards', description: 'Rewards credit card for business expenses', rating: 4.7, annualFee: 0 },
  { id: 4, name: 'HR Platform D', category: 'HR Solutions', description: 'All-in-one HR management system', rating: 4.4, price: 99 },
  { id: 5, name: 'ERP Software E', category: 'Software', description: 'Comprehensive ERP system for mid-sized businesses', rating: 4.3, price: 199 },
  { id: 6, name: 'Equipment Financing F', category: 'Loans', description: 'Specialized loans for purchasing business equipment', rating: 4.1, interestRate: 4.99 },
  { id: 7, name: 'Travel Rewards Card G', category: 'Credit Cards', description: 'Premium travel rewards for business travelers', rating: 4.6, annualFee: 95 },
  { id: 8, name: 'Recruitment Tool H', category: 'HR Solutions', description: 'Streamline your hiring process with AI-powered tools', rating: 4.5, price: 79 },
  { id: 9, name: 'Accounting Software I', category: 'Software', description: 'User-friendly accounting solution for small businesses', rating: 4.8, price: 39 },
  { id: 10, name: 'Merchant Cash Advance J', category: 'Loans', description: 'Quick funding option based on future sales', rating: 3.9, interestRate: 8.99 },
];

export async function getServerSideProps(context) {
  const { q } = context.query;
  // Simulate API call or database query
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let filteredResults = mockResults;
  if (q) {
    filteredResults = mockResults.filter(item => 
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.category.toLowerCase().includes(q.toLowerCase()) ||
      item.description.toLowerCase().includes(q.toLowerCase())
    );
  }

  return {
    props: {
      initialResults: filteredResults,
      initialQuery: q || '',
    },
  };
}

export default function SearchResults({ initialResults, initialQuery }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);

  useEffect(() => {
    const { q } = router.query;
    if (q && q !== searchTerm) {
      setSearchTerm(q);
      performSearch(q);
    }
  }, [router.query]);

  const performSearch = (term) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredResults = mockResults.filter(item => 
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase())
      );

      if (filterCategory !== 'all') {
        filteredResults = filteredResults.filter(item => item.category === filterCategory);
      }

      filteredResults = filteredResults.filter(item => 
        (item.price >= priceRange[0] && item.price <= priceRange[1]) ||
        (item.interestRate >= priceRange[0] && item.interestRate <= priceRange[1]) ||
        (item.annualFee >= priceRange[0] && item.annualFee <= priceRange[1])
      );

      if (sortBy === 'rating') {
        filteredResults.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'name') {
        filteredResults.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'price') {
        filteredResults.sort((a, b) => (a.price || a.interestRate || a.annualFee) - (b.price || b.interestRate || b.annualFee));
      }

      setResults(filteredResults);
      setIsLoading(false);

      // Log search analytics
      console.log('Search performed:', { term, resultsCount: filteredResults.length });
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`, undefined, { shallow: true });
    performSearch(searchTerm);
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <Label htmlFor="category-filter">Category</Label>
            <Select id="category-filter" value={filterCategory} onValueChange={(value) => { setFilterCategory(value); performSearch(searchTerm); }}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Loans">Loans</SelectItem>
                <SelectItem value="Credit Cards">Credit Cards</SelectItem>
                <SelectItem value="HR Solutions">HR Solutions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by">Sort by</Label>
            <Select id="sort-by" value={sortBy} onValueChange={(value) => { setSortBy(value); performSearch(searchTerm); }}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label>Price Range</Label>
            <Slider
              min={0}
              max={200}
              step={1}
              value={priceRange}
              onValueChange={(value) => { setPriceRange(value); performSearch(searchTerm); }}
              className="mt-2"
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

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
                  {result.price && <p className="mt-2">Price: ${result.price}/month</p>}
                  {result.interestRate && <p className="mt-2">Interest Rate: {result.interestRate}%</p>}
                  {result.annualFee !== undefined && <p className="mt-2">Annual Fee: ${result.annualFee}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}