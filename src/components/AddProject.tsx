// // components/forms/AddProject.tsx
// import { useState } from "react";
// import { auth, db, storage } from "@/lib/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import type { Project } from "../../types/user";

// export function AddProject({ onProjectCreated }: { onProjectCreated: (project: Project) => void }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [links, setLinks] = useState<{ title: string; url: string }[]>([{ title: "", url: "" }]);
//   const [loading, setLoading] = useState(false);

//   const addLink = () => setLinks([...links, { title: "", url: "" }]);

//   const updateLink = (index: number, field: "title" | "url", value: string) => {
//     const newLinks = [...links];
//     newLinks[index][field] = value;
//     setLinks(newLinks);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!auth.currentUser) return;

//     setLoading(true);
//     try {
//       let imageUrl;
//       if (image) {
//         const imageRef = ref(storage, `projects/${auth.currentUser.uid}/${Date.now()}`);
//         await uploadBytes(imageRef, image);
//         imageUrl = await getDownloadURL(imageRef);
//       }

//       const projectData: Omit<Project, "id"> = {
//         userId: auth.currentUser.uid,
//         title,
//         description,
//         imageUrl,
//         links: links.filter(link => link.title && link.url),
//         createdAt: Date.now()
//       };

//       const docRef = await addDoc(collection(db, "projects"), projectData);
//       onProjectCreated({ ...projectData, id: docRef.id } as Project);
      
//       setTitle("");
//       setDescription("");
//       setImage(null);
//       setLinks([{ title: "", url: "" }]);
//       toast({ title: "Success", description: "Project created successfully" });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="p-4 mb-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           placeholder="Project Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <Textarea
//           placeholder="Project Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <Input
//           type="file"
//           accept="image/*"
//           onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
//         />
//         {links.map((link, index) => (
//           <div key={index} className="flex gap-2">
//             <Input
//               placeholder="Link Title"
//               value={link.title}
//               onChange={(e) => updateLink(index, "title", e.target.value)}
//             />
//             <Input
//               placeholder="URL"
//               value={link.url}
//               onChange={(e) => updateLink(index, "url", e.target.value)}
//             />
//           </div>
//         ))}
//         <Button type="button" variant="outline" onClick={addLink}>
//           Add Link
//         </Button>
//         <Button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Project"}
//         </Button>
//       </form>
//     </Card>
//   );
// }

"use client";
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PlusCircle, X, Upload, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { EnhancedProject, ProjectMember, ProjectLink } from './../../types/user';
import { uploadToCloudinary } from './../../utils/cloudinary';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  teamSize: z.number().min(1, 'Team size must be at least 1'),
  category: z.string().min(1, 'Category is required'),
  skills: z.array(z.string()),
  deadline: z.string().optional(),
  status: z.literal('Open'),
  links: z.array(z.object({
    title: z.string(),
    url: z.string().url('Invalid URL')
  }))
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const categories = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'ai', label: 'AI/ML' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' }
];

export function AddProject({ 
  onProjectCreated 
}: { 
  onProjectCreated: (project: EnhancedProject) => void 
}) {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      teamSize: 1,
      category: '',
      skills: [],
      status: 'Open',
      links: []
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive"
        });
        return;
      }
      setImage(file);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const onSubmit = async (data: ProjectFormValues) => {
    if (!auth.currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to create a project",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl;
      if (image) {
        const imageData = await uploadToCloudinary(image, 'projects');
        imageUrl = imageData?.url;
      }

      const projectData: Omit<EnhancedProject, 'id'> = {
        userId: auth.currentUser.uid,
        ...data,
        imageUrl,
        currentMembers: 1,
        members: [] as ProjectMember[],
        createdAt: Date.now()
      };

      const docRef = await addDoc(collection(db, 'projects'), projectData);
      onProjectCreated({ ...projectData, id: docRef.id } as EnhancedProject);
      
      form.reset();
      setImage(null);
      
      toast({
        title: "Success",
        description: "Project created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter project title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Project Image</FormLabel>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
              >
                <input {...getInputProps()} />
                {image ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{image.name}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {isDragActive
                        ? "Drop the image here"
                        : "Drag 'n' drop a project image, or click to select"}
                    </p>
                  </>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your project"
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Project Links</FormLabel>
              {form.watch('links')?.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`links.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Link Title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`links.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="URL" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const currentLinks = form.getValues('links');
                      form.setValue('links', currentLinks.filter((_, i) => i !== index));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentLinks = form.getValues('links');
                  form.setValue('links', [...currentLinks, { title: '', url: '' }]);
                }}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Project...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}