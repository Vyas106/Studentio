// // import React, { useState, useEffect } from 'react';
// // import { useRouter, usePathname } from 'next/navigation';
// // import Link from 'next/link';
// // import {
// //   Home,
// //   Search,
// //   Bell,
// //   MessageSquare,
// //   Briefcase,
// //   Users,
// //   UserCircle,
// //   Menu,
// //   X,
// //   Plus
// // } from 'lucide-react';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Button } from '@/components/ui/button';
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from '@/components/ui/dropdown-menu';
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from '@/components/ui/sheet';
// // import { Input } from '@/components/ui/input';
// // import { Badge } from '@/components/ui/badge';

// // interface NavBarProps {
// //   user: {
// //     name: string;
// //     photoURL?: string;
// //     notificationCount?: number;
// //     messageCount?: number;
// //   };
// //   onLogout: () => void;
// // }

// // export function NavBar({ user, onLogout }: NavBarProps) {
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 0);
// //     };

// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   const navigationItems = [
// //     { name: 'Home', href: '/', icon: Home },
// //     { name: 'Network', href: '/network', icon: Users },
// //     { name: 'Jobs', href: '/jobs', icon: Briefcase },
// //     { name: 'Messages', href: '/messages', icon: MessageSquare, count: user.messageCount },
// //     { name: 'Notifications', href: '/notifications', icon: Bell, count: user.notificationCount },
// //   ];

// //   return (
// //     <>
// //       {/* Desktop Navigation */}
// //       <nav
// //         className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
// //           isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
// //         }`}
// //       >
// //         <div className="max-w-7xl mx-auto w-full px-4 py-2">
// //           <div className="flex items-center justify-between h-14">
// //             {/* Logo and Search */}
// //             <div className="flex items-center flex-1 gap-4">
// //               <Link href="/" className="flex-shrink-0">
// //                 <img
// //                   src="/logo.svg"
// //                   alt="Logo"
// //                   className="h-8 w-auto"
// //                 />
// //               </Link>
// //               <div className="max-w-md w-full">
// //                 <div className="relative">
// //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //                   <Input
// //                     type="search"
// //                     placeholder="Search"
// //                     className="pl-10 w-full bg-gray-100 border-none"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Navigation Items */}
// //             <div className="flex items-center gap-1">
// //               {navigationItems.map((item) => {
// //                 const Icon = item.icon;
// //                 const isActive = pathname === item.href;
                
// //                 return (
// //                   <Link
// //                     key={item.name}
// //                     href={item.href}
// //                     className={`flex flex-col items-center px-3 py-2 text-sm rounded-md transition-colors relative ${
// //                       isActive
// //                         ? 'text-blue-600'
// //                         : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
// //                     }`}
// //                   >
// //                     <Icon className="h-6 w-6" />
// //                     <span className="text-xs mt-1">{item.name}</span>
// //                     {item.count && item.count > 0 && (
// //                       <Badge
// //                         variant="destructive"
// //                         className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
// //                       >
// //                         {item.count}
// //                       </Badge>
// //                     )}
// //                   </Link>
// //                 );
// //               })}

// //               {/* Profile Dropdown */}
// //               <DropdownMenu>
// //                 <DropdownMenuTrigger asChild>
// //                   <Button variant="ghost" className="p-2">
// //                     <Avatar className="h-8 w-8">
// //                       <AvatarImage src={user.photoURL} />
// //                       <AvatarFallback>{user.name[0]}</AvatarFallback>
// //                     </Avatar>
// //                   </Button>
// //                 </DropdownMenuTrigger>
// //                 <DropdownMenuContent align="end" className="w-56">
// //                   <DropdownMenuItem asChild>
// //                     <Link href="/profile">View Profile</Link>
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem asChild>
// //                     <Link href="/settings">Settings</Link>
// //                   </DropdownMenuItem>
// //                   <DropdownMenuSeparator />
// //                   <DropdownMenuItem onClick={onLogout}>
// //                     Sign Out
// //                   </DropdownMenuItem>
// //                 </DropdownMenuContent>
// //               </DropdownMenu>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Mobile Navigation */}
// //       <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
// //         <div className="flex items-center justify-around h-16">
// //           {navigationItems.map((item) => {
// //             const Icon = item.icon;
// //             const isActive = pathname === item.href;
            
