import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ComparisonTable from '@/components/ComparisonTable';

const hrSolutions = [
  { id: 1, name: 'HR Management Suite', description: 'Comprehensive HR platform for SMBs', price: '$10/employee/month', features: 'Payroll, Time Tracking, Benefits Administration', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '50+' },
  { id: 2, name: 'Recruitment Tool', description: 'Streamline your hiring process', price: '$200/month', features: 'Job Posting, Applicant Tracking, Interview Scheduling', employeeSelfService: 'No', mobileApp: 'Yes', integrations: '20+' },
  { id: 3, name: 'Employee Engagement Platform', description: 'Boost employee satisfaction and retention', price: '$5/employee/month', features: 'Surveys, Recognition Programs, Performance Management', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '30+' },
  { id: 4, name: 'Learning Management System', description: 'Facilitate employee training and development', price: '$8/employee/month', features: 'Course Creation, Skills Tracking, Certifications', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '15+' },
  { id: 5, name: 'Workforce Analytics', description: 'Data-driven HR decision making', price: '$15/employee/month', features: 'Dashboards, Predictive Analytics, Custom Reports', employeeSelfService: 'No', mobileApp: 'No', integrations: '40+' },
];

export default function HRSolutionsPage() {
  const [selectedSolutions, setSelectedSolutions] = useState([]);

  const toggleSolutionSelection = (solution) => {
    setSelectedSolutions(prev => 
      prev.find(s => s.id === solution.id)
        ? prev.filter(s => s.id !== solution.id)
        : [...prev, solution]
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">HR Solutions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hrSolutions.map((solution) => (
            <Card key={solution.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{solution.name}</CardTitle>
                <CardDescription>{solution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p><strong>Price:</strong> {solution.price}</p>
                <p><strong>Features:</strong> {solution.features}</p>
                <Button 
                  className="mt-4"
                  onClick={() => toggleSolutionSelection(solution)}
                  variant={selectedSolutions.find(s => s.id === solution.id) ? "secondary" : "default"}
                >
                  {selectedSolutions.find(s => s.id === solution.id) ? "Remove from Compare" : "Add to Compare"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {selectedSolutions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comparison</h2>
            <ComparisonTable products={selectedSolutions} />
          </div>
        )}
      </div>
    </Layout>
  );
}