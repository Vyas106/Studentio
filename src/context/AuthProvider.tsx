// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/lib/firebase"; 
// import { onAuthStateChanged, User } from "firebase/auth";
// import { useRouter, usePathname } from "next/navigation";

// const AuthContext = createContext<{ user: User | null }>({ user: null });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();
//   const pathname = usePathname(); // Get the current route

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);

//       // Redirect only if on the home page or login page, not if user navigated elsewhere
//       if (currentUser && (pathname === "/" || pathname === "/login")) {
//         router.push("/profile");
//       }
//     });

//     return () => unsubscribe();
//   }, [pathname]); // Depend on pathname to ensure it updates correctly

//   return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Define the type for our context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Store user info in localStorage if logged in
      if (currentUser) {
        localStorage.setItem('authUser', JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
        }));
      } else {
        localStorage.removeItem('authUser');
      }
    });

    // Check for existing auth in localStorage
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!user && parsedUser.uid) {
        // User exists in localStorage but not in state
        setLoading(true); // Keep loading until Firebase auth check completes
      }
    }

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}