// // const ProjectCardForHome = ({ project }) => {
// //     return (
// //       <div className="project-card">
// //         <img src={project.imageUrl} alt={project.title} className="project-image" />
// //         <div className="project-details">
// //           <h3 className="project-title">{project.title}</h3>
// //           <p className="project-creator">Created by: {project.userId}</p>
// //           <p className="project-college">College: {project.collegeName}</p>
// //         </div>
// //       </div>
// //     );
// //   };
  
// //   export default ProjectCardForHome;
// "use client";


// // components/ProjectCard.tsx
// import { useState } from 'react';
// import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { db } from '../lib/firebase';

// export default function ProjectCard({ project }: { project: any }) {
//   const [showJoinForm, setShowJoinForm] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleJoinProject = async () => {
//     if (!message) return;
//     const projectRef = doc(db, 'projects', project.id);
//     await updateDoc(projectRef, {
//       joinRequests: arrayUnion({ userId: 'CURRENT_USER_ID', message }),
//     });
//     setShowJoinForm(false);
//     setMessage('');
//   };

//   return (
//     <div className="border p-4 rounded-lg shadow-md">
//       <img src={project.image.url} alt={project.title} className="w-full h-48 object-cover rounded" />
//       <h2 className="text-xl font-bold mt-4">{project.title}</h2>
//       <p className="text-gray-600">{project.description}</p>
//       <div className="mt-4">
//         <button
//           onClick={() => setShowJoinForm(!showJoinForm)}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Join Project
//         </button>
//         {showJoinForm && (
//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="Your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             <button
//               onClick={handleJoinProject}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//             >
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }