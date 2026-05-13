import type { Borough } from "./provider";

export type MeetupGroupType =
  | "Parent Meetup"
  | "Mom Group"
  | "Playdate Group"
  | "New Parents"
  | "Neighborhood Families";

export type MeetupCadence = "Weekly" | "Monthly" | "Weekend" | "Pop-up";

export type MeetupAgeRange = "0–2" | "0–3" | "0–5" | "0–6" | "2–5" | "2–8" | "3–5" | "All ages";

export type MeetupIcon = "stroller" | "skyline" | "heart" | "coffee" | "playground" | "community";

export interface MeetupGroup {
  id: string;
  name: string;
  borough: Borough;
  neighborhood: string;
  groupType: MeetupGroupType;
  ageRange: MeetupAgeRange;
  cadence: MeetupCadence;
  instagram: string; // includes leading @
  website: string;   // www.example.com
  description: string;
  initials: string;
  icon: MeetupIcon;
  palette: "teal" | "orange" | "beige" | "charcoal";
}