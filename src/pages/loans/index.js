import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import ComparisonTable from '@/components/ComparisonTable';
import FloatingComparisonBar from '@/components/FloatingComparisonBar';
import { useComparison } from '@/context/ComparisonContext';
import { useState } from 'react';

const loans = [
  { id: 1, name: 'Small Business Loan', description: 'General-purpose loans for businesses', interestRate: '6% - 12%', term: '1-5 years', maxAmount: '$500,000', minCreditScore: 650, timeToFund: '2-7 days' },
  { id: 2, name: 'Equipment Financing', description: 'Loans for purchasing business equipment', interestRate: '4% - 10%', term: '2-7 years', maxAmount: '$1,000,000', minCreditScore: 620, timeToFund: '3-10 days' },
  { id: 3, name: 'Business Line of Credit', description: 'Flexible borrowing options for businesses', interestRate: '7% - 25%', term: 'Revolving', maxAmount: '$250,000', minCreditScore: 600, timeToFund: '1-3 days' },
  { id: 4, name: 'SBA Loan', description: 'Government-backed loans for small businesses', interestRate: '5% - 8%', term: '5-25 years', maxAmount: '$5,000,000', minCreditScore: 680, timeToFund: '30-90 days' },
  { id: 5, name: 'Merchant Cash Advance', description: 'Quick funding based on future sales', interestRate: 'Factor rate: 1.1 - 1.5', term: '3-18 months', maxAmount: '$250,000', minCreditScore: 500, timeToFund: '1-2 days' },
];

export default function LoansPage() {
  const { selectedItems, clearItems } = useComparison();
  const [isComparing, setIsComparing] = useState(false);

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
        <h1 className="text-3xl font-bold mb-8">Business Loan Options</h1>
        <ProductList products={loans} category="loans" />
        {isComparing && selectedItems.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comparison</h2>
            <ComparisonTable products={selectedItems} />
          </div>
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