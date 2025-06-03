import { CalendarDays, UserCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// This is a dynamic page, so we need to handle params
// In a real app, you'd fetch post data based on the slug
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Mock data for a single post - replace with actual data fetching
  const post = {
    title: `Understanding ${slug.replace(/-/g, ' ')}`,
    author: 'Calendar of Camps Team',
    date: 'July 1, 2024',
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHint: 'article illustration',
    tags: ['Summer Camps', 'Parenting', 'Activities'],
    content: `
      <p class="mb-4 text-lg leading-relaxed">This is placeholder content for the blog post titled "${slug.replace(/-/g, ' ')}". In a real application, this content would be fetched from a CMS or database based on the slug.</p>
      <h2 class="text-2xl font-bold mt-8 mb-4 font-headline">Key Considerations</h2>
      <p class="mb-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <ul class="list-disc list-inside mb-4 space-y-2 pl-4">
        <li>Understanding your child's interests.</li>
        <li>Checking camp safety records and staff qualifications.</li>
        <li>Considering location, cost, and schedule.</li>
        <li>Reading reviews from other parents.</li>
      </ul>
      <figure class="my-8">
        <img src="https://placehold.co/800x400.png" alt="Related content" class="rounded-lg shadow-md mx-auto" data-ai-hint="children playing"/>
        <figcaption class="text-center text-sm text-muted-foreground mt-2">An illustrative image related to the topic.</figcaption>
      </figure>
      <h2 class="text-2xl font-bold mt-8 mb-4 font-headline">Making the Decision</h2>
      <p class="mb-4 leading-relaxed">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p class="mb-4 leading-relaxed">Curabitur pretium tinnitus dui, ut blandif magna porttitor ut. Curabitur ac sapien vivamus bibendum ullamcorper tellus, per inceptos himenaeos. Fusce non quam nunc. Nam quis elit nisi. Sed eget elit quis est congue dapibus. Cras ullamcorper efficitur turpis, id porta enim congue et.</p>
    `,
  };

  if (!post) {
    // Handle case where post is not found, e.g., redirect to 404
    return <div className="container py-12 text-center">Blog post not found.</div>;
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <article>
        <header className="mb-8">
          <div className="mb-4 space-x-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-accent/20 text-accent">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <UserCircle className="h-5 w-5 mr-1.5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-1.5" />
              <span>Published on {post.date}</span>
            </div>
          </div>
        </header>

        <div className="relative h-72 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={post.dataAiHint}
          />
        </div>

        <div
          className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-headings:font-headline prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
