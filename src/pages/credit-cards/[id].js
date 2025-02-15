import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductDetails from '@/components/ProductDetails';

const creditCards = [
  { id: 1, name: 'Business Rewards Card', description: '2% cashback on all purchases', annualFee: '$0', apr: '14.99% - 22.99%', rewardsRate: '2%', foreignTransactionFee: '3%', creditScoreRequired: '700+' },
  { id: 2, name: 'Travel Points Card', description: '3x points on travel and dining', annualFee: '$95', apr: '16.99% - 23.99%', rewardsRate: '3x points', foreignTransactionFee: '0%', creditScoreRequired: '720+' },
  { id: 3, name: 'Cash Flow Card', description: '0% APR for 12 months on purchases', annualFee: '$0', apr: '13.99% - 21.99%', rewardsRate: '1.5%', foreignTransactionFee: '2%', creditScoreRequired: '680+' },
  { id: 4, name: 'Secured Business Card', description: 'Build credit with responsible use', annualFee: '$25', apr: '22.99%', rewardsRate: '1%', foreignTransactionFee: '3%', creditScoreRequired: '580+' },
  { id: 5, name: 'Luxury Business Card', description: 'Premium travel benefits and concierge service', annualFee: '$450', apr: '18.99% - 25.99%', rewardsRate: '5x points', foreignTransactionFee: '0%', creditScoreRequired: '760+' },
];

export default function CreditCardDetails() {
  const router = useRouter();
  const { id } = router.query;
  const card = creditCards.find(c => c.id === parseInt(id));

  if (!card) {
    return <Layout><div>Credit card not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProductDetails product={card} />
      </div>
    </Layout>
  );
}