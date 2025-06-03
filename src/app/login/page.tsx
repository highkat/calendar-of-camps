"use client";
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LogIn, Mail, Key } from 'lucide-react';
import { useAuth, type User } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user data - in a real app, this comes from your auth backend
    let mockUser: User | null = null;
    if (email === 'parent@example.com' && password === 'password') {
      mockUser = { id: 'user1', email: 'parent@example.com', name: 'Busy Parent', roles: ['parent'] };
    } else if (email === 'contributor@example.com' && password === 'password') {
      mockUser = { id: 'user2', email: 'contributor@example.com', name: 'Camp Organizer', roles: ['contributor'] };
    } else if (email === 'admin@example.com' && password === 'password') {
      mockUser = { id: 'user3', email: 'admin@example.com', name: 'Site Admin', roles: ['admin', 'parent'] };
    } else if (email === 'premium@example.com' && password === 'password') {
       mockUser = { id: 'user4', email: 'premium@example.com', name: 'Premium User', roles: ['parent'] };
    }


    if (mockUser) {
      login(mockUser);
      toast({ title: "Login Successful", description: `Welcome back, ${mockUser.name}!` });
      router.push('/profile'); // Redirect to profile or dashboard
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Log in to your Calendar of Camps account to continue.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" passHref>
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs">Forgot password?</Button>
                </Link>
              </div>
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
