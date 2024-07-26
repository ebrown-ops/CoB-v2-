import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';

const softwareCategories = [
  { name: 'CRM', description: 'Customer Relationship Management software', href: '/software/crm' },
  { name: 'ERP', description: 'Enterprise Resource Planning software', href: '/software/erp' },
  { name: 'Accounting', description: 'Financial management and accounting software', href: '/software/accounting' },
];

export default function SoftwarePage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Business Software Solutions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softwareCategories.map((category) => (
            <Link href={category.href} key={category.name}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}