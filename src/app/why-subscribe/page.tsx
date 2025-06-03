import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Search, CalendarCheck, Percent, Users, Bot } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function WhySubscribePage() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/30 py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Unlock the Best of Calendar of Camps</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Supercharge your summer camp search and planning with a Calendar of Camps premium subscription. Discover why parents love our exclusive features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
          {[
            { icon: Search, title: "Unlimited Camp Access", description: "Browse our entire database of thousands of camps across the US. No more limited results!" },
            { icon: CalendarCheck, title: "Advanced Search & Filters", description: "Pinpoint the perfect camp with powerful filters for theme, dates, cost, amenities, and more." },
            { icon: Bot, title: "AI-Powered Recommendations", description: "Get personalized camp suggestions based on your family's preferences and search history." },
            { icon: Users, title: "Detailed Camp Profiles", description: "Access in-depth information, photos, and parent reviews for each camp." },
            { icon: Percent, title: "Crowdsource Discounts", description: "Submit new camps and earn exclusive discount codes for your subscription renewal." },
            { icon: CheckCircle, title: "Priority Support", description: "Receive faster assistance from our dedicated support team." },
          ].map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/10 rounded-full inline-block mb-3">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="bg-primary text-primary-foreground p-8 md:p-12 rounded-xl shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video hidden md:block">
               <Image 
                src="https://placehold.co/600x400.png" 
                alt="Family planning summer" 
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg"
                data-ai-hint="family planning"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Summer?</h2>
              <p className="text-lg opacity-90 mb-8">
                Choose a plan that works for you and start planning an unforgettable summer for your kids.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/signup?plan=premium_1y">Subscribe Yearly</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10">
                  <Link href="/signup?plan=premium_3y">Subscribe for 3 Years (Best Value)</Link>
                </Button>
              </div>
               <p className="text-sm opacity-80 mt-4">
                Discounts available for submitting new camp information! <Link href="/submit-camp" className="underline hover:opacity-100">Learn more</Link>.
              </p>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
