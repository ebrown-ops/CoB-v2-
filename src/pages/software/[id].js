import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const softwareProducts = [
  { id: 1, name: 'CRM Pro', category: 'CRM', description: 'Advanced CRM for small businesses', price: '$49/month', users: 'Up to 10', features: ['Contact Management', 'Sales Tracking', 'Email Integration', 'Task Management'], rating: 4.5, reviews: [
    { id: 1, user: 'John D.', rating: 5, comment: 'Great software, really helped streamline our sales process!' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good features, but the learning curve is a bit steep.' },
  ] },
  { id: 2, name: 'ERP Suite', category: 'ERP', description: 'Comprehensive ERP solution', price: '$99/month', users: 'Unlimited', features: ['Inventory Management', 'Financial Management', 'HR Management', 'Supply Chain Management'], rating: 4.2, reviews: [
    { id: 1, user: 'Mike R.', rating: 4, comment: 'Powerful tool, but could use some UI improvements.' },
    { id: 2, user: 'Emily S.', rating: 5, comment: 'Transformed our business operations. Highly recommended!' },
  ] },
  { id: 3, name: 'AccountMaster', category: 'Accounting', description: 'Easy-to-use accounting software', price: '$29/month', users: 'Up to 5', features: ['Invoicing', 'Expense Tracking', 'Financial Reporting', 'Tax Preparation'], rating: 4.7, reviews: [
    { id: 1, user: 'David L.', rating: 5, comment: 'Simple yet powerful. Perfect for small businesses.' },
    { id: 2, user: 'Lisa K.', rating: 4, comment: 'Great value for money. Could use more integrations though.' },
  ] },
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="list-disc pl-5 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Button className="w-full mb-6">Get Started</Button>
              <h3 className="font-semibold mb-2">User Reviews</h3>
              {product.reviews.map((review) => (
                <Card key={review.id} className="mb-4">
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-2">
                      <p className="font-semibold mr-2">{review.user}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}