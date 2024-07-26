import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </Layout>
  );
}