"use client"; // Required for client-side interactivity in Next.js

import { useEffect, useState } from "react";
import { db } from "./../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Import shadcn/ui Card components
import Image from "next/image";

const YourJoinedProjects = ({ userId }: { userId: string }) => {
  const [joinedProjects, setJoinedProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchJoinedProjects = async () => {
      const projectsRef = collection(db, "applications");
      const q = query(projectsRef, where("members", "array-contains", userId));
      const querySnapshot = await getDocs(q);

      const projects: any[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });

      setJoinedProjects(projects);
    };

    fetchJoinedProjects();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {joinedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Created by: {project.userId}
        </CardDescription>
        <CardDescription className="text-sm text-gray-600">
          College: {project.collegeName}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default YourJoinedProjects;