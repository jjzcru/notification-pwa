// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDZzlvHp5j7egHtAurfRFFBDaoe8_gRp5I',
	authDomain: 'canvasflow-pwa-notification.firebaseapp.com',
	projectId: 'canvasflow-pwa-notification',
	storageBucket: 'canvasflow-pwa-notification.appspot.com',
	messagingSenderId: '880035567337',
	appId: '1:880035567337:web:a971a90585638771eac278',
	measurementId: 'G-6BQCMFV74Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
