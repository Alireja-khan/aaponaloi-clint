import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // ✅ Role state
  const [loading, setLoading] = useState(true);

  // Register new user
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

  // Sign in user with email/password
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

  // Google Sign-In
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

  // Check auth state and fetch user role from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          // ✅ Save user to DB (upsert)
          await fetch(`https://aaponaloi-server.vercel.app/users/${currentUser.email}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.displayName,
              photo: currentUser.photoURL,
            }),
          });

          // ✅ Fetch role
          const res = await fetch(`https://aaponaloi-server.vercel.app/users/${currentUser.email}`);
          const data = await res.json();
          setRole(data.role || 'user');
        } catch (error) {
          console.error('Failed to fetch user role:', error);
          setRole('user');
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Provide everything in context
  const authInfo = {
    user,
    setUser,
    role, // ✅ Provide role
    loading,
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
