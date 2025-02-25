// app/explore/page.tsx
"use client";
import { useState, useEffect, useMemo } from 'react';
import { collection, query, orderBy, where, getDocs, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProjectCard } from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../../utils/hooks/useAuth';
import { Loader, Search, RefreshCw, Loader2 } from 'lucide-react';
import type { Project } from '../../../types/project';
import Navbar from '@/components/Navbar';
import Space from '@/components/space';
import { toast } from '@/hooks/use-toast';
import { EnhancedProject } from '../../../types/user';

// Convert project difficulty to match EnhancedProject type
const convertProjectDifficulty = (difficulty: string): 'Beginner' | 'Intermediate' | 'Advanced' => {
  const difficultyMap = {
    'beginner': 'Beginner',
    'intermediate': 'Intermediate',
    'advanced': 'Advanced'
  } as const;
  return difficultyMap[difficulty as keyof typeof difficultyMap];
};

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'web development', label: 'Web Development' },
  { value: 'software engineering', label: 'Software Engineering' },
  { value: 'data science', label: 'Data Science' },
  { value: 'machine learning', label: 'Machine Learning' },
  { value: 'ai', label: 'AI' },
  { value: 'blockchain', label: 'Blockchain' },
] as const;

const DIFFICULTIES = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const;

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'Planning', label: 'Planning' },
  { value: 'Open', label: 'Open' },
  { value: 'Active', label: 'Active' },
  { value: 'On_hold', label: 'On Hold' },
  { value: 'Completed', label: 'Completed' },
] as const;

export default function ExplorePage() {
  const [projects, setProjects] = useState<EnhancedProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();



  

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const constraints: QueryConstraint[] = [orderBy('lastUpdated', 'desc')];

      if (selectedCategory !== 'all') {
        constraints.push(where('category', '==', selectedCategory));
      }
      if (selectedDifficulty !== 'all') {
        constraints.push(where('difficulty', '==', selectedDifficulty.toLowerCase()));
      }
      if (selectedStatus !== 'all') {
        constraints.push(where('status', '==', selectedStatus));
      }

      const projectQuery = query(collection(db, 'projects'), ...constraints);
      const querySnapshot = await getDocs(projectQuery);
      
      const projectsData = querySnapshot.docs.map(doc => {
        const data = doc.data() as Project;
        return {
          ...data,
          id: doc.id,
          difficulty: convertProjectDifficulty(data.difficulty)
        };
      });

      setProjects(projectsData as []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, selectedDifficulty, selectedStatus]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [projects, searchTerm]);

  const handleRefresh = () => {
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-black">
            Explore Projects
          </h1>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((difficulty) => (
                <SelectItem key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <p className="text-red-500">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              Try Again
            </Button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <p className="text-gray-500">No projects found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                currentUser={user}
              />
            ))}
          </div>
        )}

        <Space />
        <Navbar />
      </div>
    </div>
  );
}
