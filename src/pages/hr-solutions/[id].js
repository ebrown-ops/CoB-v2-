import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const hrSolutionProducts = [
  { id: 1, name: 'HR Management Suite', category: 'HR Solutions', description: 'Comprehensive HR platform for SMBs', price: '$49/month per employee', features: ['Payroll processing', 'Time tracking', 'Benefits administration', 'Performance management'], rating: 4.5 },
  { id: 2, name: 'Recruitment Tool', category: 'HR Solutions', description: 'Streamline your hiring process', price: '$99/month', features: ['Job posting', 'Applicant tracking', 'Interview scheduling', 'Onboarding management'], rating: 4.2 },
  { id: 3, name: 'Employee Engagement Platform', category: 'HR Solutions', description: 'Boost employee satisfaction and retention', price: '$29/month per employee', features: ['Pulse surveys', 'Recognition programs', 'Goal tracking', 'Feedback tools'], rating: 4.7 },
];

export default function HRSolutionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const solution = hrSolutionProducts.find(p => p.id === parseInt(id));

  if (!solution) {
    return <Layout><div>HR solution not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{solution.name}</CardTitle>
            <CardDescription>{solution.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{solution.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Price</h3>
                <p>{solution.price}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{solution.rating} / 5</p>
              </div>
            </div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-5 mb-6">
              {solution.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button className="w-full">Request Demo</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}