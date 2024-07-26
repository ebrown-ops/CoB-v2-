import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ComparisonTable from '../components/ComparisonTable';
import { useState, useEffect } from 'react';

// This is a mock function. In a real application, you'd fetch this data from your API or database.
const fetchProductById = (id) => {
  const allProducts = [
    // Credit Cards
    { id: 'cc1', name: 'Business Rewards Card', category: 'Credit Cards', annualFee: '$0', apr: '14.99% - 22.99%', rewardsRate: '2%' },
    { id: 'cc2', name: 'Travel Points Card', category: 'Credit Cards', annualFee: '$95', apr: '16.99% - 23.99%', rewardsRate: '3x points' },
    // Loans
    { id: 'ln1', name: 'Small Business Loan', category: 'Loans', interestRate: '6% - 12%', term: '1-5 years', maxAmount: '$500,000' },
    { id: 'ln2', name: 'Equipment Financing', category: 'Loans', interestRate: '4% - 10%', term: '2-7 years', maxAmount: '$1,000,000' },
    // HR Solutions
    { id: 'hr1', name: 'HR Management Suite', category: 'HR Solutions', price: '$10/employee/month', features: 'Payroll, Time Tracking, Benefits Administration' },
    { id: 'hr2', name: 'Recruitment Tool', category: 'HR Solutions', price: '$200/month', features: 'Job Posting, Applicant Tracking, Interview Scheduling' },
  ];
  return allProducts.find(product => product.id === id);
};

export default function ComparePage() {
  const router = useRouter();
  const { items } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (items) {
      const productIds = items.split(',');
      const fetchedProducts = productIds.map(fetchProductById).filter(Boolean);
      setProducts(fetchedProducts);
    }
  }, [items]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Product Comparison</h1>
        {products.length > 0 ? (
          <ComparisonTable products={products} />
        ) : (
          <p>No products selected for comparison.</p>
        )}
      </div>
    </Layout>
  );
}