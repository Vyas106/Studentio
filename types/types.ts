
// types.ts
interface UserInfo {
    id: string;
    name: string;
    college: string;
    course?: string;
    email: string;
    enrollment?: string;
    semester?: string;
    skills?: string[];
    photoURL?: string;
    yearOfStudy?: string;
    department?: string;
    lastActive?: number;
    status?: 'online' | 'offline' | 'away';
  }
  
  interface FilterOptions {
    college: string;
    course: string;
    yearOfStudy: string;
    department: string;
  }
  
  
  