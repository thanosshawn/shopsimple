
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/lib/types"; // Assuming you have this type
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Mock cart items and total for summary display
const MOCK_SUMMARY_ITEMS: CartItem[] = [
  { productId: '1', name: 'Eco-Friendly Water Bottle', price: 25.99, imageUrl: 'https://placehold.co/50x50.png', quantity: 2 },
  { productId: '2', name: 'Organic Cotton T-Shirt', price: 35.00, imageUrl: 'https://placehold.co/50x50.png', quantity: 1 },
];
const MOCK_TOTAL = MOCK_SUMMARY_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0) + (MOCK_SUMMARY_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.08);


const shippingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  addressLine1: z.string().min(5, "Address is too short"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code must be 5 digits").max(10),
  country: z.string().min(2, "Country is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<ShippingFormData> = async (data) => {
    setIsProcessing(true);
    console.log("Shipping Information:", data);
    // TODO: Create order in Firebase, then clear cart
    // For now, simulate processing and redirect
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    // router.push("/orders/confirmation?orderId=mock123"); // Example redirect to a confirmation page
    alert("Order Placed (Mock)! Shipping data logged to console.");
    router.push("/orders"); // Redirect to order history
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shipping Information Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Shipping Information</CardTitle>
            <CardDescription>Please enter your shipping details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input id="addressLine1" {...register("addressLine1")} />
                {errors.addressLine1 && <p className="text-sm text-destructive mt-1">{errors.addressLine1.message}</p>}
              </div>
              <div>
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input id="addressLine2" {...register("addressLine2")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("city")} />
                  {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" {...register("state")} />
                  {errors.state && <p className="text-sm text-destructive mt-1">{errors.state.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">Zip / Postal Code</Label>
                  <Input id="zipCode" {...register("zipCode")} />
                  {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>}
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" {...register("country")} />
                  {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
                </div>
              </div>
               <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" {...register("phone")} />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full text-lg py-3 mt-6" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Place Order (No Payment)"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-lg h-fit">
          <CardHeader>
            <CardTitle className="text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {MOCK_SUMMARY_ITEMS.map(item => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded object-cover" data-ai-hint="product item" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(MOCK_TOTAL / 1.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${(MOCK_TOTAL - (MOCK_TOTAL / 1.08)).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${MOCK_TOTAL.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              This is a simplified checkout. No actual payment will be processed.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
