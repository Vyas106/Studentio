
// components/SearchPage.tsx
"use client";

import { useState, useEffect } from "react";
import { db, collection, query, where, getDocs } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageButton } from "./MessageButton";
import { LoadingSpinner } from "./LoadingSpinner";
import type { UserProfile } from "../../types/user";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";


export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchTerm.trim()) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("name", ">=", searchTerm),
          where("name", "<=", searchTerm + "\uf8ff")
        );
        
        const querySnapshot = await getDocs(q);
        const results: UserProfile[] = [];
        
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), uid: doc.id } as UserProfile);
        });
        
        setUsers(results);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to search users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.uid} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.college}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => router.push(`/profile/${user.uid}`)}
                    variant="outline"
                  >
                    View Profile
                  </Button>
                  <MessageButton userId={user.uid} userName={user.name} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}