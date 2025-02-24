
  // // utils/applications.ts
  // import { collection, query, where, getDocs, addDoc, updateDoc, doc, increment, arrayUnion } from 'firebase/firestore';
  // import { db } from '@/lib/firebase';
  // import type { ProjectApplication } from '../../../types/user';
  
  // export const applicationService = {
  //   // Send a new join request
  //   async sendJoinRequest(application: Omit<ProjectApplication, 'id' | 'status'>): Promise<string> {
  //     try {
  //       const applicationData: Omit<ProjectApplication, 'id'> = {
  //         ...application,
  //         status: 'pending'
  //       };
        
  //       const applicationRef = await addDoc(collection(db, 'applications'), applicationData);
        
  //       // Create notification for project owner
  //       await addDoc(collection(db, 'notifications'), {
  //         userId: application.projectOwnerId,
  //         type: 'join_request',
  //         projectId: application.projectId,
  //         projectTitle: application.projectTitle,
  //         from: application.userId,
  //         fromUserName: application.userName,
  //         message: `${application.userName} wants to join your project "${application.projectTitle}"`,
  //         createdAt: Date.now(),
  //         read: false,
  //         applicationId: applicationRef.id
  //       });
  
  //       return applicationRef.id;
  //     } catch (error) {
  //       console.error('Error sending join request:', error);
  //       throw new Error('Failed to send join request');
  //     }
  //   },
  
  //   // Get all applications for a project
  //   async getProjectApplications(projectId: string): Promise<ProjectApplication[]> {
  //     try {
  //       const applicationsQuery = query(
  //         collection(db, 'applications'),
  //         where('projectId', '==', projectId)
  //       );
        
  //       const snapshot = await getDocs(applicationsQuery);
  //       return snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       } as ProjectApplication));
  //     } catch (error) {
  //       console.error('Error fetching applications:', error);
  //       throw new Error('Failed to fetch applications');
  //     }
  //   },
  
  //   // Handle application response (accept/reject)
  //   async handleApplicationResponse(
  //     applicationId: string, 
  //     projectId: string, 
  //     status: 'accepted' | 'rejected',
  //     applicantData: { userId: string; userName: string; }
  //   ): Promise<void> {
  //     try {
  //       // Update application status
  //       await updateDoc(doc(db, 'applications', applicationId), { status });
  
  //       if (status === 'accepted') {
  //         // Update project members
  //         await updateDoc(doc(db, 'projects', projectId), {
  //           currentMembers: increment(1),
  //           members: arrayUnion({
  //             userId: applicantData.userId,
  //             name: applicantData.userName,
  //             role: 'Member',
  //             joinedAt: Date.now()
  //           })
  //         });
  
  //         // Create notification for accepted user
  //         await addDoc(collection(db, 'notifications'), {
  //           userId: applicantData.userId,
  //           type: 'application_accepted',
  //           projectId,
  //           message: `Your request to join the project has been accepted!`,
  //           createdAt: Date.now(),
  //           read: false
  //         });
  //       } else {
  //         // Create notification for rejected user
  //         await addDoc(collection(db, 'notifications'), {
  //           userId: applicantData.userId,
  //           type: 'application_rejected',
  //           projectId,
  //           message: `Your request to join the project has been rejected.`,
  //           createdAt: Date.now(),
  //           read: false
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error handling application response:', error);
  //       throw new Error('Failed to handle application response');
  //     }
  //   }
  // };
  





  
// utils/applications.ts
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProjectApplication } from '../../../types/user';

export const applicationService = {
  async sendJoinRequest(applicationData: Omit<ProjectApplication, 'id' | 'status'>) {
    const application: ProjectApplication = {
      ...applicationData,
      status: 'pending'
    };

    // Add application to applications collection
    const applicationRef = await addDoc(collection(db, 'applications'), application);

    // Create notification for project owner
    await addDoc(collection(db, 'notifications'), {
      userId: application.projectOwnerId,
      type: 'join_request',
      projectId: application.projectId,
      projectTitle: application.projectTitle,
      from: application.userId,
      fromUserName: application.userName,
      message: `${application.userName} wants to join your project "${application.projectTitle}"`,
      createdAt: Date.now(),
      read: false,
      applicationId: applicationRef.id
    });

    return applicationRef;
  },

  async getUserApplications(userId: string) {
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(applicationsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProjectApplication[];
  },

  async getProjectApplications(projectId: string) {
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('projectId', '==', projectId)
    );
    
    const snapshot = await getDocs(applicationsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProjectApplication[];
  }
};