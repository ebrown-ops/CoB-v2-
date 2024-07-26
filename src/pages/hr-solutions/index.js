import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const hrSolutions = [
  { id: 1, name: 'HR Management Suite', description: 'Comprehensive HR platform for SMBs', features: ['Payroll', 'Time Tracking', 'Benefits Administration'] },
  { id: 2, name: 'Recruitment Tool', description: 'Streamline your hiring process', features: ['Job Posting', 'Applicant Tracking', 'Interview Scheduling'] },
  { id: 3, name: 'Employee Engagement Platform', description: 'Boost employee satisfaction and retention', features: ['Surveys', 'Recognition Programs', 'Performance Management'] },
];

export default function HRSolutionsPage() {
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
                <ul className="list-disc list-inside mb-4">
                  {solution.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Button>Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}