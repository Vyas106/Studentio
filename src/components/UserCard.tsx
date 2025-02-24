
  // components/UserCard.tsx
  import { UserProfile } from './../../types/user';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent } from '@/components/ui/card';
  import { Badge } from '@/components/ui/badge';
  import { MessageButton } from './MessageButton';
  import { useFollow } from '@/hooks/useFollow';
  import {  FiMapPin, FiBook } from 'react-icons/fi';
  
  interface UserCardProps {
    user: UserProfile;
    onProfileClick: (userId: string) => void;
  }
  
  export const UserCard = ({ user, onProfileClick }: UserCardProps) => {
    const { isFollowing, loading, toggleFollow } = useFollow(user.uid);
  
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback className="text-lg">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  {user.username && (
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {user.college && (
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      {user.college}
                    </div>
                  )}
                  {user.course && (
                    <div className="flex items-center">
                      <FiBook className="mr-1" />
                      {user.course}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {user.skills?.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{user.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={toggleFollow}
                disabled={loading}
                className="w-28"
              >
                {loading ? "Loading..." : isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                onClick={() => onProfileClick(user.uid)}
                className="w-28"
              >
                View Profile
              </Button>
              <MessageButton userId={user.uid} userName={user.name} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  