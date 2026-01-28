
export type UserType = 'dentist' | 'clinic';
export type Region = 'Zona Norte' | 'Zona Sul' | 'Zona Leste' | 'Zona Oeste' | 'Centro' | 'Todas';
export type PaymentStatus = 'pending' | 'paid';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface WorkExperience {
  id: string;
  clinicName: string;
  role: string;
  period: string;
  description: string;
}

export interface Review {
  id: string;
  clinicName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Job {
  id: string;
  clinicId: string;
  clinicName: string;
  title: string;
  specialty: string;
  location: string;
  region: Region;
  salaryRange: string;
  description: string;
  type: 'CLT' | 'PJ' | 'Autônomo';
  postedAt: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  searchTerm: string;
  salaryLabel: string;
  regions: Region[];
}

export interface DentistProfile {
  id: string;
  name: string;
  email: string;
  specialty: string;
  bio: string;
  cro: string;
  avatar: string;
  portfolio: PortfolioItem[];
  experiences: WorkExperience[];
  reviews: Review[];
  experienceYears: number;
}

export interface ClinicProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  description: string;
  photos: string[];
  equipment: string[];
  activeJobs: Job[];
}
