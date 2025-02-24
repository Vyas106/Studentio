"use client";

// components/MessageButton.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { addDoc, collection, db } from '@/lib/firebase';
import { serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

interface MessageButtonProps {
  userId: string;
  userName: string;
}

export function MessageButton({ userId, userName }: MessageButtonProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);

    try {
      const messageData = {
        to: userId,
        toName: userName,
        from: auth.currentUser?.uid,
        fromName: auth.currentUser?.displayName,
        message: message.trim(),
        read: false,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'messages'), messageData);
      setMessage('');
      setOpen(false);
      toast({
        title: 'Success',
        description: 'Message sent successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Message
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message to {userName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSend} disabled={sending || !message.trim()}>
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}