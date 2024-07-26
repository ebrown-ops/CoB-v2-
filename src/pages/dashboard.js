import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {session.user.name}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is your personal dashboard. Here you can view your saved comparisons, recent activity, and personalized recommendations.</p>
              <Link href="/profile">
                <Button className="mt-4">View Profile</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Compared 3 CRM software solutions</li>
                <li>Viewed Business Loan options</li>
                <li>Updated profile information</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>ERP Software for growing businesses</li>
                <li>Business Credit Cards with cashback rewards</li>
                <li>HR Solutions for remote teams</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Saved Comparisons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>CRM Software (3 products)</li>
                <li>Business Loans (2 options)</li>
              </ul>
              <Button className="mt-4">View All Comparisons</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}