

"use client";
// app/profile/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebase";
import { UserInfo } from "@/components/profilePage/UserInfo";
import { EditProfile } from "@/components/profilePage/EditUserInfo";
// import { CreateContent } from "@/components/profilePage/CreateContent";
import { useProfile } from "@/hooks/use-profile";
import LoadingPage from "@/components/LodingPage";
import { useState } from "react";
import Space from "./space";
import Navbar from "./Navbar";

export default function ProfilePage() {
  const {
    user,
    posts,
    projects,
    notes,
    loading,
    handleLogout,
    handlePostCreate,
    handleProjectCreate,
    handleNoteCreate,
    handlePostDelete,
    handleProjectDelete,
    handleNoteDelete,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  if (!auth.currentUser) {
    redirect("/login");
  }

  if (loading) return <LoadingPage />;
  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 space-y-8">
      {isEditing ? (
        <EditProfile
          user={user}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <UserInfo
          user={user}
          isOwnProfile={true}
          onLogout={handleLogout}
          onEdit={() => setIsEditing(true)}
        />
      )}
      {/* <CreateContent
        isOwnProfile={true}
        userId={user.uid}
        posts={posts}
        projects={projects}
        notes={notes}
        onPostCreate={handlePostCreate}
        // onProjectCreate={handleProjectCreate}
        onNoteCreate={handleNoteCreate}
        onPostDelete={handlePostDelete}
        // onProjectDelete={handleProjectDelete}
        onNoteDelete={handleNoteDelete}
      /> */}

<Space />
<Navbar  />
    </div>
  );
}