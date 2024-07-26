import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import ComparisonTable from '@/components/ComparisonTable';
import FloatingComparisonBar from '@/components/FloatingComparisonBar';
import { useComparison } from '@/context/ComparisonContext';
import { useState } from 'react';

const hrSolutions = [
  { id: 1, name: 'HR Management Suite', description: 'Comprehensive HR platform for SMBs', price: '$10/employee/month', features: 'Payroll, Time Tracking, Benefits Administration', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '50+' },
  { id: 2, name: 'Recruitment Tool', description: 'Streamline your hiring process', price: '$200/month', features: 'Job Posting, Applicant Tracking, Interview Scheduling', employeeSelfService: 'No', mobileApp: 'Yes', integrations: '20+' },
  { id: 3, name: 'Employee Engagement Platform', description: 'Boost employee satisfaction and retention', price: '$5/employee/month', features: 'Surveys, Recognition Programs, Performance Management', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '30+' },
  { id: 4, name: 'Learning Management System', description: 'Facilitate employee training and development', price: '$8/employee/month', features: 'Course Creation, Skills Tracking, Certifications', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '15+' },
  { id: 5, name: 'Workforce Analytics', description: 'Data-driven HR decision making', price: '$15/employee/month', features: 'Dashboards, Predictive Analytics, Custom Reports', employeeSelfService: 'No', mobileApp: 'No', integrations: '40+' },
];

export default function HRSolutionsPage() {
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
        <h1 className="text-3xl font-bold mb-8">HR Solutions</h1>
        <ProductList products={hrSolutions} category="hr-solutions" />
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