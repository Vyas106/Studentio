// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, provider, signInWithPopup, getDoc, doc, db } from "@/lib/firebase";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
// import { LoadingSpinner } from "@/components/LoadingSpinner";

// export default function GoogleLoginButton() {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const userRef = doc(db, "users", result.user.uid);
//       const docSnap = await getDoc(userRef);

//       router.push(docSnap.exists() ? "/profile" : "/form");
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast({
//         title: "Login Failed",
//         description: "Could not sign in with Google. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button 
//       onClick={handleLogin} 
//       disabled={loading}
//       className="w-[80vw] h-12 flex items-center justify-center gap-2 bottom-0 "
//     >
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
//   <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
// </svg>
//           Sign in with Google
//         </>
//       )}
//     </Button>
//   );
// }


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

      // Store the auth token
      localStorage.setItem('authToken', result.user.uid);

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
      className="w-[80vw] h-12 flex items-center justify-center gap-2 bottom-0"
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
          </svg>
         Login As student
        </>
      )}
    </Button>
  );
}
