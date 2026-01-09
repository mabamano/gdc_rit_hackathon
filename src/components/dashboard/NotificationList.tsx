import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Notification } from '@/types';
import { cn } from '@/lib/utils';

interface NotificationListProps {
  notifications: Notification[];
  maxItems?: number;
}

export function NotificationList({ notifications, maxItems = 5 }: NotificationListProps) {
  const displayNotifications = notifications.slice(0, maxItems);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <Card variant="stat">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </CardTitle>
        <Badge variant="secondary" className="rounded-full">
          {notifications.filter(n => !n.read).length} new
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayNotifications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No notifications
          </p>
        ) : (
          displayNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-colors",
                notification.read ? "bg-muted/30" : "bg-accent"
              )}
            >
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {notification.message}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {getTimeAgo(notification.timestamp)}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
