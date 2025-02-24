"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/profile"); // Redirect if already logged in
        // router.push('/home')
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { loading };
}
