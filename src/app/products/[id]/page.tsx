
"use client"; // For now, can be server component later with data fetching
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/types";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Mock product data - replace with actual data fetching
const MOCK_PRODUCTS_MAP: Record<string, Product> = {
  '1': { id: '1', name: 'Eco-Friendly Water Bottle', description: 'Stay hydrated with this stylish and sustainable water bottle. Made from recycled materials and BPA-free. Perfect for your daily commute, gym sessions, or outdoor adventures. Keeps drinks cold for 24 hours and hot for 12 hours.', price: 25.99, imageUrl: 'https://placehold.co/600x600.png', category: 'Accessories', stock: 100, keywords: ['water bottle', 'eco-friendly'] },
  '2': { id: '2', name: 'Organic Cotton T-Shirt', description: 'Comfortable and ethically sourced t-shirt for everyday wear. Soft, breathable, and kind to your skin. Made from 100% GOTS certified organic cotton. Available in various colors and sizes.', price: 35.00, imageUrl: 'https://placehold.co/600x600.png', category: 'Apparel', stock: 50, keywords: ['t-shirt', 'organic cotton'] },
  // Add other mock products if needed
};


export default function ProductDetailsPage() {
  const params = useParams();
  const productId = typeof params.id === 'string' ? params.id : undefined;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      // TODO: Fetch product by ID from Firebase
      // For now, use mock data
      setIsLoading(true);
      setTimeout(() => {
        setProduct(MOCK_PRODUCTS_MAP[productId] || null);
        setIsLoading(false);
      }, 500);
    } else {
        setIsLoading(false);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    // TODO: Implement add to cart functionality with selected quantity
    console.log('Add to cart:', product.id, 'Quantity:', quantity);
    alert(\`Added ${quantity} of ${product.name} to cart (mock)\`);
  };
  
  if (isLoading) {
    return (
        <div className="container mx-auto py-8 text-center">
            <Loader className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading product details...</p>
        </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Link>
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-0">
             <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full aspect-square"
                data-ai-hint={product.keywords ? product.keywords.join(' ') : "product detail"}
              />
          </div>
          <div className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl lg:text-4xl font-bold">{product.name}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className={i < 4 ? "fill-current h-5 w-5" : "h-5 w-5"} />)}
                </div>
                <span className="text-sm text-muted-foreground">(125 reviews)</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
              <CardDescription className="text-base leading-relaxed text-foreground/80 mb-6">
                {product.description}
              </CardDescription>
              <Separator className="my-6" />
              <div className="flex items-center gap-4 mb-6">
                <Label htmlFor="quantity" className="text-base font-medium">Quantity:</Label>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-r-none">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-10 text-center border-l border-r rounded-none focus-visible:ring-0"
                    min="1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}  className="rounded-l-none">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Stock: {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
              </p>
            </CardContent>
            <CardFooter className="p-6 bg-muted/50 border-t">
              <Button 
                size="lg" 
                className="w-full text-lg py-3" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
      
      {/* Optional: Related Products, Reviews section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <Card className="shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="h-5 w-5 text-green-500"/> 
                    <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                </div>
                {/* TODO: Implement review submission and display */}
            </CardContent>
        </Card>
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
