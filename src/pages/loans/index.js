import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ComparisonTable from '@/components/ComparisonTable';
import FloatingComparisonBar from '@/components/FloatingComparisonBar';
import { useComparison } from '@/context/ComparisonContext';
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const loans = [
  { id: 1, name: 'Small Business Loan', description: 'General-purpose loans for businesses', interestRate: '6% - 12%', term: '1-5 years', maxAmount: '$500,000', minCreditScore: 650, timeToFund: '2-7 days' },
  { id: 2, name: 'Equipment Financing', description: 'Loans for purchasing business equipment', interestRate: '4% - 10%', term: '2-7 years', maxAmount: '$1,000,000', minCreditScore: 620, timeToFund: '3-10 days' },
  { id: 3, name: 'Business Line of Credit', description: 'Flexible borrowing options for businesses', interestRate: '7% - 25%', term: 'Revolving', maxAmount: '$250,000', minCreditScore: 600, timeToFund: '1-3 days' },
  { id: 4, name: 'SBA Loan', description: 'Government-backed loans for small businesses', interestRate: '5% - 8%', term: '5-25 years', maxAmount: '$5,000,000', minCreditScore: 680, timeToFund: '30-90 days' },
  { id: 5, name: 'Merchant Cash Advance', description: 'Quick funding based on future sales', interestRate: 'Factor rate: 1.1 - 1.5', term: '3-18 months', maxAmount: '$250,000', minCreditScore: 500, timeToFund: '1-2 days' },
];

export default function LoansPage() {
  const { selectedItems, addItem, removeItem, clearItems } = useComparison();
  const [isComparing, setIsComparing] = useState(false);

  const toggleLoanSelection = (loan) => {
    if (selectedItems.find(item => item.id === loan.id)) {
      removeItem(loan.id);
      toast({
        title: "Removed from comparison",
        description: `${loan.name} has been removed from the comparison.`,
      });
    } else {
      if (selectedItems.length < 3) {
        addItem(loan);
        toast({
          title: "Added to comparison",
          description: `${loan.name} has been added to the comparison.`,
        });
      } else {
        toast({
          title: "Comparison limit reached",
          description: "You can compare up to 3 items at a time.",
          variant: "destructive",
        });
      }
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
          <h1 className="text-3xl font-bold mb-8">Business Loan Options</h1>
          <p className="mb-4">Select up to 3 loans to compare their features. Click the "Compare" button in the floating bar to see a detailed comparison.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{loan.name}</CardTitle>
                  <CardDescription>{loan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                  <p><strong>Term:</strong> {loan.term}</p>
                  <Button 
                    className="mt-4"
                    onClick={() => toggleLoanSelection(loan)}
                    variant={selectedItems.find(item => item.id === loan.id) ? "secondary" : "default"}
                  >
                    {selectedItems.find(item => item.id === loan.id) ? "Remove from Compare" : "Add to Compare"}
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