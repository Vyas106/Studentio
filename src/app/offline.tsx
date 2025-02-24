// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function OfflinePage() {
//   const [isOnline, setIsOnline] = useState(true);

//   useEffect(() => {
//     const handleOnlineStatus = () => setIsOnline(navigator.onLine);
//     window.addEventListener("online", handleOnlineStatus);
//     window.addEventListener("offline", handleOnlineStatus);
//     return () => {
//       window.removeEventListener("online", handleOnlineStatus);
//       window.removeEventListener("offline", handleOnlineStatus);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
//       {!isOnline ? (
//         <>
//           <h1 className="text-4xl font-bold text-red-500">You're Offline</h1>
//           <p className="text-gray-300 mt-2">Check your internet connection and try again.</p>
//         </>
//       ) : (
//         <>
//           <h1 className="text-4xl font-bold text-green-500">You're Back Online</h1>
//           <p className="text-gray-300 mt-2">You can now browse normally.</p>
//         </>
//       )}
//       <Link href="/">
//         <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg">
//           Go Home
//         </button>
//       </Link>
//     </div>
//   );
// }
