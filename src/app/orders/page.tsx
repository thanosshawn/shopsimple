
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/lib/types"; // Assuming you have this type
import { FileText, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock order data
const MOCK_ORDERS: Order[] = [
  {
    id: 'order_123xyz',
    userId: 'user_abc',
    items: [
      { productId: '1', name: 'Eco-Friendly Water Bottle', price: 25.99, imageUrl: 'https://placehold.co/50x50.png', quantity: 2 },
      { productId: '2', name: 'Organic Cotton T-Shirt', price: 35.00, imageUrl: 'https://placehold.co/50x50.png', quantity: 1 },
    ],
    totalAmount: 91.98, // (25.99*2 + 35.00) * 1.08 (assuming 8% tax for example)
    shippingAddress: { name: 'Jane Doe', addressLine1: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '90210', country: 'USA' },
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'shipped',
  },
  {
    id: 'order_789uvw',
    userId: 'user_abc',
    items: [
      { productId: '3', name: 'Wireless Bluetooth Headphones', price: 79.50, imageUrl: 'https://placehold.co/50x50.png', quantity: 1 },
    ],
    totalAmount: 85.86, // 79.50 * 1.08
    shippingAddress: { name: 'Jane Doe', addressLine1: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '90210', country: 'USA' },
    orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: 'delivered',
  },
];


export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch orders for the logged-in user from Firebase
    // For now, use mock data
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setIsLoading(false);
    }, 700);
  }, []);
  
  if (isLoading) {
    return (
        <div className="container mx-auto py-8 text-center">
            <Loader className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading your orders...</p>
        </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
        <p className="text-muted-foreground mb-8">You haven't placed any orders with us. Time to shop!</p>
        <Button size="lg" asChild>
          <Link href="/">Explore Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <Card key={order.id} className="shadow-md">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-xl">Order #{order.id.substring(order.id.length - 6)}</CardTitle>
                <CardDescription>
                  Placed on: {new Date(order.orderDate).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">${order.totalAmount.toFixed(2)}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                    'bg-red-100 text-red-700' // cancelled
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">Items:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {order.items.map(item => (
                  <li key={item.productId}>{item.name} (x{item.quantity})</li>
                ))}
              </ul>
              <Separator className="my-4" />
               <p className="text-sm">
                <span className="font-medium">Shipping to:</span> {order.shippingAddress.name}, {order.shippingAddress.addressLine1}, {order.shippingAddress.city}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" /> View Details (Mock)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Helper Loader component
function Loader({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
