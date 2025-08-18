export interface Tab {
  id: string;
  label: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  challenges?: string[];
  outcomes?: string[];
  status?: 'completed' | 'in-progress' | 'planned' | 'n/a';
  startDate?: string;
  endDate?: string;
  category?: 'Academic' | 'Personal' | 'Professional' | 'Open Source' | 'Freelance' | 'Hackathon' | 'Research' | string;
  priority?: 'high' | 'medium' | 'low' | 'none';
  liveDemo?: string;
  screenshots?: string[];
  teamSize?: number;
  role?: string;
  keyMetrics?: {
    label: string;
    value: string;
  }[];
}

export interface Certificate {
  title: string;
  image: string;
  description: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  category?: 'Technical' | 'Professional' | 'Academic' | 'Security' | 'Achievement' | string;
  skills?: string[];
  verified?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  course: string;
  institution: string;
  duration: string;
  cgpa?: string;
  level: 'undergraduate' | 'postgraduate' | 'diploma' | 'intermediate' | 'secondary';
  status: 'current' | 'completed' | 'graduated';
  highlights: string[];
  skills: string[];
}

export interface EducationHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  value: string;
  order: number;
}

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contestRating: number;
  globalRanking: number;
  currentlyAttempting?: string;
  recentSubmissions?: number;
  streak?: number;
}

export interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
  company: string;
  totalStars?: number;
  totalCommits?: number;
  contributionsThisYear?: number;
}

export interface CodingProfile {
  id: string;
  name: string;
  icon: string;
  link: string;
  isActive: boolean;
  hasLiveStats: boolean;
  description?: string;
  username?: string;
  customStats?: {
    leetcode?: LeetCodeStats;
    github?: GitHubStats;
    [key: string]: any;
  };
}