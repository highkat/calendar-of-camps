import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center py-12">
      <Compass className="h-32 w-32 text-primary opacity-50 mb-8" />
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-6">Oops! Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-md">
        It seems you&apos;ve taken a detour. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/">Go Back Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/search">Search for Camps</Link>
        </Button>
      </div>
    </div>
  );
}
