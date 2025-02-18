import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Notification {
  id: number;
  type: 'order' | 'offer' | 'delivery';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((newNotification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    setNotifications(current => [
      {
        ...newNotification,
        id: Date.now(),
        time: new Date().toLocaleString(),
        read: false,
      },
      ...current,
    ]);
  }, []);

  const markAsRead = useCallback((id: number) => {
    setNotifications(current =>
      current.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
