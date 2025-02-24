
// types/user.ts

import { Timestamp } from 'firebase/firestore';

// Core User Interfaces
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  name?: string;
  headline?: string;
  // Education/Professional
  college?: string;
  course?: string;
  semester?: string;
  enrollment?: string;
  currentPosition?: string;
  skills: string[];
  
  // Location/Contact
  location?: string;
  website?: string;
  phoneNumber?: string;
  chatRooms?: string[];
  // Network
  followers: string[];
  following: string[];
  contacts?: string[];
  requsteqs?: string[];

  // Content Collections
  createdPosts: string[];
  createdProjects: string[];
  createdNotes: string[];
  savedPosts: string[];
  savedProjects: string[];
  savedNotes: string[];
  
  
  
  // Profile Features
  socialLinks?: SocialLinks;
  additionalLinks?: AdditionalLinks;
  endorsements: Record<string, string[]>;
  badges?: string[];
  interests?: string[];
  
  // Engagement
  notifications?: Notification[];
  settings?: UserSettings;
  verificationStatus?: VerificationStatus;
  privacySettings?: PrivacySettings;
  profileMetrics?: ProfileMetrics;
  
  // Status
  // status?: 'online' | 'offline' | 'away';
  lastSeen?: Timestamp | null;
  
  // Timestamps
  createdAt: number | Timestamp;
  updatedAt: number | Timestamp;
}
export interface UserSettings {
  showProfile: boolean;
  showPosts: boolean;
  showProjects: boolean;
  showNotes: boolean;
}

export interface VerificationStatus {
  isVerified: boolean;
  verificationCode?: string;
}

export interface AdditionalLinks {
  title: string;
  url: string;
}

// Professional Experience
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  skills?: string[];
  location?: string;
}

// Educational Background
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string | number;
  endDate?: string | number;
  grade?: string;
  activities?: string[];
  description?: string;
}


// Project Interface
export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
  url?: string;
  links?: ProjectLink[];
  members: ProjectMember[];
  joinRequests: string[];
  skills: string[];
  status: ProjectStatus;
  category: string;
  deadline?: number | Timestamp;
  visibility: 'public' | 'private' | 'friends';
  createdAt: number | Timestamp;
  updatedAt: number | Timestamp;
}

// Social Media Links
export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  [key: string]: string | undefined;
}


// types/notification.ts
export interface Notification {
  id: string;
  userId: string;
  message: string;
  createdAt: number;
  read: boolean;
  type: string;
  from: {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
  };
  // type?: 'join_request' | 'application_response' | 'general'; // Keeping it optional if not always present
  timestamp?: number | Timestamp; // Optional since createdAt already exists
  actionUrl?: string;
  senderId?: string;
  targetId?: string;
  metadata?: Record<string, any>;
  fromUserName?: string;
  projectId?: string;
  projectTitle?: string;
  applicationId?: string;
}

// EnhancedProject

export interface Application {
  id: string;
  userId: string;
  OwnerId: string;
  ownerName: string;
  title: string;
  projectId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: number;
  userData?: {
    displayName: string;
    photoURL: string;
    college: string;
  };
  projectData?: {
    title: string;
  };
}

// types/project.ts
export interface ProjectApplication {
  id?: string;
  userId: string;
  userName: string;
  projectId: string;
  projectTitle: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: number;
  // message?: string;
}



export type NotificationType = 
  | 'join_request'
  // | 'application_response'
  | 'application_rejected'
  | 'alert'
  | 'application_accepted'
  | 'message'
  // | 'general'
  // | 'follow'
  // | 'like'
  // | 'comment'
  // | 'mention'
  // | 'project_invite'
  // | 'project_update'
  // | 'note_share'
  // | 'achievement';

// User Settings Management
export interface UserSettings {
  privacy: {
    profileVisibility: VisibilitySetting;
    activityStatus: boolean;
    showEmail: boolean;
    showCollege: boolean;
  };
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

// Content Types
export interface Post {
  id: string;
  savedBy?: string[];
  userId: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  likes: string[];
  comments: Comment[];
  shares: number;
  visibility: VisibilitySetting;
  createdAt: number | Timestamp;
  updatedAt: number | Timestamp;
}

// // interface Post {
// //   id: string;
// //   userId: string;
// //   content: string;
// //   imageUrl?: string;
// //   tags: string[];
// //   likes: string[];
// //   comments: Comment[];
// //   shares: number;
// //   createdAt: number;
// // }

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: number;
}

// interface UserProfile {
//   uid: string;
//   name: string;
//   photoURL?: string;
//   savedPosts?: string[];
// }

// export interface Comment {
//   id: string;
//   userId: string;
//   text: string;
//   // likes: string[];
//   // replies?: Comment[];
//   createdAt: number | Timestamp;
//   updatedAt?: number | Timestamp;
// }

