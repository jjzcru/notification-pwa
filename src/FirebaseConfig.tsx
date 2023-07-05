import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
};

console.log(`FIREBASE CONFIG`, firebaseConfig)

export const firebaseApp = initializeApp(firebaseConfig);

export const messaging = getMessaging(firebaseApp);

// getOrRegisterServiceWorker function is used to try and get the service worker if it exists, otherwise it will register a new one.
export const getOrRegisterServiceWorker = () => {
	if (
		'serviceWorker' in navigator &&
		typeof window.navigator.serviceWorker !== 'undefined'
	) {
		return window.navigator.serviceWorker
			.getRegistration('/firebase-push-notification-scope')
			.then((serviceWorker) => {
				if (serviceWorker) return serviceWorker;
				return window.navigator.serviceWorker.register(
					'/firebase-messaging-sw.js',
					{
						scope: '/firebase-push-notification-scope',
					}
				);
			});
	}
	throw new Error('The browser doesn`t support service worker.');
};

// getFirebaseToken function generates the FCM token
export const getFirebaseToken = async () => {
	try {
		const messagingResolve = await messaging;
		if (messagingResolve) {
			return getOrRegisterServiceWorker().then(
				(serviceWorkerRegistration) => {
					return Promise.resolve(
						getToken(messagingResolve, {
							vapidKey: import.meta.env.VITE_VAPID_KEY,
							serviceWorkerRegistration,
						})
					);
				}
			);
		}
	} catch (error) {
		console.log('An error occurred while retrieving token. ', error);
	}
};
