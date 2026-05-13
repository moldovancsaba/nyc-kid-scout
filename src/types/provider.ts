export type Category = "Classes" | "Camps" | "Birthday Parties" | "Drop-In Activities";

export type Borough = "Manhattan" | "Brooklyn" | "Queens" | "Bronx" | "Staten Island";

export type AgeRange = "0–2" | "3–5" | "6–8" | "9–12" | "Teens";

export type DayTimeTag =
  | "Weekday" | "Weekend" | "Morning" | "Afternoon" | "Evening" | "After-school";

export type FeaturedBadge =
  | "Featured" | "Popular" | "New" | "Staff Pick" | "Great for Toddlers" | "Weekend Friendly";

export interface Provider {
  id: string;
  name: string;
  category: Category;
  borough: Borough;
  neighborhood: string;
  address: string;
  activityTypes: string[];
  ageRanges: AgeRange[];
  dayTimeTags: DayTimeTag[];
  pricePerClass: number;
  shortDescription: string;
  longDescription: string;
  rating: number;
  reviewCount: number;
  badges: FeaturedBadge[];
  image: string;
  email: string;
  website: string;
  phone: string;
  // Optional enhancements (currently used for Staten Island providers)
  announcementTitle?: string;
  announcementDescription?: string;
  announcementBadge?: string;
  galleryImages?: string[];
  bookingEnabled?: boolean;
}
