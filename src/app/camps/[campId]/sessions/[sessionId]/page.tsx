
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampSessions, type CampSession } from '@/lib/mockdata';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { CalendarDays, Clock, Users, DollarSign, MapPin, Globe, Edit3, BellPlus, Heart, Share2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const { isSubscribed, loading: subscriptionLoading } = useSubscription();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Find the camp session from mock data
  const session = mockCampSessions.find(s => s.id === sessionId);

  if (authLoading || subscriptionLoading) {
    return <div className="container py-12 text-center">Loading session details...</div>;
  }
  
  // Freemium check: If not subscribed and trying to access a session beyond a certain ID (e.g., ID > 3 for mock), redirect.
  // This is a simplified check. A real app would have more robust paywall logic.
  if (!isSubscribed && session && parseInt(session.id) > 3) {
     toast({
      title: "Premium Content",
      description: "Please subscribe to view details for this camp session.",
      variant: "default",
      action: <Button asChild><Link href="/why-subscribe">Subscribe</Link></Button>
    });
    router.push('/search'); // Or to /why-subscribe
    return null;
  }


  if (!session) {
    return <div className="container py-12 text-center">Camp session not found.</div>;
  }
  
  const handleSaveToCalendar = () => {
    if(!isAuthenticated) {
      toast({ title: "Login Required", description: "Please login to save camps to your calendar.", variant: "default", action: <Button asChild><Link href="/login">Login</Link></Button> });
      return;
    }
    // Logic to save to calendar, potentially prompting for which child's calendar
    // If user has no child profiles, prompt to create one first.
    console.log(`Saving session ${session.id} to calendar for user ${user?.id}`);
    toast({ title: "Saved to Calendar!", description: `${session.name} has been added to your calendar.` });
  };

  const handleSetReminder = () => {
     if(!isAuthenticated) {
      toast({ title: "Login Required", description: "Please login to set reminders.", variant: "default", action: <Button asChild><Link href="/login">Login</Link></Button> });
      return;
    }
    // Logic to set a registration reminder
    console.log(`Setting reminder for session ${session.id} for user ${user?.id}`);
    toast({ title: "Reminder Set!", description: `We'll remind you about ${session.name} registration.` });
  };


  return (
    <div className="bg-muted/20 py-12">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
            <Button variant="outline" asChild onClick={() => router.back()}>
                <Link href="/search"> {/* Fallback if router.back() isn't ideal */}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Search
                </Link>
            </Button>
        </div>

        <Card className="shadow-xl overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={session.imageUrl}
              alt={session.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={session.dataAiHint || "camp activity detail"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm text-white border-white/30">{session.theme}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold">{session.name}</h1>
              <p className="text-lg md:text-xl opacity-90">{session.campName}</p>
            </div>
          </div>

          <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{session.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">Session Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-muted-foreground">
                  <div className="flex items-start"><CalendarDays className="h-5 w-5 mr-3 mt-1 shrink-0 text-accent" /> <div><strong>Dates:</strong> {session.dates}</div></div>
                  <div className="flex items-start"><Clock className="h-5 w-5 mr-3 mt-1 shrink-0 text-accent" /> <div><strong>Typical Time:</strong> 9:00 AM - 4:00 PM (example)</div></div>
                  <div className="flex items-start"><Users className="h-5 w-5 mr-3 mt-1 shrink-0 text-accent" /> <div><strong>Ages:</strong> {session.ageRange}</div></div>
                  <div className="flex items-start"><DollarSign className="h-5 w-5 mr-3 mt-1 shrink-0 text-accent" /> <div><strong>Cost:</strong> {session.cost}</div></div>
                  <div className="flex items-start"><MapPin className="h-5 w-5 mr-3 mt-1 shrink-0 text-accent" /> <div><strong>Location:</strong> {session.location}</div></div>
                  <div className="flex items-start"><Globe className="h-5 w-5 mr-3 mt-1 shrink-0 text-accent" /> <div><strong>Website:</strong> <Link href="#" className="text-primary hover:underline">Visit Camp Website</Link></div></div>
                </div>
              </div>

              {/* Placeholder for activities, schedule, what to bring etc. */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">Example Activities</h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 pl-2">
                    <li>Team Building Games</li>
                    <li>Nature Crafts</li>
                    <li>Sports & Outdoor Play</li>
                    <li>Storytelling Sessions</li>
                </ul>
              </div>

            </div>

            <div className="md:col-span-1 space-y-4">
              <Card className="bg-background shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleSaveToCalendar}>
                    <Heart className="mr-2 h-5 w-5" /> Save to Calendar
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleSetReminder}>
                    <BellPlus className="mr-2 h-5 w-5" /> Set Reminder
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`#`} target="_blank" rel="noopener noreferrer"> {/* Replace # with actual registration link */}
                      <Globe className="mr-2 h-5 w-5" /> Register
                    </Link>
                  </Button>
                   <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary">
                    <Share2 className="mr-2 h-5 w-5" /> Share
                  </Button>
                </CardContent>
              </Card>
              
              {/* Example for Contributor/Admin edit link */}
              {isAuthenticated && user?.roles.some(role => ['contributor', 'admin'].includes(role)) && (
                <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/admin/camps/${session.campName.toLowerCase().replace(/\s+/g, '-')}/sessions/${session.id}/edit`}> {/* Update with actual admin path */}
                        <Edit3 className="mr-2 h-5 w-5" /> Edit This Session (Admin)
                    </Link>
                </Button>
              )}
              
              <Card className="bg-destructive/10 border-destructive/30 text-destructive-foreground shadow-md">
                <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <CardTitle className="text-lg text-destructive">Important Note</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-destructive/90">
                  Registration is handled externally on the camp's own website. Calendar of Camps does not process registrations or payments. Capacity may be limited.
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
