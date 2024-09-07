import { collection, getDocs } from 'firebase/firestore';
import { database } from './firebase';

export const fetchAccommodations = async () => {
    const accommodationsCollection = collection(database, 'accommodations');
    const accommodationsSnapshot = await getDocs(accommodationsCollection);
    const accommodationsList = accommodationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return accommodationsList;
};