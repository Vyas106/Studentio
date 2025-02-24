"use client";

  // components/UserCard.tsx
  import { memo } from 'react';
  import { motion } from 'framer-motion';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';
  
  interface UserCardProps {
    user: UserInfo;
    isCurrentUser: boolean;
    onStartChat: (user: UserInfo) => void;
  }
  
const UserCard = memo(({ user, isCurrentUser, onStartChat }: UserCardProps) => {
    const lastActiveTime = user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4"
      >
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              {user.photoURL ? (
                <AvatarImage src={user.photoURL} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-primary/10">
                  {user.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white
              ${user.status === 'online' ? 'bg-green-500' : 
                user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium truncate">{user.name}</h3>
              {isCurrentUser && (
                <Badge variant="secondary" className="text-xs">You</Badge>
              )}
              {user.status === 'online' && (
                <Badge variant="success" className="text-xs">Online</Badge>
              )}
            </div>
            
            <div className="text-sm text-gray-500 space-y-1">
              <p className="truncate">{user.college}</p>
              {user.course && (
                <p className="truncate text-xs">{user.course} • {user.yearOfStudy}</p>
              )}
              {user.skills && user.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {user.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {user.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.skills.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
  
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isCurrentUser && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onStartChat(user);
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          )}
        </div>
      </motion.div>
    );
  });
  
  UserCard.displayName = 'UserCard';
  
  export default UserCard;