// //             return (
// //               <Link
// //                 key={item.name}
// //                 href={item.href}
// //                 className={`flex flex-col items-center px-3 py-2 text-xs relative ${
// //                   isActive
// //                     ? 'text-blue-600'
// //                     : 'text-gray-500'
// //                 }`}
// //               >
// //                 <Icon className="h-6 w-6" />
// //                 <span className="mt-1">{item.name}</span>
// //                 {item.count && item.count > 0 && (
// //                   <Badge
// //                     variant="destructive"
// //                     className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
// //                   >
// //                     {item.count}
// //                   </Badge>
// //                 )}
// //               </Link>
// //             );
// //           })}
// //         </div>
// //       </nav>

// //       {/* Mobile Search Sheet */}
// //       <Sheet open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
// //         <SheetContent side="top" className="h-full w-full p-0">
// //           <SheetHeader className="p-4 border-b">
// //             <div className="flex items-center gap-2">
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={() => setIsMobileSearchOpen(false)}
// //               >
// //                 <X className="h-6 w-6" />
// //               </Button>
// //               <Input
// //                 type="search"
// //                 placeholder="Search"
// //                 className="flex-1"
// //                 autoFocus
// //               />
// //             </div>
// //           </SheetHeader>
// //           {/* Search results would go here */}
// //         </SheetContent>
// //       </Sheet>

// //       {/* Create Post FAB (Mobile) */}
// //       <Button
// //         className="md:hidden fixed right-4 bottom-20 rounded-full h-14 w-14 shadow-lg"
// //         size="icon"
// //       >
// //         <Plus className="h-6 w-6" />
// //       </Button>
// //     </>
// //   );
// // }

// // import { Bell, Settings, User, Home } from 'lucide-react'
// // import React from 'react'
// // import { Button } from '@/components/ui/button' // Ensure correct import
// // import { MdExplore } from "react-icons/md";
// // import { GoProjectRoadmap } from "react-icons/go";


// // const Navbar = () => {
// //   return (
// //     <div>
// //       {/* Bottom Navigation */}
// //       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white border border-gray-200 shadow-lg rounded-full px-4 py-2">
// //         <div className="flex justify-between items-center">
// //           <Button 
// //             variant="ghost" 
// //             size="icon" 
// //             className="text-gray-400 hover:text-blue-500 transition-all p-3"
// //           >
// //             <Home className="h-6 w-6" />
// //           </Button>
// //           <Button 
// //             variant="ghost" 
// //             size="icon" 
// //             className="text-gray-400 hover:text-blue-500 transition-all p-3"

