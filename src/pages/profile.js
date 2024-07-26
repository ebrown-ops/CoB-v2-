import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
});

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      company: 'Acme Inc.',
      role: 'Manager',
    },
  });

  if (status === 'loading') {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const onSubmit = (data) => {
    // Here you would typically update the user's profile
    console.log('Updating profile:', data);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  id="name"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <Input
                  id="company"
                  {...register("company")}
                  aria-invalid={errors.company ? "true" : "false"}
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <Input
                  id="role"
                  {...register("role")}
                  aria-invalid={errors.role ? "true" : "false"}
                />
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
              </div>
              <Button type="submit">Update Profile</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}