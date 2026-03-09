export interface Event {
  name: string;
  venue: string;
  /** ISO dates this event occurs on, e.g. ["2026-03-10"] or ["2026-03-14","2026-03-15"] */
  eventDates: string[];
  time: string;
  priceFrom: number; // cheapest ticket AUD
  category: "theatre" | "opera" | "music" | "tour" | "sport" | "festival";
  description: string;
  whySherry: string;
  ticketUrl: string;
  neighborhood: string;
}

export function priceLabel(price: number): string {
  if (price === 0) return "Free";
  return `$${price}`;
}

export const categoryLabels: Record<Event["category"], string> = {
  theatre: "🎭 Theatre",
  opera: "🎼 Opera",
  music: "🎵 Music",
  tour: "🏛️ Tour",
  sport: "🏈 Sport",
  festival: "🎉 Festival",
};

export const categoryColors: Record<Event["category"], string> = {
  theatre: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  opera: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  music: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  tour: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  sport: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  festival: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
};

// All dates in Sherry's trip window
const DAILY = [
  "2026-03-10",
  "2026-03-11",
  "2026-03-12",
  "2026-03-13",
  "2026-03-14",
  "2026-03-15",
  "2026-03-16",
  "2026-03-17",
];

export const events: Event[] = [
  // Tours (daily)
  {
    name: "Sydney Opera House Tour",
    venue: "Sydney Opera House",
    eventDates: DAILY,
    time: "Various (9am–5pm)",
    priceFrom: 43,
    category: "tour",
    description:
      "1-hour guided tour of the iconic sails, theatres, and backstage areas. Multiple languages available including Mandarin.",
    whySherry:
      "Must-do for first-time visitors. The building itself is a smart-tech showcase — ask about the acoustic engineering.",
    ticketUrl: "https://www.sydneyoperahouse.com/tours",
    neighborhood: "Circular Quay",
  },
  {
    name: "Opera House Backstage Tour",
    venue: "Sydney Opera House",
    eventDates: DAILY,
    time: "7:00am (2.5 hrs)",
    priceFrom: 185,
    category: "tour",
    description:
      "Early-morning deep dive including breakfast. Go where regular tours can't — technical areas, rehearsal spaces, hidden corners.",
    whySherry:
      "Premium experience. Good story for business contacts — shows you know Sydney beyond the tourist layer.",
    ticketUrl: "https://www.sydneyoperahouse.com/tours",
    neighborhood: "Circular Quay",
  },

  // Tue Mar 10
  {
    name: "Turandot",
    venue: "Sydney Opera House",
    eventDates: ["2026-03-10"],
    time: "7:30pm",
    priceFrom: 59,
    category: "opera",
    description:
      "Puccini's grand opera set in ancient China. Spectacular staging, the famous 'Nessun Dorma' aria. Opera Australia production.",
    whySherry:
      "Set in China! A unique way to see Chinese culture reflected through Western opera. Great opening-night-of-trip experience.",
    ticketUrl: "https://opera.org.au/calendar/",
    neighborhood: "Circular Quay",
  },

  // Tue–Sat evenings (multiple dates)
  {
    name: "Pretty Woman: The Musical",
    venue: "Theatre Royal Sydney",
    eventDates: [
      "2026-03-10",
      "2026-03-11",
      "2026-03-12",
      "2026-03-13",
      "2026-03-14",
    ],
    time: "7:30pm (matinees Wed/Sat/Sun)",
    priceFrom: 74,
    category: "theatre",
    description:
      "Broadway hit based on the classic film. Big production, great costumes, feel-good energy. $45 lottery tickets available on TodayTix.",
    whySherry:
      "Fun night out. Theatre Royal is in the CBD — easy to combine with dinner in Darlinghurst afterward.",
    ticketUrl: "https://prettywomanthemusical.com.au/tickets/sydney/",
    neighborhood: "CBD",
  },

  // Tue–Sun (multiple dates)
  {
    name: "Afterglow",
    venue: "Eternity Playhouse, Darlinghurst",
    eventDates: [
      "2026-03-10",
      "2026-03-11",
      "2026-03-12",
      "2026-03-13",
      "2026-03-14",
      "2026-03-15",
    ],
    time: "Tue–Thu 7:30pm, Fri–Sat 9:30pm, Sun 5pm",
    priceFrom: 49,
    category: "theatre",
    description:
      "Intimate contemporary play about modern relationships. Small venue, powerful performances. Features Olympic diver Matthew Mitcham.",
    whySherry:
      "Darlinghurst location — combine with exploring the neighborhood. Small independent theatre scene is very Sydney.",
    ticketUrl: "https://www.afterglowplay.com",
    neighborhood: "Darlinghurst",
  },

  // Fri Mar 13
  {
    name: "Gatsby at The Green Light",
    venue: "Sydney Opera House",
    eventDates: ["2026-03-13"],
    time: "8:45pm",
    priceFrom: 50,
    category: "theatre",
    description:
      "Immersive 1920s cabaret in a speakeasy setting. Aerial displays, live vocals, jazz. Dress up — it's that kind of show.",
    whySherry:
      "The immersive format is a business insight — experiential entertainment is huge in the Oceania market.",
    ticketUrl:
      "https://www.sydneyoperahouse.com/musical-theatre-cabaret/gatsby",
    neighborhood: "Circular Quay",
  },

  // Sat Mar 14
  {
    name: "Sydney Swans vs Brisbane Lions (AFL)",
    venue: "Sydney Cricket Ground",
    eventDates: ["2026-03-14"],
    time: "7:10pm",
    priceFrom: 30,
    category: "sport",
    description:
      "Australian Rules Football — the national obsession. Fast, physical, and completely unique. Nothing like it in China or NZ.",
    whySherry:
      "Want to understand Australians? Watch their sport. Also great people-watching — the crowd IS the market research.",
    ticketUrl: "https://www.sydneyswans.com.au/tickets",
    neighborhood: "Moore Park",
  },

  // Sat–Sun Mar 14–15
  {
    name: "St Patrick's Day at The Rocks",
    venue: "The Rocks (Tallawollodah)",
    eventDates: ["2026-03-14", "2026-03-15"],
    time: "All day",
    priceFrom: 0,
    category: "festival",
    description:
      "Free street festival in Sydney's oldest neighborhood. Live music, food stalls, Guinness. Heritage buildings and harbour views.",
    whySherry:
      "Free! The Rocks is beautiful and walkable. Good for understanding Sydney's outdoor event culture — relevant for IoT/outdoor tech.",
    ticketUrl: "https://www.therocks.com/whats-on",
    neighborhood: "The Rocks",
  },

  // Sun Mar 15
  {
    name: "Shanghai Symphony Orchestra",
    venue: "Sydney Opera House Concert Hall",
    eventDates: ["2026-03-15"],
    time: "5:00pm",
    priceFrom: 59,
    category: "music",
    description:
      "Maestro Long Yu conducting, cellist Jian Wang featured. One of China's premier orchestras on the world stage.",
    whySherry:
      "Chinese orchestra in Sydney — perfect intersection of her two worlds. Great networking opportunity with the Chinese-Australian cultural community.",
    ticketUrl: "https://www.sydneyoperahouse.com",
    neighborhood: "Circular Quay",
  },

  // Tue Mar 17
  {
    name: "Celtic Thunder",
    venue: "State Theatre",
    eventDates: ["2026-03-17"],
    time: "7:30pm",
    priceFrom: 80,
    category: "music",
    description:
      "Irish music ensemble on St Patrick's Day. The State Theatre itself is stunning — ornate 1920s movie palace.",
    whySherry:
      "St Patrick's Day in Sydney! The State Theatre building alone is worth seeing. Good cultural experience.",
    ticketUrl: "https://www.statetheatre.com.au/",
    neighborhood: "CBD",
  },

  // ── FREE EVENING ACTIVITIES ──

  // Nightly
  {
    name: "Badu Gili — Opera House Light Show",
    venue: "Sydney Opera House (eastern sails)",
    eventDates: DAILY,
    time: "Nightly after dark (~7pm, 6 mins)",
    priceFrom: 0,
    category: "festival",
    description:
      "Free 6-minute light projection on the Opera House sails telling First Nations stories. Just walk up and watch — no ticket needed.",
    whySherry:
      "Beautiful and free. Perfect way to end any evening near Circular Quay. Great photo opportunity.",
    ticketUrl: "https://www.sydneyoperahouse.com/visit/badu-gili",
    neighborhood: "Circular Quay",
  },
  {
    name: "Harbour Bridge Walk (free)",
    venue: "Sydney Harbour Bridge pedestrian path",
    eventDates: DAILY,
    time: "Anytime (best at sunset ~6:30pm)",
    priceFrom: 0,
    category: "tour",
    description:
      "Walk across the Harbour Bridge for free on the pedestrian path. Stunning harbour views both ways. Access from stairs at The Rocks or Milsons Point.",
    whySherry:
      "Best free view in Sydney. Walk from The Rocks side at sunset, come back via train from Milsons Point.",
    ticketUrl: "https://www.sydney.com/destinations/sydney/sydney-city/sydney-harbour-bridge",
    neighborhood: "The Rocks",
  },
  {
    name: "Opera House Forecourt & Steps",
    venue: "Sydney Opera House forecourt",
    eventDates: DAILY,
    time: "Evening (best after 6pm)",
    priceFrom: 0,
    category: "festival",
    description:
      "1.8 hectares of open public space with harbour views. Broad steps are an unofficial amphitheatre. Street performers, sunset watching, people-watching.",
    whySherry:
      "The ultimate free people-watching spot. See how Sydneysiders actually use public space — relevant for IoT outdoor products.",
    ticketUrl: "https://www.sydneyoperahouse.com/visit",
    neighborhood: "Circular Quay",
  },
  {
    name: "Observatory Hill Sunset",
    venue: "Observatory Hill Park",
    eventDates: DAILY,
    time: "Sunset (~6:30pm)",
    priceFrom: 0,
    category: "tour",
    description:
      "Sydney's highest natural point. Panoramic harbour views, historic observatory building. Pack snacks from a nearby cafe and watch the city light up.",
    whySherry:
      "Quiet, beautiful, locals-only feel. Good spot to decompress after a day of scouting. Near The Rocks for dinner after.",
    ticketUrl: "https://www.sydney.com/destinations/sydney/sydney-city/the-rocks/attractions/observatory-hill",
    neighborhood: "The Rocks",
  },

  // Thu–Sun Mar 12–15
  {
    name: "Lakemba Nights (Ramadan Markets)",
    venue: "Haldon Street, Lakemba",
    eventDates: ["2026-03-12", "2026-03-13", "2026-03-14", "2026-03-15"],
    time: "6pm–2am",
    priceFrom: 0,
    category: "festival",
    description:
      "Free entry night market during Ramadan. 60+ food stalls — Indonesian, Pakistani, Lebanese, Syrian, Indian. Buzzing street atmosphere. Take the train to Lakemba station.",
    whySherry:
      "Free entry, incredible food (buy what you eat). See multicultural Sydney at its best. Totally unique, nothing like this in NZ or China.",
    ticketUrl: "https://www.cbcity.nsw.gov.au/Lakemba-nights-during-ramadan",
    neighborhood: "Lakemba",
  },

  // Fri Mar 13
  {
    name: "Biennale of Sydney — Opening Night",
    venue: "White Bay Power Station",
    eventDates: ["2026-03-13"],
    time: "7pm–11pm",
    priceFrom: 0,
    category: "festival",
    description:
      "Opening night of Australia's biggest contemporary art festival (25th edition). Free entry. Massive industrial venue with international art installations.",
    whySherry:
      "Major cultural event, free. Great for meeting creative/tech people in Sydney. The intersection of art and technology is strong here.",
    ticketUrl: "https://www.biennaleofsydney.art/",
    neighborhood: "Rozelle",
  },

  // Fri Mar 13 onwards
  {
    name: "Biennale of Sydney (exhibitions)",
    venue: "Art Gallery of NSW + White Bay + more",
    eventDates: ["2026-03-14", "2026-03-15", "2026-03-16", "2026-03-17"],
    time: "10am–5pm (Fri til 9pm)",
    priceFrom: 0,
    category: "festival",
    description:
      "Free contemporary art across 5 venues. Art Gallery of NSW is walkable from the CBD. White Bay Power Station is a stunning industrial space.",
    whySherry:
      "Free world-class art. The Art Gallery is near the Botanical Gardens — combine for a full afternoon. Friday late nights til 9pm.",
    ticketUrl: "https://www.biennaleofsydney.art/",
    neighborhood: "Various",
  },

  // Fri Mar 13 (MCA late)
  {
    name: "MCA Late (free gallery night)",
    venue: "Museum of Contemporary Art, The Rocks",
    eventDates: ["2026-03-13"],
    time: "Until 9pm",
    priceFrom: 0,
    category: "festival",
    description:
      "Free late-night entry to the MCA. Contemporary art with harbour views from the rooftop terrace. Right on Circular Quay.",
    whySherry:
      "Free, right at Circular Quay. The rooftop café has one of Sydney's best views. Combine with the Badu Gili light show after.",
    ticketUrl: "https://www.mca.com.au/",
    neighborhood: "The Rocks",
  },
];
