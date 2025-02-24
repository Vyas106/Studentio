
// // components/UserInfoForm.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db, storage, setDoc, doc, ref, uploadBytes, getDownloadURL } from "@/lib/firebase";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
// import { validateProfileData } from "../../utils/hooks/useAuth";
// import type { UserProfile } from "../../types/user";
// import { LoadingSpinner } from "@/components/LoadingSpinner";

// export default function UserInfoForm() {
//   const [form, setForm] = useState<Partial<UserProfile>>({
//     name: "",
//     college: "",
//     semester: "",
//     enrollment: "",
//     course: "",
//     bio: "",
//     skills: [],
//     socialLinks: {
//       linkedin: "",
//       github: "",
//       twitter: "",
//     }
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is authenticated
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (!user) router.push("/auth/login");
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name.startsWith("social.")) {
//       const social = name.split(".")[1];
//       setForm(prev => ({
//         ...prev,
//         socialLinks: {
//           ...prev.socialLinks,
//           [social]: value
//         }
//       }));
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//     // Clear error when field is modified
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const file = e.target.files[0];
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         toast({
//           title: "Error",
//           description: "Image size should be less than 5MB",
//           variant: "destructive",
//         });
//         return;
//       }
//       setPhoto(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate form data
//     const validationErrors = validateProfileData(form);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       toast({
//         title: "Validation Error",
//         description: "Please check the form for errors",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const user = auth.currentUser;
//       if (!user) throw new Error("No user logged in");

//       let photoURL = "";
//       if (photo) {
//         const photoRef = ref(storage, `profile-photos/${user.uid}`);
//         await uploadBytes(photoRef, photo);
//         photoURL = await getDownloadURL(photoRef);
//       }

//       const timestamp = Date.now();
//       const userData: UserProfile = {
//         ...form as UserProfile,
//         uid: user.uid,
//         email: user.email!,
//         photoURL,
//         createdAt: timestamp,
//         updatedAt: timestamp
//       };

//       const userRef = doc(db, "users", user.uid);
//       await setDoc(userRef, userData);

//       toast({
//         title: "Success!",
//         description: "Your profile has been created successfully.",
//       });

//       router.push("/profile");
//     } catch (error) {
//       console.error("Profile creation error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to create profile. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-lg">
//       <CardHeader>
//         <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>
//         <p className="text-gray-600 text-center">Tell us more about yourself</p>
//       </CardHeader>
      
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Profile Photo</label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="w-full"
//               />
//               <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Input
//                   name="name"
//                   placeholder="Full Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className={errors.name ? "border-red-500" : ""}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <Input
//                   name="college"
//                   placeholder="College Name"
//                   value={form.college}
//                   onChange={handleChange}
//                   className={errors.college ? "border-red-500" : ""}
//                 />
//                 {errors.college && (
//                   <p className="text-red-500 text-xs mt-1">{errors.college}</p>
//                 )}
//               </div>

//               <div>
//                 <Input
//                   name="semester"
//                   placeholder="Semester"
//                   value={form.semester}
//                   onChange={handleChange}
//                   className={errors.semester ? "border-red-500" : ""}
//                 />
//                 {errors.semester && (
//                   <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
//                 )}
//                 </div>

// <div>
//   <Input
//     name="enrollment"
//     placeholder="Enrollment No."
//     value={form.enrollment}
//     onChange={handleChange}
//     className={errors.enrollment ? "border-red-500" : ""}
//   />
//   {errors.enrollment && (
//     <p className="text-red-500 text-xs mt-1">{errors.enrollment}</p>
//   )}
// </div>

// <div>
//   <Input
//     name="course"
//     placeholder="Course / Department"
//     value={form.course}
//     onChange={handleChange}
//     className={errors.course ? "border-red-500" : ""}
//   />
//   {errors.course && (
//     <p className="text-red-500 text-xs mt-1">{errors.course}</p>
//   )}
// </div>
// </div>

// <div>
// <Textarea
//   name="bio"
//   placeholder="Tell us about yourself..."
//   value={form.bio}
//   onChange={handleChange}
//   className="h-24 resize-none"
// />
// </div>

// <div className="space-y-2">
// <h3 className="text-lg font-medium">Social Links</h3>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   <div>
//     <Input
//       name="social.linkedin"
//       placeholder="LinkedIn URL"
//       value={form.socialLinks?.linkedin}
//       onChange={handleChange}
//       className={errors['socialLinks.linkedin'] ? "border-red-500" : ""}
//     />
//     {errors['socialLinks.linkedin'] && (
//       <p className="text-red-500 text-xs mt-1">{errors['socialLinks.linkedin']}</p>
//     )}
//   </div>

//   <div>
//     <Input
//       name="social.github"
//       placeholder="GitHub URL"
//       value={form.socialLinks?.github}
//       onChange={handleChange}
//       className={errors['socialLinks.github'] ? "border-red-500" : ""}
//     />
//     {errors['socialLinks.github'] && (
//       <p className="text-red-500 text-xs mt-1">{errors['socialLinks.github']}</p>
//     )}
//   </div>

//   <div>
//     <Input
//       name="social.twitter"
//       placeholder="Twitter URL"
//       value={form.socialLinks?.twitter}
//       onChange={handleChange}
//       className={errors['socialLinks.twitter'] ? "border-red-500" : ""}
//     />
//     {errors['socialLinks.twitter'] && (
//       <p className="text-red-500 text-xs mt-1">{errors['socialLinks.twitter']}</p>
//     )}
//   </div>
// </div>
// </div>
// </div>
// </form>
// </CardContent>

// <CardFooter>
// <Button
// onClick={handleSubmit}
// className="w-full"
// disabled={loading}
// >
// {loading ? (
// <div className="flex items-center gap-2">
// <LoadingSpinner />
// Creating Profile...
// </div>
// ) : (
// "Create Profile"
// )}
// </Button>
// </CardFooter>
// </Card>
// );
// }



// // components/UserInfoForm.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db, storage, setDoc, doc, ref, uploadBytes, getDownloadURL } from "@/lib/firebase";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
// import { validateProfileData } from "../../utils/hooks/useAuth";
// import type { UserProfile } from "../../types/user";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AtSign, Briefcase, BookOpen, Hash, FileText, Github, Linkedin, Twitter } from "lucide-react";

// export default function UserInfoForm() {
//   const [form, setForm] = useState<Partial<UserProfile>>({
//     name: "",
//     college: "",
//     semester: "",
//     enrollment: "",
//     course: "",
//     bio: "",
//     skills: [],
//     socialLinks: {
//       linkedin: "",
//       github: "",
//       twitter: "",
//     }
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const router = useRouter();

//   // useEffect(() => {
//     // Check if user is authenticated
//     // const unsubscribe = auth.onAuthStateChanged((user) => {
//     //   if (!user) router.push("/auth/login");
//     // });

//   //   return () => unsubscribe();
//   // }, [router]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name.startsWith("social.")) {
//       const social = name.split(".")[1];
//       setForm(prev => ({
//         ...prev,
//         socialLinks: {
//           ...prev.socialLinks,
//           [social]: value
//         }
//       }));
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//     // Clear error when field is modified
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const file = e.target.files[0];
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         toast({
//           title: "Error",
//           description: "Image size should be less than 5MB",
//           variant: "destructive",
//         });
//         return;
//       }
//       setPhoto(file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
//     setForm(prev => ({ ...prev, skills: skillsArray }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate form data
//     const validationErrors = validateProfileData(form);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       toast({
//         title: "Validation Error",
//         description: "Please check the form for errors",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const user = auth.currentUser;
//       if (!user) throw new Error("No user logged in");

//       let photoURL = "";
//       if (photo) {
//         const photoRef = ref(storage, `profile-photos/${user.uid}`);
//         await uploadBytes(photoRef, photo);
//         photoURL = await getDownloadURL(photoRef);
//       }

//       const timestamp = Date.now();
//       const userData: UserProfile = {
//         ...form as UserProfile,
//         uid: user.uid,
//         email: user.email!,
//         photoURL,
//         createdAt: timestamp,
//         updatedAt: timestamp
//       };

//       const userRef = doc(db, "users", user.uid);
//       await setDoc(userRef, userData);

//       toast({
//         title: "Success!",
//         description: "Your profile has been created successfully.",
//       });

//       router.push("/profile");
//     } catch (error) {
//       console.error("Profile creation error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to create profile. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 sm:border">
//       <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
//         <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>
//         <p className="text-gray-200 text-center opacity-90">Tell us about yourself to get started</p>
//       </CardHeader>
      
//       <CardContent className="pt-6 px-4 sm:px-6">
//         <form id="profile-form" onSubmit={handleSubmit} className="space-y-8">
//           {/* Photo Upload Section */}
//           <div className="flex flex-col items-center space-y-4">
//             <Avatar className="w-24 h-24 border-4 border-gray-200">
//               <AvatarImage src={photoPreview || undefined} />
//               <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-lg">
//                 {form.name ? form.name.charAt(0).toUpperCase() : 'U'}
//               </AvatarFallback>
//             </Avatar>
            
//             <div className="text-center">
//               <Label htmlFor="photo-upload" className="block text-sm font-medium mb-1 cursor-pointer text-indigo-700 hover:text-indigo-900">
//                 Choose Profile Photo
//               </Label>
//               <Input
//                 id="photo-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="hidden"
//               />
//               <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
//             </div>
//           </div>

//           <Separator className="my-6" />
          
//           {/* Personal Information */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <FileText className="h-5 w-5 text-indigo-600" />
//               Personal Information
//             </h3>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-gray-700">Full Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   placeholder="John Doe"
//                   value={form.name}
//                   onChange={handleChange}
//                   className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? "border-red-500" : ""}`}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="enrollment" className="text-gray-700">Enrollment No.</Label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <Hash className="h-4 w-4 text-gray-500" />
//                   </div>
//                   <Input
//                     id="enrollment"
//                     name="enrollment"
//                     placeholder="EN12345678"
//                     value={form.enrollment}
//                     onChange={handleChange}
//                     className={`pl-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors.enrollment ? "border-red-500" : ""}`}
//                   />
//                 </div>
//                 {errors.enrollment && (
//                   <p className="text-red-500 text-xs mt-1">{errors.enrollment}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="bio" className="text-gray-700">Bio</Label>
//               <Textarea
//                 id="bio"
//                 name="bio"
//                 placeholder="Tell us about yourself, your interests, and your goals..."
//                 value={form.bio}
//                 onChange={handleChange}
//                 className="min-h-24 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 resize-none"
//               />
//             </div>
//           </div>

//           <Separator className="my-6" />

//           {/* Academic Information */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-indigo-600" />
//               Academic Information
//             </h3>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="college" className="text-gray-700">College Name</Label>
//                 <Input
//                   id="college"
//                   name="college"
//                   placeholder="University of Technology"
//                   value={form.college}
//                   onChange={handleChange}
//                   className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors.college ? "border-red-500" : ""}`}
//                 />
//                 {errors.college && (
//                   <p className="text-red-500 text-xs mt-1">{errors.college}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="semester" className="text-gray-700">Current Semester</Label>
//                 <Input
//                   id="semester"
//                   name="semester"
//                   placeholder="3rd Semester"
//                   value={form.semester}
//                   onChange={handleChange}
//                   className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors.semester ? "border-red-500" : ""}`}
//                 />
//                 {errors.semester && (
//                   <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="course" className="text-gray-700">Course / Department</Label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <Briefcase className="h-4 w-4 text-gray-500" />
//                 </div>
//                 <Input
//                   id="course"
//                   name="course"
//                   placeholder="Computer Science and Engineering"
//                   value={form.course}
//                   onChange={handleChange}
//                   className={`pl-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors.course ? "border-red-500" : ""}`}
//                 />
//               </div>
//               {errors.course && (
//                 <p className="text-red-500 text-xs mt-1">{errors.course}</p>
//               )}
//             </div>
//           </div>

//           <Separator className="my-6" />

//           {/* Skills Section */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-indigo-600" />
//               Skills
//             </h3>
            
//             <div className="space-y-2">
//               <Label htmlFor="skills" className="text-gray-700">Your Skills</Label>
//               <Input
//                 id="skills"
//                 name="skills"
//                 placeholder="React, JavaScript, UI Design (comma separated)"
//                 value={form.skills?.join(', ')}
//                 onChange={handleSkillsChange}
//                 className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
//               />
//               <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
//             </div>

//             <div className="flex flex-wrap gap-2 mt-2">
//               {form.skills && form.skills.length > 0 && form.skills.map((skill, index) => (
//                 <Badge key={index} className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <Separator className="my-6" />

//           {/* Social Links */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <AtSign className="h-5 w-5 text-indigo-600" />
//               Social Media Links
//             </h3>
            
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="linkedin" className="text-gray-700 flex items-center gap-2">
//                   <Linkedin className="h-4 w-4 text-blue-700" />
//                   LinkedIn
//                 </Label>
//                 <Input
//                   id="linkedin"
//                   name="social.linkedin"
//                   placeholder="https://linkedin.com/in/yourprofile"
//                   value={form.socialLinks?.linkedin}
//                   onChange={handleChange}
//                   className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors['socialLinks.linkedin'] ? "border-red-500" : ""}`}
//                 />
//                 {errors['socialLinks.linkedin'] && (
//                   <p className="text-red-500 text-xs mt-1">{errors['socialLinks.linkedin']}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="github" className="text-gray-700 flex items-center gap-2">
//                   <Github className="h-4 w-4 text-gray-900" />
//                   GitHub
//                 </Label>
//                 <Input
//                   id="github"
//                   name="social.github"
//                   placeholder="https://github.com/yourusername"
//                   value={form.socialLinks?.github}
//                   onChange={handleChange}
//                   className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors['socialLinks.github'] ? "border-red-500" : ""}`}
//                 />
//                 {errors['socialLinks.github'] && (
//                   <p className="text-red-500 text-xs mt-1">{errors['socialLinks.github']}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="twitter" className="text-gray-700 flex items-center gap-2">
//                   <Twitter className="h-4 w-4 text-blue-500" />
//                   Twitter
//                 </Label>
//                 <Input
//                   id="twitter"
//                   name="social.twitter"
//                   placeholder="https://twitter.com/yourusername"
//                   value={form.socialLinks?.twitter}
//                   onChange={handleChange}
//                   className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${errors['socialLinks.twitter'] ? "border-red-500" : ""}`}
//                 />
//                 {errors['socialLinks.twitter'] && (
//                   <p className="text-red-500 text-xs mt-1">{errors['socialLinks.twitter']}</p>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Form Errors Alert */}
//           {Object.keys(errors).length > 0 && (
//             <Alert className="border-red-300 bg-red-50">
//               <AlertDescription className="text-red-800">
//                 Please fix the errors in the form before submitting.
//               </AlertDescription>
//             </Alert>
//           )}
//         </form>
//       </CardContent>

//       <CardFooter className="bg-gray-50 rounded-b-lg px-4 py-4 sm:px-6">
//         <Button
//           form="profile-form"
//           type="submit"
//           onClick={handleSubmit}
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md transition-all py-6"
//           disabled={loading}
//         >
//           {loading ? (
//             <div className="flex items-center justify-center gap-2">
//               <LoadingSpinner />
//               <span>Creating Your Profile...</span>
//             </div>
//           ) : (
//             <span className="text-base">Complete Your Profile</span>
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

// components/UserInfoForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage, setDoc, doc, ref, uploadBytes, getDownloadURL } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { validateProfileData } from "../../utils/hooks/useAuth";
import type { UserProfile } from "../../types/user";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { 
  AtSign, Briefcase, BookOpen, User, Hash, FileText, Github, 
  Linkedin, Twitter, Camera, ArrowLeft, ArrowRight, Check,
  CheckCircle, Plus, X,  GraduationCap
} from "lucide-react";

export default function UserInfoForm() {
  const [form, setForm] = useState<Partial<UserProfile>>({
    name: "",
    college: "",
    semester: "",
    enrollment: "",
    course: "",
    bio: "",
    skills: [],
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/");
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const social = name.split(".")[1];
      setForm(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [social]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
  //   setForm(prev => ({ ...prev, skills: skillsArray }));
  // };

  const addSkill = (skill: string) => {
    if (skill && !form.skills?.includes(skill)) {
      setForm(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      let validStep = true;
      
      // Validate current step before proceeding
      switch(currentStep) {
        case 1: // Basic info
          if (!form.name || !form.bio) {
            toast({
              title: "Required Fields",
              description: "Please fill in your name and bio",
              variant: "destructive",
            });
            validStep = false;
          }
          break;
        case 2: // Academic info
          if (!form.college || !form.course || !form.semester) {
            toast({
              title: "Required Fields",
              description: "Please complete your academic information",
              variant: "destructive",
            });
            validStep = false;
          }
          break;
        case 3: // Skills
          if (!form.skills || form.skills.length === 0) {
            toast({
              title: "Skills Required",
              description: "Please add at least one skill",
              variant: "destructive",
            });
            validStep = false;
          }
          break;
      }
      
      if (validStep) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const getStepTitle = (step: number) => {
    switch(step) {
      case 1: return "Personal Information";
      case 2: return "Education Details";
      case 3: return "Skills & Expertise";
      case 4: return "Social Profiles";
      default: return "";
    }
  };

  const getStepIcon = (step: number) => {
    switch(step) {
      case 1: return <User className="h-5 w-5" />;
      case 2: return <GraduationCap className="h-5 w-5" />;
      case 3: return <Briefcase className="h-5 w-5" />;
      case 4: return <AtSign className="h-5 w-5" />;
      default: return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationErrors = validateProfileData(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      let photoURL = "";
      if (photo) {
        const photoRef = ref(storage, `profile-photos/${user.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      const timestamp = Date.now();
      const userData: UserProfile = {
        ...form as UserProfile,
        uid: user.uid,
        email: user.email!,
        photoURL,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userData);

      toast({
        title: "Success!",
        description: "Your profile has been created successfully.",
      });

      router.push("/profile");
    } catch (error) {
      console.error("Profile creation error:", error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Predefined skills for suggestion
  const suggestedSkills = [
    "JavaScript", "React", "HTML/CSS", "Node.js", "Python", 
    "UI/UX Design", "Data Analysis", "Project Management"
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6 md:py-12">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0 rounded-xl overflow-hidden">
        {/* Progress Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={prevStep}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <span className="font-medium text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            
            {currentStep < totalSteps ? (
              <button 
                onClick={nextStep}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowRight className="h-5 w-5 text-gray-600" />
              </button>
            ) : (
              <div className="w-9"></div> 
            )}
          </div>
          
          <Progress value={(currentStep / totalSteps) * 100} className="h-1" />
        </div>

        <CardHeader className="pt-6 pb-0 px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-full">
              {getStepIcon(currentStep)}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{getStepTitle(currentStep)}</h2>
          </div>
          <p className="text-gray-500 text-sm">
            {currentStep === 1 && "Let's get to know you better"}
            {currentStep === 2 && "Tell us about your educational background"}
            {currentStep === 3 && "What are you good at?"}
            {currentStep === 4 && "Connect your social profiles"}
          </p>
        </CardHeader>
        
        <CardContent className="pt-6 px-6">
          <form id="profile-form" onSubmit={e => e.preventDefault()} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Photo Upload */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-4 border-gray-200">
                      <AvatarImage src={photoPreview || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-xl">
                        {form.name ? form.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-colors">
                      <Camera className="h-4 w-4" />
                    </label> */}
                    
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Upload a professional photo</p>
                </div>
                
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Enrollment Field */}
                <div className="space-y-2">
                  <Label htmlFor="enrollment" className="text-gray-700 font-medium">Enrollment No. *</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Hash className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="enrollment"
                      name="enrollment"
                      placeholder="EN12345678"
                      value={form.enrollment}
                      onChange={handleChange}
                      className={`pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.enrollment ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.enrollment && (
                    <p className="text-red-500 text-xs mt-1">{errors.enrollment}</p>
                  )}
                </div>

                {/* Bio Field */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700 font-medium">Professional Summary *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself in a few sentences..."
                    value={form.bio}
                    onChange={handleChange}
                    className="min-h-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    This will appear at the top of your profile
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* College Field */}
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-gray-700 font-medium">
                    College/University *
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="college"
                      name="college"
                      placeholder="University of Technology"
                      value={form.college}
                      onChange={handleChange}
                      className={`pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.college ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.college && (
                    <p className="text-red-500 text-xs mt-1">{errors.college}</p>
                  )}
                </div>

                {/* Course Field */}
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-gray-700 font-medium">Course / Department *</Label>
                  <Input
                    id="course"
                    name="course"
                    placeholder="Computer Science and Engineering"
                    value={form.course}
                    onChange={handleChange}
                    className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.course ? "border-red-500" : ""}`}
                  />
                  {errors.course && (
                    <p className="text-red-500 text-xs mt-1">{errors.course}</p>
                  )}
                </div>

                {/* Semester Field */}
                <div className="space-y-2">
                  <Label htmlFor="semester" className="text-gray-700 font-medium">Current Semester *</Label>
                  <Input
                    id="semester"
                    name="semester"
                    placeholder="3rd Semester"
                    value={form.semester}
                    onChange={handleChange}
                    className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.semester ? "border-red-500" : ""}`}
                  />
                  {errors.semester && (
                    <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
                  )}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Why this matters</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Your educational background helps connect you with classmates and alumni from your institution.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Skills */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="skills" className="text-gray-700 font-medium">Your Skills *</Label>
                    <span className="text-xs text-gray-500">{form.skills?.length || 0} added</span>
                  </div>
                  
                  <div className="relative">
                    <Input
                      id="new-skill"
                      placeholder="Add a skill..."
                      className="pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          addSkill(input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-blue-600"
                      onClick={() => {
                        const input = document.getElementById('new-skill') as HTMLInputElement;
                        addSkill(input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Your skills</h4>
                    
                    {form.skills && form.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {form.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            className="bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition-colors py-1 px-2 flex items-center gap-1"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No skills added yet</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Suggested skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className={`text-xs py-1 px-3 rounded-full border transition-colors ${
                            form.skills?.includes(skill)
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                          disabled={form.skills?.includes(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Social Links */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-gray-700 font-medium flex items-center gap-2">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      name="social.linkedin"
                      placeholder="linkedin.com/in/username"
                      value={form.socialLinks?.linkedin}
                      onChange={handleChange}
                      className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors['socialLinks.linkedin'] ? "border-red-500" : ""}`}
                    />
                    {errors['socialLinks.linkedin'] && (
                      <p className="text-red-500 text-xs mt-1">{errors['socialLinks.linkedin']}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-gray-700 font-medium flex items-center gap-2">
                      <Github className="h-5 w-5 text-gray-900" />
                      GitHub Profile
                    </Label>
                    <Input
                      id="github"
                      name="social.github"
                      placeholder="github.com/username"
                      value={form.socialLinks?.github}
                      onChange={handleChange}
                      className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors['socialLinks.github'] ? "border-red-500" : ""}`}
                    />
                    {errors['socialLinks.github'] && (
                      <p className="text-red-500 text-xs mt-1">{errors['socialLinks.github']}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-gray-700 font-medium flex items-center gap-2">
                      <Twitter className="h-5 w-5 text-blue-500" />
                      Twitter Profile
                    </Label>
                    <Input
                      id="twitter"
                      name="social.twitter"
                      placeholder="twitter.com/username"
                      value={form.socialLinks?.twitter}
                      onChange={handleChange}
                      className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors['socialLinks.twitter'] ? "border-red-500" : ""}`}
                    />
                    {errors['socialLinks.twitter'] && (
                      <p className="text-red-500 text-xs mt-1">{errors['socialLinks.twitter']}</p>
                    )}
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-green-800">Almost there!</h4>
                        <p className="text-xs text-green-700 mt-1">
                          Adding your social profiles makes it easier for others to connect with you across platforms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Form Errors Alert */}
            {Object.keys(errors).length > 0 && (
              <Alert className="border-red-300 bg-red-50">
                <AlertDescription className="text-red-800 text-sm">
                  Please fix the errors in the form before submitting.
                </AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>

        <CardFooter className="bg-white border-t border-gray-200 p-4 md:p-6">
          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all py-6"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all py-6"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  <span>Creating Your Profile...</span>
                </div>
              ) : (
                <span className="font-medium">Complete Profile</span>
              )}
            </Button>
          )}
          
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="w-full mt-3 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              Go Back
            </button>
          )}
        </CardFooter>
      </Card>

      {/* Profile Completion Steps */}
      <div className="max-w-md mx-auto mt-6">
        <div className="flex justify-between items-center px-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              onClick={() => setCurrentStep(index + 1)}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  index + 1 === currentStep
                    ? 'bg-blue-600 text-white'
                    : index + 1 < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1 < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span className="text-xs mt-1 text-gray-500">
                {index === 0 && 'Profile'}
                {index === 1 && 'Education'}
                {index === 2 && 'Skills'}
                {index === 3 && 'Connect'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}