import Link from 'next/link';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { name: 'Software', href: '/software', icon: '💻' },
  { name: 'Loans', href: '/loans', icon: '💰' },
  { name: 'Credit Cards', href: '/credit-cards', icon: '💳' },
  { name: 'HR Solutions', href: '/hr-solutions', icon: '👥' },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <span className="block">{category.name}</span>
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}