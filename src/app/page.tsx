
// This will be a server component, fetching data directly or via a service
import { ProductList } from '@/components/products/product-list';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock data for now - replace with actual data fetching from Firebase
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Eco-Friendly Water Bottle', description: 'Stay hydrated with this stylish and sustainable water bottle. Made from recycled materials.', price: 25.99, imageUrl: 'https://placehold.co/300x300.png', category: 'Accessories', stock: 100, keywords: ['water bottle', 'eco-friendly'] },
  { id: '2', name: 'Organic Cotton T-Shirt', description: 'Comfortable and ethically sourced t-shirt for everyday wear. Soft and breathable.', price: 35.00, imageUrl: 'https://placehold.co/300x300.png', category: 'Apparel', stock: 50, keywords: ['t-shirt', 'organic cotton'] },
  { id: '3', name: 'Wireless Bluetooth Headphones', description: 'Immersive sound quality with long-lasting battery life. Perfect for music and calls.', price: 79.50, imageUrl: 'https://placehold.co/300x300.png', category: 'Electronics', stock: 75, keywords: ['headphones', 'wireless audio'] },
  { id: '4', name: 'Handmade Ceramic Mug', description: 'Unique, handcrafted mug for your favorite beverages. Adds a touch of art to your kitchen.', price: 18.75, imageUrl: 'https://placehold.co/300x300.png', category: 'Home Goods', stock: 30, keywords: ['mug', 'ceramic craft'] },
  { id: '5', name: 'Sustainable Yoga Mat', description: 'Eco-conscious yoga mat made from natural rubber. Non-slip and durable.', price: 45.00, imageUrl: 'https://placehold.co/300x300.png', category: 'Fitness', stock: 60, keywords: ['yoga mat', 'sustainable fitness'] },
  { id: '6', name: 'Artisan Coffee Beans', description: 'Freshly roasted, single-origin coffee beans. Rich aroma and complex flavor profile.', price: 22.00, imageUrl: 'https://placehold.co/300x300.png', category: 'Groceries', stock: 90, keywords: ['coffee beans', 'artisan gourmet'] },
];

// async function getProducts(): Promise<Product[]> {
//   // TODO: Implement actual Firebase fetching
//   // For now, return mock data
//   await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
//   return MOCK_PRODUCTS;
// }

export default async function HomePage() {
  // const products = await getProducts();
  const products = MOCK_PRODUCTS; // Using mock data directly for now

  return (
    <div className="container mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Welcome to <span className="text-primary">ShopSimple</span>
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground sm:mt-6">
          Discover a curated selection of high-quality products.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full sm:w-auto">
          <Input type="search" placeholder="Search products..." className="pl-10"/>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        {/* TODO: Add category filter dropdown */}
      </div>

      <ProductList products={products} />

      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  );
}
