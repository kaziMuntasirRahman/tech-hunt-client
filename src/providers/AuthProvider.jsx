import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoading(true)
        setUser(currentUser)
        console.log(currentUser)
        console.log('User is present as: ', currentUser?.displayName?.toUpperCase())
        setLoading(false)
      } else {
        setLoading(false)
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }

  }, [])

  const createUser = async (name, email, imgURL, password) => {
    try {
      setLoading(true)
      const response = await createUserWithEmailAndPassword(auth, email, password)
      console.log(response.user)
      await updateProfile(response.user, { displayName: name, photoURL: imgURL })
        .then(() => { // update profile doesn't return anything
          console.log("Profile Updated.")
        })
        .catch(err => console.log(err))
      return response.user;
    } catch (error) {
      console.log(error)
      return error;
    } finally {
      setLoading(false)
    }
  }

  const googleSignIn = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const response = await signInWithPopup(auth, provider)
      return response.user
    } catch (err) {
      console.log(err)
      return err
    } finally {
      setLoading(false)
    }
  }

  const logIn = async (email, password) => {
    try {
      setLoading(true)
      const response = await signInWithEmailAndPassword(auth, email, password)
      return response.user
    } catch (err) {
      console.log(err.message)
      return err
    } finally {
      setLoading(false)
    }
  }


  const logOut = async () => {
    try {
      setLoading(true)
      await signOut(auth)
      return true;
    }
    catch {
      (err) => {
        return err
      }
    } finally {
      setLoading(false)

    }
  }


  const authInfo = {
    user,
    setUser,
    loading,
    logIn,
    createUser,
    googleSignIn,
    logOut
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;