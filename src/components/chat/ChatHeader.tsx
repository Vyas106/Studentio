// // import { Avatar } from "@radix-ui/react-avatar";

import { User } from "firebase/auth";
import { ChatRoom } from "../../../types/user";

// //   // components/chat/ChatHeader.tsx
// //   export function ChatHeader({ name, avatar, online }: {
// //     name: string;
// //     avatar?: string;
// //     online: boolean;
// //   }) {
// //     return (
// //       <div className="flex items-center p-4 border-b bg-white dark:bg-gray-800">
// //         <Avatar src={avatar} alt={name} className="w-10 h-10" />
// //         <div className="ml-4">
// //           <h2 className="font-medium">{name}</h2>
// //           <p className="text-sm text-gray-500">
// //             {online ? 'Online' : 'Offline'}
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }
  
// import * as Avatar from "@radix-ui/react-avatar";

// export function ChatHeader({ name, avatar, online }: { 
//   name: string;
//   avatar?: string;
//   online: boolean;
// }) {
//   return (
//     <div className="flex items-center p-4 border-b bg-white dark:bg-gray-800">
//       <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
//         {avatar ? (
//           <Avatar.Image 
//             src={avatar} 
//             alt={name} 
//             className="w-full h-full object-cover" 
//           />
//         ) : (
//           <Avatar.Fallback className="flex items-center justify-center w-full h-full text-gray-600">
//             {name.charAt(0)}
//           </Avatar.Fallback>
//         )}
//       </Avatar.Root>

//       <div className="ml-4">
//         <h2 className="font-medium">{name}</h2>
//         <p className="text-sm text-gray-500">
//           {online ? 'Online' : 'Offline'}
//         </p>
//       </div>
//     </div>
//   );
// }


// components/chat/ChatHeader.tsx
const ChatHeader: React.FC<{
  chatRoom: ChatRoom | null;
  currentUser: User | null;
  isTyping: boolean;
}> = ({ chatRoom, currentUser, isTyping }) => {
  const otherParticipant = chatRoom?.participants.find(
    p => p.id !== currentUser?.uid
  );

  return (
    <div className="p-4 bg-white border-b flex items-center space-x-4">
      {otherParticipant?.photoURL ? (
        <img
          src={otherParticipant.photoURL}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300" />
      )}
      
      <div className="flex-1">
        <h2 className="font-semibold">{otherParticipant?.name}</h2>
        <p className="text-sm text-gray-500">
          {isTyping
            ? 'typing...'
            : otherParticipant?.isOnline
            ? 'online'
            : otherParticipant?.lastSeen
            ? `last seen ${new Date(otherParticipant.lastSeen).toLocaleString()}`
            : ''}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">📞</button>
        <button className="text-gray-500 hover:text-gray-700">📹</button>
        <button className="text-gray-500 hover:text-gray-700">⋮</button>
      </div>
    </div>
  );
};

export default ChatHeader;