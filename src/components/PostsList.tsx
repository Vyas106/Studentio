// // components/lists/PostsList.tsx
// import { Card } from "@/components/ui/card";
// import type { Post } from "../../types/user";

// export function PostsList({ posts }: { posts: Post[] }) {
//   return (
//     <div className="space-y-4">
//       {posts.map((post) => (
//         <Card key={post.id} className="p-4">
//           <div className="space-y-2">
//             <p className="whitespace-pre-wrap">{post.content}</p>
//             {post.imageUrl && (
//               <img
//                 src={post.imageUrl}
//                 alt="Post"
//                 className="rounded-lg max-h-96 object-cover"
//               />
//             )}
//             {post.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {post.tags.map((tag) => (
//                   <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}
//             <div className="text-sm text-gray-500">
//               {new Date(post.createdAt).toLocaleDateString()}
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }