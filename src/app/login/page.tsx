// // src/app/page.tsx
// "use client";

// import { useAuth } from "@/context/AuthProvider";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import GoogleLoginButton from "@/components/GoogleLoginButton";
// import LodingPage from "@/components/LodingPage";

// export default function Home() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (user) {
//         router.push('/profile');
//       }
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <div><LodingPage/></div>;
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {!user && <GoogleLoginButton />}
//     </main>
//   );
// }

"use client";

// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GoogleLoginButton from '@/components/GoogleLoginButton';
// import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAuth } from "@/context/AuthProvider"; 
import { useRouter } from "next/navigation";

export default function Home() {
  


const [isVisible, setIsVisible] = useState(false);
const isDesktop = useMediaQuery('(min-width: 768px)');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);
  

useEffect(() => {
  setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <Head>
        <title>Student.io - AI-Powered Learning Platform</title>
        <meta name="description" content="Connect globally and expand your knowledge with Student.io" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="safe-area-inset-top" />
      
      <header className="px-5 md:px-10 pt-6 md:pt-8 text-black">
        
          <h1 className="text-3xl md:text-4xl font-bold font-poppins bg-clip-text  text-black">
            StudentLab
          </h1>
     
      </header>

      <main className="flex-grow container mx-auto px-5 md:px-10 py-8 md:py-12 max-w-5xl">
        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 md:mb-0"
          >
            <p className="text-xl md:text-3xl text-gray-700 mb-6 leading-relaxed font-medium font-poppins">
              Expand Your Knowledge and Network with Student.io.
            </p>
          
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -15 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 md:mb-12"
            >
              <div className="space-y-1 md:space-y-2 mb-6">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-poppins">Create.</h2>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-poppins">Connect.</h2>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-poppins">Collaborate.</h2>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 font-poppins">
              Powered by AI to enhance your learning journey
            </h3>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-inter">
              Join thousands of students using advanced AI tools to connect, collaborate, and accelerate their academic success.
            </p>
            
            <div className="flex flex-col space-y-4">
              <GoogleLoginButton />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-inter">or continue with email</span>
                </div>
              </div>
              
              <button className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium font-inter">
                Login As teacher
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-6 font-inter">
              By signing up, you agree to our Terms and Privacy Policy
            </p>
          </motion.div>
        </div>
        
      </main>
      
      {isDesktop && (
        <footer className="py-6 px-10 text-center text-sm text-gray-500 font-inter border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Student.io. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

// Custom hook for media queries
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
