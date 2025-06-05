
"use client"; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, CalendarDays, BellRing, MapPin, Users, Award } from 'lucide-react';
import Image from 'next/image';
import { CampCard } from '@/components/camps/CampCard';
import type { CampSession } from '@/lib/mockdata';
import { useState, FormEvent, useEffect, useRef } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { cn } from '@/lib/utils';

const mockFeaturedCamps: CampSession[] = [
  { id: '1', name: 'Forest Explorers Weekly', campName: 'Camp Wildwood', description: 'Discover nature, build forts, and learn outdoor skills.', theme: 'Nature', ageRange: '6-10', dates: 'July 10-14', cost: '$350', imageUrl: 'https://placehold.co/600x400.png', location: 'Redwood National Park', dataAiHint: 'forest kids' },
  { id: '2', name: 'Coding Creators Bootcamp', campName: 'TechSpark Academy', description: 'Dive into game development and Python programming.', theme: 'Tech', ageRange: '10-14', dates: 'July 17-21', cost: '$450', imageUrl: 'https://placehold.co/600x400.png', location: 'Innovation Hub Downtown', dataAiHint: 'computer code' },
  { id: '3', name: 'Artistic Adventures Camp', campName: 'Studio Create', description: 'Paint, sculpt, and craft your summer masterpiece.', theme: 'Arts', ageRange: '7-12', dates: 'July 24-28', cost: '$300', imageUrl: 'https://placehold.co/600x400.png', location: 'Community Arts Center', dataAiHint: 'kids painting' },
];

const howItWorksFeatures = [
  { icon: Search, title: "Discover Camps", description: "Easily search our extensive database of summer camps. Filter by location, theme, age, and more to find the perfect match." },
  { icon: CalendarDays, title: "Schedule & Plan", description: "Organize your child's summer with our intuitive calendar. Save camps, avoid conflicts, and keep track of everything in one place." },
  { icon: BellRing, title: "Get Reminders", description: "Never miss a registration deadline. Opt-in for timely email or SMS reminders for your saved camps." },
];

const whySubscribeFeaturesList = [
  { icon: MapPin, text: "Full access to thousands of camp listings nationwide." },
  { icon: Users, text: "Advanced filtering and AI-powered recommendations." },
  { icon: Award, text: "Earn a 25% discount on subscriptions by contributing 3 approved, unique camp sessions." },
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

  const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const observedElements = useRef(new Set<Element>());

    useEffect(() => {
      observerRef.current = new IntersectionObserver((observerEntries) => {
        setEntries(observerEntries);
      }, options);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        observedElements.current.clear();
      };
    }, [options]);

    const observe = (element: Element | null) => {
      if (element && observerRef.current && !observedElements.current.has(element)) {
        observerRef.current.observe(element);
        observedElements.current.add(element);
      }
    };
    
    const unobserve = (element: Element | null) => {
        if (element && observerRef.current && observedElements.current.has(element)) {
            observerRef.current.unobserve(element);
            observedElements.current.delete(element);
        }
    };

    return { entries, observe, unobserve };
  };
  
  const createScrollRevealHook = (options: IntersectionObserverInit = { threshold: 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement | null>(null);
    const { entries, observe, unobserve: unobserveInternal } = useIntersectionObserver(options);
  
    useEffect(() => {
      if (elementRef.current) {
        observe(elementRef.current);
      }
      return () => {
        if (elementRef.current) {
          unobserveInternal(elementRef.current);
        }
      };
    }, [observe, unobserveInternal]); 
  
    useEffect(() => {
      entries.forEach(entry => {
        if (entry.target === elementRef.current && entry.isIntersecting) {
          setIsVisible(true);
          unobserveInternal(entry.target); // unobserveInternal already checks observerRef.current
        }
      });
    }, [entries, unobserveInternal]);
  
    return { ref: elementRef, isVisible };
  };

  const ScrollRevealContent: React.FC<{children: React.ReactNode, className?: string, delay?: string }> = ({ children, className, delay }) => {
    const { ref, isVisible } = createScrollRevealHook();
    return (
      <div
        ref={ref}
        className={cn(
          "opacity-0 transform translate-y-5",
          isVisible && `animate-in fade-in-0 slide-in-from-bottom-5 duration-700 ease-out opacity-100 translate-y-0 ${delay || ''}`,
          className
        )}
      >
        {children}
      </div>
    );
  };


  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://source.unsplash.com/DqgMHzeio7g/1920x1080')" }}
          data-ai-hint="people outdoors"
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
            {howItWorksFeatures.map((item, index) => (
              <ScrollRevealContent key={item.title} delay={`[animation-delay:${index * 150}ms]`}>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                      <item.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-grow">
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollRevealContent>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Camps Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Featured Camps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockFeaturedCamps.map((camp, index) => (
              <ScrollRevealContent key={camp.id} delay={`[animation-delay:${index * 100}ms]`}>
                <CampCard camp={camp} className="h-full" />
              </ScrollRevealContent>
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
            <ScrollRevealContent>
              <Image
                src="https://placehold.co/600x450.png"
                alt="Happy kids at summer camp"
                width={600}
                height={450}
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                data-ai-hint="kids playing"
              />
            </ScrollRevealContent>
            <ScrollRevealContent delay="[animation-delay:150ms]">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Unlock the Full Calendar of Camps Experience</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our premium subscription gives you unlimited access to all camp listings, advanced search filters, personalized recommendations, and exclusive content.
                </p>
                <ul className="space-y-3 mb-8">
                  {whySubscribeFeaturesList.map((item) => (
                    <li key={item.text} className="flex items-center">
                      <item.icon className="h-6 w-6 text-accent mr-3 shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/why-subscribe">Learn More & Subscribe</Link>
                </Button>
              </div>
            </ScrollRevealContent>
          </div>
        </div>
      </section>
    </div>
  );
}
