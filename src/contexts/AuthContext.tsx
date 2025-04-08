
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await updateProfile(result.user, { displayName });
        toast({
          title: "Account created!",
          description: "You've successfully signed up for Telezyne.",
        });
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Welcome to Telezyne!",
        description: "You've successfully signed in with Google.",
      });
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out",
        description: "You've been successfully logged out.",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    if (!currentUser) return;
    try {
      await updateProfile(currentUser, { 
        displayName, 
        photoURL: photoURL || currentUser.photoURL 
      });
      // Force refresh the current user to get updated info
      setCurrentUser({ ...currentUser });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
