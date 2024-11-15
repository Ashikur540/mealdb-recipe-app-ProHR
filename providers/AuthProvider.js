"use client"
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

import { app } from '@/lib/configs/firebase'

/**
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - The current authenticated user
 * @property {boolean} authLoading - Loading state for auth operations
 * @property {function(string, string, string, string): Promise<void>} registerUser - Register new user
 * @property {function(): Promise<void>} signInWithGoogle - Sign in with Google
 * @property {function(string, string): Promise<void>} signIn - Sign in with email/password
 * @property {function(): Promise<void>} logout - Sign out user
 * @property {function(string): Promise<void>} resetPassword - Reset password
 * @property {function} setAuthLoading - Set loading state
 */

/** @type {React.Context<AuthContextType>} */
const AuthContext = createContext()

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    const registerUser = async (email, password, displayName, phoneNumber) => {
        try {
            setAuthLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, { displayName, phoneNumber })
            return userCredential
        } finally {
            setAuthLoading(false)
        }
    }

    const signInWithGoogle = async () => {
        try {
            setAuthLoading(true)
            return await signInWithPopup(auth, googleProvider)
        } finally {
            setAuthLoading(false)
        }
    }

    /**
     * Sign out current user
     */
    const logout = async () => {
        try {
            setAuthLoading(true)
            await signOut(auth)
        } finally {
            setAuthLoading(false)
        }
    }
    const signIn = async (email, password) => {
        try {
            setAuthLoading(true)
            return await signInWithEmailAndPassword(auth, email, password)
        } finally {
            setAuthLoading(false)
        }
    }

    const resetPassword = async (email) => {
        try {
            setAuthLoading(true)
            return await sendPasswordResetEmail(auth, email)
        } finally {
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setAuthLoading(false)
        })

        return unsubscribe
    }, [])

    const authValue = {
        user,
        authLoading,
        setAuthLoading,
        registerUser,
        signInWithGoogle,
        signIn,
        logout,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider



/**
 * Custom hook to use auth context
 * @returns {AuthContextType}
 */
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}