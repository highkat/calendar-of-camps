
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
import { UploadCloud, PlusCircle, Search, CheckCircle, Edit, Users, LogIn, Mail, Key } from 'lucide-react';
import Link from 'next/link';
import { useAuth, type User } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface SelectedAgeGroups {
  [key: string]: boolean;
}

export default function SubmitCampPage() {
  const { toast } = useToast();
  const { isAuthenticated, user, loading: authLoading, login } = useAuth();
  const router = useRouter();

  // State for camp submission form
  const [step, setStep] = useState(1);
  const [existingCampQuery, setExistingCampQuery] = useState('');
  const [campName, setCampName] = useState('');
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<SelectedAgeGroups>(
    CAMP_AGE_GROUPS.reduce((acc, ageGroup) => {
      acc[ageGroup] = false;
      return acc;
    }, {} as SelectedAgeGroups)
  );

  // State for embedded login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRememberMe, setLoginRememberMe] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);


  const handleAgeGroupChange = (ageGroup: string) => {
    setSelectedAgeGroups(prev => ({
      ...prev,
      [ageGroup]: !prev[ageGroup]
    }));
  };

  const handlePreCheck = (e: FormEvent) => {
    e.preventDefault();
    console.log("Searching for camp:", existingCampQuery);
    setStep(2);
    toast({ title: "Pre-check complete", description: "No similar camp found. Please proceed with submission." });
  };

  const handleCampSubmit = (e: FormEvent) => {
    e.preventDefault();
    const chosenAgeGroups = Object.entries(selectedAgeGroups)
      .filter(([,isSelected]) => isSelected)
      .map(([ageGroup]) => ageGroup);

    console.log('Submitting camp:', { campName, selectedAgeGroups: chosenAgeGroups });
    toast({
      title: "Submission Received!",
      description: "Your camp information has been submitted for review. We'll notify you by email once it's approved or if any changes are needed. Thank you for contributing!",
      duration: 7000,
    });
    setCampName('');
    setSelectedAgeGroups(CAMP_AGE_GROUPS.reduce((acc, ageGroup) => {
      acc[ageGroup] = false;
      return acc;
    }, {} as SelectedAgeGroups));
    setExistingCampQuery('');
    setStep(1); 
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    let mockUser: User | null = null;
    if (loginEmail === 'parent@example.com' && loginPassword === 'password') {
      mockUser = { id: 'user1', email: 'parent@example.com', name: 'Busy Parent', roles: ['parent'] };
    } else if (loginEmail === 'contributor@example.com' && loginPassword === 'password') {
      mockUser = { id: 'user2', email: 'contributor@example.com', name: 'Camp Organizer', roles: ['contributor'] };
    } else if (loginEmail === 'admin@example.com' && loginPassword === 'password') {
      mockUser = { id: 'user3', email: 'admin@example.com', name: 'Site Admin', roles: ['admin', 'parent'] };
    } else if (loginEmail === 'premium@example.com' && loginPassword === 'password') {
       mockUser = { id: 'user4', email: 'premium@example.com', name: 'Premium User', roles: ['parent'] };
    }

    if (mockUser) {
      login(mockUser); // This updates AuthContext, triggering re-render
      toast({ title: "Login Successful", description: `Welcome back, ${mockUser.name}!` });
      if (loginRememberMe) console.log("Remember me was checked for embedded login");
      // No explicit redirect needed, AuthContext change will show the submission form
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
    }
    setIsLoginLoading(false);
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

  if (authLoading) {
    return (
      <div className="container py-12 md:py-16 text-center">
        <p className="text-lg text-muted-foreground">Loading submission portal...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-12 md:py-16">
         <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Help Families Discover Great Camps</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether you’re a camp organizer or a parent in the know, adding a camp to Calendar of Camps helps others find trusted, local options for their kids. Small, community-based camps often fly under the radar—your submission helps surface the hidden gems that families might otherwise miss. Not only are listings are FREE and easy to add, you unlock discounts for adding new camps. Together we’re building a resource that makes summer planning simpler for everyone.
            </p>
        </div>
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-10 w-10 text-primary mb-3" />
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
          </CardHeader>
          <form onSubmit={handleLoginSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox id="login-remember-me" checked={loginRememberMe} onCheckedChange={(checked) => setLoginRememberMe(!!checked)} />
                  <Label htmlFor="login-remember-me" className="text-sm font-normal text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" passHref>
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs">Forgot password?</Button>
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button type="submit" className="w-full" disabled={isLoginLoading}>
                {isLoginLoading ? 'Logging in...' : 'Log In'}
              </Button>
              <div className="relative w-full my-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or sign in with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                <Button variant="outline" className="w-full" onClick={() => toast({title: "Social Login", description: "Google login clicked (not implemented)."})}>
                  Google
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({title: "Social Login", description: "Facebook login clicked (not implemented)."})}>
                  Facebook
                </Button>
              </div>
              <p className="mt-2 text-sm text-center text-muted-foreground">
                New user?{' '}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign up for an account
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }


  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Help Families Discover Great Camps</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Whether you’re a camp organizer or a parent in the know, adding a camp to Calendar of Camps helps others find trusted, local options for their kids. Small, community-based camps often fly under the radar—your submission helps surface the hidden gems that families might otherwise miss. Not only are listings are FREE and easy to add, you unlock discounts for adding new camps.  ogether we’re building a resource that makes summer planning simpler for everyone.
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
          <form onSubmit={handleCampSubmit}>
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
                
                <div className="mt-4">
                  <Label className="font-semibold text-primary flex items-center"><Users className="mr-2 h-5 w-5"/>Age Range* (Select all that apply)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 p-3 border rounded-md bg-muted/20">
                    {CAMP_AGE_GROUPS.map((ageGroup) => (
                      <div key={ageGroup} className="flex items-center space-x-2">
                        <Checkbox
                          id={`age-${ageGroup}`}
                          checked={selectedAgeGroups[ageGroup]}
                          onCheckedChange={() => handleAgeGroupChange(ageGroup)}
                        />
                        <Label htmlFor={`age-${ageGroup}`} className="font-normal text-sm">{ageGroup}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
                   <div>
                    <Label htmlFor="session-length">Session Length*</Label>
                     <Select required>
                        <SelectTrigger id="session-length"><SelectValue placeholder="Select length" /></SelectTrigger>
                        <SelectContent>
                            {CAMP_SESSION_LENGTHS.map(len => <SelectItem key={len} value={len}>{len}</SelectItem>)}
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
                        <Label htmlFor="session-location">Location Address*</Label>
                        <Input id="session-location" placeholder="123 Main St, Anytown, USA" required/>
                    </div>
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
