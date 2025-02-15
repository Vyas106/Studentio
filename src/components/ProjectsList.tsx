// ts/lists/ProjectsList.tsx
import { Card } from "@/components/ui/card";
import type { Project } from "../../types/user";

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <span className="text-sm text-gray-500">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="rounded-lg max-h-60 object-cover"
              />
            )}
            <p className="text-gray-600">{project.description}</p>
            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
