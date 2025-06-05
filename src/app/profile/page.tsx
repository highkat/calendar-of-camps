
"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Shield, CalendarDays, Bell, Edit3, LogOut, Smile, Users, Settings, PlusCircle, Edit as EditIcon, Inbox, FileEdit, CheckCircle, XCircle, ShieldAlert, Gift } from 'lucide-react'; // Added EditIcon alias, Inbox and other notification icons
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // Import useState

// Temporary Badge component definition (if not already globally available or correctly imported)
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

// Notification structure
interface Notification {
  id: string;
  type: 'update' | 'approval' | 'rejection' | 'security' | 'promotion' | 'general';
  title: string;
  message: string;
  timestamp: string; // e.g., "2 hours ago", "Yesterday"
  read: boolean;
  link?: string;
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Camp Submission Approved!',
    message: 'Your submission for "Adventure Camp - Week 2" has been approved and is now live.',
    timestamp: '15 mins ago',
    read: false,
    link: '/camps/adventure-camp/sessions/some-id', // Example link
  },
  {
    id: '2',
    type: 'update',
    title: 'Camp Wildwood Updated',
    message: 'The dates for "Forest Explorers Weekly" have been updated by the organizer.',
    timestamp: '1 hour ago',
    read: false,
    link: '/camps/camp-wildwood/sessions/1',
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Summer Subscription Sale!',
    message: 'Get 20% off our Annual Premium plan for a limited time. Upgrade now!',
    timestamp: '3 hours ago',
    read: true,
    link: '/why-subscribe',
  },
  {
    id: '4',
    type: 'security',
    title: 'Security Alert: Password Reset Recommended',
    message: 'We detected unusual activity. For your security, consider resetting your password.',
    timestamp: 'Yesterday',
    read: false,
    link: '/profile/settings', // Link to password change area
  },
  {
    id: '5',
    type: 'rejection',
    title: 'Camp Submission Update',
    message: 'Your recent edit for "TechSpark Academy" requires a few more details before approval. Please review.',
    timestamp: '2 days ago',
    read: true,
    link: '/submit-camp/edit/some-id', // Example link to edit form
  },
];


export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading, logout: authLogout } = useAuth();
  const { isSubscribed, subscriptionTier, loading: subLoading } = useSubscription();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !user)) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || subLoading || (!isAuthenticated || !user && !authLoading)) {
    return <div className="container py-12 text-center">Loading profile...</div>;
  }
  
  const handleLogout = () => {
    authLogout();
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'update': return <FileEdit className="h-5 w-5 mr-3 mt-1 text-blue-500" />;
      case 'approval': return <CheckCircle className="h-5 w-5 mr-3 mt-1 text-green-500" />;
      case 'rejection': return <XCircle className="h-5 w-5 mr-3 mt-1 text-red-500" />;
      case 'security': return <ShieldAlert className="h-5 w-5 mr-3 mt-1 text-yellow-500" />;
      case 'promotion': return <Gift className="h-5 w-5 mr-3 mt-1 text-pink-500" />;
      default: return <Bell className="h-5 w-5 mr-3 mt-1 text-gray-500" />;
    }
  };

  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto shadow-xl mb-8">
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
            <Button variant="default" className="w-full justify-start" asChild>
              <Link href="/submit-camp">
                <PlusCircle className="mr-3 h-5 w-5" /> Submit a New Camp
              </Link>
            </Button>
            {user.roles.includes('contributor') && (
              <Button variant="secondary" className="w-full justify-start" asChild>
                <Link href="/profile/my-camps"> 
                  <EditIcon className="mr-3 h-5 w-5" /> Manage My Camp Listings
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-8 border-t flex justify-end">
            <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
        </CardFooter>
      </Card>

      {/* Notifications Section */}
      <Card className="max-w-4xl mx-auto shadow-xl mt-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Inbox className="mr-3 h-6 w-6 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>Recent updates and important messages for you.</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No new notifications.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => {
                const content = (
                  <div className="flex items-start p-3 hover:bg-muted/10 rounded-md transition-colors border border-transparent hover:border-border cursor-pointer">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">{notification.timestamp}</p>
                    </div>
                    {!notification.read && (
                      <Badge variant="default" className="ml-auto self-start text-xs scale-90 bg-accent text-accent-foreground">New</Badge>
                    )}
                  </div>
                );
                return notification.link ? (
                  <Link href={notification.link} key={notification.id} className="block">
                    {content}
                  </Link>
                ) : (
                  <div key={notification.id}>{content}</div>
                );
              })}
            </div>
          )}
          {notifications.length > 0 && (
             <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm">Mark all as read</Button>
                {/* <Button variant="link" size="sm">View all notifications</Button> */}
             </div>
          )}
        </CardContent>
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
