"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { 
  CalendarIcon, 
  Users, 
  MessageSquare,
  

  Search,
  SearchIcon,
  BotMessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import LodingPage from "@/components/LodingPage";
// import Space from "@/components/space";
// import YourJoinedProjects from "@/components/YourJoinedProjects";
import { NotificationBell } from "@/components/NotificationBell";
import Link from "next/link";

export interface UserInfo {
  name: string;
  college: string;
  course?: string;
  email: string;
  enrollment?: string;
  semester?: string;
  skills?: string[];
  photoURL?: string;
}

const Home: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      const fetchUserInfo = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserInfo;
            setUserInfo({
              ...userData,
              photoURL: user.photoURL || userData.photoURL
            });
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [user, loading, router]);

  if (loading) {
    return <LodingPage />;
  }

  // Home
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Student.io
              </h1>
              <div className="hidden md:flex relative w-64">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-8"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <NotificationBell userId={user?.uid || ""} />
              <Button variant="ghost" size="icon">
                <CalendarIcon className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    {userInfo?.photoURL ? (
                      <AvatarImage src={userInfo.photoURL} alt={userInfo.name} />
                    ) : (
                      <AvatarFallback>{userInfo?.name?.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-16 px-4 max-w-7xl mx-auto">
        {/* User Profile Card */}
        <Card className="mb-6 border-none  shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border">
                {userInfo?.photoURL ? (
                  <AvatarImage src={userInfo.photoURL} alt={userInfo.name} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-lg">
                    {userInfo?.name?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{userInfo?.name}</h2>
                <p className="text-gray-500">{userInfo?.college}</p>
                {userInfo?.course && (
                  <p className="text-sm text-gray-400">{userInfo.course} • {userInfo.semester} Semester</p>
                )}
              </div>
            </div>
            
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-1  border-none">
          <Link href="/Alluser">
            <Card className="bg-gray-50 transition-colors cursor-pointer border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center ">
                <Users className="h-6 w-6 text-primary mb-2" />
             
              </CardContent>
            </Card>
          </Link>

          <Link href="/SearchPage">
            <Card className="bg-gray-50 transition-colors cursor-pointer border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary mb-2" />
              </CardContent>
            </Card>
          </Link>

                
          <Link href="/ChatList">
            <Card className="bg-gray-50 transition-colors cursor-pointer border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <SearchIcon className="h-6 w-6 text-primary mb-2" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/AiChatBot">
            <Card className="bg-gray-50 transition-colors cursor-pointer border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <BotMessageSquare className="h-6 w-6 text-primary mb-2" />
              </CardContent>
            </Card>
          </Link>

        </div>

        {/* Joined Projects */}
        <Card className="mb-6 border-none shadow-none bg-gray-50">
          <CardHeader className="border-none shadow-none">
            <CardTitle>Your Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <YourJoinedProjects userId={user?.uid || ""} /> */}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default Home;