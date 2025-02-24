
// // // // app/profile/[id]/page.tsx
// // // import { redirect } from "next/navigation";
// // // import { auth } from "@/lib/firebase";
// // // import { UserInfo } from "@/components/profilePage/UseInfo";
// // // import { CreateContent } from "@/components/profilePage/CreateContent";
// // // import { useProfile } from "@/hooks/use-profile";

// // // interface ProfilePageProps {
// // //   params: {
// // //     id: string;
// // //   };
// // // }

// // // export default function UserProfilePage({ params }: ProfilePageProps) {
// // //   const {
// // //     user,
// // //     posts,
// // //     projects,
// // //     notes,
// // //     loading,
// // //     isFollowing,
// // //     handleFollowToggle,
// // //   } = useProfile(params.id);

// // //   if (!auth.currentUser) {
// // //     redirect("/login");
// // //   }

// // //   if (loading) return <div>Loading...</div>;
// // //   if (!user) return null;

// // //   return (
// // //     <div className="max-w-6xl mx-auto mt-8 px-4 space-y-8">
// // //       <UserInfo
// // //         user={user}
// // //         isOwnProfile={false}
// // //         isFollowing={isFollowing}
// // //         onFollowToggle={handleFollowToggle}
// // //       />
// // //       <CreateContent
// // //         isOwnProfile={false}
// // //         userId={user.uid}
// // //         posts={posts}
// // //         projects={projects}
// // //         notes={notes}
// // //         onPostCreate={() => {}}
// // //         onProjectCreate={() => {}}
// // //         onNoteCreate={() => {}}
// // //         onPostDelete={() => {}}
// // //         onProjectDelete={() => {}}
// // //         onNoteDelete={() => {}}
// // //       />
// // //     </div>
// // //   );
// // // }




// // // app/profile/[id]/page.tsx
// // "use client";

// // import { useEffect, useState } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// // import { db, auth } from '@/lib/firebase';
// // import { Button } from '@/components/ui/button';
// // import { Avatar } from '@/components/ui/avatar';
// // import { UserProfile } from './../../../../types/user';
// // import { MessageButton } from '@/components/MessageButton';

// // export default function ProfilePage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const [profile, setProfile] = useState<UserProfile | null>(null);
// //   const [isFollowing, setIsFollowing] = useState(false);
// //   const currentUser = auth.currentUser;

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       if (!params.id) return;
      
// //       const docRef = doc(db, 'users', params.id as string);
// //       const docSnap = await getDoc(docRef);
      
// //       if (docSnap.exists()) {
// //         setProfile({ ...docSnap.data(), uid: docSnap.id } as UserProfile);
// //         // Check if current user is following this profile
// //         const currentUserRef = doc(db, 'users', currentUser?.uid || '');
// //         const currentUserSnap = await getDoc(currentUserRef);
// //         if (currentUserSnap.exists()) {
// //           setIsFollowing(currentUserSnap.data().following?.includes(params.id));
// //         }
// //       }
// //     };

// //     fetchProfile();
// //   }, [params.id, currentUser?.uid]);

// //   const handleFollowToggle = async () => {
// //     if (!currentUser || !profile) return;
    
// //     const userRef = doc(db, 'users', currentUser.uid);
// //     try {
// //       await updateDoc(userRef, {
// //         following: isFollowing 
// //           ? arrayRemove(profile.uid)
// //           : arrayUnion(profile.uid)
// //       });
// //       setIsFollowing(!isFollowing);
// //     } catch (error) {
// //       console.error('Error updating follow status:', error);
// //     }
// //   };

// //   if (!profile) return <div>Loading...</div>;

