
// components/GoogleLoginButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider, signInWithPopup, getDoc, doc, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userRef);
      
      router.push(docSnap.exists() ? "/profile" : "/form");
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "Login Failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleLogin} 
      disabled={loading}
      className="w-64 h-12 flex items-center justify-center gap-2"
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.229,1.219-0.818,2.397-1.743,3.322c-1.426,1.426-3.25,2.139-5.067,2.139c-1.817,0-3.641-0.713-5.067-2.139c-2.852-2.852-2.852-7.282,0-10.134c1.426-1.426,3.25-2.139,5.067-2.139c1.817,0,3.641,0.713,5.067,2.139l2.209,2.209l2.209-2.209c-2.852-2.852-7.282-2.852-10.134,0C8.603,9.172,7.89,11.095,7.89,13.013c0,1.918,0.713,3.841,2.139,5.267c2.852,2.852,7.282,2.852,10.134,0c1.426-1.426,2.139-3.25,2.139-5.267c0-0.161-0.006-0.322-0.017-0.483h-5.651C13.4,12.53,12.545,11.675,12.545,12.151z"/>
          </svg>
          Sign in with Google
        </>
      )}
    </Button>
  );
}
