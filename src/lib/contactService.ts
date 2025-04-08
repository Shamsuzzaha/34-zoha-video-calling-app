import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth } from './firebase';

const db = getFirestore();
const contactsCollection = 'contacts';

export interface Contact {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

export const addContact = async (contactEmail: string) => {
  if (!auth.currentUser) throw new Error('User must be authenticated');

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', contactEmail));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('User not found');
  }

  const contactUser = querySnapshot.docs[0].data();
  const contactId = querySnapshot.docs[0].id;

  const contactRef = doc(db, contactsCollection, `${auth.currentUser.uid}_${contactId}`);
  
  await setDoc(contactRef, {
    userId: auth.currentUser.uid,
    contactId: contactId,
    displayName: contactUser.displayName,
    email: contactUser.email,
    photoURL: contactUser.photoURL,
    status: 'pending',
    createdAt: new Date()
  });
};

export const getContacts = async () => {
  if (!auth.currentUser) throw new Error('User must be authenticated');

  const contactsRef = collection(db, contactsCollection);
  const q = query(contactsRef, where('userId', '==', auth.currentUser.uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Contact[];
};

export const updateContactStatus = async (contactId: string, status: Contact['status']) => {
  if (!auth.currentUser) throw new Error('User must be authenticated');

  const contactRef = doc(db, contactsCollection, contactId);
  await updateDoc(contactRef, { status });
};

export const removeContact = async (contactId: string) => {
  if (!auth.currentUser) throw new Error('User must be authenticated');

  const contactRef = doc(db, contactsCollection, contactId);
  await deleteDoc(contactRef);
};