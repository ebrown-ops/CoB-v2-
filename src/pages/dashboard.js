import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {session.user.name}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is your personal dashboard. Here you can view your saved comparisons, recent activity, and personalized recommendations.</p>
            {/* Add more dashboard content here */}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}