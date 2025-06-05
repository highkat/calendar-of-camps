
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
import { UploadCloud, PlusCircle, Search, CheckCircle, Edit } from 'lucide-react';
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
      title: "Submission Received!",
      description: "Your camp information has been submitted for review. We'll notify you by email once it's approved or if any changes are needed. Thank you for contributing!",
      duration: 7000,
    });
    // Reset form or redirect
    setCampName('');
    // ... reset other fields
    setExistingCampQuery('');
    setStep(1); // Go back to pre-check or redirect to a thank you page
  };

  const benefits = [
    "It's completely FREE to list your camp sessions.",
    "Reach thousands of engaged parents actively searching for camps.",
    "Increase your camp's visibility and fill your spots faster.",
    "User-friendly submission process.",
    "Contribute 3 approved, unique camp sessions and earn a 25% discount code for any Calendar of Camps subscription!",
  ];

  const submissionSteps = [
    { title: "Register or Log In", description: "You'll need an account to submit or manage your camp listings." },
    { title: "Quick Pre-Check", description: "Use our search to ensure your camp isn't already listed. This helps avoid duplicates." },
    { title: "Submit Camp Details", description: "Provide comprehensive information about your camp and its sessions." },
    { title: "Admin Review", description: "Our team will review your submission. You'll be notified by email about the approval status." },
  ];


  if (!isAuthenticated) {
    return (
      <div className="container py-12 md:py-16">
         <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">List Your Camp for Free!</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Reach thousands of parents and fill your camp sessions by listing on Calendar of Camps.
            </p>
        </div>
        <Card className="max-w-md mx-auto p-6 md:p-8 bg-card shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Login Required</CardTitle>
            <CardDescription>Please log in or create an account to submit or manage your camp listings.</CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/login?redirect=/submit-camp">Login or Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">List Your Camp for Free & Reach Thousands!</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Showcase your camp to engaged parents, fill your spots, and enjoy free marketing. It's easy and rewarding!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
        <Card className="bg-muted/30 p-6">
            <CardHeader className="p-0 pb-4">
                <CardTitle className="text-2xl text-primary">Why List Your Camp?</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                    </li>
                ))}
                </ul>
            </CardContent>
        </Card>
        <Card className="bg-card p-6 shadow-lg">
            <CardHeader className="p-0 pb-4">
                <CardTitle className="text-2xl text-primary">Simple Submission Process</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                 <ol className="space-y-3">
                    {submissionSteps.map((stepItem, index) => (
                        <li key={index} className="flex items-start">
                        <span className="flex items-center justify-center h-6 w-6 bg-accent text-accent-foreground rounded-full text-sm font-bold mr-3 shrink-0">{index + 1}</span>
                        <div>
                            <h4 className="font-semibold">{stepItem.title}</h4>
                            <p className="text-sm text-muted-foreground">{stepItem.description}</p>
                        </div>
                        </li>
                    ))}
                </ol>
                 <div className="mt-6 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Already an organizer or submitted camps before?</p>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/login?redirect=/dashboard/camps"> {/* Placeholder redirect */}
                            <Edit className="mr-2 h-4 w-4" /> Login to Manage Your Camps
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
      
      {step === 1 && (
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Step 1: Quick Pre-Check</CardTitle>
            <CardDescription>
              Before submitting, please search to see if the camp already exists. This helps us avoid duplicates and ensures parents find the most up-to-date information.
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
              <Button type="submit" className="w-full" size="lg">
                <Search className="mr-2 h-5 w-5" /> Search for Existing Camp
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Step 2: Submit Camp & Session Details</CardTitle>
            <CardDescription>
             Fill in the details for the camp and its session(s). Fields marked with * are required. All submissions are reviewed by an administrator before publishing. You'll be notified by email of the status. Remember, if you submit 3 unique camp sessions that get approved, you'll receive a 25% discount code for any Calendar of Camps subscription!
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
                  <Textarea id="camp-description" placeholder="A brief overview of the camp's focus and activities." required rows={4}/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <Label htmlFor="camp-website">Camp Website URL</Label>
                    <Input id="camp-website" type="url" placeholder="https://examplecamp.com" />
                  </div>
                  <div>
                    <Label htmlFor="camp-image">Camp Image/Logo</Label>
                    <Input id="camp-image" type="file" className="file:text-sm file:font-medium file:text-foreground" />
                    <p className="text-xs text-muted-foreground mt-1">Upload an image (max 2MB). Recommended: wide format (e.g., 600x400px).</p>
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
                        <Label htmlFor="before-care-available" className="font-normal">Before Care Available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="after-care-available" />
                        <Label htmlFor="after-care-available" className="font-normal">After Care Available</Label>
                    </div>
                </div>
                {/* Add button for "Add another session" for camps with multiple sessions */}
                <Button variant="outline" type="button" className="mt-6 w-full md:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Session (for this Camp)
                </Button>
                 <p className="text-xs text-muted-foreground mt-1">You can add multiple sessions under one main camp submission.</p>
              </fieldset>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
               <Button variant="outline" type="button" onClick={() => setStep(1)}>
                Back to Pre-check
              </Button>
              <Button type="submit" size="lg">
                <UploadCloud className="mr-2 h-5 w-5" /> Submit Camp for Review
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}
