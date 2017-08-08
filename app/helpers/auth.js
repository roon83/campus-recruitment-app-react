import React from 'react'
import { ref, firebaseAuth } from '../config/constants'

export const auth = (email, pw) => firebaseAuth().createUserWithEmailAndPassword(email, pw)

export const logout = () => firebaseAuth().signOut()

export const login = (email, pw) => firebaseAuth().signInWithEmailAndPassword(email, pw)

export const resetPassword = (email) => firebaseAuth().sendPasswordResetEmail(email)
