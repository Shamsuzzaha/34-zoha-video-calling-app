import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Contact, addContact, getContacts, updateContactStatus, removeContact } from '@/lib/contactService';

interface ContactContextType {
  contacts: Contact[];
  loading: boolean;
  addNewContact: (email: string) => Promise<void>;
  acceptContact: (contactId: string) => Promise<void>;
  blockContact: (contactId: string) => Promise<void>;
  deleteContact: (contactId: string) => Promise<void>;
  refreshContacts: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | null>(null);

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshContacts = async () => {
    if (!currentUser) return;
    try {
      const contactsList = await getContacts();
      setContacts(contactsList);
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      toast({
        title: 'Error fetching contacts',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      refreshContacts();
    } else {
      setContacts([]);
    }
    setLoading(false);
  }, [currentUser]);

  const addNewContact = async (email: string) => {
    try {
      await addContact(email);
      await refreshContacts();
      toast({
        title: 'Contact added',
        description: 'Contact request sent successfully.'
      });
    } catch (error: any) {
      console.error('Error adding contact:', error);
      const errorMessage = error.message === 'User not found' 
        ? 'No user found with this email address. Please check the email and try again.'
        : error.message;
      toast({
        title: 'Error adding contact',
        description: errorMessage,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const acceptContact = async (contactId: string) => {
    try {
      await updateContactStatus(contactId, 'accepted');
      await refreshContacts();
      toast({
        title: 'Contact accepted',
        description: 'Contact has been added to your list.'
      });
    } catch (error: any) {
      console.error('Error accepting contact:', error);
      toast({
        title: 'Error accepting contact',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const blockContact = async (contactId: string) => {
    try {
      await updateContactStatus(contactId, 'blocked');
      await refreshContacts();
      toast({
        title: 'Contact blocked',
        description: 'Contact has been blocked.'
      });
    } catch (error: any) {
      console.error('Error blocking contact:', error);
      toast({
        title: 'Error blocking contact',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      await removeContact(contactId);
      await refreshContacts();
      toast({
        title: 'Contact removed',
        description: 'Contact has been removed from your list.'
      });
    } catch (error: any) {
      console.error('Error removing contact:', error);
      toast({
        title: 'Error removing contact',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        addNewContact,
        acceptContact,
        blockContact,
        deleteContact,
        refreshContacts
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};