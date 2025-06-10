
"use client";
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserPlus, Mail, Key, User as UserIcon } from 'lucide-react';
import { useAuth, type User, type UserRole } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from '@/components/ui/checkbox';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Honeypot state
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const planQueryParam = searchParams.get('plan');

  const getPlanDescription = (planCode: string | null) => {
    if (planCode === 'premium_1y') {
      return 'You are signing up for the Annual Plan ($50/year).';
    }
    if (planCode === 'premium_2y') {
      return 'You are signing up for the 2-Year Plan ($90, save $10).';
    }
    return null;
  };
  const planDescription = getPlanDescription(planQueryParam);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      console.log("Honeypot triggered on signup form. Potential bot.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({ title: "Signup Failed", description: "Passwords do not match.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    if (!agreedToTerms) {
      toast({ title: "Signup Failed", description: "You must agree to the terms and conditions.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Simulate API call for signup
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = { 
      id: `user_${Date.now()}`, 
      email, 
      name, 
      roles: ['parent'] as UserRole[]
    };
    
    login(mockUser); 
    toast({ title: "Signup Successful!", description: `Welcome to Calendar of Camps, ${name}!` });

    if (planQueryParam) {
      router.push(`/checkout?plan=${planQueryParam}`); 
    } else {
      router.push('/profile'); 
    }
    
    // Reset honeypot along with other fields if needed, though not strictly necessary if redirecting
    // setHoneypot('');
    setIsLoading(false);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join Calendar of Camps and start planning your perfect summer!</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Honeypot Field */}
            <div className="absolute left-[-5000px]" aria-hidden="true">
              <Label htmlFor="hp_user_preferences">Your preferences (for bots only)</Label>
              <Input
                id="hp_user_preferences"
                type="text"
                name="hp_user_preferences"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
               <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(!!checked)} />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            {planDescription && (
              <p className="text-sm text-center text-muted-foreground">
                {planDescription}
              </p>
            )}
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
