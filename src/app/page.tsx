
"use client"; // Add this for useState and useRouter

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, CalendarDays, BellRing, MapPin, Users, Award } from 'lucide-react';
import Image from 'next/image';
import { CampCard } from '@/components/camps/CampCard';
import type { CampSession } from '@/lib/mockdata';
import { useState, FormEvent } from 'react'; // Import useState and FormEvent
import { useRouter } from 'next/navigation'; // Import useRouter

const mockFeaturedCamps: CampSession[] = [
  { id: '1', name: 'Forest Explorers Weekly', campName: 'Camp Wildwood', description: 'Discover nature, build forts, and learn outdoor skills.', theme: 'Nature', ageRange: '6-10', dates: 'July 10-14', cost: '$350', imageUrl: 'https://placehold.co/600x400.png', location: 'Redwood National Park', dataAiHint: 'forest kids' },
  { id: '2', name: 'Coding Creators Bootcamp', campName: 'TechSpark Academy', description: 'Dive into game development and Python programming.', theme: 'Tech', ageRange: '10-14', dates: 'July 17-21', cost: '$450', imageUrl: 'https://placehold.co/600x400.png', location: 'Innovation Hub Downtown', dataAiHint: 'computer code' },
  { id: '3', name: 'Artistic Adventures Camp', campName: 'Studio Create', description: 'Paint, sculpt, and craft your summer masterpiece.', theme: 'Arts', ageRange: '7-12', dates: 'July 24-28', cost: '$300', imageUrl: 'https://placehold.co/600x400.png', location: 'Community Arts Center', dataAiHint: 'kids painting' },
];


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')", backgroundBlendMode: "multiply" }}
          data-ai-hint="summer camp fun"
        ></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Find Your Child&apos;s Next Adventure
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Discover, schedule, and manage summer camps with ease. Calendar of Camps helps busy parents find the perfect fit for their kids.
          </p>
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Enter address, city, or zip code"
              className="flex-grow text-lg p-4 bg-background/90 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="lg" className="text-lg bg-background text-primary hover:bg-background/90">
              <Search className="mr-2 h-5 w-5" />
              Search Camps
            </Button>
          </form>
           <p className="mt-4 text-sm">
            Or <Link href="/search" className="underline hover:text-secondary-foreground">browse all camps</Link>.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">How Calendar of Camps Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Discover Camps</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Easily search our extensive database of summer camps. Filter by location, theme, age, and more to find the perfect match.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                  <CalendarDays className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Schedule & Plan</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Organize your child&apos;s summer with our intuitive calendar. Save camps, avoid conflicts, and keep track of everything in one place.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                  <BellRing className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Get Reminders</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Never miss a registration deadline. Opt-in for timely email or SMS reminders for your saved camps.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Camps Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Featured Camps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockFeaturedCamps.map((camp) => (
              <CampCard key={camp.id} camp={camp} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/search">Explore More Camps</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Subscribe Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://placehold.co/600x450.png"
                alt="Happy kids at summer camp"
                width={600}
                height={450}
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint="kids playing"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Unlock the Full Calendar of Camps Experience</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our premium subscription gives you unlimited access to all camp listings, advanced search filters, personalized recommendations, and exclusive content.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <MapPin className="h-6 w-6 text-accent mr-3 shrink-0" />
                  <span>Full access to thousands of camp listings nationwide.</span>
                </li>
                <li className="flex items-center">
                  <Users className="h-6 w-6 text-accent mr-3 shrink-0" />
                  <span>Advanced filtering and AI-powered recommendations.</span>
                </li>
                <li className="flex items-center">
                  <Award className="h-6 w-6 text-accent mr-3 shrink-0" />
                  <span>Discounts on subscriptions for contributing camp data.</span>
                </li>
              </ul>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/why-subscribe">Learn More & Subscribe</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
