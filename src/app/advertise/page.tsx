import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Users, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdvertisePage() {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Advertise with Calendar of Camps</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Reach thousands of engaged parents actively searching for summer camps. Boost your camp&apos;s visibility and enrollment with our targeted advertising solutions.
          </p>
        </section>

        {/* Why Advertise With Us Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-24">
          {[
            { icon: Target, title: "Targeted Audience", description: "Connect directly with parents in your local area or nationwide who are specifically looking for summer camps." },
            { icon: Users, title: "High Engagement", description: "Our users are actively planning and researching, making them highly receptive to relevant camp information." },
            { icon: TrendingUp, title: "Boost Enrollment", description: "Increase your camp's visibility, drive traffic to your registration page, and fill your sessions faster." },
            { icon: BarChart2, title: "Trackable Results", description: "Leverage modern ad platform analytics to monitor your campaign performance and ROI." },
          ].map((feature, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
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
        </section>

        {/* Advertising Options Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Advertising Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <Card className="p-6 shadow-lg">
              <CardTitle className="text-2xl mb-3 text-primary flex items-center">
                <TrendingUp className="h-7 w-7 mr-3 text-accent" /> Featured Camp Listings
              </CardTitle>
              <p className="text-muted-foreground mb-4">
                Get your camp prominently displayed at the top of relevant search results and on our homepage.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2 mb-4">
                <li>Premium placement in search</li>
                <li>Homepage feature spots</li>
                <li>Enhanced listing with more details</li>
              </ul>
              <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">Learn More</Button>
            </Card>
            <Card className="p-6 shadow-lg">
              <CardTitle className="text-2xl mb-3 text-primary flex items-center">
                <BarChart2 className="h-7 w-7 mr-3 text-accent" /> Sponsored Content & Blog Posts
              </CardTitle>
              <p className="text-muted-foreground mb-4">
                Share your camp's unique story through sponsored articles on our blog, reaching parents seeking valuable insights.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2 mb-4">
                <li>Custom-written articles</li>
                <li>Newsletter inclusion</li>
                <li>Social media promotion</li>
              </ul>
              <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">Get Started</Button>
            </Card>
            {/* Add more advertising options like display ads if applicable */}
          </div>
           <p className="text-center mt-8 text-muted-foreground">
            We partner with a leading ad platform to provide seamless campaign management, payment processing, and detailed analytics.
          </p>
        </section>

        {/* Get Started Section */}
        <section className="text-center bg-muted/50 py-16 rounded-xl">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-primary mb-6">Ready to Grow Your Camp?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let&apos;s discuss how Calendar of Camps can help you achieve your enrollment goals. Contact our advertising team today for a personalized consultation and media kit.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact?subject=AdvertisingInquiry">Contact Advertising Sales</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
