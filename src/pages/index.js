import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Layout from '@/components/Layout';
import FeaturedCategories from '@/components/FeaturedCategories';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold mb-8">
            Find the Best SMB Solutions
          </h1>

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

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Sponsored Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Premium CRM Software</CardTitle>
                  <CardDescription>Boost your sales with our top-rated CRM</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Business Credit Card</CardTitle>
                  <CardDescription>0% APR for 12 months, 2% cashback on all purchases</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>SMB Loan</CardTitle>
                  <CardDescription>Low-interest loans for growing businesses</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}