
"use client";

import Link from 'next/link';
import React, { useState } from 'react'; // Added React for FormEvent
import { Menu, X, UserCircle, LogOut, LogIn, Search } from 'lucide-react'; // Removed UserPlus
import Logo from '@/components/shared/Logo';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout: authLogout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    authLogout();
    router.push('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input after submission
    } else {
      router.push('/search'); // Navigate to search page even if query is empty
    }
    if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu on search
  };

  const commonLinkClasses = "text-sm font-medium transition-colors hover:text-primary flex items-center";
  const mobileLinkClasses = "block py-2 text-lg hover:text-primary flex items-center";

  const renderAuthButtons = () => {
    if (authLoading) {
      return (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          {/* Sign Up button removed */}
        </>
      );
    }

    if (isAuthenticated) {
      return (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile">
              <UserCircle className="mr-2 h-4 w-4" />
              {user?.name || 'Profile'}
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        </Button>
        {/* Sign Up button removed */}
      </>
    );
  };
  
  const renderMobileAuthButtons = () => {
    if (authLoading) {
      return (
        <div className="space-y-2">
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-lg py-2" asChild>
                <Link href="/login">
                <LogIn className="mr-2 h-5 w-5" />
                Login
                </Link>
            </Button>
          </SheetClose>
          {/* Sign Up button removed */}
        </div>
      );
    }
    if (isAuthenticated) {
       return (
         <>
          <SheetClose asChild>
            <Link href="/profile" className={`${mobileLinkClasses} mb-4`}>
              <UserCircle className="mr-2 h-5 w-5" />
              {user?.name || 'Profile'}
            </Link>
          </SheetClose>
          <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
       );
    }
    return (
      <div className="space-y-2">
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-lg py-2" asChild>
                <Link href="/login">
                <LogIn className="mr-2 h-5 w-5" />
                Login
                </Link>
            </Button>
          </SheetClose>
          {/* Sign Up button removed */}
        </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-4 ml-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={`${commonLinkClasses}`}>
               {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex flex-grow items-center justify-end space-x-2">
          {authLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-9 w-20 rounded-md bg-muted animate-pulse"></div>
              {/* Skeleton for Sign Up button removed */}
            </div>
          ) : (
            <>
            <form onSubmit={handleSearchSubmit} className="flex items-center max-w-xs mr-4">
                <Input
                type="search"
                placeholder="Search camps..."
                className="h-9 text-sm rounded-r-none focus-visible:ring-offset-0 focus-visible:ring-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search camps"
                />
                <Button type="submit" size="icon" variant="ghost" className="h-9 w-9 rounded-l-none border border-l-0 border-input hover:bg-accent">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
                </Button>
            </form>
            {renderAuthButtons()}
            </>
          )}
        </div>

        <div className="md:hidden flex-grow flex justify-end">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex items-center mb-6">
                    <Input
                    type="search"
                    placeholder="Search camps..."
                    className="h-10 text-sm rounded-r-none focus-visible:ring-offset-0 focus-visible:ring-1 flex-grow"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search camps"
                    />
                    <Button type="submit" size="icon" variant="ghost" className="h-10 w-10 rounded-l-none border border-l-0 border-input hover:bg-accent">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                    </Button>
                </form>

                <nav className="flex flex-col space-y-4 mb-auto">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link href={link.href} className={`${mobileLinkClasses}`}>
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-6 border-t pt-6">
                  {renderMobileAuthButtons()}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