// //   return (
// //     <div className="max-w-4xl mx-auto mt-8 px-4">
// //       <div className="flex items-center justify-between mb-8">
// //         <div className="flex items-center space-x-4">
// //           <Avatar 
// //             src={profile.photoURL}
// //             alt={profile.name}
// //             className="w-20 h-20"
// //           />
// //           <div>
// //             <h1 className="text-2xl font-bold">{profile.name}</h1>
// //             <p className="text-gray-600">{profile.bio}</p>
// //           </div>
// //         </div>
// //         <div className="flex space-x-2">
// //           {currentUser && currentUser.uid !== profile.uid && (
// //             <>
// //               <Button
// //                 onClick={handleFollowToggle}
// //                 variant={isFollowing ? "outline" : "default"}
// //               >
// //                 {isFollowing ? 'Unfollow' : 'Follow'}
// //               </Button>
// //               <MessageButton userId={profile.uid} userName={profile.name} />
// //             </>
// //           )}
// //         </div>
// //       </div>
// //       {/* Add profile content sections here */}
// //     </div>
// //   );
// // }


// // app/profile/[id]/page.tsx
// "use client";

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
// import { db, auth } from '@/lib/firebase';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Card, CardContent } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
// import { getInitials } from '@/lib/utils';
// import { toast } from '@/hooks/use-toast';

// interface UserProfile {
//   uid: string;
//   name: string;
//   email: string;
//   bio?: string;
//   photoURL?: string;
//   college?: string;
//   followersCount?: number;
//   followingCount?: number;
// }

// export default function ProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const currentUser = auth.currentUser;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!params.id) return;
      
//       try {
//         const docRef = doc(db, 'users', params.id as string);
//         const docSnap = await getDoc(docRef);
        
//         if (docSnap.exists()) {
//           setProfile({ ...docSnap.data(), uid: docSnap.id } as UserProfile);
//         } else {
//           toast({
//             title: "Error",
//             description: "User not found",
//             variant: "destructive",
//           });
//           router.push('/');
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load profile",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [params.id, router]);

//   const handleStartChat = async () => {
//     if (!currentUser || !profile) return;

//     try {
//       // Check if a chat room already exists
//       const chatRoomsRef = collection(db, 'chatRooms');
//       const q = query(
//         chatRoomsRef,
//         where('participants', 'array-contains', currentUser.uid)
//       );
      
//       const querySnapshot = await getDocs(q);
//       let existingChatRoom = null;

//       querySnapshot.forEach((doc) => {
//         const roomData = doc.data();
//         if (roomData.participants.includes(profile.uid)) {
//           existingChatRoom = { id: doc.id, ...roomData };
//         }
//       });

//       if (existingChatRoom) {
//         // Navigate to existing chat room
//         // router.push(`/chatroom/${existingChatRoom.id}`);
//         router.push(`/chatroom/${(existingChatRoom as { id: string }).id}`);

//       }
      
//       else {
//         // Create new chat room
//         const newChatRoomRef = doc(collection(db, 'chatRooms'));
//         const chatRoomData = {
//           id: newChatRoomRef.id,
//           participants: [currentUser.uid, profile.uid],
//           participantsInfo: [
//             {
//               id: currentUser.uid,
//               name: currentUser.displayName,
//               photoURL: currentUser.photoURL
//             },
//             {
//               id: profile.uid,
//               name: profile.name,
//               photoURL: profile.photoURL
//             }
//           ],
//           createdAt: Date.now(),
//           updatedAt: Date.now(),
//           lastMessage: null,
//           unreadCount: 0
//         };

//         await setDoc(newChatRoomRef, chatRoomData);
//         router.push(`/chatroom/${newChatRoomRef.id}`);
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to start chat",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-3xl mx-auto mt-8 px-4">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <Skeleton className="w-24 h-24 rounded-full" />
//               <div className="space-y-2">
//                 <Skeleton className="h-6 w-48" />
//                 <Skeleton className="h-4 w-32" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!profile) return null;

//   const isOwnProfile = currentUser?.uid === profile.uid;

//   return (
//     <div className="max-w-3xl mx-auto mt-8 px-4">
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//             <Avatar className="w-24 h-24">
//               <AvatarImage src={profile.photoURL} alt={profile.name} />
//               <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
//             </Avatar>
            
