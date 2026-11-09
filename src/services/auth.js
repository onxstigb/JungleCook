import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';

import { auth } from './firebase.js';

// Sign up a new user
export async function signUp(firstName, lastName, email, password) {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
    });

    return userCredential.user;
}

// Log in an existing user
export async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return userCredential.user;
}

// Log out the current user
export async function logout() {
    await signOut(auth);
}

// Listen for login/logout changes
export function checkAuthState(callback) {
    return onAuthStateChanged(auth, callback);
}