import Layout from '../../components/Layout';
import ProductList from '../../components/ProductList';
import ComparisonTable from '../../components/ComparisonTable';
import FloatingComparisonBar from '../../components/FloatingComparisonBar';
import { useComparison } from '../../context/ComparisonContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

console.log('HR Solutions page is being loaded');

const hrSolutions = [
  { 
    id: 1, 
    name: 'HR Management Suite', 
    description: 'Comprehensive HR platform for SMBs', 
    price: '$10/employee/month', 
    features: 'Payroll, Time Tracking, Benefits Administration', 
    employeeSelfService: 'Yes', 
    mobileApp: 'Yes', 
    integrations: '50+',
    ranking: 1,
    reviews: [
      { id: 1, rating: 5, comment: "Streamlined our entire HR process. Highly recommended!" },
      { id: 2, rating: 4, comment: "Great features, but the learning curve can be steep." }
    ]
  },
  { 
    id: 2, 
    name: 'Recruitment Tool', 
    description: 'Streamline your hiring process', 
    price: '$200/month', 
    features: 'Job Posting, Applicant Tracking, Interview Scheduling', 
    employeeSelfService: 'No', 
    mobileApp: 'Yes', 
    integrations: '20+',
    ranking: 3,
    reviews: [
      { id: 1, rating: 4, comment: "Significantly improved our hiring efficiency." },
      { id: 2, rating: 3, comment: "Good for posting jobs, but could use more advanced filtering options." }
    ]
  },
  { 
    id: 3, 
    name: 'Employee Engagement Platform', 
    description: 'Boost employee satisfaction and retention', 
    price: '$5/employee/month', 
    features: 'Surveys, Recognition Programs, Performance Management', 
    employeeSelfService: 'Yes', 
    mobileApp: 'Yes', 
    integrations: '30+',
    ranking: 2,
    reviews: [
      { id: 1, rating: 5, comment: "Transformed our company culture for the better!" },
      { id: 2, rating: 4, comment: "Employees love the recognition features." }
    ]
  },
  { 
    id: 4, 
    name: 'Learning Management System', 
    description: 'Facilitate employee training and development', 
    price: '$8/employee/month', 
    features: 'Course Creation, Skills Tracking, Certifications', 
    employeeSelfService: 'Yes', 
    mobileApp: 'Yes', 
    integrations: '15+',
    ranking: 4,
    reviews: [
      { id: 1, rating: 4, comment: "Great for onboarding and ongoing training." },
      { id: 2, rating: 3, comment: "Content creation tools could be more user-friendly." }
    ]
  },
  { 
    id: 5, 
    name: 'Workforce Analytics', 
    description: 'Data-driven HR decision making', 
    price: '$15/employee/month', 
    features: 'Dashboards, Predictive Analytics, Custom Reports', 
    employeeSelfService: 'No', 
    mobileApp: 'No', 
    integrations: '40+',
    ranking: 5,
    reviews: [
      { id: 1, rating: 5, comment: "Invaluable insights for strategic workforce planning." },
      { id: 2, rating: 4, comment: "Powerful tool, but requires dedicated time to fully utilize." }
    ]
  },
];

export default function HRSolutionsPage() {
  console.log('HRSolutionsPage component is rendering');
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <h1 className="text-3xl font-bold mb-8">HR Solutions</h1>
        <ProductList products={hrSolutions} category="hr-solutions" />
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
      </motion.div>
    </Layout>
  );
}