//             <div className="flex-1 text-center md:text-left">
//               <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
//               {profile.bio && (
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">{profile.bio}</p>
//               )}
              
//               <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
//                 <div className="text-center">
//                   <div className="font-semibold">{profile.followersCount || 0}</div>
//                   <div className="text-sm text-gray-500">Followers</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-semibold">{profile.followingCount || 0}</div>
//                   <div className="text-sm text-gray-500">Following</div>
//                 </div>
//               </div>

//               {!isOwnProfile && currentUser && (
//                 <Button
//                   onClick={handleStartChat}
//                   className="w-full md:w-auto"
//                   size="lg"
//                 >
//                   Start Chat
//                 </Button>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




// app/profile/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, collection, query, where, getDocs, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { FiEdit3, FiMail, FiMapPin, FiGlobe, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import { FaMessage } from "react-icons/fa6";


interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  description?: string;
}

interface Project {
  title: string;
  description: string;
  url?: string;
  technologies: string[];
  image?: string;
}

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  bio?: string;
  photoURL?: string;
  college?: string;
  currentPosition?: string;
  location?: string;
  website?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  followers: string[];
  following: string[];
  endorsements: Record<string, string[]>;
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!params.id) return;

    // Real-time profile updates
    const unsubscribe = onSnapshot(
      doc(db, 'users', params.id as string),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data() as UserProfile;
          setProfile({ ...data, uid: doc.id });
          setIsFollowing(data.followers?.includes(currentUser?.uid || ''));
        } else {
          toast({
            title: "Error",
            description: "User not found",
            variant: "destructive",
          });
          router.push('/');
        }
        setLoading(false);
      },
      (error) => {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [params.id, router, currentUser?.uid]);

  const handleFollow = async () => {
    if (!currentUser || !profile) return;

    try {
      const userRef = doc(db, 'users', profile.uid);
      const currentUserRef = doc(db, 'users', currentUser.uid);

      if (isFollowing) {
        await updateDoc(userRef, {
          followers: arrayRemove(currentUser.uid)
        });
        await updateDoc(currentUserRef, {
          following: arrayRemove(profile.uid)
        });
      } else {
        await updateDoc(userRef, {
          followers: arrayUnion(currentUser.uid)
        });
        await updateDoc(currentUserRef, {
          following: arrayUnion(profile.uid)
        });
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      });
    }
  };

  const handleEndorse = async (skill: string) => {
    if (!currentUser || !profile) return;

    try {
      const userRef = doc(db, 'users', profile.uid);
      const endorsements = profile.endorsements || {};
      const skillEndorsements = endorsements[skill] || [];

      if (skillEndorsements.includes(currentUser.uid)) {
        // Remove endorsement
        await updateDoc(userRef, {
          [`endorsements.${skill}`]: arrayRemove(currentUser.uid)
        });
      } else {
        // Add endorsement
        await updateDoc(userRef, {
          [`endorsements.${skill}`]: arrayUnion(currentUser.uid)
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update endorsement",
        variant: "destructive",
      });
    }
  };

  const handleStartChat = async () => {
    if (!currentUser || !profile) return;

    try {
      // Check for existing chat room
      const chatRoomsRef = collection(db, 'chatRooms');
      const q = query(
        chatRoomsRef,
        where('participants', 'array-contains', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      let existingChatRoom = null;

      querySnapshot.forEach((doc) => {
        const roomData = doc.data();
        if (roomData.participants.includes(profile.uid)) {
          existingChatRoom = { id: doc.id, ...roomData };
        }
      });

      if (existingChatRoom) {
        // router.push(`/chatroom/${existingChatRoom.id}`);
        router.push(`/chatroom/${(existingChatRoom as { id: string }).id}`);

      } else {
        // Create new chat room
        const newChatRoomRef = doc(collection(db, 'chatRooms'));
        const chatRoomData = {
          id: newChatRoomRef.id,
          participants: [currentUser.uid, profile.uid],
          participantsInfo: [
            {
              id: currentUser.uid,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            {
              id: profile.uid,
              name: profile.name,
              photoURL: profile.photoURL
            }
          ],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          lastMessage: null,
          unreadCount: 0
        };

        await setDoc(newChatRoomRef, chatRoomData);
        router.push(`/chatroom/${newChatRoomRef.id}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start chat",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) return null;

  const isOwnProfile = currentUser?.uid === profile.uid;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.photoURL} alt={profile.name} />
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0"
                  onClick={() => {/* Handle photo update */}}
                >
                  <FiEdit3 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  {profile.currentPosition && (
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {profile.currentPosition}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <FiMapPin className="h-4 w-4" />
                        {profile.location}
                      </div>
                    )}
                    {profile.email && (
                      <div className="flex items-center gap-1">
                        <FiMail className="h-4 w-4" />
                        {profile.email}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!isOwnProfile && currentUser && (
                    <>
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        onClick={handleFollow}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button onClick={handleStartChat}>
                      <FaMessage />
                      </Button>
                    </>
                  )}
                  {isOwnProfile && (
                    <Button variant="outline" onClick={() => router.push('/settings')}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-4">
                {profile.socialLinks?.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiLinkedin className="h-5 w-5" />
                  </a>
                )}
                {profile.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiGithub className="h-5 w-5" />
                  </a>
                )}
                {profile.socialLinks?.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiTwitter className="h-5 w-5" />
                  </a>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiGlobe className="h-5 w-5" />
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <div className="font-semibold">{profile.followers?.length || 0}</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{profile.following?.length || 0}</div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {Object.values(profile.endorsements || {}).reduce((sum, arr) => sum + arr.length, 0)}
                  </div>
                  <div className="text-sm text-gray-500">Endorsements</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {/* {profile.skills.map((skill) => (
                    <Dialog key={skill}>
                      <DialogTrigger asChild>
                        <Badge
                          variant="secondary"
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {skill}
                          <span className="ml-2 text-xs">
                            {(profile.endorsements?.[skill]?.length || 0)}
                          </span>
                        </Badge>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Skill: {skill}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="mb-4">
                            {profile.endorsements?.[skill]?.length || 0} endorsements
                          </p>
                          {currentUser && !isOwnProfile && (
                            <Button
                              onClick={() => handleEndorse(skill)}
                              variant="outline"
                            >
                            
                              {profile.endorsements?.[skill]?.includes(currentUser.uid)
                ? 'Remove Endorsement'
                : 'Endorse'
              }
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  ))} */}
</div>
              </div>

              {profile.certifications?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Certifications</h3>
                  <div className="space-y-2">
                    {/* {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline">{cert}</Badge>
                      </div>
                    ))} */}
                  </div>
                </div>  
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* {profile.experience?.map((exp, index) => (
                  <div key={index} className="relative">
                    {index > 0 && <Separator className="my-6" />}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        
                        <FiGlobe className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-500">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </p>
                        <p className="mt-2 text-gray-600">{exp.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* {profile.education?.map((edu, index) => (
                  <div key={index} className="relative">
                    {index > 0 && <Separator className="my-6" />}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FiGlobe className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{edu.institution}</h3>
                        <p className="text-gray-600">
                          {edu.degree} in {edu.field}
                        </p>
                        <p className="text-sm text-gray-500">
                          {edu.startYear} - {edu.endYear || 'Present'}
                        </p>
                        {edu.description && (
                          <p className="mt-2 text-gray-600">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.projects?.map((project, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      {project.image && (
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-gray-600 mt-2">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          View Project <FiGlobe className="ml-1 h-4 w-4" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// components/EditProfileDialog.tsx
interface EditProfileDialogProps {
  profile: UserProfile;
  onSave: (updates: Partial<UserProfile>) => Promise<void>;
}

export const EditProfileDialog = ({ profile, onSave }: EditProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Add form fields here */}
        </form>
      </DialogContent>
    </Dialog>
  );
};