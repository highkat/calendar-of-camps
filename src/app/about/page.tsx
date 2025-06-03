import Image from 'next/image';
import { Users, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Calendar of Camps</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re passionate about connecting families with enriching summer experiences. Learn more about our mission, vision, and the team dedicated to making summer planning easier for busy parents.
          </p>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="grid md:grid-cols-3 gap-10 mb-16 md:mb-24">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-4 bg-accent/10 rounded-full inline-block mb-4">
              <Target className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-3">Our Mission</h2>
            <p className="text-muted-foreground">
              To simplify the discovery and scheduling of summer camps, empowering parents to provide enriching experiences for their children while managing their busy lives.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-4 bg-accent/10 rounded-full inline-block mb-4">
              <Lightbulb className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-3">Our Vision</h2>
            <p className="text-muted-foreground">
              To be the most trusted and comprehensive resource for summer camp planning, fostering a community where every child can find their perfect summer adventure.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-4 bg-accent/10 rounded-full inline-block mb-4">
              <Users className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-3">Our Values</h2>
            <p className="text-muted-foreground">
              Parent-Centricity, Trust & Transparency, Community Collaboration, Innovation, and a Passion for Child Enrichment.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-16 md:mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square">
              <Image
                src="https://placehold.co/600x600.png"
                alt="Calendar of Camps team working"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-xl"
                data-ai-hint="team collaboration"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Calendar of Camps was born from the real-life challenges faced by working parents. We understood the struggle of sifting through countless websites, managing complex schedules, and the fear of missing out on great camp opportunities.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Driven by a desire to make this process stress-free and even enjoyable, we created a centralized platform that aggregates camp information, provides smart scheduling tools, and fosters a supportive community.
              </p>
              <p className="text-lg text-muted-foreground">
                Our team is a blend of parents, tech enthusiasts, and education advocates, all united by the goal of helping families make the most of their summers.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action (Optional) */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a parent looking for camps or a camp organizer wanting to share your program, Calendar of Camps is here for you.
          </p>
          {/* You can add buttons here, e.g., to search camps or submit a camp */}
        </section>
      </div>
    </div>
  );
}
