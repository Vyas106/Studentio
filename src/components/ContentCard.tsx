// import { useUserStats } from "@/hooks/useUserStats";
// import { Note, Post, Project } from "../../types/user";

//   // components/ContentCard.tsx
//   interface ContentCardProps {
//     item: Post | Project | Note;
//     type: 'posts' | 'projects' | 'notes';
//     onLike: (id: string) => Promise<void>;
//     onSave: (id: string) => Promise<void>;
//     onShare: (id: string) => void;
//     onComment?: (content: string, parentId?: string) => Promise<void>;
//     showComments?: boolean;
//   }
  
//   export function ContentCard({
//     item,
//     type,
//     onLike,
//     onSave,
//     onShare,
//     onComment,
//     showComments = false
//   }: ContentCardProps) {
//     const [showFullContent, setShowFullContent] = useState(false);
//     const user = useUserStats(item.userId);
//     const formattedDate = new Date(item.createdAt).toLocaleDateString();
    
//     const content = 'content' in item ? item.content : item.description;
//     const isLongContent = content.length > 200;
//     const displayContent = showFullContent ? content : content.slice(0, 200);
  
//     return (
//       <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//         <CardContent className="p-4">
//           <div className="flex items-center gap-3 mb-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={user?.photoURL} />
//               <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-semibold">{user?.name}</p>
//               <p className="text-sm text-gray-500">{formattedDate}</p>
//             </div>
//           </div>
  
//           {'imageUrl' in item && item.imageUrl && (
//             <div className="relative h-48 mb-4">
//               <img
//                 src={item.imageUrl}
//                 alt=""
//                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           )}
  
//           {'title' in item && (
//             <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//           )}
  
//           <div className="space-y-2">
//             <p className="text-gray-700">
//               {displayContent}
//               {isLongContent && !showFullContent && '...'}
//             </p>
            
//             {isLongContent && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setShowFullContent(!showFullContent)}
//               >
//                 {showFullContent ? 'Show less' : 'Read more'}
//               </Button>
//             )}
//           </div>
  
//           {item.tags && (
//             <div className="flex flex-wrap gap-2 mt-4">
//               {item.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           )}
  
//           <div className="flex items-center justify-between pt-4 border-t mt-4">
//             <div className="flex gap-4">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => onLike(item.id)}
//                 className={item.likes?.includes(currentUser.uid) ? 'text-blue-600' : ''}
//               >
//                 <FiHeart className="mr-2" />
//                 {item.likes?.length || 0}
//               </Button>
              
//               {'content' in item && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setShowComments(!showComments)}
//                 >
//                   <FiMessageSquare className="mr-2" />
//                   {item.comments?.length || 0}
//                 </Button>
//               )}
//             </div>
  
//             <div className="flex gap-2">
//               {type === 'projects' && 'githubUrl' in item && item.githubUrl && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => window.open(item.githubUrl, '_blank')}
//                 >
//                   <FiGithub />
//                 </Button>
//               )}
              
//               {type === 'projects' && 'liveUrl' in item && item.liveUrl && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => window.open(item.liveUrl, '_blank')}
//                 >
//                   <FiLink />
//                 </Button>
//               )}
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => onShare(item.id)}
//               >
//                 <FiShare2 />
//               </Button>
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => onSave(item.id)}
//                 className={item.saved?.includes(currentUser.uid) ? 'text-blue-600' : ''}
//               >
//                 <FiBookmark />
//               </Button>
//             </div>
//           </div>
  
//           {showComments && 'comments' in item && onComment && (
//             <CommentSection
//               comments={item.comments}
//               postId={item.id}
//               onAddComment={onComment}
//             />
//           )}
//         </CardContent>
//       </Card>
//     );
//   }
  