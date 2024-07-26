import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" passHref>
          <Button>Go back home</Button>
        </Link>
      </motion.div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}