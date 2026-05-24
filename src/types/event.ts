import type { Borough, AgeRange } from "./provider";

export type EventType =
  | "Outdoor"
  | "Nature"
  | "Art"
  | "Drop-In"
  | "Culture"
  | "Toddler Activity"
  | "Family Workshop"
  | "Sports"
  | "Cooking"
  | "Storytime"
  | "Music"
  | "STEM"
  | "Parent Meetup"
  | "Theater";

export type EventTag =
  | "Free"
  | "Weekend"
  | "Toddler-Friendly"
  | "Outdoor"
  | "Parent Favorite"
  | "New Event"
  | "Drop-In";

export interface FamilyEvent {
  id: string;
  name: string;
  borough: Borough;
  neighborhood: string;
  eventTypes: EventType[];
  ageRanges: AgeRange[];
  when: string;
  price: number; // 0 = Free
  priceLabel: "Free" | "Paid";
  shortDescription: string;
  longDescription: string;
  image: string;
  tags: EventTag[];
}