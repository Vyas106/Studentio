// components/chat/MediaPreview.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaPreviewProps {
  file: File;
  onRemove: () => void;
}

export function MediaPreview({ file, onRemove }: MediaPreviewProps) {
  const [preview, setPreview] = useState<string>(() => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return '';
  });

  const isImage = file.type.startsWith('image/');

  return (
    <div className="relative inline-block">
      {isImage ? (
        <img
          src={preview}
          alt="Preview"
          className="max-w-[200px] max-h-[200px] rounded"
        />
      ) : (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <span className="text-sm">{file.name}</span>
        </div>
      )}
      <Button
        variant="destructive"
        size="icon"
        className="absolute -top-2 -right-2 rounded-full w-6 h-6"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
