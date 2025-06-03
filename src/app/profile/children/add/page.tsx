"use client";
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AddChildPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const [childInterests, setChildInterests] = useState('');
  const [childNotes, setChildNotes] = useState(''); // For allergies, medical notes etc.

  if (authLoading) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Adding child:', { childName, childBirthDate, childInterests, childNotes });
    // In a real app, save to database
    toast({
      title: "Child Profile Added!",
      description: `${childName} has been successfully added to your family.`,
    });
    router.push('/profile/children'); // Redirect to children list
  };

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
      
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-primary flex items-center">
            <UserPlus className="mr-3 h-7 w-7" /> Add New Child Profile
          </CardTitle>
          <CardDescription>
            Enter your child&apos;s details to help personalize their camp search and scheduling.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="child-name" className="font-semibold">Child&apos;s Full Name*</Label>
              <Input
                id="child-name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                required
                placeholder="e.g., Alex Johnson"
              />
            </div>
            <div>
              <Label htmlFor="child-birthdate" className="font-semibold">Birth Date*</Label>
              <Input
                id="child-birthdate"
                type="date"
                value={childBirthDate}
                onChange={(e) => setChildBirthDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="child-interests" className="font-semibold">Interests & Hobbies</Label>
              <Textarea
                id="child-interests"
                value={childInterests}
                onChange={(e) => setChildInterests(e.target.value)}
                placeholder="e.g., Soccer, painting, robotics, nature exploration"
              />
               <p className="text-xs text-muted-foreground mt-1">Comma-separated or a brief description.</p>
            </div>
             <div>
              <Label htmlFor="child-notes" className="font-semibold">Important Notes</Label>
              <Textarea
                id="child-notes"
                value={childNotes}
                onChange={(e) => setChildNotes(e.target.value)}
                placeholder="e.g., Allergies (peanuts, gluten), medical conditions, emergency contact if different."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6">
            <Button type="submit" size="lg">
              Save Child Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
