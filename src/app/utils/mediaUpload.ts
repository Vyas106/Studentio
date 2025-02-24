
// utils/mediaUpload.ts
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadMedia = async (file: File): Promise<string> => {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `chat-media/${timestamp}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};