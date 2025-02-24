"use client";   

import Link from 'next/link';
import { MessageSquare, Image, FileText, Twitter, Calendar, BookOpen, PenTool, ArrowUpRight, Sparkles, Globe } from 'lucide-react';
import { useState } from 'react';

const DashboardCard = ({ href, icon: Icon, title, description, gradient, delay } : any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <div 
        className={`relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 rounded-2xl transition-all duration-500 transform `}
        style={{ animationDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-24 bg-white/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl transform -translate-x-12 translate-y-12" />
        
        {/* Content container */}
        <div className="relative z-10 min-h-[150px] flex flex-col justify-between">
          {/* Icon and title section */}
          <div>
            <div className="flex items-center justify-between">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Icon size={24} className="text-white" />
              </div>
              <ArrowUpRight 
                size={24} 
                className={`text-white transition-all duration-300 transform ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}
              />
            </div>
            <h3 className="text-white font-bold text-xl mt-4">{title}</h3>
            <p className="text-white/80 text-sm mt-2">{description}</p>
          </div>
          
          {/* Bottom decoration */}
          <div className="flex items-center gap-2 mt-4">
            <div className="h-1 w-8 bg-white/40 rounded-full" />
            <div className="h-1 w-3 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const Page = () => {
  return (
    <div className="min-h-screen  p-8">
      {/* Floating decoration */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-40 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div> */}

      {/* Header */}
      <header className="relative z-10 mb-12">
        <div className="flex items-center gap-3 mb-3">
          {/* <Sparkles className="text-yellow-400" size={28} /> */}
          <h1 className="text-4xl font-bold bg-gradient-to-r text-black bg-clip-text ">
            student.io
          </h1>
        </div>
        <div className="flex items-center gap-2 text-gray-800">
          <Globe size={16} />
          <p className="text-lg">Create something amazing today</p>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <DashboardCard 
          href="/createPost"
          icon={MessageSquare}
          title="Create Post"
          description="Share your thoughts and ideas with the community"
          gradient="bg-gradient-to-r from-neutral-900 to-neutral-800"
          delay={100}
        />
        
        <DashboardCard 
          href="/createProject"
          icon={PenTool}
          title="Create Project"
          description="Start a new project and showcase your work"
          gradient="bg-gradient-to-br from-purple-600 to-pink-500"
          delay={200}
        />

        <DashboardCard 
          href="/createNotes"
          icon={FileText}
          title="Add Notes"
          description="Keep track of your learning journey"
          gradient="bg-gradient-to-br from-green-600 to-emerald-400"
          delay={300}
        />

        <DashboardCard 
          href="/createTweet"
          icon={Twitter}
          title="Add Tweet"
          description="Share quick updates and connect with peers"
          gradient="bg-gradient-to-br from-sky-600 to-cyan-400"
          delay={400}
        />

        <DashboardCard 
          href="/createEvent"
          icon={Calendar}
          title="Create Event"
          description="Schedule and manage educational events"
          gradient="bg-gradient-to-br from-orange-600 to-amber-400"
          delay={500}
        />

        <DashboardCard 
          href="/createArticle"
          icon={BookOpen}
          title="Create Article"
          description="Write in-depth articles and tutorials"
          gradient="bg-gradient-to-br from-rose-600 to-red-400"
          delay={600}
        />
      </div>
    </div>
  );
};

export default Page;