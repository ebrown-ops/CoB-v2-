import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const loanProducts = [
  { id: 1, name: 'Small Business Loan', category: 'Loans', description: 'Flexible financing for small businesses', amount: '$10,000 - $250,000', term: '1-5 years', interestRate: '5.99% - 24.99%', features: ['Fast approval', 'No collateral required', 'Flexible repayment terms'], rating: 4.5 },
  { id: 2, name: 'Equipment Financing', category: 'Loans', description: 'Loans for purchasing business equipment', amount: '$5,000 - $500,000', term: '2-7 years', interestRate: '4.99% - 20.99%', features: ['Low down payment', 'Tax benefits', 'Preserve working capital'], rating: 4.2 },
  { id: 3, name: 'Business Line of Credit', category: 'Loans', description: 'Revolving credit line for business needs', amount: '$10,000 - $500,000', term: 'Revolving', interestRate: '7.99% - 25.99%', features: ['Draw funds as needed', 'Pay interest only on used funds', 'Revolving credit line'], rating: 4.7 },
];

export default function LoanDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const loan = loanProducts.find(p => p.id === parseInt(id));

  if (!loan) {
    return <Layout><div>Loan product not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{loan.name}</CardTitle>
            <CardDescription>{loan.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{loan.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Loan Amount</h3>
                <p>{loan.amount}</p>
              </div>
              <div>
                <h3 className="font-semibold">Term</h3>
                <p>{loan.term}</p>
              </div>
              <div>
                <h3 className="font-semibold">Interest Rate</h3>
                <p>{loan.interestRate}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{loan.rating} / 5</p>
              </div>
            </div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-5 mb-6">
              {loan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button className="w-full">Apply Now</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}