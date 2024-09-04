import { collection, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { database } from './firebase';

// Function to get favorites from Firestore
export const getFavoritesFromFirestore = async (userId) => {
    const userDocRef = doc(database, 'users', userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData.favorites || [];
    } else {
        console.log("No such document!");
        return [];
    }
};

// Function to save favorites to Firestore
export const saveFavoritesToFirestore = async (userId, favorites) => {
    const userDocRef = doc(database, 'users', userId);
    await updateDoc(userDocRef, {
        favorites: favorites
    });
};

// Function to add a favorite to Firestore
export const addFavoriteToFirestore = async (userId, favorite) => {
    const userDocRef = doc(database, 'users', userId);
    await updateDoc(userDocRef, {
        favorites: arrayUnion(favorite)
    });
};

// Function to remove a favorite from Firestore
export const removeFavoriteFromFirestore = async (userId, favorite) => {
    const userDocRef = doc(database, 'users', userId);
    await updateDoc(userDocRef, {
        favorites: arrayRemove(favorite)
    });
};
