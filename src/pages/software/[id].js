import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const softwareProducts = [
  { id: 1, name: 'CRM Pro', category: 'CRM', description: 'Advanced CRM for small businesses', price: '$49/month', users: 'Up to 10', features: ['Contact Management', 'Sales Tracking', 'Email Integration', 'Task Management'], rating: 4.5 },
  { id: 2, name: 'ERP Suite', category: 'ERP', description: 'Comprehensive ERP solution', price: '$99/month', users: 'Unlimited', features: ['Inventory Management', 'Financial Management', 'HR Management', 'Supply Chain Management'], rating: 4.2 },
  { id: 3, name: 'AccountMaster', category: 'Accounting', description: 'Easy-to-use accounting software', price: '$29/month', users: 'Up to 5', features: ['Invoicing', 'Expense Tracking', 'Financial Reporting', 'Tax Preparation'], rating: 4.7 },
];

export default function SoftwareDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = softwareProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <Layout><div>Product not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{product.name}</CardTitle>
            <CardDescription>{product.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Price</h3>
                <p>{product.price}</p>
              </div>
              <div>
                <h3 className="font-semibold">Users</h3>
                <p>{product.users}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{product.rating} / 5</p>
              </div>
            </div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-5 mb-6">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button className="w-full">Get Started</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}