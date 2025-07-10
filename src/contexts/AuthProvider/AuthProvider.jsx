import React, { useEffect, useState, useCallback } from 'react';
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
// const BACKEND_URL = 'http://localhost:5000/';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [userProfile, setUserProfile] = useState(null);
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

  // const upsertUserToDB = useCallback(async (firebaseUser) => {
  //   if (!firebaseUser?.email) return;
  //   try {
  //     const res = await fetch(`${BACKEND_URL}/${encodeURIComponent(firebaseUser.email)}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         email: firebaseUser.email,
  //         name: firebaseUser.displayName || '',
  //         photo: firebaseUser.photoURL || '',
  //         role: 'user',
  //       }),
  //     });
  //     if (!res.ok) throw new Error('Failed to upsert user');
  //   } catch (err) {
  //     console.error('Error upserting user:', err);
  //   }
  // }, []);

  // const fetchUserProfile = useCallback(async (email) => {
  //   if (!email) return;
  //   try {
  //     const res = await fetch(`${BACKEND_URL}/${encodeURIComponent(email)}`);
  //     if (!res.ok) throw new Error('Failed to fetch profile');
  //     const profile = await res.json();
  //     setUserProfile(profile);
  //   } catch (err) {
  //     console.error('Error fetching user profile:', err);
  //     setUserProfile(null);
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);


      // setLoading(true);
      // if (currentUser?.email) {
      //   try {
      //     const token = await currentUser.getIdToken(true);
      //     localStorage.setItem('access-token', token);

      //     await upsertUserToDB(currentUser);
      //     await fetchUserProfile(currentUser.email);
      //   } catch (err) {
      //     console.error('Error during auth state change:', err);
      //   }
      // } else {
      //   localStorage.removeItem('access-token');
      //   setUserProfile(null);
      // }


      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    // userProfile,
    setUser,
    loading,
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
