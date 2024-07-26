import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Layout from '@/components/Layout';
import FeaturedCategories from '@/components/FeaturedCategories';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { motion } from "framer-motion";
import NewsletterSubscription from '@/components/NewsletterSubscription';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import Head from 'next/head';

const recommendedProducts = [
  { id: 1, name: 'CRM Pro', category: 'Software', description: 'Top-rated CRM for small businesses', rating: 4.8 },
  { id: 2, name: 'QuickGrow Loan', category: 'Loans', description: 'Fast approval business loans', rating: 4.5 },
  { id: 3, name: 'HR Master', category: 'HR Solutions', description: 'Comprehensive HR management platform', rating: 4.7 },
];

const productDistribution = [
  { name: 'Software', value: 35 },
  { name: 'Loans', value: 30 },
  { name: 'Credit Cards', value: 20 },
  { name: 'HR Solutions', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Home() {
  const router = useRouter();
  const [recentlyViewed, addRecentlyViewed] = useRecentlyViewed('recentlyViewedProducts', 3);

  useEffect(() => {
    // Simulating adding a recently viewed item
    addRecentlyViewed(recommendedProducts[0]);
  }, []);

  return (
    <Layout>
      <Head>
        <title>SMB Solutions - Find the Best Business Solutions</title>
        <meta name="description" content="Discover top-rated software, loans, credit cards, and HR solutions for your small to medium-sized business." />
      </Head>
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
                <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
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

          <motion.section 
            className="mt-12 w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Product Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {recentlyViewed.length > 0 && (
            <motion.section 
              className="mt-12 w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentlyViewed.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
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
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Sponsored Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-primary hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Premium CRM Software</CardTitle>
                  <CardDescription>Boost your sales with our top-rated CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Learn More</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Business Credit Card</CardTitle>
                  <CardDescription>0% APR for 12 months, 2% cashback on all purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Apply Now</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary hover:shadow-lg transition-shadow duration-300">
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

          <motion.section
            className="mt-12 w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <NewsletterSubscription />
          </motion.section>
        </main>
      </div>
    </Layout>
  );
}