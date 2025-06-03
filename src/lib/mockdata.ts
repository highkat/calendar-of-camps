export interface CampSession {
  id: string;
  name: string;
  campName: string;
  description: string;
  theme: string;
  ageRange: string; // e.g. "8-12"
  dates: string; // e.g. "June 5-9"
  cost: string; // e.g. "$300"
  imageUrl: string;
  location: string;
  dataAiHint?: string; // For placeholder image generation
}

export const mockCampSessions: CampSession[] = [
  { 
    id: '1', 
    name: 'Adventure Camp - Week 1', 
    campName: 'Camp Evergreen', 
    description: 'Fun and adventure in the great outdoors. Activities include hiking, rock climbing, and kayaking.', 
    theme: 'Adventure', 
    ageRange: '8-12', 
    dates: 'June 5-9, 2024', 
    cost: '$300', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'Willow Creek Park',
    dataAiHint: 'kids adventure'
  },
  { 
    id: '2', 
    name: 'Space Explorers', 
    campName: 'Galaxy Camp', 
    description: 'Explore the wonders of space, build rockets, and learn about astronomy.', 
    theme: 'STEM', 
    ageRange: '10-14', 
    dates: 'June 12-16, 2024', 
    cost: '$350', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'Discovery Center',
    dataAiHint: 'space exploration'
  },
  { 
    id: '3', 
    name: 'Artistic Creations', 
    campName: 'Creative Kids Camp', 
    description: 'Unleash your inner artist with painting, sculpting, and various craft projects.', 
    theme: 'Arts', 
    ageRange: '7-11', 
    dates: 'June 19-23, 2024', 
    cost: '$280', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'Community Art Studio',
    dataAiHint: 'kids art'
  },
  { 
    id: '4', 
    name: 'Robotics Challenge', 
    campName: 'Tech Titans Camp', 
    description: 'Build and program robots to compete in exciting challenges. Learn coding and engineering principles.', 
    theme: 'Tech', 
    ageRange: '12-16', 
    dates: 'June 26-30, 2024', 
    cost: '$400', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'Innovation Hub',
    dataAiHint: 'robotics kids'
  },
  { 
    id: '5', 
    name: 'Wilderness Survival Skills', 
    campName: 'Camp Evergreen', 
    description: 'Learn essential survival skills, shelter building, fire starting, and wilderness first aid.', 
    theme: 'Nature', 
    ageRange: '10-15', 
    dates: 'July 3-7, 2024', 
    cost: '$320', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'Redwood Forest Base',
    dataAiHint: 'wilderness survival'
  },
  { 
    id: '6', 
    name: 'Coding Bootcamp Jr.', 
    campName: 'Future Coders Academy', 
    description: 'An introduction to programming concepts using Scratch and Python. Create your own games and animations.', 
    theme: 'Tech', 
    ageRange: '9-13', 
    dates: 'July 10-14, 2024', 
    cost: '$375', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'Tech Park Offices',
    dataAiHint: 'kids coding'
  },
   { 
    id: '7', 
    name: 'Sports Mania Week', 
    campName: 'All-Stars Sports Camp', 
    description: 'A week full of various sports including soccer, basketball, and volleyball. Focus on teamwork and fun.', 
    theme: 'Sports', 
    ageRange: '8-14', 
    dates: 'July 17-21, 2024', 
    cost: '$290', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'City Sports Complex',
    dataAiHint: 'kids sports'
  },
  { 
    id: '8', 
    name: 'Young Chefs Academy', 
    campName: 'Culinary Kids', 
    description: 'Learn to cook delicious and healthy meals. Kitchen safety, baking, and international cuisines.', 
    theme: 'Cooking', 
    ageRange: '7-12', 
    dates: 'July 24-28, 2024', 
    cost: '$330', 
    imageUrl: 'https://placehold.co/600x400.png',
    location: 'Downtown Culinary School',
    dataAiHint: 'kids cooking'
  }
];
