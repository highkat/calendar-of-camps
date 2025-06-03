"use client";
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";
import { CAMP_THEMES, CAMP_AGE_GROUPS, CAMP_SESSION_LENGTHS } from '@/lib/constants';
import { UploadCloud, PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SubmitCampPage() {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1); // 1: Pre-check, 2: Form
  const [existingCampQuery, setExistingCampQuery] = useState('');
  const [campName, setCampName] = useState('');
  // Add more state for form fields as needed

  const handlePreCheck = (e: FormEvent) => {
    e.preventDefault();
    // Simulate search for existing camp
    console.log("Searching for camp:", existingCampQuery);
    // In a real app, query DB here
    // For demo, assume not found and proceed
    setStep(2);
    toast({ title: "Pre-check complete", description: "No similar camp found. Please proceed with submission." });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Submitting camp:', { campName /* ...other fields */ });
    toast({
      title: "Camp Submitted!",
      description: "Your camp submission has been received and is pending review. You may receive a discount code upon approval.",
    });
    // Reset form or redirect
    setCampName('');
    // ... reset other fields
    setStep(1); // Go back to pre-check or redirect to a thank you page
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-12 text-center">
        <Card className="max-w-md mx-auto p-8">
          <CardHeader>
            <CardTitle className="text-2xl">Login Required</CardTitle>
            <CardDescription>You need to be logged in to submit a camp.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">Login or Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">Submit a New Camp</h1>
      
      {step === 1 && (
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Let&apos;s Check First!</CardTitle>
            <CardDescription>
              To avoid duplicates, please search if the camp already exists in our database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePreCheck} className="space-y-6">
              <div>
                <Label htmlFor="existing-camp-query" className="text-lg font-semibold">Camp Name or Organizer</Label>
                <Input
                  id="existing-camp-query"
                  type="text"
                  value={existingCampQuery}
                  onChange={(e) => setExistingCampQuery(e.target.value)}
                  placeholder="e.g., Camp Evergreen or Redwood Parks Dept."
                  className="mt-1"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-5 w-5" /> Search for Existing Camp
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">New Camp Submission</CardTitle>
            <CardDescription>
              Fill in the details for the camp and its session(s). Fields marked with * are required.
              Approved submissions may qualify for a subscription discount!
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Camp Details Section */}
              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold px-2 text-primary">Camp Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <Label htmlFor="camp-name">Camp Name*</Label>
                    <Input id="camp-name" value={campName} onChange={(e) => setCampName(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="camp-organizer">Organizer/Organization*</Label>
                    <Input id="camp-organizer" placeholder="e.g., YMCA, City Parks Dept" required />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="camp-description">Camp Description*</Label>
                  <Textarea id="camp-description" placeholder="A brief overview of the camp's focus and activities." required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <Label htmlFor="camp-website">Camp Website URL</Label>
                    <Input id="camp-website" type="url" placeholder="https://examplecamp.com" />
                  </div>
                  <div>
                    <Label htmlFor="camp-image">Camp Image/Logo</Label>
                    <Input id="camp-image" type="file" className="file:text-sm file:font-medium file:text-foreground" />
                    <p className="text-xs text-muted-foreground mt-1">Upload an image (max 2MB).</p>
                  </div>
                </div>
              </fieldset>

              {/* Session Details Section (Simplified - can be repeatable) */}
              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold px-2 text-primary">Session Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <Label htmlFor="session-name">Session Name (if different from Camp Name)</Label>
                    <Input id="session-name" />
                  </div>
                   <div>
                    <Label htmlFor="session-theme">Theme*</Label>
                    <Select required>
                      <SelectTrigger id="session-theme"><SelectValue placeholder="Select theme" /></SelectTrigger>
                      <SelectContent>
                        {CAMP_THEMES.map(theme => <SelectItem key={theme} value={theme}>{theme}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                   <div>
                    <Label htmlFor="session-age">Age Range*</Label>
                    <Select required>
                      <SelectTrigger id="session-age"><SelectValue placeholder="Select age group" /></SelectTrigger>
                      <SelectContent>
                        {CAMP_AGE_GROUPS.map(age => <SelectItem key={age} value={age}>{age}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="session-gender">Gender Specificity</Label>
                    <Select>
                      <SelectTrigger id="session-gender"><SelectValue placeholder="Co-ed (Default)" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="co-ed">Co-ed</SelectItem>
                        <SelectItem value="boys">Boys Only</SelectItem>
                        <SelectItem value="girls">Girls Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <Label htmlFor="session-start-date">Start Date*</Label>
                        <Input type="date" id="session-start-date" required />
                    </div>
                    <div>
                        <Label htmlFor="session-end-date">End Date*</Label>
                        <Input type="date" id="session-end-date" required />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <Label htmlFor="session-cost">Cost (USD)*</Label>
                        <Input type="number" id="session-cost" placeholder="e.g., 300" required />
                    </div>
                    <div>
                        <Label htmlFor="session-length">Session Length</Label>
                         <Select>
                            <SelectTrigger id="session-length"><SelectValue placeholder="Select length" /></SelectTrigger>
                            <SelectContent>
                                {CAMP_SESSION_LENGTHS.map(len => <SelectItem key={len} value={len}>{len}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-4">
                    <Label htmlFor="session-location">Location Address*</Label>
                    <Input id="session-location" placeholder="123 Main St, Anytown, USA" required/>
                </div>
                <div className="mt-4">
                    <Label htmlFor="registration-url">External Registration URL*</Label>
                    <Input id="registration-url" type="url" placeholder="https://examplecamp.com/register" required />
                </div>
                 <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="before-care-available" />
                        <Label htmlFor="before-care-available">Before Care Available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="after-care-available" />
                        <Label htmlFor="after-care-available">After Care Available</Label>
                    </div>
                </div>
                {/* Add button for "Add another session" for camps with multiple sessions */}
                <Button variant="outline" type="button" className="mt-4 w-full md:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Session (for this Camp)
                </Button>
              </fieldset>
            </CardContent>
            <CardFooter className="flex justify-end p-6">
               <Button variant="outline" type="button" onClick={() => setStep(1)} className="mr-4">
                Back to Pre-check
              </Button>
              <Button type="submit">
                <UploadCloud className="mr-2 h-5 w-5" /> Submit Camp for Review
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}