export interface Note {
  id: string;
  userId: string;
  title: string;
  driveLink: string;
  description: string;
  tags: string[];
  subject?: string;
  semester?: string;
  visibility: VisibilitySetting;
  downloads: number;
  likes: string[];
  comments: Comment[];
  createdAt: number | Timestamp;
  updatedAt: number | Timestamp;
}

// Project Related Types
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on_hold';

export interface ProjectMember {
  uid: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  permissions: string[];
  joinedAt: number | Timestamp;
}

export interface ProjectLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  type: 'github' | 'docs' | 'demo' | 'other';
}

// Messaging System
export interface Message {
  id: string;
  roomId: string;
  text?: string;
  content: string;
  senderId: string;
  timestamp: Timestamp;
  readBy: string[];
  deliveredTo: string[];
  type: 'text' | 'image' | 'audio' | 'video' | 'document' | 'location';
  mediaUrl?: string;
  // replyTo?: string;
  forwarded?: boolean;
  deleted?: boolean;
  // reactions?: Record<string, string>;
  editedAt?: Timestamp;
}

export interface ChatRoom {
  id: string;
  participants: ChatParticipant[];
  createdAt: Timestamp;
  lastMessageTimestamp: Timestamp;
  groupChat: boolean;
  groupName?: string;
  groupAvatar?: string;
  admins?: string[];
  pinnedBy?: string[];
  mutedBy?: string[];
  description?: string;
  // unreadCount: Record<string, number>;
  settings?: ChatRoomSettings;
  metadata?: ChatRoomMetadata;
}

export interface ChatParticipant {
  id: string;
  name: string;
  photoURL?: string;
  lastSeen?: number | Timestamp;
  isOnline?: boolean;
  isTyping?: boolean;
  role?: 'owner' | 'admin' | 'moderator' | 'member';
  joinedAt?: Timestamp;
  lastRead?: Timestamp;
  mutedUntil?: Timestamp;
  nickname?: string;
}

export interface ChatRoomSettings {
  messageRetention: number; // days
  encryption: boolean;
  slowMode?: number; // seconds between messages
  membersCanInvite: boolean;
  readReceipts: boolean;
  mediaSharing: boolean;
  language?: string;
  customEmoji?: Record<string, string>;
}

export interface ChatRoomMetadata {
  totalMessages: number;
  activeParticipants: number;
  lastActive: Timestamp;
  pinnedMessages: string[];
  tags?: string[];
  category?: string;
  customColors?: {
    primary: string;
    secondary: string;
  };
}

export interface GroupChatInfo {
  name: string;
  description?: string;
  avatar?: string;
  rules?: string[];
  admins: string[];
  moderators: string[];
  maxParticipants: number;
  isPublic: boolean;
  joinRequests: JoinRequest[];
}

export interface JoinRequest {
  userId: string;
  requestedAt: Timestamp;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  processedBy?: string;
  processedAt?: Timestamp;
}

// User Network Relationships
export interface Following {
  followingId: string;
  followerId: string;
  startFollowDate: Timestamp;
  notificationSettings: NotificationPreferences;
  relationshipStrength: number;
  lists: string[];
  notes?: string;
  mutualFriends: number;
  interactionStats: InteractionStats;
}

export interface Follower {
  followerId: string;
  followingId: string;
  startFollowDate: Timestamp;
  source: 'direct' | 'suggestion' | 'search' | 'shared_content';
  relationshipStrength: number;
  interactionStats: InteractionStats;
  isApproved: boolean;
  lastInteractionDate: Timestamp;
}

// Privacy and Verification
export interface PrivacySettings {
  profileVisibility: VisibilitySetting;
  messagePermission: 'everyone' | 'followers' | 'mutualFollowers' | 'none';
  activityVisibility: {
    likes: VisibilitySetting;
    comments: VisibilitySetting;
    followers: VisibilitySetting;
    following: VisibilitySetting;
  };
  blockList: BlockedUser[];
  mutedUsers: MutedUser[];
}

export interface VerificationStatus {
  isVerified: boolean;
  verifiedAt?: Timestamp;
  verificationType?: 'identity' | 'celebrity' | 'business' | 'government';
  verificationBadge?: string;
  documents?: VerificationDocument[];
}

export interface VerificationDocument {
  type: string;
  url: string;
  uploadedAt: Timestamp;
  status: 'pending' | 'approved' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: Timestamp;
}

// Supporting Interfaces
export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  desktop?: boolean;
  types: {
    [key in NotificationType]?: boolean;
  } & {
    posts: boolean;
    stories: boolean;
    comments: boolean;
    mentions: boolean;
    messages: boolean;
    followRequests: boolean;
    groupInvites: boolean;
  };
  frequency: 'instant' | 'daily' | 'weekly' | 'none';
  quietHours?: {
    enabled: boolean;
    start: string; // 24h format
    end: string;
  };
}

