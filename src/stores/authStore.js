import { writable } from 'svelte/store';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

const signOutUser = () => signOut(auth);

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

const authState = writable({
	isLoggedIn: false,
	user: null,
	signInWithGooglePopup,
	signOutUser,
	onAuthStateChangedListener
});

export default authState;
