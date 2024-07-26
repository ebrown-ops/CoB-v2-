import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductDetails from '@/components/ProductDetails';

const loans = [
  { id: 1, name: 'Small Business Loan', description: 'General-purpose loans for businesses', interestRate: '6% - 12%', term: '1-5 years', maxAmount: '$500,000', minCreditScore: 650, timeToFund: '2-7 days' },
  { id: 2, name: 'Equipment Financing', description: 'Loans for purchasing business equipment', interestRate: '4% - 10%', term: '2-7 years', maxAmount: '$1,000,000', minCreditScore: 620, timeToFund: '3-10 days' },
  { id: 3, name: 'Business Line of Credit', description: 'Flexible borrowing options for businesses', interestRate: '7% - 25%', term: 'Revolving', maxAmount: '$250,000', minCreditScore: 600, timeToFund: '1-3 days' },
  { id: 4, name: 'SBA Loan', description: 'Government-backed loans for small businesses', interestRate: '5% - 8%', term: '5-25 years', maxAmount: '$5,000,000', minCreditScore: 680, timeToFund: '30-90 days' },
  { id: 5, name: 'Merchant Cash Advance', description: 'Quick funding based on future sales', interestRate: 'Factor rate: 1.1 - 1.5', term: '3-18 months', maxAmount: '$250,000', minCreditScore: 500, timeToFund: '1-2 days' },
];

export default function LoanDetails() {
  const router = useRouter();
  const { id } = router.query;
  const loan = loans.find(l => l.id === parseInt(id));

  if (!loan) {
    return <Layout><div>Loan not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProductDetails product={loan} />
      </div>
    </Layout>
  );
}