/**
 * TypeScript definitions for Buusaa Gonofaa Oromiyaa Adama Branch platform
 */

export type Language = 'om' | 'am' | 'en';

export type ActiveTab = 'home' | 'services' | 'community' | 'contribution' | 'contact';

export interface NewsItem {
  id: string;
  date: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  content: Record<Language, string>;
  category: string;
  imagePlaceholder: string;
  youtubeId?: string;
  externalLink?: string;
  importantPhoto?: string;
}

export interface EventItem {
  id: string;
  title: Record<Language, string>;
  date: string;
  gadaaTerm: Record<Language, string>; // Localized Gadaa protection term
  description: Record<Language, string>;
  location: Record<Language, string>;
  status: 'upcoming' | 'completed' | 'ongoing';
}

export interface DonationCamp {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  goalAmount: number;
  raisedAmount: number;
  contributorsCount: number;
  badge: Record<Language, string>;
}
