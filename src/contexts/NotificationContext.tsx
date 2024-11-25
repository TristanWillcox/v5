import React, { createContext, useContext, useState, useEffect } from 'react';

interface NotificationContextType {
  notifications: string[];
  addNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-zinc-800 text-white p-4 rounded-lg shadow-lg transition-transform duration-300"
              style={{
                transform: `translateY(${index * 10}px)`,
              }}
            >
              {notification}
            </div>
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
