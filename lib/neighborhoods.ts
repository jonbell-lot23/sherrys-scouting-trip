export interface Neighborhood {
  name: string;
  slug: string;
  icon: string; // emoji graphic
  photo: string; // Unsplash photo URL
  photoCredit: string; // photographer name
  vibe: string;
  peopleWatching: number; // 1-5
  bestSpots: string[];
  feelsLike: { city: string; why: string }[];
  iotAngle: string;
  mapQuery: string; // Google Maps search query
}

export const neighborhoods: Neighborhood[] = [
  {
    name: "Surry Hills",
    slug: "surry-hills",
    icon: "☕",
    photo: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "Creative professionals, specialty coffee, converted warehouses. The inner-city neighborhood where designers and tech workers collide over flat whites.",
    peopleWatching: 5,
    bestSpots: ["Bourke Street cafes", "Crown Street shops", "Shannon Reserve park benches"],
    feelsLike: [
      { city: "Ponsonby, Auckland", why: "Same brunch-and-boutique energy, creative crowd" },
      { city: "Cuba Street, Wellington", why: "Eclectic, walkable, independent shops" },
      { city: "Shenzhen OCT Loft", why: "Design-forward creative district, galleries + cafes" },
    ],
    iotAngle: "High early-adopter density. Smart home showrooms, co-working spaces with integrated tech. Good for gauging premium IoT appetite.",
    mapQuery: "Surry Hills, Sydney NSW",
  },
  {
    name: "Ultimo",
    slug: "ultimo",
    icon: "🏮",
    photo: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "UTS campus energy, Chinatown-adjacent, broadcasting hub. Functional but with hidden gems. Where Sydney's Chinese and tech communities overlap.",
    peopleWatching: 4,
    bestSpots: ["UTS campus architecture", "Chinatown (Dixon Street)", "Powerhouse Museum area"],
    feelsLike: [
      { city: "CBD fringe, Auckland", why: "University, mixed-use, practical not pretty" },
      { city: "Victoria University area, Wellington", why: "Student energy, functional, transit-connected" },
      { city: "Guangzhou Tianhe", why: "Tech hub, Chinese community, commercial energy" },
    ],
    iotAngle: "Gateway to Chinese-Australian business networks. Chinatown connections, UTS partnerships, tech meetups. Best for networking, not retail.",
    mapQuery: "Ultimo, Sydney NSW",
  },
  {
    name: "Newtown",
    slug: "newtown",
    icon: "🎸",
    photo: "https://images.unsplash.com/photo-1546268060-2592ff93ee24?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "Multicultural, bohemian, loud. Thai restaurants next to vintage shops next to activist bookstores. Sydney's most diverse strip.",
    peopleWatching: 5,
    bestSpots: ["King Street (whole length)", "Camperdown Memorial Rest Park", "Newtown Hotel courtyard"],
    feelsLike: [
      { city: "K' Road, Auckland", why: "Gritty, diverse, unapologetically itself" },
      { city: "Courtenay Place, Wellington", why: "Late-night food, eclectic crowd, live music" },
      { city: "Hangzhou Xiaohe Direct Street", why: "Old-meets-new, artsy, food-driven community" },
    ],
    iotAngle: "Price-sensitive but tech-curious. Student and young professional market. Budget smart home products would resonate.",
    mapQuery: "Newtown, Sydney NSW",
  },
  {
    name: "Darlinghurst",
    slug: "darlinghurst",
    icon: "🍸",
    photo: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "Cocktail bars, LGBTQ+ history, upscale dining. Oxford Street energy with a sophisticated edge. Night owl territory.",
    peopleWatching: 4,
    bestSpots: ["Oxford Street strip", "Victoria Street wine bars", "Green Park"],
    feelsLike: [
      { city: "Britomart, Auckland", why: "Polished nightlife, upscale dining scene" },
      { city: "Courtney Quarter, Wellington", why: "Bar-hopping culture, creative nightlife" },
      { city: "Shanghai French Concession", why: "Historic architecture, cocktail culture, expat-friendly" },
    ],
    iotAngle: "Hospitality-focused IoT opportunities. Smart lighting, ambiance tech, restaurant automation. High-end consumers who'll pay for quality.",
    mapQuery: "Darlinghurst, Sydney NSW",
  },
  {
    name: "Chippendale",
    slug: "chippendale",
    icon: "🎨",
    photo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "University-adjacent arts precinct. Street art, galleries, and the famous Central Park vertical gardens. Feels like it's still becoming something.",
    peopleWatching: 4,
    bestSpots: ["Kensington Street", "White Rabbit Gallery area", "Central Park mall rooftop"],
    feelsLike: [
      { city: "Wynyard Quarter, Auckland", why: "Redeveloped, modern, still finding its identity" },
      { city: "Te Aro, Wellington", why: "University-adjacent, artsy, emerging" },
      { city: "Shenzhen Nanshan", why: "Tech-meets-university, startup energy, new buildings" },
    ],
    iotAngle: "Smart building showcase (Central Park is literally a green-tech marvel). University research connections. Good for B2B IoT partnerships.",
    mapQuery: "Chippendale, Sydney NSW",
  },
  {
    name: "Glebe",
    slug: "glebe",
    icon: "🌿",
    photo: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "Bookish, leafy, Saturday markets. Heritage homes and students from Sydney Uni. Slower pace, intellectual vibe.",
    peopleWatching: 3,
    bestSpots: ["Glebe Point Road cafes", "Glebe Markets (Saturday)", "Blackwattle Bay foreshore"],
    feelsLike: [
      { city: "Grey Lynn, Auckland", why: "Leafy, liberal, family-friendly with character" },
      { city: "Kelburn, Wellington", why: "University village feel, heritage homes, bookish" },
      { city: "Hangzhou Wulin", why: "Educated, green, community-minded residential" },
    ],
    iotAngle: "Sustainability-conscious consumers. Energy monitoring, garden automation, eco-smart products would sell here.",
    mapQuery: "Glebe, Sydney NSW",
  },
  {
    name: "Pyrmont",
    slug: "pyrmont",
    icon: "🚢",
    photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "Harbourside living, fish markets, converted wharves. Mix of families, young professionals, and tourists near Darling Harbour.",
    peopleWatching: 3,
    bestSpots: ["Sydney Fish Market", "Pirrama Park waterfront", "Jones Bay Wharf"],
    feelsLike: [
      { city: "Viaduct Harbour, Auckland", why: "Waterfront dining, apartment living, touristy edges" },
      { city: "Oriental Bay, Wellington", why: "Harbour views, walking paths, upscale residential" },
      { city: "Shanghai Pudong riverside", why: "Modern waterfront, high-rises, family-oriented" },
    ],
    iotAngle: "Apartment-dweller market. Compact smart home solutions, rental-friendly devices, no-drill installations. High density = word of mouth.",
    mapQuery: "Pyrmont, Sydney NSW",
  },
  {
    name: "Barangaroo",
    slug: "barangaroo",
    icon: "🏙️",
    photo: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=600&h=300&fit=crop",
    photoCredit: "Unsplash",
    vibe: "Brand new waterfront precinct. Corporate towers, luxury dining, harbour walks. Sydney's vision of its future self.",
    peopleWatching: 3,
    bestSpots: ["Barangaroo Reserve headland", "Waterman's Cove", "Crown Sydney surrounds"],
    feelsLike: [
      { city: "Commercial Bay, Auckland", why: "New-build waterfront, premium retail, corporate" },
      { city: "Wellington Waterfront", why: "Designed public spaces, harbour edge, modern" },
      { city: "Shenzhen Qianhai", why: "New development zone, future-facing, premium positioning" },
    ],
    iotAngle: "Premium B2B market. Smart office, luxury home automation. Crown Sydney is a smart building reference. High-value, low-volume sales.",
    mapQuery: "Barangaroo, Sydney NSW",
  },
];
