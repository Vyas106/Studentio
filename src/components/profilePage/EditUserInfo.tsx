import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "./../../../types/user";
import { colleges } from "./../../../utils/colleges";
import { courses } from "./../../../utils/courses";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Twitter, Globe, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface EditProfileProps {
  user: UserProfile;
  onSave: () => void;
  onCancel: () => void;
}

export const EditProfile = ({ user, onSave, onCancel }: EditProfileProps) => {
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    bio: user.bio || "",
    college: user.college || "",
    course: user.course || "",
    enrollment: user.enrollment || "",
    skills: user.skills || [],
    website: user.website || "",
    socialLinks: user.socialLinks || { github: "", linkedin: "", twitter: "" },
    additionalLinks: user.additionalLinks || [],
    headline: user.headline || "",
    location: user.location || "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialLinkChange = (platform: keyof typeof formData.socialLinks, value: string) => {
    setFormData({
      ...formData,
      socialLinks: { ...formData.socialLinks, [platform]: value },
    });
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formData);
      onSave();
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <Label className="text-lg font-medium">Basic Information</Label>
            <div className="space-y-3">
              <div>
                <Label htmlFor="displayName">Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Your professional headline"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* About Section */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">About</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="min-h-[120px]"
            />
          </div>

          <Separator />

          {/* Education Section */}
          <div className="space-y-4">
            <Label className="text-lg font-medium">Education</Label>
            <div className="space-y-3">
              <div>
                <Label htmlFor="college">College</Label>
                <Select
                  value={formData.college}
                  onValueChange={(value) => setFormData({ ...formData, college: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college} value={college}>
                        {college}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Select
                  value={formData.course}
                  onValueChange={(value) => setFormData({ ...formData, course: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="enrollment">Enrollment Number</Label>
                <Input
                  id="enrollment"
                  name="enrollment"
                  value={formData.enrollment}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Links Section */}
          <div className="space-y-4">
            <Label className="text-lg font-medium">Social Links</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Github className="w-5 h-5" />
                <Input
                  placeholder="GitHub URL"
                  value={formData.socialLinks.github}
                  onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5" />
                <Input
                  placeholder="LinkedIn URL"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Twitter className="w-5 h-5" />
                <Input
                  placeholder="Twitter URL"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Personal website URL"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};