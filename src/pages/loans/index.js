import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';

const loanCategories = [
  { name: 'Business Loans', description: 'General-purpose loans for businesses', href: '/loans/business' },
  { name: 'Equipment Financing', description: 'Loans for purchasing business equipment', href: '/loans/equipment' },
  { name: 'Line of Credit', description: 'Flexible borrowing options for businesses', href: '/loans/line-of-credit' },
];

export default function LoansPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Business Loan Options</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanCategories.map((category) => (
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