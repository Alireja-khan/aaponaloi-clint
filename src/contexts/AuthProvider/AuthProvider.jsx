import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();
const BACKEND_URL = 'http://localhost:5000/api/users'; // Replace with your deployed backend if needed

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [userProfile, setUserProfile] = useState(null); // MongoDB user profile
  const [loading, setLoading] = useState(true);

  // Create user (register)
  const createUser = async (email, password) => {
    if (!email || !password) {
      return Promise.reject(new Error('Email and password are required'));
    }
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const signInUser = async (email, password) => {
    if (!email || !password) {
      return Promise.reject(new Error('Email and password are required'));
    }
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const googleSignIn = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  // Sign out user
  const signOutUser = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // Save/update user in DB
  const upsertUserToDB = async (firebaseUser) => {
    try {
      const res = await fetch(`${BACKEND_URL}/profile/${encodeURIComponent(firebaseUser.email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: firebaseUser.email,
          name: firebaseUser.displayName || '',
          photo: firebaseUser.photoURL || '',
          role: 'member', // default role
        }),
      });

      if (!res.ok) throw new Error('Failed to upsert user');
    } catch (err) {
      console.error('Error upserting user:', err);
    }
  };

  // Fetch user profile from DB
  const fetchUserProfile = async (email) => {
    try {
      const res = await fetch(`${BACKEND_URL}/profile/${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const profile = await res.json();
      setUserProfile(profile);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setUserProfile(null);
    }
  };

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser?.email) {
        // Save or update user in MongoDB first
        await upsertUserToDB(currentUser);

        // Then fetch profile
        await fetchUserProfile(currentUser.email);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userProfile,
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
