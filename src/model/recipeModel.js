import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp
} from 'firebase/firestore';

import { db, auth } from '../services/firebase.js';

// Reference to recipes collection
const recipesCollection = collection(db, 'recipes');


// Create a recipe
export async function createRecipe(recipeData) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('You must be logged in to create a recipe.');
    }

    const newRecipe = {
        ...recipeData,
        userId: user.uid,
        userName: user.displayName || 'User',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    const recipeRef = await addDoc(
        recipesCollection,
        newRecipe
    );

    return recipeRef.id;
}


// Get recipes belonging to the logged-in user
export async function getUserRecipes() {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('You must be logged in to view your recipes.');
    }

    const recipesQuery = query(
        recipesCollection,
        where('userId', '==', user.uid)
    );

    const snapshot = await getDocs(recipesQuery);

    return snapshot.docs.map((recipeDoc) => ({
        id: recipeDoc.id,
        ...recipeDoc.data()
    }));
}


// Get one recipe by ID
export async function getRecipeById(recipeId) {
    const recipeRef = doc(db, 'recipes', recipeId);
    const recipeSnapshot = await getDoc(recipeRef);

    if (!recipeSnapshot.exists()) {
        return null;
    }

    const recipe = {
        id: recipeSnapshot.id,
        ...recipeSnapshot.data()
    };

    const user = auth.currentUser;

    if (!user || recipe.userId !== user.uid) {
        throw new Error(
            'You do not have permission to view this recipe.'
        );
    }

    return recipe;
}


// Update an existing recipe
export async function updateRecipe(recipeId, recipeData) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('You must be logged in to edit recipes.');
    }

    const recipeRef = doc(db, 'recipes', recipeId);
    const recipeSnapshot = await getDoc(recipeRef);

    if (!recipeSnapshot.exists()) {
        throw new Error('Recipe not found.');
    }

    if (recipeSnapshot.data().userId !== user.uid) {
        throw new Error('You cannot edit someone else\'s recipe.');
    }

    await updateDoc(recipeRef, {
        ...recipeData,
        updatedAt: serverTimestamp()
    });
}


// Delete a recipe
export async function deleteRecipe(recipeId) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('You must be logged in to delete recipes.');
    }

    const recipeRef = doc(db, 'recipes', recipeId);
    const recipeSnapshot = await getDoc(recipeRef);

    if (!recipeSnapshot.exists()) {
        throw new Error('Recipe not found.');
    }

    if (recipeSnapshot.data().userId !== user.uid) {
        throw new Error('You cannot delete someone else\'s recipe.');
    }

    await deleteDoc(recipeRef);
}
