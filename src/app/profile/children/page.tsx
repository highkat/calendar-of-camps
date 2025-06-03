"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, User, Edit3, Trash2, Smile, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ChildProfile {
  id: string;
  name: string;
  age: number; // Or birthDate
  // Add other relevant fields: interests, allergies, etc.
}

const mockChildren: ChildProfile[] = [
  { id: 'child1', name: 'Alex Johnson', age: 8 },
  { id: 'child2', name: 'Jamie Lee', age: 10 },
];

export default function ChildrenProfilePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>(mockChildren); // Replace with actual data fetching
  
  if (authLoading) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleDeleteChild = (childId: string) => {
    // Implement actual deletion logic
    setChildren(prev => prev.filter(child => child.id !== childId));
    console.log(`Delete child with ID: ${childId}`);
  };


  return (
    <div className="container py-12">
       <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Manage Child Profiles</h1>
        <Button asChild>
          <Link href="/profile/children/add">
            <PlusCircle className="mr-2 h-5 w-5" /> Add Child
          </Link>
        </Button>
      </div>

      {children.length === 0 ? (
        <Card className="text-center p-8 bg-muted/30">
          <CardHeader>
            <Smile className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-2xl">No Child Profiles Yet</CardTitle>
            <CardDescription>
              Add your children to easily manage their camp schedules and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link href="/profile/children/add">
                <PlusCircle className="mr-2 h-5 w-5" /> Add Your First Child
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <Card key={child.id} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">{child.name}</CardTitle>
                <User className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Age: {child.age}</p>
                {/* Display other child info here */}
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/profile/children/${child.id}/edit`}>
                      <Edit3 className="mr-1 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete {child.name}'s profile.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteChild(child.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                   <Button variant="secondary" size="sm" asChild>
                    <Link href={`/profile/children/${child.id}/calendar`}>
                       View Calendar
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
