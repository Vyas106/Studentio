// import { Tab } from "@headlessui/react";
// import { AddPost } from "./../AddPost";
// // import { AddProject } from "./../AddProject";
// import { AddNote } from "./../AddNote";
// import { PostsList } from "./../PostsList";
// import { ProjectsList } from "./../ProjectsList";
// import { NotesList } from "./../NotesList";
// import type { Post, Project, Note } from "./../../../types/user";

// interface CreateContentProps {
//   isOwnProfile: boolean;
//   userId: string;
//   posts: Post[];
//   projects: Project[];
//   notes: Note[];
//   onPostCreate: (post: Post) => void;
//   onProjectCreate: (project: Project) => void;
//   onNoteCreate: (note: Note) => void;
//   onPostDelete: (postId: string) => void;
//   onProjectDelete: (projectId: string) => void;
//   onNoteDelete: (noteId: string) => void;
// }

// export function CreateContent({
//   isOwnProfile,
//   userId,
//   posts,
//   projects,
//   notes,
//   onPostCreate,
//   // onProjectCreate,
//   onNoteCreate,
//   onPostDelete,
//   // onProjectDelete,
//   onNoteDelete,
// }: CreateContentProps) {
//   return (
//     <Tab.Group>
//       <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
//         <Tab className={({ selected }) =>
//           `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//           ${selected
//             ? 'bg-white text-blue-700 shadow'
//             : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//           }`
//         }>
//           Posts
//         </Tab>
//         <Tab className={({ selected }) =>
//           `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//           ${selected
//             ? 'bg-white text-blue-700 shadow'
//             : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//           }`
//         }>
//           Projects
//         </Tab>
//         <Tab className={({ selected }) =>
//           `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//           ${selected
//             ? 'bg-white text-blue-700 shadow'
//             : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//           }`
//         }>
//           Notes
//         </Tab>
//       </Tab.List>

//       <Tab.Panels className="mt-6">
//         <Tab.Panel>
//           <div className="space-y-6">
//             {isOwnProfile && (
//               <AddPost 
//                 onPostCreated={onPostCreate}
//                 userId={userId}
//               />
//             )}
//             <PostsList 
//               posts={posts}
//               isOwnProfile={isOwnProfile}
//               onPostDelete={onPostDelete}
//             />
//           </div>
//         </Tab.Panel>

//         <Tab.Panel>
//           <div className="space-y-6">
//             {/* {isOwnProfile && (
//               <AddProject 
//                 onProjectCreated={onProjectCreate}
//                 userId={userId}
//               />
//             )} */}
//             {/* <ProjectsList 
//               projects={projects}
//               isOwnProfile={isOwnProfile}
//               onProjectDelete={onProjectDelete}
//             /> */}
//           </div>
//         </Tab.Panel>

//         <Tab.Panel>
//           <div className="space-y-6">
//             {isOwnProfile && (
//               <AddNote 
//                 onNoteCreated={onNoteCreate}
//                 userId={userId}
//               />
//             )}
//             <NotesList 
//               notes={notes}
//               isOwnProfile={isOwnProfile}
//               onNoteDelete={onNoteDelete}
//             />
//           </div>
//         </Tab.Panel>
//       </Tab.Panels>
//     </Tab.Group>
//   );
// }