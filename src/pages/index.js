import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Layout from '@/components/Layout';
import FeaturedCategories from '@/components/FeaturedCategories';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { motion } from "framer-motion";

const recommendedProducts = [
  { id: 1, name: 'CRM Pro', category: 'Software', description: 'Top-rated CRM for small businesses', rating: 4.8 },
  { id: 2, name: 'QuickGrow Loan', category: 'Loans', description: 'Fast approval business loans', rating: 4.5 },
  { id: 3, name: 'HR Master', category: 'HR Solutions', description: 'Comprehensive HR management platform', rating: 4.7 },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [recentlyViewed, addRecentlyViewed] = useRecentlyViewed('recentlyViewedProducts', 3);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    // Simulating adding a recently viewed item
    addRecentlyViewed(recommendedProducts[0]);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-8 gradient-bg text-white py-2 px-4 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find the Best SMB Solutions
          </motion.h1>

          <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
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

          <FeaturedCategories />

          <motion.section 
            className="mt-12 w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{product.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{product.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {recentlyViewed.length > 0 && (
            <motion.section 
              className="mt-12 w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentlyViewed.map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{product.description}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section 
            className="mt-12 w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Sponsored Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>Premium CRM Software</CardTitle>
                  <CardDescription>Boost your sales with our top-rated CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Learn More</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>Business Credit Card</CardTitle>
                  <CardDescription>0% APR for 12 months, 2% cashback on all purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Apply Now</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>SMB Loan</CardTitle>
                  <CardDescription>Low-interest loans for growing businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Check Rates</Button>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        </main>
      </div>
    </Layout>
  );
}