"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'; // Corrected import
import { useAuth } from '@/contexts/AuthContext';

// Mock data for scheduled camps
const mockScheduledCamps = [
  { sessionId: '1', sessionName: 'Adventure Camp - Week 1', campName: 'Camp Evergreen', dates: 'June 5-9, 2024', time: '9 AM - 3 PM' },
  { sessionId: '3', sessionName: 'Artistic Creations', campName: 'Creative Kids Camp', dates: 'June 19-23, 2024', time: '1 PM - 5 PM' },
];

export default function ChildCalendarPage() {
  const params = useParams();
  const childId = params.childId as string; // Type assertion
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  // Fetch child's name and scheduled camps based on childId
  // For now, using mock data
  const childName = childId === "child1" ? "Alex Johnson" : childId === "child2" ? "Jamie Lee" : "Child";

  if (authLoading) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/profile/children">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Child Profiles
          </Link>
        </Button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          <CalendarDays className="inline-block mr-3 h-8 w-8" /> 
          {childName}&apos;s Camp Calendar
        </h1>
        <Button asChild>
          <Link href="/search">
            <PlusCircle className="mr-2 h-5 w-5" /> Find & Add Camps
          </Link>
        </Button>
      </div>

      {/* Calendar View - This would be a proper calendar component in a real app */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Upcoming Camps</CardTitle>
          <CardDescription>
            This is a simplified list. A full calendar view would show camps on a monthly/weekly grid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockScheduledCamps.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No camps scheduled for {childName} yet.</p>
          ) : (
            <ul className="space-y-4">
              {mockScheduledCamps.map(camp => (
                <li key={camp.sessionId} className="p-4 border rounded-lg bg-muted/20 hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold text-lg text-primary">{camp.sessionName}</h3>
                  <p className="text-sm text-muted-foreground">{camp.campName}</p>
                  <p className="text-sm">Dates: {camp.dates}</p>
                  <p className="text-sm">Time: {camp.time}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" asChild>
                       {/* Link to session detail page */}
                      <Link href={`/camps/${camp.campName.toLowerCase().replace(/\s+/g, '-')}/sessions/${camp.sessionId}`}>View Session</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      
      {/* Placeholder for actual calendar component */}
      <div className="mt-8 p-8 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground">
        <CalendarDays className="h-12 w-12 mx-auto mb-4" />
        <p>Full Interactive Calendar View Coming Soon!</p>
        <p className="text-sm">Imagine a beautiful, filterable calendar here where you can see all scheduled activities.</p>
      </div>
    </div>
  );
}
