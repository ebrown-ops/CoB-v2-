import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import ComparisonModal from '@/components/ComparisonModal';
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const softwareProducts = [
  { id: 1, name: 'CRM Pro', category: 'CRM', description: 'Advanced CRM for small businesses', price: 49, users: 'Up to 10', features: 'Contact Management, Sales Tracking', rating: 4.5 },
  { id: 2, name: 'ERP Suite', category: 'ERP', description: 'Comprehensive ERP solution', price: 99, users: 'Unlimited', features: 'Inventory, Finance, HR', rating: 4.2 },
  { id: 3, name: 'AccountMaster', category: 'Accounting', description: 'Easy-to-use accounting software', price: 29, users: 'Up to 5', features: 'Invoicing, Expense Tracking, Reports', rating: 4.7 },
];

export default function SoftwarePage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleProductSelection = (product) => {
    setSelectedProducts(prev => 
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleCompare = () => {
    if (selectedProducts.length < 2) {
      toast({
        title: "Not enough products selected",
        description: "Please select at least two products to compare.",
        variant: "destructive",
      });
    } else {
      setIsCompareModalOpen(true);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Business Software Solutions
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softwareProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                  <p className="mt-2"><strong>Price:</strong> ${product.price}/month</p>
                  <p><strong>Users:</strong> {product.users}</p>
                  <p><strong>Key Features:</strong> {product.features}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <Button variant="outline" onClick={() => toggleProductSelection(product)}>
                      {selectedProducts.find(p => p.id === product.id) ? 'Remove from Compare' : 'Add to Compare'}
                    </Button>
                    <Link href={`/software/${product.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {selectedProducts.length > 0 && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleCompare}>Compare Selected Products</Button>
          </motion.div>
        )}
        <ComparisonModal 
          isOpen={isCompareModalOpen} 
          onClose={() => setIsCompareModalOpen(false)} 
          products={selectedProducts}
        />
      </div>
    </Layout>
  );
}