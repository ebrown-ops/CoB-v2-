import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format." }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." }),
});

export default function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data) => {
    // Here you would typically process the payment
    console.log('Processing payment:', data);
    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
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
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <Input
                  id="cardNumber"
                  {...register("cardNumber")}
                  aria-invalid={errors.cardNumber ? "true" : "false"}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <Input
                    id="expiryDate"
                    {...register("expiryDate")}
                    placeholder="MM/YY"
                    aria-invalid={errors.expiryDate ? "true" : "false"}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <Input
                    id="cvv"
                    {...register("cvv")}
                    aria-invalid={errors.cvv ? "true" : "false"}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
                </div>
              </div>
              <Button type="submit" className="w-full">Place Order</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}