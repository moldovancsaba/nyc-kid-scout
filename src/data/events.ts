import type { FamilyEvent } from "@/types/event";
import play from "@/assets/provider-play.jpg";
import art from "@/assets/provider-art.jpg";
import soccer from "@/assets/provider-soccer.jpg";
import music from "@/assets/provider-music.jpg";
import stem from "@/assets/provider-stem.jpg";
import party from "@/assets/provider-party.jpg";
import yoga from "@/assets/provider-yoga.jpg";
import uws from "@/assets/guide-uws.jpg";
import chelsea from "@/assets/guide-chelsea.jpg";
import bkh from "@/assets/guide-bkheights.jpg";
import parkslope from "@/assets/guide-parkslope.jpg";

export const EVENT_TYPES = [
  "Outdoor", "Nature", "Art", "Drop-In", "Culture", "Toddler Activity",
  "Family Workshop", "Sports", "Cooking", "Storytime", "Music", "STEM",
  "Parent Meetup", "Theater",
] as const;

export const EVENTS: FamilyEvent[] = [
  {
    id: "evt-mn-1",
    name: "Riverside Park Family Nature Walk",
    borough: "Manhattan",
    neighborhood: "Upper West Side",
    eventTypes: ["Outdoor", "Nature"],
    ageRanges: ["3–5", "6–8"],
    when: "Saturday · 10:00 AM",
    price: 0,
    priceLabel: "Free",
    shortDescription:
      "A relaxed family walk through Riverside Park with simple nature prompts, leaf spotting, and kid-friendly outdoor exploration.",
    longDescription:
      "Join a guided family nature walk in Riverside Park designed for young children and caregivers. Families will explore trees, leaves, birds, and seasonal changes through simple prompts and playful discovery.",
    image: uws,
    tags: ["Free", "Weekend", "Outdoor"],
  },
  {
    id: "evt-mn-2",
    name: "Little Picassos Weekend Art Pop-Up",
    borough: "Manhattan",
    neighborhood: "Upper West Side",
    eventTypes: ["Art", "Drop-In"],
    ageRanges: ["0–2", "3–5"],
    when: "Sunday · 2:00 PM",
    price: 25,
    priceLabel: "Paid",
    shortDescription:
      "A casual weekend art pop-up where kids can paint, collage, and create a take-home project with parent support.",
    longDescription:
      "This drop-in art session gives young children a fun, low-pressure environment to paint, collage, and make a simple take-home craft. Great for a creative family outing.",
    image: art,
    tags: ["Weekend", "Drop-In", "Toddler-Friendly"],
  },
  {
    id: "evt-mn-3",
    name: "Museum Morning for Minis",
    borough: "Manhattan",
    neighborhood: "Upper East Side",
    eventTypes: ["Culture", "Toddler Activity"],
    ageRanges: ["0–2", "3–5"],
    when: "Friday · 9:30 AM",
    price: 18,
    priceLabel: "Paid",
    shortDescription:
      "A gentle museum-inspired morning with storytelling, movement, and a simple hands-on art activity for younger children.",
    longDescription:
      "A calm morning program for little ones that combines stories, movement, and a museum-inspired art activity. Designed for toddlers and preschoolers with caregiver participation.",
    image: play,
    tags: ["Toddler-Friendly", "Parent Favorite"],
  },
  {
    id: "evt-mn-4",
    name: "Chelsea Family Art Studio Day",
    borough: "Manhattan",
    neighborhood: "Chelsea",
    eventTypes: ["Art", "Family Workshop"],
    ageRanges: ["3–5", "6–8", "9–12"],
    when: "Saturday · 1:00 PM",
    price: 35,
    priceLabel: "Paid",
    shortDescription:
      "A family-friendly studio session where kids experiment with paint, sculpture materials, and mixed-media projects.",
    longDescription:
      "Families can explore a variety of hands-on art stations in a welcoming studio environment. Kids will rotate through painting, sculpture, and mixed-media activities.",
    image: chelsea,
    tags: ["Weekend", "Parent Favorite"],
  },
  {
    id: "evt-mn-5",
    name: "Hudson River Kids Soccer Pop-Up",
    borough: "Manhattan",
    neighborhood: "Chelsea",
    eventTypes: ["Sports", "Outdoor"],
    ageRanges: ["3–5", "6–8"],
    when: "Sunday · 10:00 AM",
    price: 20,
    priceLabel: "Paid",
    shortDescription:
      "A playful beginner soccer session near the waterfront with warm-ups, obstacle cones, mini games, and parent cheering.",
    longDescription:
      "This beginner-friendly soccer event is designed for young children to build confidence through movement, warm-ups, simple drills, and mini games in a fun outdoor setting.",
    image: soccer,
    tags: ["Weekend", "Outdoor"],
  },
  {
    id: "evt-mn-6",
    name: "Tribeca Tiny Chefs Workshop",
    borough: "Manhattan",
    neighborhood: "Tribeca",
    eventTypes: ["Cooking", "Family Workshop"],
    ageRanges: ["3–5", "6–8"],
    when: "Saturday · 10:30 AM",
    price: 45,
    priceLabel: "Paid",
    shortDescription:
      "A hands-on cooking class where kids decorate mini pizzas, mix simple ingredients, and take home a recipe card.",
    longDescription:
      "Young chefs will enjoy a fun and interactive cooking session with age-appropriate food prep, decorating mini pizzas, and learning simple kitchen skills.",
    image: party,
    tags: ["Weekend", "New Event"],
  },
  {
    id: "evt-mn-7",
    name: "SoHo Storytime & Music Jam",
    borough: "Manhattan",
    neighborhood: "SoHo",
    eventTypes: ["Music", "Storytime"],
    ageRanges: ["0–2", "3–5"],
    when: "Wednesday · 10:00 AM",
    price: 15,
    priceLabel: "Paid",
    shortDescription:
      "A cozy storytime with songs, rhythm instruments, bubbles, and movement for babies, toddlers, and caregivers.",
    longDescription:
      "This warm and welcoming early childhood event blends storytime, songs, bubbles, and movement with simple rhythm play for babies, toddlers, and caregivers.",
    image: music,
    tags: ["Toddler-Friendly", "Parent Favorite"],
  },
  {
    id: "evt-mn-8",
    name: "Flatiron Family STEM Lab",
    borough: "Manhattan",
    neighborhood: "Flatiron",
    eventTypes: ["STEM", "Family Workshop"],
    ageRanges: ["6–8", "9–12"],
    when: "Sunday · 3:00 PM",
    price: 30,
    priceLabel: "Paid",
    shortDescription:
      "A beginner-friendly STEM event where kids build simple structures, test ramps, and explore playful engineering challenges.",
    longDescription:
      "Children will explore hands-on engineering and simple problem-solving through fun STEM activities such as building, testing, and experimenting in a guided environment.",
    image: stem,
    tags: ["Weekend", "New Event"],
  },
  {
    id: "evt-bk-1",
    name: "Brooklyn Heights Stroller Social & Storytime",
    borough: "Brooklyn",
    neighborhood: "Brooklyn Heights",
    eventTypes: ["Parent Meetup", "Storytime"],
    ageRanges: ["0–2"],
    when: "Thursday · 10:00 AM",
    price: 0,
    priceLabel: "Free",
    shortDescription:
      "A casual caregiver meetup with stroller-friendly coffee time, short storytime, and neighborhood parent introductions.",
    longDescription:
      "Designed for caregivers with babies and toddlers, this event combines a relaxed social meetup with a short storytime and neighborhood parent connection.",
    image: yoga,
    tags: ["Free", "Toddler-Friendly", "Parent Favorite"],
  },
  {
    id: "evt-bk-2",
    name: "Promenade Family Sketch Walk",
    borough: "Brooklyn",
    neighborhood: "Brooklyn Heights",
    eventTypes: ["Art", "Outdoor"],
    ageRanges: ["3–5", "6–8", "9–12"],
    when: "Saturday · 10:30 AM",
    price: 20,
    priceLabel: "Paid",
    shortDescription:
      "A guided outdoor sketch session along the Promenade where kids draw skyline views, bridges, and neighborhood scenes.",
    longDescription:
      "Families will sketch outdoors while enjoying iconic Brooklyn Heights scenery. Kids will receive simple prompts and guidance while drawing views of the city and neighborhood landmarks.",
    image: bkh,
    tags: ["Weekend", "Outdoor"],
  },
  {
    id: "evt-bk-3",
    name: "Park Slope Puppet Play Morning",
    borough: "Brooklyn",
    neighborhood: "Park Slope",
    eventTypes: ["Theater", "Toddler Activity"],
    ageRanges: ["0–2", "3–5"],
    when: "Sunday · 10:00 AM",
    price: 18,
    priceLabel: "Paid",
    shortDescription:
      "A playful puppet show followed by songs, movement, and a simple make-your-own paper puppet activity.",
    longDescription:
      "This lively family event includes a short puppet performance, music, movement, and a fun DIY puppet craft for young children.",
    image: play,
    tags: ["Weekend", "Toddler-Friendly"],
  },
  {
    id: "evt-bk-4",
    name: "Prospect Park Junior Nature Explorers",
    borough: "Brooklyn",
    neighborhood: "Park Slope",
    eventTypes: ["Outdoor", "Nature"],
    ageRanges: ["3–5", "6–8"],
    when: "Saturday · 9:30 AM",
    price: 0,
    priceLabel: "Free",
    shortDescription:
      "A kid-friendly nature meetup near Prospect Park with scavenger hunt cards, bird spotting, and seasonal nature activities.",
    longDescription:
      "Families can explore Prospect Park through a guided nature-focused outing with simple scavenger hunt prompts and seasonal discovery activities for children.",
    image: parkslope,
    tags: ["Free", "Weekend", "Outdoor"],
  },
  {
    id: "evt-bk-5",
    name: "Park Slope Family Music Circle",
    borough: "Brooklyn",
    neighborhood: "Park Slope",
    eventTypes: ["Music", "Drop-In"],
    ageRanges: ["0–2", "3–5"],
    when: "Friday · 4:00 PM",
    price: 22,
    priceLabel: "Paid",
    shortDescription:
      "A lively music circle with shakers, drums, sing-alongs, movement games, and caregiver participation.",
    longDescription:
      "This upbeat music session invites babies, toddlers, preschoolers, and caregivers to sing, move, and play instruments together in a warm community setting.",
    image: music,
    tags: ["Drop-In", "Toddler-Friendly"],
  },
];