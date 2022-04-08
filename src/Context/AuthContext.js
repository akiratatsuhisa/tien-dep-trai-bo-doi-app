import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function updateUserProfile(profile) {
    return updateProfile(auth.currentUser, profile);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginByProvider(type = "google") {
    let provider;
    if (type === "google") {
      provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
    }
    return signInWithPopup(auth, provider);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscrible = auth.onAuthStateChanged((user) =>
      !!user ? setCurrentUser(user) : setCurrentUser(null)
    );
    return () => unsubscrible();
  }, []);

  const isLoggedIn = !!currentUser;

  const value = {
    currentUser,
    isLoggedIn,
    register,
    updateUserProfile,
    logout,
    login,
    loginByProvider,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
