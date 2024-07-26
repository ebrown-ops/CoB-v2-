import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreditCardCalculator from '@/components/CreditCardCalculator';

const creditCardProducts = [
  { id: 1, name: 'Business Rewards Card', category: 'Credit Cards', description: 'Earn rewards on all your business purchases', annualFee: '$0', apr: '14.99% - 22.99%', cashbackRate: '2%', features: ['No annual fee', '2% cash back on all purchases', 'Travel insurance'], rating: 4.5 },
  { id: 2, name: 'Travel Points Card', category: 'Credit Cards', description: 'Earn travel points for your business trips', annualFee: '$95', apr: '16.99% - 23.99%', pointsRate: '3x', features: ['3x points on travel and dining', 'Airport lounge access', 'No foreign transaction fees'], rating: 4.2 },
  { id: 3, name: 'Cash Flow Card', category: 'Credit Cards', description: 'Optimize your business cash flow', annualFee: '$0', apr: '0% intro APR for 12 months, then 13.99% - 21.99%', features: ['0% intro APR on purchases for 12 months', 'No annual fee', 'Employee cards at no additional cost'], rating: 4.7 },
];

export default function CreditCardDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const card = creditCardProducts.find(p => p.id === parseInt(id));

  if (!card) {
    return <Layout><div>Credit card not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{card.name}</CardTitle>
            <CardDescription>{card.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{card.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Annual Fee</h3>
                <p>{card.annualFee}</p>
              </div>
              <div>
                <h3 className="font-semibold">APR</h3>
                <p>{card.apr}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rewards Rate</h3>
                <p>{card.cashbackRate || card.pointsRate}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{card.rating} / 5</p>
              </div>
            </div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-5 mb-6">
              {card.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <CreditCardCalculator />
            <Button className="w-full mt-4">Apply Now</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}