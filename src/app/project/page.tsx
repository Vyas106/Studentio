// // app/explore/page.tsx
// "use client";
// import { useState, useEffect } from 'react';
// import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { ProjectCard } from '@/components/ProjectCard';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { useAuth } from '../../../utils/hooks/useAuth';
// import { Loader2 } from 'lucide-react';
// import type { EnhancedProject, Project } from '../../../types/user';
// import Navbar from '@/components/Navbar';
// import Space from '@/components/space';

// const CATEGORIES = [
//   { value: 'all', label: 'All Categories' },
//   { value: 'web development', label: 'Web Development' },
//   { value: 'software engineering', label: 'Software Engineering' },
//   { value: 'data science', label: 'Data Science' },
//   { value: 'machine learning', label: 'Machine Learning' },
//   { value: 'ai', label: 'AI' },
//   { value: 'blockchain', label: 'Blockchain' },
// ] as const;

// const DIFFICULTIES = [
//   { value: 'all', label: 'All Difficulties' },
//   { value: 'beginner', label: 'Beginner' },
//   { value: 'intermediate', label: 'Intermediate' },
//   { value: 'advanced', label: 'Advanced' },
// ] as const;

// export default function ExplorePage() {
//   const [projects, setProjects] = useState<EnhancedProject[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedDifficulty, setSelectedDifficulty] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchProjects();
//   }, [selectedCategory, selectedDifficulty]);

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       let projectQuery = query(
//         collection(db, 'projects'),
//         orderBy('createdAt', 'desc')
//       );

//       if (selectedCategory !== 'all') {
//         projectQuery = query(
//           projectQuery, 
//           where('category', '==', selectedCategory)
//         );
//       }

//       if (selectedDifficulty !== 'all') {
//         projectQuery = query(
//           projectQuery, 
//           where('difficulty', '==', selectedDifficulty)
//         );
//       }

//       const querySnapshot = await getDocs(projectQuery);
//       const projectsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Project[];

//       setProjects(projectsData);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredProjects = projects.filter(project =>
//     project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     project.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-8">Explore Projects</h1>

//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         <Input
//           placeholder="Search projects..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="md:w-1/3"
//         />
        
//         <Select
//           value={selectedCategory}
//           onValueChange={setSelectedCategory}
//         >
//           <SelectTrigger className="md:w-1/4">
//             <SelectValue placeholder="Filter by category" />
//           </SelectTrigger>
//           <SelectContent>
//             {CATEGORIES.map((category) => (
//               <SelectItem key={category.value} value={category.value}>
//                 {category.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select
//           value={selectedDifficulty}
//           onValueChange={setSelectedDifficulty}
//         >
//           <SelectTrigger className="md:w-1/4">
//             <SelectValue placeholder="Filter by difficulty" />
//           </SelectTrigger>
//           <SelectContent>
//             {DIFFICULTIES.map((difficulty) => (
//               <SelectItem key={difficulty.value} value={difficulty.value}>
//                 {difficulty.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <Loader2 className="h-8 w-8 animate-spin" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProjects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               project={project}
//               currentUser={user}
//             />
//           ))}
//         </div>
//       )}

      
// <Space />
//           <Navbar />
//     </div>
//   );
// }