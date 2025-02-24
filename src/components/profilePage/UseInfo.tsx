
  // import React, { useState, useEffect } from "react";
  // import { auth, db, doc, updateDoc } from "@/lib/firebase";
  // import { toast } from '@/hooks/use-toast';
  // import { useFollow } from '@/hooks/useFollow';
  // import { Button } from "@/components/ui/button";
  // import { Card, CardHeader, CardContent } from "@/components/ui/card";
  // import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
  // import { Input } from "@/components/ui/input";
  // import { Textarea } from "@/components/ui/textarea";
  // import { LoadingSpinner } from "@/components/LoadingSpinner";
  // import { MessageButton } from "@/components/MessageButton";
  // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
  // import {
  //   Tabs,
  //   TabsContent,
  //   TabsList,
  //   TabsTrigger,
  // } from "@/components/ui/tabs";
  // import { 
  //   Pencil, Plus, Share2, GithubIcon, LinkedinIcon, TwitterIcon, 
  //   Instagram, Globe, Youtube, BookOpen, School, Briefcase, X,
  //   Camera, Link as LinkIcon
  // } from 'lucide-react';

  // // Types
  // interface Education {
  //   id: string;
  //   institution: string;
  //   course: string;
  //   semester?: string;
  //   startDate: string;
  //   endDate?: string;
  // }

  // interface SocialLinks {
  //   twitter?: string;
  //   linkedin?: string;
  //   github?: string;
  //   instagram?: string;
  //   website?: string;
  //   youtube?: string;
  // }

  // interface UserProfile {
  //   uid: string;
  //   name: string;
  //   username: string;
  //   headline?: string;
  //   bio?: string;
  //   photoURL?: string;
  //   skills?: string[];
  //   followers?: string[];
  //   following?: string[];
  //   education?: Education[];
  //   socialLinks?: SocialLinks;
  //   coverPhotoURL?: string;
  // }

  // interface UserInfoProps {
  //   user: UserProfile;
  //   isOwnProfile: boolean;
  // }

  // // Cloudinary upload function
  // const uploadToCloudinary = async (file: File, uploadPreset: string = 'user_uploads'): Promise<string> => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', uploadPreset);
    
  //   try {
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
  //       {
  //         method: 'POST',
  //         body: formData
  //       }
  //     );
      
  //     if (!response.ok) throw new Error('Upload failed');
      
  //     const data = await response.json();
  //     return data.secure_url;
  //   } catch (error) {
  //     console.error('Cloudinary upload error:', error);
  //     throw error;
  //   }
  // };

  // // Main component
  // export function UserInfo({ user, isOwnProfile }: UserInfoProps) {
  //   const [editing, setEditing] = useState(false);
  //   const [saving, setSaving] = useState(false);
  //   const [activeTab, setActiveTab] = useState("about");
  //   const [showImageDialog, setShowImageDialog] = useState(false);
  //   const [editForm, setEditForm] = useState<UserProfile>({
  //     ...user,
  //     skills: user.skills || [],
  //     education: user.education || [],
  //     socialLinks: user.socialLinks || {}
  //   });
    
  //   const [newPhoto, setNewPhoto] = useState<File | null>(null);
  //   const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  //   const [newSkill, setNewSkill] = useState("");
  //   const { isFollowing, loading, toggleFollow } = useFollow(user.uid);
  //   const [uploadProgress, setUploadProgress] = useState(0);

  //   // Image preview URLs
  //   const [photoPreview, setPhotoPreview] = useState(user.photoURL);
  //   const [coverPreview, setCoverPreview] = useState(user.coverPhotoURL);

  //   useEffect(() => {
  //     setEditForm({
  //       ...user,
  //       skills: user.skills || [],
  //       education: user.education || [],
  //       socialLinks: user.socialLinks || {}
  //     });
  //     setPhotoPreview(user.photoURL);
  //     setCoverPreview(user.coverPhotoURL);
  //   }, [user]);

  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
  //     if (e.target.files?.[0]) {
  //       const file = e.target.files[0];
  //       if (file.size > 5 * 1024 * 1024) {
  //         toast({
  //           title: "Error",
  //           description: "Image size should be less than 5MB",
  //           variant: "destructive",
  //         });
  //         return;
  //       }

  //       // Create preview
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         if (type === 'profile') {
  //           setPhotoPreview(reader.result as string);
  //           setNewPhoto(file);
  //         } else {
  //           setCoverPreview(reader.result as string);
  //           setNewCoverPhoto(file);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const handleSave = async () => {
  //     setSaving(true);
  //     setUploadProgress(0);
      
  //     try {
  //       let photoURL = user.photoURL;
  //       let coverPhotoURL = user.coverPhotoURL;

  //       // Upload profile photo if changed
  //       if (newPhoto) {
  //         try {
  //           setUploadProgress(20);
  //           photoURL = await uploadToCloudinary(newPhoto);
  //           setUploadProgress(60);
  //         } catch (error) {
  //           toast({
  //             title: "Error",
  //             description: "Failed to upload profile photo",
  //             variant: "destructive",
  //           });
  //           return;
  //         }
  //       }

  //       // Upload cover photo if changed
  //       if (newCoverPhoto) {
  //         try {
  //           setUploadProgress(70);
  //           coverPhotoURL = await uploadToCloudinary(newCoverPhoto);
  //           setUploadProgress(90);
  //         } catch (error) {
  //           toast({
  //             title: "Error",
  //             description: "Failed to upload cover photo",
  //             variant: "destructive",
  //           });
  //           return;
  //         }
  //       }

  //       const updatedData = {
  //         ...editForm,
  //         photoURL,
  //         coverPhotoURL,
  //         updatedAt: Date.now()
  //       };

  //       const userRef = doc(db, "users", user.uid);
  //       await updateDoc(userRef, updatedData);
  //       setUploadProgress(100);

  //       setEditing(false);
  //       toast({
  //         title: "Success",
  //         description: "Profile updated successfully",
  //       });
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "Failed to update profile",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setSaving(false);
  //       setUploadProgress(0);
  //     }
  //   };

  //   // Rest of the component implementation remains similar but with enhanced UI
  //   return (
  //     <div className="max-w-4xl mx-auto space-y-6 p-4">
  //       {/* Cover Photo & Profile Section */}
  //       <Card className="border-0 shadow-lg overflow-hidden">
  //         <div className="relative h-48 md:h-64">
  //           <div 
  //             className="absolute inset-0 bg-cover bg-center"
  //             style={{ 
  //               backgroundImage: `url(${coverPreview || '/default-cover.jpg'})`,
  //               backgroundColor: '#1e40af'
  //             }}
  //           />
  //           {editing && (
  //             <Button
  //               variant="outline"
  //               className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
  //               onClick={() => setShowImageDialog(true)}
  //             >
  //               <Camera className="w-4 h-4 mr-2" />
  //               Change Cover
  //             </Button>
  //           )}
  //         </div>

  //         <CardContent className="relative -mt-20 p-6">
  //           <div className="flex flex-col md:flex-row md:items-end md:justify-between">
  //             <div className="flex items-end space-x-4">
  //               <div className="relative">
  //                 <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
  //                   <AvatarImage src={photoPreview} />
  //                   <AvatarFallback>{user.name?.[0]}</AvatarFallback>
  //                 </Avatar>
  //                 {editing && (
  //                   <Button
  //                     variant="outline"
  //                     size="sm"
  //                     className="absolute bottom-0 right-0 rounded-full p-1"
  //                     onClick={() => setShowImageDialog(true)}
  //                   >
  //                     <Camera className="w-4 h-4" />
  //                   </Button>
  //                 )}
  //               </div>
                
  //               <div className="space-y-1">
  //                 <h2 className="text-2xl font-bold">{user.name}</h2>
  //                 <p className="text-gray-600">@{user.username}</p>
  //                 {user.headline && (
  //                   <p className="text-gray-600 text-sm">{user.headline}</p>
  //                 )}
  //               </div>
  //             </div>

  //             <div className="mt-4 md:mt-0 flex gap-3">
  //               {!isOwnProfile ? (
  //                 <>
  //                   <Button
  //                     onClick={toggleFollow}
  //                     variant={isFollowing ? "outline" : "default"}
  //                     disabled={loading}
  //                     className="w-32"
  //                   >
  //                     {loading ? <LoadingSpinner /> : isFollowing ? "Following" : "Follow"}
  //                   </Button>
  //                   <MessageButton userId={user.uid} userName={user.name} />
  //                   <Button variant="outline">
  //                     <Share2 className="w-4 h-4" />
  //                   </Button>
  //                 </>
  //               ) : editing ? (
  //                 <>
  //                   <Button 
  //                     onClick={handleSave} 
  //                     disabled={saving}
  //                     className="w-32"
  //                   >
  //                     {saving ? (
  //                       <div className="flex items-center space-x-2">
  //                         <LoadingSpinner />
  //                         <span>{uploadProgress}%</span>
  //                       </div>
  //                     ) : (
  //                       "Save Changes"
  //                     )}
  //                   </Button>
  //                   <Button 
  //                     onClick={() => setEditing(false)} 
  //                     variant="outline"
  //                   >
  //                     Cancel
  //                   </Button>
  //                 </>
  //               ) : (
  //                 <Button 
  //                   onClick={() => setEditing(true)} 
  //                   variant="outline"
  //                   className="w-32"
  //                 >
  //                   <Pencil className="w-4 h-4 mr-2" />
  //                   Edit Profile
  //                 </Button>
  //               )}
  //             </div>
  //           </div>

  //           {/* Stats */}
  //           <div className="mt-6 flex space-x-8 text-sm">
  //             <div className="text-center">
  //               <div className="font-bold text-xl">{user.followers?.length || 0}</div>
  //               <div className="text-gray-600">Followers</div>
  //             </div>
  //             <div className="text-center">
  //               <div className="font-bold text-xl">{user.following?.length || 0}</div>
  //               <div className="text-gray-600">Following</div>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>

  //       {/* Tabs for different sections */}
  //       <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
  //         <TabsList className="w-full justify-start">
  //           <TabsTrigger value="about">About</TabsTrigger>
  //           <TabsTrigger value="education">Education</TabsTrigger>
  //           <TabsTrigger value="skills">Skills</TabsTrigger>
  //           <TabsTrigger value="social">Social</TabsTrigger>
  //         </TabsList>

  //         <TabsContent value="about" className="mt-6">
  //           <Card>
  //             <CardContent className="pt-6">
  //               {editing ? (
  //                 <Textarea
  //                   value={editForm.bio || ""}
  //                   onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
  //                   placeholder="Write about yourself..."
  //                   className="min-h-[150px]"
  //                 />
  //               ) : (
  //                 <p className="text-gray-600 whitespace-pre-wrap">
  //                   {user.bio || "No bio available"}
  //                 </p>
  //               )}
  //             </CardContent>
  //           </Card>
  //         </TabsContent>

  //         {/* Education, Skills, and Social tabs implementation... */}
  //       </Tabs>

  //       {/* Image Upload Dialog */}
  //       <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
  //         <DialogContent>
  //           <DialogHeader>
  //             <DialogTitle>Update Profile Images</DialogTitle>
  //           </DialogHeader>
  //           <div className="space-y-4">
  //             <div>
  //               <label className="block text-sm font-medium mb-2">
  //                 Profile Photo
  //               </label>
  //               <Input
  //                 type="file"
  //                 accept="image/*"
  //                 onChange={(e) => handleImageChange(e, 'profile')}
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium mb-2">
  //                 Cover Photo
  //               </label>
  //               <Input
  //                 type="file"
  //                 accept="image/*"
  //                 onChange={(e) => handleImageChange(e, 'cover')}
  //               />
  //             </div>
  //           </div>
  //         </DialogContent>
  //       </Dialog>
  //     </div>
  //   );
  // }