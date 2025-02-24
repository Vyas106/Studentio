"use client";

// import { useAuth } from "@/context/AuthProvider"; 
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import GoogleLoginButton from "@/components/GoogleLoginButton";

// export default function LoginPage() {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       router.push("/profile");
//     }
//   }, [user]);

//   return (
//     <div className="flex flex-col items-center  h-screen">

// <div className="relative flex flex-col items-center justify-center w-[80%] h-[20vh] border  ">
//   <span className="absolute left-0 text-3xl font-extrabold text-gray-800 tracking-wide">Student.io</span>
// </div>

// <div className="w-full h-[20vh] flex items-center justify-center   text-lg font-semibold  px-6">
//   Connect with your friends and start your professional journey!
// </div>




//        <h1 className="text-2xl font-bold mb-4">Login</h1>
//        <GoogleLoginButton />
//      </div>
//    );
// }


// // pages/index.js
// import Head from 'next/head';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import GoogleLoginButton from '@/components/GoogleLoginButton';

// export default function Home() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Animation variants for consistent animations
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       <Head>
//         <title>Student.io - AI-Powered Learning Platform</title>
//         <meta name="description" content="Connect globally and expand your knowledge with Student.io" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link rel="icon" href="/favicon.ico" />
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
//       </Head>
      
//       <header className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-100">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-2xl font-bold text-indigo-600">student.io</h1>
//         </motion.div>
//         <nav className="hidden md:block">
//           <ul className="flex space-x-8">
//             <li><a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a></li>
//             <li><a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</a></li>
//             <li><a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a></li>
//           </ul>
//         </nav>
//       </header>

//       <main className="container mx-auto px-6 md:px-12 py-12 md:py-20">
//         <div className="max-w-6xl mx-auto">
//           {/* Hero Section */}
//           <section className="flex flex-col md:flex-row items-center justify-between mb-20">
//             <motion.div
//               className="md:w-1/2 mb-12 md:mb-0"
//               initial="hidden"
//               animate={isVisible ? "visible" : "hidden"}
//               variants={fadeInUp}
//               transition={{ duration: 0.7 }}
//             >
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
//                 Transform Your Learning Experience
//               </h2>
//               <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
//                 Expand your knowledge and network with an AI-powered platform designed for the next generation of learners.
//               </p>
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 <GoogleLoginButton />
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors"
//                 >
//                   Learn More
//                 </motion.button>
//               </div>
//             </motion.div>
//             <motion.div 
//               className="md:w-1/2"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//             >
//               <img 
//                 src="/hero-image.svg" 
//                 alt="Students learning with AI" 
//                 className="w-full h-auto rounded-lg shadow-lg"
//               />
//             </motion.div>
//           </section>

//           {/* Features Section */}
//           <section id="features" className="mb-20">
//             <motion.div
//               initial="hidden"
//               animate={isVisible ? "visible" : "hidden"}
//               variants={fadeInUp}
//               transition={{ duration: 0.7 }}
//               className="text-center mb-12"
//             >
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h3>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Student.io is built on three fundamental principles that guide everything we do.
//               </p>
//             </motion.div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   title: "Create",
//                   description: "Use AI-powered tools to create study materials, presentations, and research papers.",
//                   icon: "✍️",
//                   delay: 0.3
//                 },
//                 {
//                   title: "Connect",
//                   description: "Find study partners, mentors, and collaborators from around the world.",
//                   icon: "🌐",
//                   delay: 0.5
//                 },
//                 {
//                   title: "Collaborate",
//                   description: "Work together on projects with real-time collaboration tools.",
//                   icon: "👥",
//                   delay: 0.7
//                 }
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial="hidden"
//                   animate={isVisible ? "visible" : "hidden"}
//                   variants={fadeInUp}
//                   transition={{ duration: 0.7, delay: feature.delay }}
//                   className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
//                 >
//                   <div className="text-4xl mb-4">{feature.icon}</div>
//                   <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </section>

//           {/* AI Learning Section */}
//           <section className="mb-20">
//             <motion.div
//               initial="hidden"
//               animate={isVisible ? "visible" : "hidden"}
//               variants={fadeInUp}
//               transition={{ duration: 0.7 }}
//               className="bg-indigo-50 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center"
//             >
//               <div className="md:w-1/2 mb-8 md:mb-0">
//                 <h3 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700">
//                   Powered by AI to enhance your learning journey
//                 </h3>
//                 <p className="text-lg text-gray-700 mb-6">
//                   Our advanced AI analyzes your learning style and progress to provide personalized recommendations, adaptive practice sessions, and intelligent feedback.
//                 </p>
//                 <ul className="space-y-3">
//                   {[
//                     "Smart study planning based on your goals",
//                     "Personalized content recommendations",
//                     "Real-time feedback on assignments",
//                     "AI-powered tutoring assistance 24/7"
//                   ].map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                       <svg className="w-5 h-5 text-indigo-500 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="md:w-1/2 md:pl-12">
//                 <motion.img
//                   whileHover={{ scale: 1.05 }}
//                   src="/ai-learning.svg"
//                   alt="AI-powered learning"
//                   className="w-full h-auto rounded-lg shadow-md"
//                 />
//               </div>
//             </motion.div>
//           </section>

