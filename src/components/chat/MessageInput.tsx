
// components/chat/MessageInput.tsx
const MessageInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onAttach: () => void;
  onRecord: () => void;
  isRecording: boolean;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
}> = ({
  value,
  onChange,
  onSend,
  onAttach,
  onRecord,
  isRecording,
  selectedFiles,
  onRemoveFile,
}) => {
  return (
    <div className="p-4 bg-white border-t">
      {selectedFiles.length > 0 && (
        <div className="flex space-x-2 mb-2 overflow-x-auto">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Selected media"
                className="h-20 w-20 object-cover rounded"
              />
              <button
                onClick={() => onRemoveFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onAttach}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          📎
        </button>
        
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-full focus:outline-none focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
        />
        
        {value.trim() || selectedFiles.length > 0 ? (
          <button
            onClick={onSend}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            ➤
          </button>
        ) : (
          <button
            onClick={onRecord}
            className={`p-2 ${
              isRecording ? 'text-red-500' : 'text-gray-500'
            } hover:text-gray-700`}
          >
            🎤
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;