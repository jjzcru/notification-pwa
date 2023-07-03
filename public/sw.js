/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// required to setup background notification handler when browser is not in focus or in background and
// In order to receive the onMessage event,  app must define the Firebase messaging service worker

importScripts(
	'https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js'
);

// Set Firebase configuration, once available
self.addEventListener('fetch', () => {
	try {
		self.firebaseConfig = {
			apiKey: 'AIzaSyDZzlvHp5j7egHtAurfRFFBDaoe8_gRp5I',
			authDomain: 'canvasflow-pwa-notification.firebaseapp.com',
			projectId: 'canvasflow-pwa-notification',
			storageBucket: 'canvasflow-pwa-notification.appspot.com',
			messagingSenderId: '880035567337',
			appId: '1:880035567337:web:a971a90585638771eac278',
			measurementId: 'G-6BQCMFV74Q',
		};
	} catch (err) {
		console.error('Failed to add event listener', err);
	}
});
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
	apiKey: true,
	projectId: true,
	messagingSenderId: true,
	appId: true,
};

// Initialize Firebase app
firebase.initializeApp(self.firebaseConfig || defaultConfig);
let messaging;
try {
	messaging = firebase.messaging();
} catch (err) {
	console.error('Failed to initialize Firebase Messaging', err);
}

// To dispaly background notifications
if (messaging) {
	try {
		messaging.onBackgroundMessage((payload) => {
			console.log('Received background message: ', payload);
			const notificationTitle = payload.notification.title;
			const notificationOptions = { body: payload.notification.body };
			self.registration.showNotification(
				notificationTitle,
				notificationOptions
			);
		});
	} catch (err) {
		console.log(err);
	}
}
