import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductDetails from '@/components/ProductDetails';

const hrSolutions = [
  { id: 1, name: 'HR Management Suite', description: 'Comprehensive HR platform for SMBs', price: '$10/employee/month', features: 'Payroll, Time Tracking, Benefits Administration', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '50+' },
  { id: 2, name: 'Recruitment Tool', description: 'Streamline your hiring process', price: '$200/month', features: 'Job Posting, Applicant Tracking, Interview Scheduling', employeeSelfService: 'No', mobileApp: 'Yes', integrations: '20+' },
  { id: 3, name: 'Employee Engagement Platform', description: 'Boost employee satisfaction and retention', price: '$5/employee/month', features: 'Surveys, Recognition Programs, Performance Management', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '30+' },
  { id: 4, name: 'Learning Management System', description: 'Facilitate employee training and development', price: '$8/employee/month', features: 'Course Creation, Skills Tracking, Certifications', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '15+' },
  { id: 5, name: 'Workforce Analytics', description: 'Data-driven HR decision making', price: '$15/employee/month', features: 'Dashboards, Predictive Analytics, Custom Reports', employeeSelfService: 'No', mobileApp: 'No', integrations: '40+' },
];

export default function HRSolutionDetails() {
  const router = useRouter();
  const { id } = router.query;
  const solution = hrSolutions.find(s => s.id === parseInt(id));

  if (!solution) {
    return <Layout><div>HR solution not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProductDetails product={solution} />
      </div>
    </Layout>
  );
}