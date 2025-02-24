// app/createProject/page.tsx
"use client";
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PlusCircle, X, Upload, Loader2, Tags, Calendar, FolderIcon } from 'lucide-react';
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
import { toast, useToast } from '@/hooks/use-toast';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth, User } from '@/lib/firebase';
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
import { useRouter } from 'next/navigation';
import { uploadToCloudinary } from '../../../utils/cloudinary';

// Enhanced schema with new fields
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  teamSize: z.number().min(1, 'Team size must be at least 1'),
  category: z.string().min(1, 'Category is required'),
  skills: z.array(z.string()),
  deadline: z.string().optional(),
  estimatedDuration: z.string().min(1, 'Estimated duration is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  compensation: z.object({
    type: z.enum(['Paid', 'Unpaid', 'Negotiable']),
    amount: z.string().optional(),
  }),
  status: z.literal('Open'),
  links: z.array(z.object({
    title: z.string(),
    url: z.string().url('Invalid URL')
  })),
  tags: z.array(z.string()),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const categories = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'ai', label: 'AI/ML' },
  { value: 'design', label: 'Design' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'gamedev', label: 'Game Development' },
  { value: 'other', label: 'Other' }
];

const difficulties = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

const compensationTypes = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Negotiable', label: 'Negotiable' }
];

export default function CreateProject() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      teamSize: 1,
      category: '',
      skills: [],
      status: 'Open',
      links: [],
      tags: [],
      difficulty: 'Intermediate',
      compensation: {
        type: 'Negotiable',
        amount: ''
      },
      estimatedDuration: ''
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
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

  const addTag = () => {
    if (currentTag && !form.getValues('tags').includes(currentTag)) {
      const currentTags = form.getValues('tags');
      form.setValue('tags', [...currentTags, currentTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

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

      const projectData = {
        userId: auth.currentUser.uid,
        ...data,
        imageUrl,
        currentMembers: 1,
        members: [],
        createdAt: Date.now(),
        views: 0,
        applications: [],
        lastUpdated: Date.now()
      };

      const docRef = await addDoc(collection(db, 'projects'), projectData);
      
      toast({
        title: "Success",
        description: "Project created successfully"
      });

      router.push(`/project/${docRef.id}`);
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
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
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
            </div>

            {/* Project Details */}
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

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Duration</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 2 weeks, 3 months" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Compensation */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="compensation.type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compensation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {compensationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('compensation.type') === 'Paid' && (
                <FormField
                  control={form.control}
                  name="compensation.amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compensation Amount</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., $500, $20/hr" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add tags"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag}>
                  <Tags className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch('tags').map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
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
                 // Continuing CreateProject page.tsx
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
