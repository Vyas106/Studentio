
// components/chat/FileUpload.tsx
import { useRef } from 'react';
import { Image, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export function FileUpload({ onFileSelect, accept = "image/*,.pdf,.doc,.docx" }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset input
    event.target.value = '';
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleClick}>
        {accept === "image/*" ? (
          <Image className="h-5 w-5" />
        ) : (
          <Paperclip className="h-5 w-5" />
        )}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
      />
    </>
  );
}