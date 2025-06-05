
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, UserCircle, LogOut, LogIn, UserPlus } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout: authLogout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    authLogout();
    router.push('/');
  };

  const commonLinkClasses = "text-sm font-medium transition-colors hover:text-primary";
  const mobileLinkClasses = "block py-2 text-lg hover:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={`${commonLinkClasses} flex items-center`}>
              {link.label}
              {link.label === "Submit a Camp" && (
                <Badge variant="secondary" className="ml-1.5 text-xs bg-accent text-accent-foreground hover:bg-accent/90">
                  Free
                </Badge>
              )}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
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
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
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
                <nav className="flex flex-col space-y-4 mb-auto">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link href={link.href} className={`${mobileLinkClasses} flex items-center`}>
                        {link.label}
                        {link.label === "Submit a Camp" && (
                           <Badge variant="secondary" className="ml-1.5 text-xs bg-accent text-accent-foreground hover:bg-accent/90">
                            Free
                          </Badge>
                        )}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-6 border-t pt-6">
                  {isAuthenticated ? (
                     <>
                      <SheetClose asChild>
                        <Link href="/profile" className={`${mobileLinkClasses} flex items-center mb-4`}>
                          <UserCircle className="mr-2 h-5 w-5" />
                          {user?.name || 'Profile'}
                        </Link>
                      </SheetClose>
                      <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                       <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start text-lg py-2" asChild>
                            <Link href="/login">
                            <LogIn className="mr-2 h-5 w-5" />
                            Login
                            </Link>
                        </Button>
                       </SheetClose>
                       <SheetClose asChild>
                        <Button className="w-full justify-start text-lg py-2" asChild>
                            <Link href="/signup">
                            <UserPlus className="mr-2 h-5 w-5" />
                            Sign Up
                            </Link>
                        </Button>
                       </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
