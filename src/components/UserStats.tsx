

// components/UserStats.tsx
import { useUserStats } from '@/hooks/useUserStats';
import { Card, CardContent } from '@/components/ui/card';
import { FiUsers, FiUserCheck, FiFileText, FiBox } from 'react-icons/fi';

interface UserStatsProps {
  userId: string;
}

export const UserStats = ({ userId }: UserStatsProps) => {
  const { stats, loading } = useUserStats(userId);

  if (loading) return <div className="animate-pulse h-24 bg-gray-100 rounded-lg" />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Followers', value: stats.followers, icon: FiUsers },
        { label: 'Following', value: stats.following, icon: FiUserCheck },
        { label: 'Posts', value: stats.posts, icon: FiFileText },
        { label: 'Projects', value: stats.projects, icon: FiBox }
      ].map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Icon className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-semibold">{value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
