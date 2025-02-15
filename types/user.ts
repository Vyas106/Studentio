// // types/index.ts
// export interface UserProfile {
//   uid: string;
//   name: string;
//   email: string;
//   photoURL?: string;
//   bio?: string;
//   college?: string;
//   course?: string;
//   semester?: string;
//   enrollment?: string;
//   socialLinks?: {
//     linkedin?: string;
//     github?: string;
//     twitter?: string;
//   };
//   followers: string[];
//   following: string[];
//   createdAt: number;
//   updatedAt: number;
// }

// export interface Post {
//   id: string;
//   userId: string;
//   content: string;
//   imageUrl?: string;
//   tags: string[];
//   likes: string[];
//   comments: Comment[];
//   createdAt: number;
// }

// export interface Note {
//   id: string;
//   userId: string;
//   title: string;
//   driveLink: string;
//   description: string;
//   createdAt: number;
// }

// export interface Project {
//   id: string;
//   userId: string;
//   name: string;
//   description: string;
//   imageUrl?: string;
//   links: ProjectLink[];
//   joinRequests: string[];
//   createdAt: number;
// }

// export interface ProjectLink {
//   id: string;
//   title: string;
//   url: string;
// }

// export interface Message {
//   id: string;
//   senderId: string;
//   receiverId: string;
//   content: string;
//   createdAt: number;
//   read: boolean;
// }
// types/user.ts
// export interface UserProfile {
//   username?: string
//   uid: string;
//   name: string;
//   email: string;
//   badges?: string[]
//   photoURL?: string;
//   bio?: string;
//   college?: string;
//   course?: string;
//   semester?: string;
//   enrollment?: string;
//   skills: string[];
//   socialLinks?: {
//     linkedin?: string;
//     github?: string;
//     twitter?: string;
//   };
//   followers: string[];
//   following: string[];
//   savedPosts: string[];
//   savedProjects: string[];
//   savedNotes: string[];
//   createdAt: number;
//   updatedAt: number;
// }

// types/user.ts
export interface UserProfile {
  uid: string;
  username?: string;
  name: string;
  email: string;
  photoURL?: string;
  bio?: string;
  college?: string;
  course?: string;
  semester?: string;
  enrollment?: string;
  skills: string[];
  badges?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
  };
  followers: string[];
  following: string[];
  createdPosts: string[];
  createdProjects: string[];
  createdNotes: string[];
  savedPosts: string[];
  savedProjects: string[];
  savedNotes: string[];
  experience?: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }[];
  education?: {
    institution: string;
    degree: string;
    startDate: string;
    endDate?: string;
  }[];
  achievements?: string[];
  interests?: string[];
  notifications?: {
    type: string;
    message: string;
    timestamp: number;
  }[];
  settings?: {
    privacy: {
      profileVisibility: 'public' | 'private' | 'friendsOnly';
      activityStatus: boolean;
    };
    notifications: {
      emailNotifications: boolean;
      pushNotifications: boolean;
    };
  };
  createdAt: number;
  updatedAt: number;

}



export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  likes: string[];
  // comments?: { userId: string; text: string; createdAt: number }[]
  // shares?: number
  // visibility?: 'Public' | 'Private' | 'Friends'
  createdAt: number;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  links: { title: string; url: string }[];
  members: string[];
  joinRequests: string[];
  createdAt: number;
}



export interface Note {
  id: string;
  userId: string;
  title: string;
  driveLink: string;
  description: string;
  tags: string[];
  createdAt: number;
}

export interface ProjectMember {
  uid: string;
  name: string;
  role: string;
  joinedAt: number;
}

export interface ProjectLink {
  title: string;
  url: string;
  description?: string;
}


export interface EnhancedProject extends Omit<Project, 'members' | 'links'> {
  members: ProjectMember[];
  links: ProjectLink[];
  teamSize: number;
  currentMembers: number;
  skills: string[];
  status: 'Open' | 'In Progress' | 'Completed';
  deadline?: number;
  category: string;
}