import type { Provider, Category, AgeRange, DayTimeTag, FeaturedBadge, Borough } from "@/types/provider";
import { NEIGHBORHOODS } from "./locations";
import imgDance from "@/assets/provider-dance.jpg";
import imgArt from "@/assets/provider-art.jpg";
import imgSoccer from "@/assets/provider-soccer.jpg";
import imgYoga from "@/assets/provider-yoga.jpg";
import imgStem from "@/assets/provider-stem.jpg";
import imgParty from "@/assets/provider-party.jpg";
import imgGym from "@/assets/provider-gym.jpg";
import imgMusic from "@/assets/provider-music.jpg";
import imgCamp from "@/assets/provider-camp.jpg";
import imgPlay from "@/assets/provider-play.jpg";

interface Template {
  name: string;
  category: Category;
  activityTypes: string[];
  ageRanges: AgeRange[];
  dayTimeTags: DayTimeTag[];
  image: string;
  short: string;
  long: string;
  badges: FeaturedBadge[];
  basePrice: number;
}

const TEMPLATES: Template[] = [
  { name: "Step Into Dance", category: "Classes", activityTypes: ["Dance", "Ballet"], ageRanges: ["3–5", "6–8", "9–12"], dayTimeTags: ["Weekday", "After-school", "Weekend"], image: imgDance, short: "Joyful ballet, jazz, and tap classes for budding movers.", long: "Step Into Dance has been welcoming young NYC dancers for over a decade. Small class sizes, encouraging instructors, and a warm, mirror-lined studio make it easy for kids to fall in love with movement. Trial classes available year-round.", badges: ["Featured", "Popular"], basePrice: 45 },
  { name: "Bright Brush Art Studio", category: "Classes", activityTypes: ["Art", "Painting", "Ceramics"], ageRanges: ["3–5", "6–8", "9–12"], dayTimeTags: ["Weekday", "Weekend", "After-school"], image: imgArt, short: "Hands-on painting, drawing, and ceramics for young artists.", long: "Bright Brush is a sunlit studio where children explore color, texture, and self-expression. Our teaching artists rotate themes weekly so every class brings something new. All materials included.", badges: ["Featured", "Staff Pick"], basePrice: 55 },
  { name: "Brooklyn Soccer Lab", category: "Classes", activityTypes: ["Sports", "Soccer", "Outdoor Activities"], ageRanges: ["3–5", "6–8", "9–12"], dayTimeTags: ["Weekend", "Morning", "Afternoon"], image: imgSoccer, short: "Skills-first soccer training in a supportive team environment.", long: "Coached by former college and pro players, Brooklyn Soccer Lab focuses on fundamentals, sportsmanship, and fun. Weekend pickup leagues plus structured weekday training.", badges: ["Featured"], basePrice: 65 },
  { name: "Little Lotus Yoga", category: "Classes", activityTypes: ["Yoga", "Mindfulness"], ageRanges: ["0–2", "3–5", "6–8"], dayTimeTags: ["Weekday", "Morning", "Weekend"], image: imgYoga, short: "Mindful movement and breathwork for little bodies.", long: "Little Lotus blends yoga, storytelling, and mindfulness in a calm, welcoming studio. Caregiver-and-me classes available for the youngest students.", badges: ["Great for Toddlers"], basePrice: 40 },
  { name: "Curious Minds STEM Lab", category: "Classes", activityTypes: ["STEM", "Science"], ageRanges: ["6–8", "9–12", "Teens"], dayTimeTags: ["After-school", "Weekend"], image: imgStem, short: "Robotics, coding, and hands-on science experiments.", long: "Project-based STEM where kids design, build, and test. Past projects include simple machines, beginner robotics, and chemistry kitchens. Bring curiosity, leave with a build.", badges: ["Popular", "New"], basePrice: 80 },
  { name: "City Kids Gymnastics", category: "Classes", activityTypes: ["Gymnastics", "Sports"], ageRanges: ["3–5", "6–8", "9–12"], dayTimeTags: ["Weekday", "Weekend", "After-school"], image: imgGym, short: "Confidence-building gymnastics for every level.", long: "Spacious gym with full equipment, foam pits, and trained coaches. Programs run from preschool tumblers to advanced developmental teams.", badges: ["Featured"], basePrice: 60 },
  { name: "Mini Maestros Music", category: "Classes", activityTypes: ["Music", "Theater"], ageRanges: ["0–2", "3–5", "6–8"], dayTimeTags: ["Weekday", "Morning", "Weekend"], image: imgMusic, short: "Sing, drum, and play in a joyful music studio.", long: "Mini Maestros introduces kids to rhythm, melody, and instruments through interactive group classes. Songbook included for at-home practice.", badges: ["Great for Toddlers"], basePrice: 35 },
  { name: "Party Pop NYC", category: "Birthday Parties", activityTypes: ["Birthday Entertainment", "Indoor Play"], ageRanges: ["3–5", "6–8", "9–12"], dayTimeTags: ["Weekend", "Afternoon"], image: imgParty, short: "Stress-free birthday parties with full-service planning.", long: "Party Pop handles everything from setup to cleanup, with themed decor, character hosts, and custom cakes. Packages for 10–40 kids.", badges: ["Weekend Friendly", "Popular"], basePrice: 95 },
  { name: "Camp City Sprouts", category: "Camps", activityTypes: ["Outdoor Activities", "Sports", "Art"], ageRanges: ["3–5", "6–8", "9–12"], dayTimeTags: ["Weekday", "Morning", "Afternoon"], image: imgCamp, short: "Half-day and full-day summer camps with mixed activities.", long: "Camp City Sprouts blends outdoor play, art, and team challenges. Weekly themes, small groups, and counselors trained in childhood ed.", badges: ["Featured", "New"], basePrice: 85 },
  { name: "PlayLab NYC", category: "Drop-In Activities", activityTypes: ["Indoor Play", "Sensory Play"], ageRanges: ["0–2", "3–5"], dayTimeTags: ["Weekday", "Weekend", "Morning", "Afternoon"], image: imgPlay, short: "Open-play indoor space with sensory zones and climbers.", long: "PlayLab is a drop-in haven for caregivers and little ones. Café on site, clean play zones, and rotating themed activities.", badges: ["Great for Toddlers", "Weekend Friendly"], basePrice: 25 },
  { name: "Junior Hoops Academy", category: "Classes", activityTypes: ["Basketball", "Sports"], ageRanges: ["6–8", "9–12", "Teens"], dayTimeTags: ["After-school", "Weekend", "Evening"], image: imgSoccer, short: "Basketball fundamentals and league play for all levels.", long: "Coaches focus on skill drills, teamwork, and confidence. Multiple skill tiers so every player gets the right challenge.", badges: ["Popular"], basePrice: 70 },
  { name: "Creative Kids Theater", category: "Classes", activityTypes: ["Theater", "Music"], ageRanges: ["6–8", "9–12", "Teens"], dayTimeTags: ["Weekday", "After-school", "Weekend"], image: imgArt, short: "Acting, improv, and musical theater workshops.", long: "End-of-term showcases let kids share what they've learned. Specialized tracks for first-timers and advanced young performers.", badges: ["Staff Pick"], basePrice: 75 },
  { name: "Tiny Tutus Ballet", category: "Classes", activityTypes: ["Dance", "Ballet"], ageRanges: ["0–2", "3–5"], dayTimeTags: ["Weekday", "Morning", "Weekend"], image: imgDance, short: "Classical ballet basics for the youngest dancers.", long: "Gentle, age-appropriate ballet built around story and play. Tutus optional, smiles required.", badges: ["Great for Toddlers"], basePrice: 40 },
  { name: "Future Kickers", category: "Camps", activityTypes: ["Soccer", "Sports"], ageRanges: ["3–5", "6–8"], dayTimeTags: ["Weekday", "Morning"], image: imgSoccer, short: "Soccer-focused summer day camps with skills + scrimmages.", long: "Daily skill stations, fun scrimmages, and team challenges. Weekly themed tournaments cap each session.", badges: ["New"], basePrice: 90 },
  { name: "Little Chefs Studio", category: "Classes", activityTypes: ["Art", "Science"], ageRanges: ["6–8", "9–12"], dayTimeTags: ["Weekday", "After-school", "Weekend"], image: imgArt, short: "Cook, bake, and learn kitchen science.", long: "Hands-on cooking classes that teach measuring, food safety, and the chemistry of cooking. All ingredients provided.", badges: ["Staff Pick"], basePrice: 65 },
];