//           {/* Testimonials Section */}
//           <section id="testimonials" className="mb-20">
//             <motion.div
//               initial="hidden"
//               animate={isVisible ? "visible" : "hidden"}
//               variants={fadeInUp}
//               transition={{ duration: 0.7 }}
//               className="text-center mb-12"
//             >
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h3>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Join thousands of students already using Student.io to accelerate their academic success.
//               </p>
//             </motion.div>

//             <div className="grid md:grid-cols-2 gap-8">
//               {[
//                 {
//                   quote: "Student.io completely transformed how I study. The AI recommendations are spot-on!",
//                   name: "Alex Chen",
//                   role: "Computer Science Major",
//                   image: "/testimonial-1.jpg",
//                   delay: 0.3
//                 },
//                 {
//                   quote: "Finding study partners was always difficult until I joined Student.io. Now I have a global network!",
//                   name: "Sarah Johnson",
//                   role: "Biology Student",
//                   image: "/testimonial-2.jpg",
//                   delay: 0.5
//                 }
//               ].map((testimonial, index) => (
//                 <motion.div
//                   key={index}
//                   initial="hidden"
//                   animate={isVisible ? "visible" : "hidden"}
//                   variants={fadeInUp}
//                   transition={{ duration: 0.7, delay: testimonial.delay }}
//                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
//                 >
//                   <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
//                   <div className="flex items-center">
//                     <img 
//                       src={testimonial.image} 
//                       alt={testimonial.name} 
//                       className="w-12 h-12 rounded-full mr-4"
//                     />
//                     <div>
//                       <h4 className="font-bold">{testimonial.name}</h4>
//                       <p className="text-sm text-gray-500">{testimonial.role}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </section>

//           {/* CTA Section */}
//           <motion.section
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             variants={fadeInUp}
//             transition={{ duration: 0.7 }}
//             className="text-center bg-indigo-600 text-white p-12 rounded-2xl"
//           >
//             <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h3>
//             <p className="text-xl mb-8 max-w-2xl mx-auto">
//               Join thousands of students using advanced AI tools to connect, collaborate, and accelerate their academic success.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <GoogleLoginButton />
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-3 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors"
//               >
//                 Learn More
//               </motion.button>
//             </div>
//           </motion.section>
//         </div>
//       </main>

//       <footer className="bg-gray-50 py-12 border-t border-gray-100">
//         <div className="container mx-auto px-6 md:px-12">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h4 className="text-xl font-bold mb-4">student.io</h4>
//               <p className="text-gray-600">Empowering students with AI-powered learning tools since 2023.</p>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Features</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">AI Study Tools</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Global Network</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Collaboration</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Smart Recommendations</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Resources</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Tutorials</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Help Center</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Connect</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Twitter</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">LinkedIn</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Instagram</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">YouTube</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
//             <p>&copy; 2025 Student.io. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


// // pages/index.js
// import Head from 'next/head';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import GoogleLoginButton from '@/components/GoogleLoginButton';

// export default function Home() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
//       <Head>
//         <title>Student.io - AI-Powered Learning Platform</title>
//         <meta name="description" content="Connect globally and expand your knowledge with Student.io" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link rel="icon" href="/favicon.ico" />
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
//       </Head>

//       <div className="safe-area-inset-top" /> {/* For mobile devices with notches */}
      
//       <header className="px-5 pt-6 md:pt-8">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
//           transition={{ duration: 0.4 }}
//           className="flex items-center justify-between"
//         >
//           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
//             student.io
//           </h1>
//         </motion.div>
//       </header>

//       <main className="container mx-auto px-5 py-8 max-w-4xl">
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 15 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="mb-10"
//         >
//           <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed font-medium">
//             Expand Your Knowledge and Network with Student.io.
//           </p>
//         </motion.div>
        
//         <motion.div
//           initial={{ opacity: 0, x: -15 }}
//           animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -15 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mb-12"
//         >
//           <div className="space-y-1 mb-6">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Create.</h2>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Connect.</h2>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Collaborate.</h2>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
//           transition={{ duration: 0.5, delay: 0.7 }}
//           className="mb-10 bg-white rounded-xl shadow-sm p-6 border border-gray-100"
//         >
//           <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
//             Powered by AI to enhance your learning journey
//           </h3>
//           <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
//             Join thousands of students using advanced AI tools to connect, collaborate, and accelerate their academic success.
//           </p>

//           <div className="mt-8">
//             <GoogleLoginButton />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isVisible ? 1 : 0 }}
//           transition={{ duration: 0.5, delay: 0.9 }}
//           className="mb-8 text-center"
//         >
//           <p className="text-sm text-gray-500">
//             Already used by students at MIT, Stanford, and 200+ universities worldwide
//           </p>
//         </motion.div>
//       </main>

//       <footer className="mt-auto py-6 px-5 text-center text-sm text-gray-500">
//         <p>© {new Date().getFullYear()} Student.io. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }


// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GoogleLoginButton from '@/components/GoogleLoginButton';
// import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAuth } from "@/context/AuthProvider"; 
import { useRouter } from "next/navigation";

export default function Home() {
  
  
  // import { useEffect } from "react";
  // import GoogleLoginButton from "@/components/GoogleLoginButton";

// export default function LoginPage() {
  


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
                Sign up with email
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
