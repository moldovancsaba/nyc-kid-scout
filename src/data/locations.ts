import type { Borough } from "@/types/provider";

export const BOROUGHS: Borough[] = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];

export const NEIGHBORHOODS: Record<Borough, string[]> = {
  Manhattan: ["Upper West Side", "Upper East Side", "Chelsea", "Harlem", "SoHo", "Tribeca", "Flatiron"],
  Brooklyn: ["Park Slope", "Williamsburg", "DUMBO", "Brooklyn Heights", "Prospect Heights", "Greenpoint"],
  Queens: ["Astoria", "Long Island City", "Forest Hills", "Flushing", "Jackson Heights", "Sunnyside"],
  Bronx: ["Riverdale", "Fordham", "Pelham Bay", "South Bronx", "Kingsbridge", "Throgs Neck"],
  "Staten Island": ["St. George", "Tottenville", "Great Kills", "New Dorp", "Westerleigh", "Port Richmond"],
};
