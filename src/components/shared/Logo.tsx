import Link from 'next/link';
import { Mountain } from 'lucide-react'; // Placeholder icon
import { APP_NAME } from '@/lib/constants';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold font-headline text-primary ${className}`}>
      <Mountain className="h-6 w-6" />
      <span>{APP_NAME}</span>
    </Link>
  );
}
