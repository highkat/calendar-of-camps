import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { FOOTER_LINKS, APP_NAME } from '@/lib/constants';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Camp planning, solved.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold font-headline text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                 <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold font-headline text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/why-subscribe" className="text-muted-foreground hover:text-primary transition-colors">
                  Why Subscribe?
                </Link>
              </li>
              <li>
                <Link href="/submit-camp" className="text-muted-foreground hover:text-primary transition-colors">
                  Submit a Camp
                </Link>
              </li>
               <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold font-headline text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Stay updated with the latest camp news and offers.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1 min-w-0" />
              <Button type="submit" size="icon" aria-label="Subscribe to newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
