
  // // firebase/users.ts
  // import { db } from '@/lib/firebase';
  // import { 
  //   collection, 
  //   query, 
  //   where, 
  //   orderBy, 
  //   limit, 
  //   startAfter,
  //   getDocs,
  //   QuerySnapshot,
  //   DocumentData
  // } from 'firebase/firestore';
  
  // export const USERS_PER_PAGE = 20;
  
  // export async function searchUsers(
  //   searchQuery: string,
  //   filters: FilterOptions,
  //   lastDoc?: QuerySnapshot<DocumentData>
  // ) {
  //   try {
  //     let baseQuery = collection(db, "users");
  //     let constraints: any[] = [];
  
  //     // Add search constraints
  //     if (searchQuery) {
  //       // Create a compound query for name, email, and skills
  //       constraints.push(
  //         where('searchableFields', 'array-contains-any', 
  //           searchQuery.toLowerCase().split(' ')
  //         )
  //       );
  //     }
  
  //     // Add filter constraints
  //     if (filters.college) {
  //       constraints.push(where('college', '==', filters.college));
  //     }
  //     if (filters.course) {
  //       constraints.push(where('course', '==', filters.course));
  //     }
  //     if (filters.yearOfStudy) {
  //       constraints.push(where('yearOfStudy', '==', filters.yearOfStudy));
  //     }
  //     if (filters.department) {
  //       constraints.push(where('department', '==', filters.department));
  //     }
  
  //     // Add ordering and pagination
  //     constraints.push(orderBy('lastActive', 'desc'));
  //     constraints.push(limit(USERS_PER_PAGE));
  
  //     if (lastDoc) {
  //       constraints.push(startAfter(lastDoc));
  //     }
  
  //     const usersQuery = query(baseQuery, ...constraints);
  //     const snapshot = await getDocs(usersQuery);
  
  //     return {
  //       users: snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       })) as UserInfo[],
  //       lastDoc: snapshot.docs[snapshot.docs.length - 1]
  //     };
  //   } catch (error) {
  //     console.error("Error searching users:", error);
  //     throw error;
  //   }
  // }
  