function seeded(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seeded(seed) * arr.length)];
}

function jitterPrice(base: number, seed: number): number {
  const variations = [-15, -10, -5, 0, 5, 10, 15, 20];
  const v = variations[Math.floor(seeded(seed * 1.3) * variations.length)];
  return Math.max(25, Math.min(100, base + v));
}

function jitterRating(seed: number): number {
  return Math.round((4.4 + seeded(seed * 2.1) * 0.6) * 10) / 10;
}

export const PROVIDERS: Provider[] = (() => {
  const out: Provider[] = [];
  let i = 0;
  (Object.keys(NEIGHBORHOODS) as Borough[]).forEach((borough, bIdx) => {
    NEIGHBORHOODS[borough].forEach((neighborhood, nIdx) => {
      // 3-5 providers per neighborhood
      const count = 3 + Math.floor(seeded(bIdx * 100 + nIdx) * 3);
      for (let k = 0; k < count; k++) {
        const t = TEMPLATES[(bIdx * 7 + nIdx * 3 + k) % TEMPLATES.length];
        i++;
        const id = `${borough}-${neighborhood}-${k}`.replace(/\s+/g, "-").toLowerCase();
        out.push({
          id,
          name: t.name,
          category: t.category,
          borough,
          neighborhood,
          address: `${100 + Math.floor(seeded(i) * 800)} ${pick(["Main St", "Broadway", "5th Ave", "Court St", "Park Ave", "Smith St"], i)}, ${neighborhood}, NY`,
          activityTypes: t.activityTypes,
          ageRanges: t.ageRanges,
          dayTimeTags: t.dayTimeTags,
          pricePerClass: jitterPrice(t.basePrice, i),
          shortDescription: t.short,
          longDescription: t.long,
          rating: jitterRating(i),
          reviewCount: 30 + Math.floor(seeded(i * 1.7) * 200),
          badges: k === 0 ? t.badges : seeded(i * 0.7) > 0.6 ? [t.badges[0] ?? "Popular"] : [],
          image: t.image,
          email: `hello@${t.name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
          website: `https://${t.name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
          phone: "(212) 555-0100",
        });
      }
    });
  });
  return out;
})();

export const ACTIVITY_TYPES = [
  "Sports", "Dance", "Gymnastics", "Art", "Music", "STEM", "Martial Arts",
  "Swimming", "Theater", "Language", "Tutoring", "Indoor Play",
  "Outdoor Activities", "Yoga", "Soccer", "Basketball", "Science", "Birthday Entertainment",
];

export const AGE_RANGES: AgeRange[] = ["0–2", "3–5", "6–8", "9–12", "Teens"];
export const DAY_TIME_TAGS: DayTimeTag[] = ["Weekday", "Weekend", "Morning", "Afternoon", "Evening", "After-school"];
