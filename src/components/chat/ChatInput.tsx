import { auth, realtimeDb } from "@/lib/firebase";
import { push, ref } from "firebase/database";
import { PaperclipIcon, SendIcon, XIcon } from "lucide-react";
import { Input, Message } from "postcss";
import { useRef, useState } from "react";
import { Button } from "react-day-picker";

  // components/chat/ChatInput.tsx
  export function ChatInput({ chatRoomId, replyTo, onCancelReply }: {
    chatRoomId: string;
    replyTo: Message | null;
    onCancelReply: () => void;
  }) {
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleSendMessage = async () => {
      if (!message.trim() && !uploading) return;
  
      const currentUser = auth.currentUser;
      if (!currentUser) return;
  
      const messageRef = ref(realtimeDb, `chats/${chatRoomId}/messages`);
      const newMessage: Omit<Message, 'id'> = {
        content: message,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || '',
        senderAvatar: currentUser.photoURL || undefined,
        timestamp: Date.now(),
        status: 'sent',
        replyTo: replyTo || undefined
      };
  
      await push(messageRef, newMessage);
      setMessage('');
      onCancelReply();
    };
  
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'chat_media');
  
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: 'POST',
            body: formData
          }
        );
  
        const data = await response.json();
  
        // Send message with media
        const currentUser = auth.currentUser;
        if (!currentUser) return;
  
        const messageRef = ref(realtimeDb, `chats/${chatRoomId}/messages`);
        const newMessage: Omit<Message, 'id'> = {
          content: message,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || '',
          senderAvatar: currentUser.photoURL || undefined,
          timestamp: Date.now(),
          status: 'sent',
          mediaUrl: data.secure_url,
          mediaType: file.type.startsWith('image/') ? 'image' : 'video',
          replyTo: replyTo || undefined
        };
  
        await push(messageRef, newMessage);
        setMessage('');
        onCancelReply();
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <div className="p-4 bg-white dark:bg-gray-800 border-t">
        {replyTo && (
          <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{replyTo.senderName}</p>
              <p className="text-sm truncate">{replyTo.content}</p>
            </div>
            <button onClick={onCancelReply}>
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            className="hidden"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <PaperclipIcon className="w-5 h-5" />
          </Button>
          
          <input
           value={message}
        onChange={(e) => setMessage(e.target.value)}
  placeholder="Type a message..."
  className="flex-1"
  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
/>

          
          <Button onClick={handleSendMessage} disabled={!message.trim() && !uploading}>
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }