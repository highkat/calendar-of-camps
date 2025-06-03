
"use client";
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from '@/components/ui/card';
import { CampCard } from '@/components/camps/CampCard';
import type { CampSession } from '@/lib/mockdata';
import { mockCampSessions } from '@/lib/mockdata'; 
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Filter, Search as SearchIcon, MapPin, Tag, Users, Calendar, DollarSign, Clock, ChevronUpIcon as ChevronUpLucide } from 'lucide-react'; // Renamed ChevronUpIcon to avoid conflict
import Link from 'next/link';
import { CAMP_THEMES, CAMP_AGE_GROUPS, CAMP_SESSION_LENGTHS } from '@/lib/constants';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { Disclosure, Transition } from '@headlessui/react'; // Assuming @headlessui/react is available or will be added

// If @headlessui/react ChevronUpIcon is preferred:
// import { ChevronUpIcon } from '@headlessui/react'; // Ensure this is correctly pathed if you use it

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [radius, setRadius] = useState('10'); // Default 10 miles
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    costMin: '',
    costMax: '',
    theme: '',
    ageGroup: '',
    gender: '', // 'any', 'boys', 'girls', 'co-ed'
    sessionLength: '',
    beforeCare: false,
    afterCare: false,
  });
  const [displayedCamps, setDisplayedCamps] = useState<CampSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isSubscribed, loading: subscriptionLoading } = useSubscription();

  // Update searchTerm if URL query parameter changes
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam !== null && queryParam !== searchTerm) {
      setSearchTerm(queryParam);
    }
  }, [searchParams, searchTerm]);

  // Simulate fetching/filtering camps
  useEffect(() => {
    setIsLoading(true);
    // In a real app, fetch from API based on searchTerm, radius, and filters
    // For now, just use mock data and simple client-side filter by name
    const filtered = mockCampSessions.filter(camp => 
      camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.theme.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply filters (simplified for mock)
    const trulyFiltered = filtered.filter(camp => {
        let passes = true;
        if (filters.theme && camp.theme !== filters.theme) passes = false;
        if (filters.ageGroup && camp.ageRange !== filters.ageGroup) passes = false; // Simplified match
        // Add more filter logic here
        return passes;
    });

    setDisplayedCamps(trulyFiltered);
    setIsLoading(false);
  }, [searchTerm, radius, filters]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Trigger useEffect by state change (searchTerm update if local input is used, or filters change)
    // If using a form submit button that *doesn't* update searchTerm state directly on input change,
    // you might need to explicitly call a search/filter function or push to router to update URL params.
    // For now, the input's onChange updates searchTerm, which triggers the effect.
  };
  
  const handleFilterChange = (filterName: keyof typeof filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };


  const campsToShow = isSubscribed ? displayedCamps : displayedCamps.slice(0, 3);
  const blurredCampsCount = isSubscribed ? 0 : Math.max(0, displayedCamps.length - 3);

  if (subscriptionLoading) {
    return <div className="container py-8 text-center">Loading subscription status...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">Find Your Perfect Camp</h1>

      <Card className="mb-8 p-6 shadow-lg">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2">
            <Label htmlFor="search-term" className="text-lg font-semibold mb-2 block">Search by Location or Keyword</Label>
            <div className="flex">
              <Input
                id="search-term"
                type="text"
                placeholder="Address, city, zip, or camp name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow text-base rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none">
                <SearchIcon className="mr-2 h-5 w-5" /> Search
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="radius-select" className="text-lg font-semibold mb-2 block">Distance Radius</Label>
            <Select value={radius} onValueChange={setRadius}>
              <SelectTrigger id="radius-select" className="text-base">
                <SelectValue placeholder="Select radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 miles</SelectItem>
                <SelectItem value="10">10 miles</SelectItem>
                <SelectItem value="25">25 miles</SelectItem>
                <SelectItem value="50">50 miles</SelectItem>
                <SelectItem value="100">100 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </Card>
      
      {/* Filters Section */}
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full flex justify-between items-center py-3 px-4 mb-4 text-left text-lg font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
              <span><Filter className="inline mr-2 h-5 w-5" />Advanced Filters</span>
              {/* Using Lucide ChevronUpIcon, ensure it's imported correctly */}
              <ChevronUpLucide className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-primary`} />
            </Disclosure.Button>
            <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel static className="mb-8 p-6 bg-card rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="theme-filter" className="font-semibold mb-1 block"><Tag className="inline mr-1 h-4 w-4"/>Theme</Label>
                    <Select value={filters.theme} onValueChange={(val) => handleFilterChange('theme', val)}>
                      <SelectTrigger id="theme-filter"><SelectValue placeholder="Any Theme" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Theme</SelectItem>
                        {CAMP_THEMES.map(theme => <SelectItem key={theme} value={theme}>{theme}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="age-filter" className="font-semibold mb-1 block"><Users className="inline mr-1 h-4 w-4"/>Age Group</Label>
                    <Select value={filters.ageGroup} onValueChange={(val) => handleFilterChange('ageGroup', val)}>
                      <SelectTrigger id="age-filter"><SelectValue placeholder="Any Age" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Age</SelectItem>
                        {CAMP_AGE_GROUPS.map(age => <SelectItem key={age} value={age}>{age}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="gender-filter" className="font-semibold mb-1 block">Gender</Label>
                    <Select value={filters.gender} onValueChange={(val) => handleFilterChange('gender', val)}>
                      <SelectTrigger id="gender-filter"><SelectValue placeholder="Any Gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Gender</SelectItem>
                        <SelectItem value="boys">Boys Only</SelectItem>
                        <SelectItem value="girls">Girls Only</SelectItem>
                        <SelectItem value="co-ed">Co-ed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="session-length-filter" className="font-semibold mb-1 block"><Clock className="inline mr-1 h-4 w-4"/>Session Length</Label>
                    <Select value={filters.sessionLength} onValueChange={(val) => handleFilterChange('sessionLength', val)}>
                      <SelectTrigger id="session-length-filter"><SelectValue placeholder="Any Length" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Length</SelectItem>
                        {CAMP_SESSION_LENGTHS.map(len => <SelectItem key={len} value={len}>{len}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <Label htmlFor="start-date" className="font-semibold mb-1 block"><Calendar className="inline mr-1 h-4 w-4"/>Start Date</Label>
                          <Input type="date" id="start-date" value={filters.startDate} onChange={e => handleFilterChange('startDate', e.target.value)} />
                      </div>
                      <div>
                          <Label htmlFor="end-date" className="font-semibold mb-1 block"><Calendar className="inline mr-1 h-4 w-4"/>End Date</Label>
                          <Input type="date" id="end-date" value={filters.endDate} onChange={e => handleFilterChange('endDate', e.target.value)} />
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <Label htmlFor="cost-min" className="font-semibold mb-1 block"><DollarSign className="inline mr-1 h-4 w-4"/>Min Cost</Label>
                          <Input type="number" id="cost-min" placeholder="e.g. 100" value={filters.costMin} onChange={e => handleFilterChange('costMin', e.target.value)} />
                      </div>
                      <div>
                          <Label htmlFor="cost-max" className="font-semibold mb-1 block"><DollarSign className="inline mr-1 h-4 w-4"/>Max Cost</Label>
                          <Input type="number" id="cost-max" placeholder="e.g. 500" value={filters.costMax} onChange={e => handleFilterChange('costMax', e.target.value)} />
                      </div>
                  </div>
                  <div className="flex flex-col space-y-2 pt-6">
                      <div className="flex items-center space-x-2">
                          <Checkbox id="before-care" checked={filters.beforeCare as boolean} onCheckedChange={(checked) => handleFilterChange('beforeCare', !!checked)} />
                          <Label htmlFor="before-care">Before Care Available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                          <Checkbox id="after-care" checked={filters.afterCare as boolean} onCheckedChange={(checked) => handleFilterChange('afterCare', !!checked)} />
                          <Label htmlFor="after-care">After Care Available</Label>
                      </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>


      {isLoading ? (
        <div className="text-center py-10">Loading camps...</div>
      ) : (
        <>
          {displayedCamps.length === 0 && !isLoading && (
             <Card className="my-8 text-center p-8 bg-muted/50">
                <CardContent>
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">No Camps Found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters.</p>
                    <Button variant="outline" onClick={() => { setSearchTerm(''); setFilters({startDate: '', endDate: '', costMin: '', costMax: '', theme: '', ageGroup: '', gender: '', sessionLength: '', beforeCare: false, afterCare: false,}); }}>Clear Search & Filters</Button>
                </CardContent>
            </Card>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campsToShow.map((camp) => (
              <CampCard key={camp.id} camp={camp} />
            ))}
          </div>

          {blurredCampsCount > 0 && (
            <Card className="mt-8 text-center p-8 bg-gradient-to-b from-background to-transparent relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background to-transparent backdrop-blur-sm z-10"></div>
              <div className="relative z-20">
                <h3 className="text-2xl font-semibold mb-2 text-primary">Want to see {blurredCampsCount} more camps?</h3>
                <p className="text-muted-foreground mb-4">
                  Subscribe to Calendar of Camps to unlock all search results, detailed camp information, and more exclusive features!
                </p>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/why-subscribe">Unlock All Results</Link>
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

