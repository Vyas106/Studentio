import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import { useEffect } from "react";

// components/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  

    return user ? <>{children}</> : null;
}