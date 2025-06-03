import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';

// Mock blog post data
const mockBlogPosts = [
  {
    slug: 'choosing-the-right-summer-camp',
    title: 'Choosing the Right Summer Camp: A Parent\'s Guide',
    excerpt: 'Navigating the world of summer camps can be overwhelming. Here are our top tips to find the perfect fit for your child.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'kids compass',
    author: 'Jane Doe',
    date: 'June 15, 2024',
  },
  {
    slug: 'benefits-of-specialty-camps',
    title: 'The Benefits of Specialty Camps: Beyond Traditional Fun',
    excerpt: 'From coding to cooking, specialty camps offer unique learning experiences. Discover how they can enrich your child\'s summer.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'kids learning',
    author: 'John Smith',
    date: 'June 22, 2024',
  },
  {
    slug: 'packing-essentials-for-day-camp',
    title: 'Packing Essentials for Day Camp Success',
    excerpt: 'Ensure your child is prepared for a fun-filled day at camp with our ultimate packing checklist.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'backpack supplies',
    author: 'Alice Brown',
    date: 'June 28, 2024',
  },
];

export default function BlogPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">CampCompass Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tips, guides, and inspiration for planning the best summer ever.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-56 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={post.dataAiHint}
                />
              </div>
            </Link>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-3">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-1.5" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1.5" />
                    <span>{post.date}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
