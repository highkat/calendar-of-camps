import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { CampSession } from '@/lib/mockdata';
import { MapPin, CalendarDays, Users, DollarSign, ArrowRight } from 'lucide-react';

interface CampCardProps {
  camp: CampSession;
  className?: string;
}

export function CampCard({ camp, className }: CampCardProps) {
  return (
    <Card className={`flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}>
      <div className="relative h-48 w-full">
        <Image
          src={camp.imageUrl}
          alt={camp.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={camp.dataAiHint || "camp activity"}
        />
        <Badge variant="secondary" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground">
          {camp.theme}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
          <Link href={`/camps/${camp.campName.toLowerCase().replace(/\s+/g, '-')}/sessions/${camp.id}`}>
            {camp.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{camp.campName}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2 text-sm flex-grow">
        <p className="text-muted-foreground line-clamp-2">{camp.description}</p>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 shrink-0" />
          <span>{camp.location}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <CalendarDays className="h-4 w-4 mr-2 shrink-0" />
          <span>{camp.dates}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
            <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2 shrink-0" />
            <span>Ages: {camp.ageRange}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 shrink-0" />
            <span>{camp.cost}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/camps/${camp.campName.toLowerCase().replace(/\s+/g, '-')}/sessions/${camp.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
