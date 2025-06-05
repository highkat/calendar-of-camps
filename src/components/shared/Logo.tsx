import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const LogoSvg = () => (
  <svg viewBox="0 0 230 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-9 w-auto">
    {/* Calendar Icon background - Changed to Pink */}
    <rect x="4" y="8" width="42" height="38" rx="3.8" fill="#B4447A"/>
    {/* Calendar Rings - Changed to Pink */}
    <rect x="10" y="4" width="5.7" height="7.6" rx="1.9" fill="#B4447A"/>
    <rect x="29.3" y="4" width="5.7" height="7.6" rx="1.9" fill="#B4447A"/>
    {/* Sun shape (semicircle on a base) - Remains Yellow */}
    <path d="M14.25 37.05V33.25C14.25 28.5312 18.0312 24.75 22.75 24.75C27.4688 24.75 31.25 28.5312 31.25 33.25V37.05H14.25Z" fill="#FDDA4E"/>
    {/* Sun Rays - Remains Yellow */}
    <line x1="22.75" y1="22.75" x2="22.75" y2="19" stroke="#FDDA4E" strokeWidth="1.9" strokeLinecap="round"/> {/* Top */}
    <line x1="16.3877" y1="25.0376" x2="14.3379" y2="23.0991" stroke="#FDDA4E" strokeWidth="1.9" strokeLinecap="round"/> {/* Top-left */}
    <line x1="29.1123" y1="25.0376" x2="31.1621" y2="23.0991" stroke="#FDDA4E" strokeWidth="1.9" strokeLinecap="round"/> {/* Top-right */}
    <line x1="13.3" y1="30.35" x2="9.5" y2="30.35" stroke="#FDDA4E" strokeWidth="1.9" strokeLinecap="round"/> {/* Left */}
    <line x1="32.2" y1="30.35" x2="36" y2="30.35" stroke="#FDDA4E" strokeWidth="1.9" strokeLinecap="round"/> {/* Right */}

    {/* Text: "Calendar of Camps" - Changed to Teal */}
    <text x="55" y="27" fontFamily="Montserrat, Arial, sans-serif" fontSize="19" fontWeight="bold" fill="#528982">Calendar</text>
    <text x="55" y="47" fontFamily="Montserrat, Arial, sans-serif" fontSize="19" fontWeight="bold" fill="#528982">of Camps</text>
  </svg>
);

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className || ''}`}>
      <LogoSvg />
    </Link>
  );
}
