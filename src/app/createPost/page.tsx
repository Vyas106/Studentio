
// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { Camera, X, Loader2, ImagePlus } from 'lucide-react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList
// } from "@/components/ui/command";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// export default function CreatePostPage() {
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [hashtags, setHashtags] = useState<string[]>([]);
//   const [suggestedTags, setSuggestedTags] = useState(['travel', 'food', 'nature', 'fashion', 'art']);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (image) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(image);
//     }
//   }, [image]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate post creation
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setLoading(false);
//     setContent('');
//     setImage(null);
//     setHashtags([]);
//   };

//   const insertHashtag = (tag: string) => {
//     const newContent = content + ` #${tag} `;
//     setContent(newContent);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-2xl mx-auto">
//         <Card className="border-0 shadow-lg">
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold text-center">Create New Post</CardTitle>
//             <Separator />
//           </CardHeader>
          
//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-6 p-6">
//               {!imagePreview ? (
//                 <div 
//                   className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <ImagePlus className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//                   <p className="text-gray-600 font-medium">Upload your photo</p>
//                   <p className="text-gray-400 text-sm mt-1">Click to select or drag and drop</p>
//                 </div>
//               ) : (
//                 <div className="relative rounded-lg overflow-hidden">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="w-full object-cover max-h-[500px]"
//                   />
//                   <Button
//                     variant="destructive"
//                     size="icon"
//                     className="absolute top-2 right-2"
//                     onClick={() => {
//                       setImage(null);
//                       setImagePreview(null);
//                     }}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) setImage(file);
//                 }}
//                 className="hidden"
//               />

//               <div className="space-y-4">
//                 <Textarea
//                   ref={textareaRef}
//                   placeholder="Write a caption..."
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   className="min-h-[120px] resize-none text-lg"
//                 />

//                 <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
//                   <PopoverTrigger asChild>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       className="w-full"
//                       onClick={() => setShowSuggestions(true)}
//                     >
//                       Add hashtags
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-full p-0" align="start">
//                     <Command>
//                       <CommandInput placeholder="Search hashtags..." />
//                       <CommandList>
//                         <CommandEmpty>No hashtags found.</CommandEmpty>
//                         <CommandGroup>
//                           <ScrollArea className="h-48">
//                             {suggestedTags.map((tag) => (
//                               <CommandItem
//                                 key={tag}
//                                 onSelect={() => insertHashtag(tag)}
//                                 className="cursor-pointer"
//                               >
//                                 #{tag}
//                               </CommandItem>
//                             ))}
//                           </ScrollArea>
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               {hashtags.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {hashtags.map(tag => (
//                     <span
//                       key={tag}
//                       className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </CardContent>

//             <CardFooter>
//               <Button 
//                 type="submit" 
//                 className="w-full bg-blue-600 hover:bg-blue-700"
//                 disabled={loading || !content.trim() || !image}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Sharing...
//                   </>
//                 ) : (
//                   'Share'
//                 )}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, ImagePlus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AddPost } from '@/components/AddPost';

export default function CreatePostPage() {
  const router = useRouter();
  const [, setActiveTab] = useState('post');
  const [userId] = useState('user123'); // Replace with actual user ID from your auth system

  const handlePostCreated = () => {
    router.push('/feed'); // Or wherever you want to redirect after post creation
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="border-0 shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Create New Post</h1>
            <div className="w-8" /> {/* Spacer for alignment */}
          </div>

          <Tabs defaultValue="post" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 gap-4 p-4">
              <TabsTrigger value="post" className="data-[state=active]:bg-blue-100">
                <ImagePlus className="h-5 w-5 mr-2" />
                Post
              </TabsTrigger>
              <TabsTrigger value="story" className="data-[state=active]:bg-blue-100">
                <Camera className="h-5 w-5 mr-2" />
                Story
              </TabsTrigger>
            </TabsList>

            <Separator />

            <TabsContent value="post" className="mt-0">
              <CardContent className="p-6">
                <AddPost
                  userId={userId}
                  onPostCreated={() => {
                    handlePostCreated();
                  }}
                />
              </CardContent>
            </TabsContent>

            <TabsContent value="story" className="mt-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <Camera className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">Story Creation Coming Soon</p>
                  <p className="mt-2">This feature is under development</p>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Instagram-style Guide */}
        <div className="mt-8 text-center text-sm text-gray-500 space-y-2">
          <p>Share your moments with your community</p>
          <div className="flex justify-center gap-4 text-xs">
            <span>• Photos up to 5MB</span>
            <span>• Add hashtags</span>
            <span>• Tag people</span>
          </div>
        </div>
      </div>
    </div>
  );
}