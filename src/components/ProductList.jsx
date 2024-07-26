import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Link from 'next/link';
import { useComparison } from '../context/ComparisonContext';
import { motion, AnimatePresence } from "framer-motion";
import CreditCardCalculator from './CreditCardCalculator';
import LoanCalculator from './LoanCalculator';
import HRSolutionsCalculator from './HRSolutionsCalculator';

console.log('ProductList component is being loaded');

const ProductCard = ({ product, category, onToggleSelection, isSelected }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div className="relative" style={{ perspective: '1000px' }}>
      <AnimatePresence>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p><strong>Ranking:</strong> {product.ranking}</p>
                <Button onClick={() => setIsFlipped(true)} className="mt-4">See More Details</Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                {Object.entries(product).map(([key, value]) => {
                  if (key !== 'id' && key !== 'name' && key !== 'description' && key !== 'ranking' && key !== 'reviews') {
                    return (
                      <p key={key}><strong>{key}:</strong> {value}</p>
                    );
                  }
                  return null;
                })}
                <div className="mt-4">
                  <h4 className="font-semibold">Reviews:</h4>
                  {product.reviews.map((review) => (
                    <div key={review.id} className="mt-2 p-2 bg-gray-100 rounded">
                      <p>Rating: {review.rating}/5</p>
                      <p className="italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
                {category === 'credit-cards' && <CreditCardCalculator />}
                {category === 'loans' && <LoanCalculator />}
                {category === 'hr-solutions' && <HRSolutionsCalculator />}
                <div className="mt-4 flex justify-between">
                  <Button 
                    onClick={() => onToggleSelection(product)}
                    variant={isSelected ? "secondary" : "default"}
                  >
                    {isSelected ? "Remove" : "Compare"}
                  </Button>
                  <Link href={`/${category}/${product.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
                <Button onClick={() => setIsFlipped(false)} className="mt-4 w-full">Back</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProductList = ({ products, category }) => {
  console.log('ProductList component is rendering', { products, category });

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
      } else if (sortBy === 'ranking') {
        return a.ranking - b.ranking;
      } else if (sortBy === 'price' && 'price' in a) {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  }, [sortBy, filteredProducts]);

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
            <SelectItem value="ranking">Ranking</SelectItem>
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
            <ProductCard
              product={product}
              category={category}
              onToggleSelection={toggleProductSelection}
              isSelected={selectedItems.some(item => item.id === product.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;