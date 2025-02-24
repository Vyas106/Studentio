"use client";

import { auth, realtimeDb } from "@/lib/firebase";
import { push, ref } from "firebase/database";
import { useEffect, useState } from "react";

  // hooks/useNotifications.ts
  export function useNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>();
    const currentUser = auth.currentUser;
  
    useEffect(() => {
      const requestPermission = async () => {
        const result = await Notification.requestPermission();
        setPermission(result);
      };
  
      requestPermission();
    }, []);
  
    const sendNotification = async (userId: string, notification: {
      title: string;
      message: string;
      type?: string;
    }) => {
      if (!currentUser) return;
  
      const notificationRef = ref(realtimeDb, `notifications/${userId}`);
      await push(notificationRef, {
        ...notification,
        senderId: currentUser.uid,
        timestamp: Date.now(),
        read: false
      });
    };
  
    return { permission, sendNotification };
  }