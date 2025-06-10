
"use client";
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { LogIn, Mail, Key } from 'lucide-react';
import { useAuth, type User } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Honeypot state
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      console.log("Honeypot triggered on login form. Potential bot.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

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
      if (rememberMe) {
        console.log("Remember me was checked");
      }
      router.push('/profile'); 
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
    }
    // setHoneypot(''); // Reset honeypot
    setIsLoading(false);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-10 w-10 text-primary mb-3" />
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Honeypot Field */}
            <div className="absolute left-[-5000px]" aria-hidden="true">
              <Label htmlFor="hp_session_info">Your session info (for bots only)</Label>
              <Input
                id="hp_session_info"
                type="text"
                name="hp_session_info"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
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
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                <Label htmlFor="remember-me" className="text-sm font-normal text-muted-foreground">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" passHref>
                <Button variant="link" size="sm" className="p-0 h-auto text-xs">Forgot password?</Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
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