export interface InteractionStats {
  likes: number;
  comments: number;
  shares: number;
  messages: number;
  mentions: number;
  lastInteraction: Timestamp;
}

export interface BlockedUser {
  userId: string;
  blockedAt: Timestamp;
  reason?: string;
  expiresAt?: Timestamp;
  blockLevel: 'full' | 'partial';
}

export interface MutedUser {
  userId: string;
  mutedAt: Timestamp;
  durationType: 'temporary' | 'permanent';
  expiresAt?: Timestamp;
  muteSettings: {
    posts: boolean;
    stories: boolean;
    messages: boolean;
  };
}

export interface ProfileMetrics {
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
  engagementRate: number;
  reachScore: number;
  influenceScore: number;
  accountAge: number; // in days
  lastPostDate?: Timestamp;
  growthRate: {
    followers: number;
    engagement: number;
    period: 'daily' | 'weekly' | 'monthly';
  };
}

// Component Props Types
export interface MessageButtonProps {
  userId: string;
  userName: string;
}

export interface SkillsFilterProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  availableSkills: string[];
}

export interface UserStatsProps {
  userId: string;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export interface MediaPreviewProps {
  file: File;
  onRemove: () => void;
}

export interface MessageListProps {
  messages: Message[];
  currentUser: UserProfile | null;
  onReply: (message: Message) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ReplyPreviewProps {
  message: Message;
  onClose: () => void;
}

export interface CreateContentProps {
  isOwnProfile: boolean;
  userId: string;
  posts: Post[];
  projects: Project[];
  notes: Note[];
  onPostCreate: (post: Post) => void;
  onProjectCreate: (project: Project) => void;
  onNoteCreate: (note: Note) => void;
  onPostDelete: (postId: string) => void;
  onProjectDelete: (projectId: string) => void;
  onNoteDelete: (noteId: string) => void;
}

export interface UserInfoProps {
  user: UserProfile;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  onFollowToggle?: () => Promise<void>;
  onLogout?: () => Promise<void>;
}



// types/user.ts
// export interface ProjectMember {
//   userId: string;
//   name: string;
//   // role: string;
//   avatar?: string;
//   // joinedAt: number;
// }

export interface ProjectLink {
  title: string;
  url: string;
}

export interface ProjectCompensation {
  type: 'Paid' | 'Unpaid' | 'Negotiable';
  amount?: string;
}

export interface EnhancedProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  teamSize: number;
  currentMembers: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  status: "Planning" | "Open" | "Closed" | "Active" | "Completed" | "on_hold";
  compensation?: {
    type: 'Paid' | 'Unpaid' | 'Negotiable';
    amount?: string;
  };
  tags: string[];
  links: ProjectLink[];
  members?: {
    userId: string;
    name: string;
    role: string;
    joinedAt: number;
  }[] | undefined;
  savedBy?: string[];
  createdAt: number;
  projectOwnerId: string;
  lastUpdated: number;
  applications?: ProjectApplication[];
}

export interface TeamMember {
  userId: string;
  name: string;
  role: string;
  joinedAt: number;
} 

// types/project.ts
// export type ProjectStatus = 'active' | 'completed' | 'on-hold';
export type ProjectDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type CompensationType = 'paid' | 'unpaid' | 'negotiable';

export interface ProjectLink {
  title: string;
  url: string;
}

// export interface ProjectMember {
//   userId: string;
//   name: string;
//   // role: string;
//   avatar?: string;
// }

export interface ProjectApplication {
  id?: string;
  userId: string;
  userName: string;
  projectId: string;
  projectTitle: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: number;
  projectOwnerId: string; // Add this property
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
  // links: ProjectLink[];
  members: ProjectMember[];
  applications: ProjectApplication[];
  userId: string;
  // createdAt: number;
  projectOwnerId: string;
  lastUpdated: number;
}




// types/chat.ts
// import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  // name: string;
  photoURL?: string;
  email: string;
  status: {
    online: boolean;
    lastSeen: Timestamp;
  };
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Timestamp;
  // type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  read: boolean;
  replyTo?: {
    id: string;
    content: string;
    senderId: string;
  };
  reactions: Record<string, string>;
  mentions?: string[];
}

export interface ChatRoom {
  id: string;
  // participants: string[];
  lastMessage: Message | null;
  unreadCount: number;
  updatedAt: Timestamp;
  typingUsers: string[];
}

// Type aliases for common settings
export type VisibilitySetting = 'public' | 'private' | 'followers' | 'friendsOnly';
export type AccountType = 'personal' | 'creator' | 'business' | 'organization' | 'verified';
