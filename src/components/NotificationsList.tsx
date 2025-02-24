
// components/NotificationsList.tsx
import { formatDistanceToNow } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Notification } from '../../types/user';
import { Button } from './ui/button';

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => Promise<void>;
  onMarkAllAsRead?: () => Promise<void>;
}

export function NotificationsList({ 
  notifications,
  onMarkAsRead,
  onMarkAllAsRead 
}: NotificationsListProps) {
  const renderNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case 'join_request':
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/api/avatar/${notification.from}`} />
              <AvatarFallback>{notification.fromUserName?.[0] ?? '?'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p>
                <Link href={`/profile/${notification.from}`} className="font-medium hover:underline">
                  {notification.fromUserName}
                </Link>
                {' requested to join '}
                <Link href={`/project/${notification.projectId}`} className="font-medium hover:underline">
                  {notification.projectTitle}
                </Link>
              </p>
              <time className="text-sm text-gray-500">
                {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
              </time>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-3">
            {notification.from && (
              <Avatar>
                <AvatarImage src={`/api/avatar/${notification.from}`} />
                <AvatarFallback>{notification.fromUserName?.[0] ?? '?'}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <p>{notification.message}</p>
              <time className="text-sm text-gray-500">
                {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
              </time>
            </div>
          </div>
        );
    }
  };

  if (notifications.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No notifications</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {onMarkAllAsRead && notifications.some(n => !n.read) && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
      )}
      {notifications.map((notification) => (
        <Card 
          key={notification.id}
          className={`p-4 transition-colors ${
            notification.read ? 'bg-white' : 'bg-blue-50'
          }`}
        >
          <div className="flex justify-between items-start">
            {renderNotificationContent(notification)}
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                className="ml-4 shrink-0"
              >
                Mark as read
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
