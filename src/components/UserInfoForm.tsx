
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/auth/login");
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

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>
        <p className="text-gray-600 text-center">Tell us more about yourself</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Profile Photo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  name="college"
                  placeholder="College Name"
                  value={form.college}
                  onChange={handleChange}
                  className={errors.college ? "border-red-500" : ""}
                />
                {errors.college && (
                  <p className="text-red-500 text-xs mt-1">{errors.college}</p>
                )}
              </div>

              <div>
                <Input
                  name="semester"
                  placeholder="Semester"
                  value={form.semester}
                  onChange={handleChange}
                  className={errors.semester ? "border-red-500" : ""}
                />
                {errors.semester && (
                  <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
                )}
                </div>

<div>
  <Input
    name="enrollment"
    placeholder="Enrollment No."
    value={form.enrollment}
    onChange={handleChange}
    className={errors.enrollment ? "border-red-500" : ""}
  />
  {errors.enrollment && (
    <p className="text-red-500 text-xs mt-1">{errors.enrollment}</p>
  )}
</div>

<div>
  <Input
    name="course"
    placeholder="Course / Department"
    value={form.course}
    onChange={handleChange}
    className={errors.course ? "border-red-500" : ""}
  />
  {errors.course && (
    <p className="text-red-500 text-xs mt-1">{errors.course}</p>
  )}
</div>
</div>

<div>
<Textarea
  name="bio"
  placeholder="Tell us about yourself..."
  value={form.bio}
  onChange={handleChange}
  className="h-24 resize-none"
/>
</div>

<div className="space-y-2">
<h3 className="text-lg font-medium">Social Links</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Input
      name="social.linkedin"
      placeholder="LinkedIn URL"
      value={form.socialLinks?.linkedin}
      onChange={handleChange}
      className={errors['socialLinks.linkedin'] ? "border-red-500" : ""}
    />
    {errors['socialLinks.linkedin'] && (
      <p className="text-red-500 text-xs mt-1">{errors['socialLinks.linkedin']}</p>
    )}
  </div>

  <div>
    <Input
      name="social.github"
      placeholder="GitHub URL"
      value={form.socialLinks?.github}
      onChange={handleChange}
      className={errors['socialLinks.github'] ? "border-red-500" : ""}
    />
    {errors['socialLinks.github'] && (
      <p className="text-red-500 text-xs mt-1">{errors['socialLinks.github']}</p>
    )}
  </div>

  <div>
    <Input
      name="social.twitter"
      placeholder="Twitter URL"
      value={form.socialLinks?.twitter}
      onChange={handleChange}
      className={errors['socialLinks.twitter'] ? "border-red-500" : ""}
    />
    {errors['socialLinks.twitter'] && (
      <p className="text-red-500 text-xs mt-1">{errors['socialLinks.twitter']}</p>
    )}
  </div>
</div>
</div>
</div>
</form>
</CardContent>

<CardFooter>
<Button
onClick={handleSubmit}
className="w-full"
disabled={loading}
>
{loading ? (
<div className="flex items-center gap-2">
<LoadingSpinner />
Creating Profile...
</div>
) : (
"Create Profile"
)}
</Button>
</CardFooter>
</Card>
);
}
