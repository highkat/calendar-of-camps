import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
  price?: string; // Optional, as prices can vary
  category: string;
  affiliateLink: string; // Direct link to the product on affiliate site
}

const mockAffiliateProducts: AffiliateProduct[] = [
  {
    id: 'prod1',
    name: 'Durable Kids Backpack for Camp',
    description: 'A spacious and rugged backpack perfect for carrying all camp essentials. Multiple compartments and water-resistant.',
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'kids backpack',
    price: '$39.99',
    category: 'Camp Gear',
    affiliateLink: '#', // Replace with actual affiliate link
  },
  {
    id: 'prod2',
    name: 'Eco-Friendly Water Bottle',
    description: 'Stay hydrated with this BPA-free, reusable water bottle. Leak-proof and easy to clean.',
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'water bottle',
    price: '$19.95',
    category: 'Essentials',
    affiliateLink: '#',
  },
  {
    id: 'prod3',
    name: 'Sunscreen for Sensitive Skin SPF 50+',
    description: 'Protect your child\'s skin with this gentle, broad-spectrum sunscreen. Water-resistant for up to 80 minutes.',
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'sunscreen kids',
    price: '$14.50',
    category: 'Health & Safety',
    affiliateLink: '#',
  },
  {
    id: 'prod4',
    name: 'Nature Explorer Kit for Kids',
    description: 'Includes binoculars, magnifying glass, compass, and a field guide. Perfect for little adventurers.',
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'kids explorer kit',
    price: '$29.99',
    category: 'Activities & Fun',
    affiliateLink: '#',
  },
];


export default function StorePage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center justify-center">
          <ShoppingBag className="mr-3 h-10 w-10" /> CampCompass Store
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Handpicked essentials and fun gear for your child&apos;s summer camp adventure! These are affiliate links, meaning we may earn a small commission if you purchase through them, at no extra cost to you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockAffiliateProducts.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-64 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={product.dataAiHint}
              />
               <Badge variant="secondary" className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground">
                {product.category}
              </Badge>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors h-14 line-clamp-2">
                {product.name}
              </CardTitle>
              {product.price && <p className="text-xl font-bold text-accent mt-1">{product.price}</p>}
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm text-muted-foreground flex-grow line-clamp-3">
              {product.description}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Link href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                  View Product <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <p className="text-center mt-12 text-sm text-muted-foreground">
        Please note: CampCompass does not directly sell these products. All purchases are made through external affiliate partner websites.
        Prices and availability are subject to change on the partner&apos;s site.
      </p>
    </div>
  );
}
