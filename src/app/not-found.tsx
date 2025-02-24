"use client";

import Link from "next/link";
import { FaLongArrowAltRight, FaLinkedinIn, FaRegUser, FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-white text-black p-6 md:p-8">
      {/* Top section with three lines at top-right */}
      {/* <div className="flex justify-end mb-12">
        <div className="space-y-1 md:space-y-2 text-right">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins">Create.</h2>
          <h2 className="text-2xl md:text-3xl font-bold font-poppins">Connect.</h2>
          <h2 className="text-2xl md:text-3xl font-bold font-poppins">Collaborate.</h2>
        </div>
      </div> */}
      
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center">
        {/* Student.io text */}
        <div className="w-full mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-black">
            Student.io
          </h1>
        </div>
        
        {/* 404 with arrow and Not Found */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          <span className="text-7xl md:text-9xl font-bold">404</span>
          {/* <FaLongArrowAltRight className="text-3xl md:text-5xl mx-4" /> */}
          <span className="text-3xl md:text-5xl font-medium">Not Found</span>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex gap-6 mb-24">
          <button onClick={() => window.history.back()} className="group flex items-center gap-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 py-3 px-6 rounded-none">
            <FaArrowLeft className="text-lg" />
            <span className="text-lg font-medium">Go Back</span>
          </button>
          
          <Link href="/" className="group flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors duration-300 py-3 px-6 rounded-none">
            <FaHome className="text-lg" />
            <span className="text-lg font-medium">Home</span>
          </Link>
        </div>
      </main>
      
      {/* Footer with specified structure */}
      <footer className="w-full border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          {/* Left side - Content about you */}
          <div className="max-w-md mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">About Student.io</h3>
            <p className="text-gray-800">
              We're building the ultimate platform for students to connect, collaborate, and create amazing projects together.
            </p>
          </div>
          
          {/* Right side - Social icons */}
          <div className="flex gap-6">
            <Link href="https://linkedin.com" className="p-3 border border-black hover:bg-black hover:text-white transition-colors">
              <FaLinkedinIn className="text-xl" />
            </Link>
            <Link href="/profile" className="p-3 border border-black hover:bg-black hover:text-white transition-colors">
              <FaRegUser className="text-xl" />
            </Link>
          </div>
        </div>
        
        {/* Bottom copyright text */}
        <div className="text-sm text-gray-600 text-center pt-4 border-t border-gray-100">
          © {new Date().getFullYear()} Student.io. All rights reserved.
        </div>
      </footer>
    </div>
  );
}