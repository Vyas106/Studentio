// types/project.ts
export type ProjectStatus = 'active' | 'completed' | 'on-hold';
export type ProjectDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type CompensationType = 'paid' | 'unpaid' | 'negotiable';

export interface ProjectLink {
  title: string;
  url: string;
}

export interface ProjectMember {
  userId: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface ProjectApplication {
  userId: string;
  userName: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: number;
}

export interface ProjectCompensation {
  type: CompensationType;
  amount?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  status: ProjectStatus;
  difficulty: ProjectDifficulty;
  teamSize: number;
  currentMembers: number;
  estimatedDuration: string;
  compensation: ProjectCompensation;
  tags: string[];
  links: ProjectLink[];
  members: ProjectMember[];
  applications: ProjectApplication[];
  userId: string;
  createdAt: number;
  lastUpdated: number;
}