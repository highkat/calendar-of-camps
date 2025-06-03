"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Shield, CalendarDays, Bell, Edit3, LogOut, Smile, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading, logout: authLogout } = useAuth();
  const { isSubscribed, subscriptionTier, loading: subLoading } = useSubscription();
  const router = useRouter();

  if (authLoading || subLoading) {
    return <div className="container py-12 text-center">Loading profile...</div>;
  }

  if (!isAuthenticated || !user) {
    // This should ideally be handled by middleware or a layout check
    router.push('/login');
    return null; 
  }
  
  const handleLogout = () => {
    authLogout();
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader className="bg-muted/30 p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage src={user.avatarUrl || `https://placehold.co/100x100.png?text=${getInitials(user.name)}`} alt={user.name} data-ai-hint="profile avatar" />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold text-primary">{user.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground flex items-center mt-1">
                <Mail className="h-5 w-5 mr-2" /> {user.email}
              </CardDescription>
              <Badge variant={isSubscribed ? "default" : "secondary"} className={`mt-2 ${isSubscribed ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-400 hover:bg-orange-500'} text-white`}>
                {isSubscribed ? `Premium: ${subscriptionTier.replace('premium_', '')}` : 'Freemium User'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary border-b pb-2">Account Management</h3>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/profile/edit">
                <Edit3 className="mr-3 h-5 w-5 text-accent" /> Edit Profile Information
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/profile/settings">
                <Settings className="mr-3 h-5 w-5 text-accent" /> Account Settings & Preferences
              </Link>
            </Button>
             {!isSubscribed && (
              <Button variant="default" className="w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/why-subscribe">
                  <Shield className="mr-3 h-5 w-5" /> Upgrade to Premium
                </Link>
              </Button>
            )}
             {isSubscribed && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/profile/subscription">
                  <Shield className="mr-3 h-5 w-5 text-accent" /> Manage Subscription
                </Link>
              </Button>
            )}
          </div>
          <div className="space-y-6">
             <h3 className="text-xl font-semibold text-primary border-b pb-2">Family & Camps</h3>
             <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/profile/children">
                <Smile className="mr-3 h-5 w-5 text-accent" /> Manage Child Profiles ({/* TODO: Add child count */ 0})
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/profile/calendar">
                <CalendarDays className="mr-3 h-5 w-5 text-accent" /> View Family Calendar
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/profile/reminders">
                <Bell className="mr-3 h-5 w-5 text-accent" /> Manage Registration Reminders
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-8 border-t flex justify-end">
            <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Add a mock user.avatarUrl to User interface in AuthContext if you want to use actual images
// For now, it's optional.
declare module '@/contexts/AuthContext' {
  interface User {
    avatarUrl?: string;
  }
}

// Temporary Badge component definition if not available or customized
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// End temporary Badge component
