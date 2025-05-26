
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateProductDescription, type GenerateProductDescriptionOutput } from '@/ai/flows/generate-product-description';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

export default function AiProductToolPage() {
  const [keywords, setKeywords] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!keywords.trim()) {
      toast({
        title: "Keywords required",
        description: "Please enter some keywords to generate a description.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedTitle('');
    setGeneratedDescription('');

    try {
      const result: GenerateProductDescriptionOutput = await generateProductDescription({ keywords });
      setGeneratedTitle(result.title);
      setGeneratedDescription(result.description);
      toast({
        title: "Content Generated",
        description: "Product title and description have been generated.",
      });
    } catch (error) {
      console.error("Error generating product description:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate product description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProduct = () => {
    // TODO: Implement saving the product (title, description, keywords, etc.) to Firebase
    if (!generatedTitle || !generatedDescription) {
        toast({
            title: "Cannot Save",
            description: "Please generate content before saving.",
            variant: "destructive",
        });
        return;
    }
    console.log('Saving product:', { title: generatedTitle, description: generatedDescription, keywords });
    toast({
        title: "Product Saved (Mock)",
        description: "Product details have been logged. Implement actual saving.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Wand2 className="mr-2 h-6 w-6 text-primary" />
            AI Product Description Generator
          </CardTitle>
          <CardDescription>
            Enter keywords to generate a compelling product title and description using AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-base font-medium">Keywords</Label>
            <Textarea
              id="keywords"
              placeholder="e.g., sustainable, eco-friendly, bamboo toothbrush, soft bristles"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="min-h-[100px] text-base"
            />
            <p className="text-sm text-muted-foreground">
              Separate keywords with commas or new lines. More specific keywords yield better results.
            </p>
          </div>

          <Button onClick={handleGenerate} disabled={isLoading} className="w-full text-lg py-3">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
            Generate Content
          </Button>

          { (generatedTitle || generatedDescription || isLoading) && (
            <div className="space-y-4 pt-6 border-t mt-6">
              <h3 className="text-xl font-semibold">Generated Content:</h3>
              {isLoading && !generatedTitle && !generatedDescription && (
                <div className="space-y-4">
                    <div className="h-8 bg-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-20 bg-muted rounded animate-pulse"></div>
                </div>
              )}
              {generatedTitle && (
                <div className="space-y-2">
                  <Label htmlFor="generatedTitle" className="text-base font-medium">Generated Title</Label>
                  <Input
                    id="generatedTitle"
                    value={generatedTitle}
                    onChange={(e) => setGeneratedTitle(e.target.value)}
                    className="text-base font-semibold"
                  />
                </div>
              )}
              {generatedDescription && (
                <div className="space-y-2">
                  <Label htmlFor="generatedDescription" className="text-base font-medium">Generated Description</Label>
                  <Textarea
                    id="generatedDescription"
                    value={generatedDescription}
                    onChange={(e) => setGeneratedDescription(e.target.value)}
                    className="min-h-[150px] text-base"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProduct} disabled={isLoading || !generatedTitle} className="w-full text-lg py-3" variant="outline">
            Save Product (Mock)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
