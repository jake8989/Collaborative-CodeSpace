import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
// import { authPersist } from './persistence';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
	try {
		firebase.initializeApp(firebaseConfig);

		if ('measurementId' in firebaseConfig) {
			firebase.analytics();
		}
	} catch (err: any) {
		if (!/already exists/.test(err.message)) {
			throw new Error(err);
		}
	}
}

const firebaseSDK = firebase;

export default firebaseSDK;
