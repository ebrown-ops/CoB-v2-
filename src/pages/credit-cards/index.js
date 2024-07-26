import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ComparisonTable from '@/components/ComparisonTable';
import FloatingComparisonBar from '@/components/FloatingComparisonBar';
import { useComparison } from '@/context/ComparisonContext';
import { motion } from "framer-motion";

const creditCards = [
  { id: 1, name: 'Business Rewards Card', description: '2% cashback on all purchases', annualFee: '$0', apr: '14.99% - 22.99%', rewardsRate: '2%', foreignTransactionFee: '3%', creditScoreRequired: '700+' },
  { id: 2, name: 'Travel Points Card', description: '3x points on travel and dining', annualFee: '$95', apr: '16.99% - 23.99%', rewardsRate: '3x points', foreignTransactionFee: '0%', creditScoreRequired: '720+' },
  { id: 3, name: 'Cash Flow Card', description: '0% APR for 12 months on purchases', annualFee: '$0', apr: '13.99% - 21.99%', rewardsRate: '1.5%', foreignTransactionFee: '2%', creditScoreRequired: '680+' },
  { id: 4, name: 'Secured Business Card', description: 'Build credit with responsible use', annualFee: '$25', apr: '22.99%', rewardsRate: '1%', foreignTransactionFee: '3%', creditScoreRequired: '580+' },
  { id: 5, name: 'Luxury Business Card', description: 'Premium travel benefits and concierge service', annualFee: '$450', apr: '18.99% - 25.99%', rewardsRate: '5x points', foreignTransactionFee: '0%', creditScoreRequired: '760+' },
];

export default function CreditCardsPage() {
  const { selectedItems, addItem, removeItem, clearItems } = useComparison();
  const [isComparing, setIsComparing] = useState(false);

  const toggleCardSelection = (card) => {
    if (selectedItems.find(item => item.id === card.id)) {
      removeItem(card.id);
    } else {
      addItem(card);
    }
  };

  const handleCompare = () => {
    setIsComparing(true);
  };

  const handleClearAll = () => {
    clearItems();
    setIsComparing(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Business Credit Cards</h1>
          <p className="mb-4">Select credit cards to compare their features. Click the "Compare" button in the floating bar to see a detailed comparison.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creditCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Annual Fee:</strong> {card.annualFee}</p>
                  <p><strong>APR:</strong> {card.apr}</p>
                  <Button 
                    className="mt-4"
                    onClick={() => toggleCardSelection(card)}
                    variant={selectedItems.find(item => item.id === card.id) ? "secondary" : "default"}
                  >
                    {selectedItems.find(item => item.id === card.id) ? "Remove from Compare" : "Add to Compare"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {isComparing && selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-4">Comparison</h2>
            <ComparisonTable products={selectedItems} />
          </motion.div>
        )}
        <FloatingComparisonBar
          selectedItems={selectedItems}
          onCompare={handleCompare}
          onClear={handleClearAll}
        />
      </div>
    </Layout>
  );
}