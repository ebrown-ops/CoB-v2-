import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const creditCards = [
  { id: 1, name: 'Business Rewards Card', description: '2% cashback on all purchases', annualFee: '$0', apr: '14.99% - 22.99%' },
  { id: 2, name: 'Travel Points Card', description: '3x points on travel and dining', annualFee: '$95', apr: '16.99% - 23.99%' },
  { id: 3, name: 'Cash Flow Card', description: '0% APR for 12 months on purchases', annualFee: '$0', apr: '13.99% - 21.99%' },
];

export default function CreditCardsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Business Credit Cards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creditCards.map((card) => (
            <Card key={card.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p><strong>Annual Fee:</strong> {card.annualFee}</p>
                <p><strong>APR:</strong> {card.apr}</p>
                <Button className="mt-4">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}