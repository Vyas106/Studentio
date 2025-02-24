import React from 'react';
import { UserProfile } from "./../../../types/user";
import { useUserStats } from "@/hooks/useUserStats";
import { useFollow } from "@/hooks/useFollow";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  LogOut, 
  Edit, 
  School, 
  Building,
  Github,
  Linkedin,
  Twitter,
  Users,
  UserPlus,
  UserMinus,
} from "lucide-react";
import Image from 'next/image';

interface UserInfoProps {
  user: UserProfile;
  isOwnProfile: boolean;
  onLogout: () => void;
  onEdit: () => void;
}

interface UserInfo {
  name: string;
  college: string;
  course?: string;
  email: string;
  enrollment?: string;
  semester?: string;
  skills?: string[];
  photoURL?: string;
  bio?: string;
}

export const UserInfo = ({ user, isOwnProfile, onLogout, onEdit }: UserInfoProps) => {
  const { stats, loading: statsLoading } = useUserStats(user.uid);
  const { isFollowing, loading: followLoading, toggleFollow } = useFollow(user.uid);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Banner Section - Made shorter on mobile */}
      <div className="relative w-full h-32 md:h-48 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-t-xl overflow-hidden">
        <div className="absolute right-4 bottom-4 text-4xl md:text-4xl  text-white">
         Student.io
        </div>
        
        {/* Profile Image - Smaller on mobile */}
        <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-neutral-100 overflow-hidden">
          

          {user.photoURL ? (
                  <Image
                    src={user.photoURL} 
                    alt={user.name || ""}

                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-2xl font-semibold">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
          </div>
        </div>

        {/* Action Buttons - Moved to top right */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isOwnProfile ? (
            <>
              <Button
                onClick={onEdit}
                size="icon"
                variant="outline"
                className="bg-white/90 hover:bg-white"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                onClick={onLogout}
                size="icon"
                variant="outline"
                className="bg-white/90 hover:bg-white text-red-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              onClick={toggleFollow}
              disabled={followLoading}
              size="icon"
              variant={isFollowing ? "outline" : "default"}
              className={isFollowing ? 
                "bg-white/90 hover:bg-white" : 
                "bg-neutral-900 hover:bg-neutral-800"
              }
            >
              {isFollowing ? (
                <UserMinus className="w-4 h-4" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-xl shadow-sm">
        {/* Header Section - Improved spacing for mobile */}
        <div className="pt-16 md:pt-20 px-4 md:px-8 pb-6 md:pb-8 border-b border-neutral-100">
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-neutral-900">
              {user.displayName || user.name}
            </h1>
            {user.bio && (
              <p className="text-sm md:text-base text-neutral-600 max-w-2xl">
                {user.bio}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-neutral-500 mt-2">
              {user.college && (
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{user.college}</span>
                </div>
              )}
              {user.course && (
                <div className="flex items-center gap-1">
                  <School className="w-4 h-4" />
                  <span>{user.course}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Bar - Improved mobile layout */}
          <div className="flex gap-4 mt-4 text-sm md:text-base">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-neutral-400" />
              <span className="font-medium text-neutral-900">
                {statsLoading ? (
                  <Skeleton className="h-5 w-12" />
                ) : (
                  `${stats.followers}`
                )}
              </span>
              <span className="text-neutral-500 text-sm">followers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-neutral-900">
                {statsLoading ? (
                  <Skeleton className="h-5 w-12" />
                ) : (
                  `${stats.following}`
                )}
              </span>
              <span className="text-neutral-500 text-sm">following</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-4 md:px-8 py-6 space-y-6">
          {/* Skills Section - Redesigned with better spacing */}
          {user.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {user.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-2 bg-neutral-50 hover:bg-neutral-100 
                             transition-colors rounded-lg border border-neutral-200"
                  >
                    <span className="text-sm text-neutral-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links - Improved spacing */}
          {user.socialLinks && Object.values(user.socialLinks).some(Boolean) && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">Connect</h2>
              <div className="flex gap-3">
                {user.socialLinks.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-neutral-50 text-neutral-700 hover:bg-neutral-100 
                             transition-colors border border-neutral-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {user.socialLinks.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-neutral-50 text-neutral-700 hover:bg-neutral-100 
                             transition-colors border border-neutral-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {user.socialLinks.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-neutral-50 text-neutral-700 hover:bg-neutral-100 
                             transition-colors border border-neutral-200"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;