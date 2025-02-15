import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Search,
  Bell,
  MessageSquare,
  Briefcase,
  Users,
  UserCircle,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface NavBarProps {
  user: {
    name: string;
    photoURL?: string;
    notificationCount?: number;
    messageCount?: number;
  };
  onLogout: () => void;
}

export function NavBar({ user, onLogout }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Network', href: '/network', icon: Users },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Messages', href: '/messages', icon: MessageSquare, count: user.messageCount },
    { name: 'Notifications', href: '/notifications', icon: Bell, count: user.notificationCount },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-4 py-2">
          <div className="flex items-center justify-between h-14">
            {/* Logo and Search */}
            <div className="flex items-center flex-1 gap-4">
              <Link href="/" className="flex-shrink-0">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-8 w-auto"
                />
              </Link>
              <div className="max-w-md w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10 w-full bg-gray-100 border-none"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center px-3 py-2 text-sm rounded-md transition-colors relative ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs mt-1">{item.name}</span>
                    {item.count && item.count > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                      >
                        {item.count}
                      </Badge>
                    )}
                  </Link>
                );
              })}

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">View Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
        <div className="flex items-center justify-around h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center px-3 py-2 text-xs relative ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1">{item.name}</span>
                {item.count && item.count > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {item.count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Search Sheet */}
      <Sheet open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
        <SheetContent side="top" className="h-full w-full p-0">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              <Input
                type="search"
                placeholder="Search"
                className="flex-1"
                autoFocus
              />
            </div>
          </SheetHeader>
          {/* Search results would go here */}
        </SheetContent>
      </Sheet>

      {/* Create Post FAB (Mobile) */}
      <Button
        className="md:hidden fixed right-4 bottom-20 rounded-full h-14 w-14 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </>
  );
}