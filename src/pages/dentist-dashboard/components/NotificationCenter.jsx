import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead, onAction }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment_request':
        return 'Calendar';
      case 'cancellation':
        return 'X';
      case 'reschedule':
        return 'Clock';
      case 'message':
        return 'MessageCircle';
      case 'reminder':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    switch (type) {
      case 'appointment_request':
        return 'text-primary';
      case 'cancellation':
        return 'text-error';
      case 'reschedule':
        return 'text-warning';
      case 'message':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'high') return notification?.priority === 'high';
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return notificationTime?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                  filter === 'all' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                  filter === 'unread' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('high')}
                className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                  filter === 'high' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                High Priority
              </button>
            </div>
            
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                iconName="CheckCheck"
                iconSize={14}
              >
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notifications to display</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/30 transition-colors duration-200 ${
                  !notification?.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification?.priority === 'high' ? 'bg-error/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={16} 
                      className={getNotificationColor(notification?.type, notification?.priority)}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification?.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification?.message}
                        </p>
                        
                        {notification?.actions && notification?.actions?.length > 0 && (
                          <div className="flex items-center space-x-2 mt-3">
                            {notification?.actions?.map((action, index) => (
                              <Button
                                key={index}
                                variant={action?.variant || 'outline'}
                                size="sm"
                                onClick={() => onAction(notification?.id, action?.action)}
                                iconName={action?.icon}
                                iconSize={14}
                              >
                                {action?.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification?.timestamp)}
                        </span>
                        {!notification?.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(notification?.id)}
                            iconName="Check"
                            iconSize={14}
                            className="p-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;