// //           >
// //             <MdExplore className="h-6 w-6" />
// //             {/* <Bell className="h-6 w-6" /> */}
// //           </Button>
// //           <Button 
// //             variant="ghost" 
// //             size="icon" 
// //             className="text-gray-400 hover:text-blue-500 transition-all p-3"
// //           >
// //             <GoProjectRoadmap className="h-6 w-6" />
// //             {/* <Settings className="h-6 w-6" /> */}
// //           </Button>
// //           <Button 
// //             variant="ghost" 
// //             size="icon" 
// //             className="text-gray-400 hover:text-blue-500 transition-all p-3"
// //           >
// //             <User className="h-6 w-6" />
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Navbar

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   Home, 
//   Search, 
//   PlusSquare, 
//   Heart, 
//   User,
//   MessageCircle,
//   Compass,
//   Bookmark,
//   Settings,
//   Bell
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar = () => {
//   const pathname = usePathname();
//   const [scrollDirection, setScrollDirection] = useState('none');
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [showNavbar, setShowNavbar] = useState(true);
  
//   // Handle scroll behavior for hiding/showing navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
      
//       if (currentScrollY > lastScrollY + 10) {
//         setScrollDirection('down');
//         if (currentScrollY > 100) setShowNavbar(false);
//       } else if (currentScrollY < lastScrollY - 10) {
//         setScrollDirection('up');
//         setShowNavbar(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };
    
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   // Primary navigation items
//   const navItems = [
//     { name: 'Home', href: '/', icon: Home },
//     { name: 'Explore', href: '/explore', icon: Compass },
//     { name: 'Create', href: '/create', icon: PlusSquare, isAction: true },
//     { name: 'Activity', href: '/activity', icon: Heart },
//     { name: 'Profile', href: '/profile', icon: User }
//   ];

//   return (
//     <>
     

//       {/* Bottom Navigation - Mobile Optimized */}
//       <AnimatePresence>
//         {showNavbar && (
//           <motion.nav 
//             className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200"
//             initial={{ y: 100 }}
//             animate={{ y: 0 }}
//             exit={{ y: 100 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="max-w-screen-md mx-auto px-2">
//               <div className="flex justify-between items-center h-16">
//                 {navItems.map((item) => {
//                   const isActive = pathname === item.href;
//                   const Icon = item.icon;
                  
//                   if (item.isAction) {
//                     return (
//                       <Link
//                         key={item.name}
//                         href={item.href}
//                         className="flex flex-col items-center justify-center"
//                       >
//                         <span className="relative flex h-12 w-12">
//                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-10"></span>
//                           <Icon className="relative h-8 w-8 text-black" strokeWidth={1.5} />
//                         </span>
//                       </Link>
//                     );
//                   }
                  
//                   return (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       className="flex flex-col items-center justify-center relative px-3 py-1 flex-1"
//                     >
//                       <Icon 
//                         className={`h-6 w-6 ${isActive ? 'text-black' : 'text-gray-500'}`} 
//                         strokeWidth={isActive ? 2 : 1.5} 
//                         fill={isActive ? 'black' : 'none'}
//                       />
//                       {isActive && (
//                         <motion.div
//                           layoutId="activeTab"
//                           className="absolute -bottom-1 w-1.5 h-1.5 bg-black rounded-full"
//                           transition={{ type: "spring", duration: 0.5 }}
//                         />
//                       )}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>

    

     
//     </>
//   );
// };

// export default Navbar;
"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, Plus, Briefcase } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Project', href: '/projectPage', icon: Briefcase },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 shadow-sm z-50">
      <div className="max-w-md mx-auto px-2">
        <div className="flex items-center justify-between h-16 relative">
          {/* Main navigation items */}
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            // Insert Create button in the middle
            if (index === 2) {
              return (
                <React.Fragment key="create-button-container">
                  <Link
                    href="/create"
                    className="absolute left-1/2 -translate-x-1/2 -top-6 bg-black hover:bg-gray-800 text-white rounded-full p-3 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
                    aria-label="Create new post"
                  >
                    <Plus className="h-6 w-6" strokeWidth={2} />
                  </Link>
                  
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex flex-col items-center justify-center flex-1"
                  >
                    <Icon
                      className={isActive ? "text-black" : "text-gray-500"}
                      strokeWidth={isActive ? 2 : 1.5}
                      size={24}
                      fill={isActive ? "black" : "none"}
                    />
                    <span className={`text-xs mt-1 ${isActive ? "text-black" : "text-gray-500"}`}>
                      {item.name}
                    </span>
                  </Link>
                </React.Fragment>
              );
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1"
              >
                <Icon
                  className={isActive ? "text-black" : "text-gray-500"}
                  strokeWidth={isActive ? 2 : 1.5}
                  size={24}
                  fill={isActive ? "black" : "none"}
                />
                <span className={`text-xs mt-1 ${isActive ? "text-black" : "text-gray-500"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;