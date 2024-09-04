import { database } from './firebase';
import { collection, setDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; 

// Function to add a new user to Firestore
export const addUserToFirestore = async (user) => {
    try {
        const userDocRef = doc(database, "users", user.uid);
        await setDoc(userDocRef, user);
        console.log("Document written with ID: ", user.uid);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Function to get all users from Firestore
export const getUsersFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(database, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
    });
    return users;
};

// Function to get a single user from Firestore
export const getUserFromFirestore = async (id) => {
    const docRef = doc(database, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.log("No such document!");
        return null;
    }
};

// Function to update a user in Firestore
export const updateUserInFirestore = async (id, updatedUser) => {
    const docRef = doc(database, "users", id);
    await updateDoc(docRef, updatedUser);
};

// Function to delete a user from Firestore
export const deleteUserFromFirestore = async (id) => {
    await deleteDoc(doc(database, "users", id));
};
