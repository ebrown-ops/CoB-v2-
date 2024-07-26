import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { useComparison } from '@/context/ComparisonContext';
import { motion } from "framer-motion";

export default function ProductList({ products, category }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { selectedItems, addItem, removeItem } = useComparison();

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  useEffect(() => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price' && 'price' in a) {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  }, [sortBy]);

  const toggleProductSelection = (product) => {
    if (selectedItems.find(item => item.id === product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            {category !== 'loans' && <SelectItem value="price">Price</SelectItem>}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {Object.entries(product).slice(0, 3).map(([key, value]) => {
                  if (key !== 'id' && key !== 'name' && key !== 'description') {
                    return (
                      <p key={key}><strong>{key}:</strong> {value}</p>
                    );
                  }
                  return null;
                })}
                <div className="mt-4 flex justify-between">
                  <Button 
                    onClick={() => toggleProductSelection(product)}
                    variant={selectedItems.find(item => item.id === product.id) ? "secondary" : "default"}
                  >
                    {selectedItems.find(item => item.id === product.id) ? "Remove" : "Compare"}
                  </Button>
                  <Link href={`/${category}/${product.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}