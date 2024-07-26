import Layout from '../../components/Layout';
import ProductList from '../../components/ProductList';
import ComparisonTable from '../../components/ComparisonTable';
import FloatingComparisonBar from '../../components/FloatingComparisonBar';
import { useComparison } from '../../context/ComparisonContext';
import { useState } from 'react';

console.log('Credit Cards page is being loaded');

const creditCards = [
  { 
    id: 1, 
    name: 'Business Rewards Card', 
    description: '2% cashback on all purchases', 
    annualFee: '$0', 
    apr: '14.99% - 22.99%', 
    rewardsRate: '2%', 
    foreignTransactionFee: '3%', 
    creditScoreRequired: '700+',
    ranking: 1,
    reviews: [
      { id: 1, rating: 5, comment: "Great card for business expenses!" },
      { id: 2, rating: 4, comment: "Good rewards, but watch out for the foreign transaction fee." }
    ]
  },
  { 
    id: 2, 
    name: 'Travel Points Card', 
    description: '3x points on travel and dining', 
    annualFee: '$95', 
    apr: '16.99% - 23.99%', 
    rewardsRate: '3x points', 
    foreignTransactionFee: '0%', 
    creditScoreRequired: '720+',
    ranking: 2,
    reviews: [
      { id: 1, rating: 5, comment: "Best travel card I've ever had!" },
      { id: 2, rating: 4, comment: "Great for frequent travelers, but annual fee is a bit high." }
    ]
  },
  { 
    id: 3, 
    name: 'Cash Flow Card', 
    description: '0% APR for 12 months on purchases', 
    annualFee: '$0', 
    apr: '13.99% - 21.99%', 
    rewardsRate: '1.5%', 
    foreignTransactionFee: '2%', 
    creditScoreRequired: '680+',
    ranking: 3,
    reviews: [
      { id: 1, rating: 4, comment: "Helpful for managing cash flow, but rewards are average." },
      { id: 2, rating: 5, comment: "The 0% APR period saved my business!" }
    ]
  },
  { 
    id: 4, 
    name: 'Secured Business Card', 
    description: 'Build credit with responsible use', 
    annualFee: '$25', 
    apr: '22.99%', 
    rewardsRate: '1%', 
    foreignTransactionFee: '3%', 
    creditScoreRequired: '580+',
    ranking: 5,
    reviews: [
      { id: 1, rating: 3, comment: "Good for building credit, but high APR." },
      { id: 2, rating: 4, comment: "Helped me establish business credit. Worth the annual fee." }
    ]
  },
  { 
    id: 5, 
    name: 'Luxury Business Card', 
    description: 'Premium travel benefits and concierge service', 
    annualFee: '$450', 
    apr: '18.99% - 25.99%', 
    rewardsRate: '5x points', 
    foreignTransactionFee: '0%', 
    creditScoreRequired: '760+',
    ranking: 4,
    reviews: [
      { id: 1, rating: 5, comment: "Incredible perks! Well worth the high annual fee." },
      { id: 2, rating: 4, comment: "Excellent for high-spending businesses, but not for everyone." }
    ]
  },
];

export default function CreditCardsPage() {
  console.log('CreditCardsPage component is rendering');
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
        <h1 className="text-3xl font-bold mb-8">Business Credit Cards</h1>
        <ProductList products={creditCards} category="credit-cards" />
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