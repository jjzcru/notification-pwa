import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { MessagePayload, onMessage } from 'firebase/messaging';
import { getFirebaseToken, messaging } from './FirebaseConfig';
import firebase from 'firebase/compat/app';

interface NotificationPayloadProps {
	data?: MessagePayload | undefined;
	open: boolean;
}

function App() {
	const [count, setCount] = useState(0);
	const [notificationPayload, setNotificationPayload] = useState<
		(NotificationPayloadProps | undefined)[]
	>([]);
	const [token, setToken] = useState(localStorage.getItem('token'))

	// This is self invoking function that listen of the notification
	/*const onMessageListener = (async () => {
		const messagingResolve = await messaging;
		if (messagingResolve) {
			onMessage(messagingResolve, (payload: MessagePayload) => {
				setNotificationPayload([{ data: payload, open: true }]);
				setTimeout(
					() => setNotificationPayload([{ open: false }]),
					6000
				);
			});
		}
	})();*/

	useEffect(() => {
		if(!token) {
			return;
		}
		onMessage(messaging, (payload: MessagePayload) => {
			setNotificationPayload([{ data: payload, open: true }])
			console.log('Message received in the foreground', payload);
		});
	}, [token]);

	useEffect(() => {
		if(!notificationPayload.length) {
			return;
		}
		
		if(Notification?.permission === 'granted') {
			// alert(`GRANTED`)
			const {notification} = notificationPayload?.[0]?.data;
			console.log(`TAN TAN TAN`);
			const greeting = new Notification(notification.title);
			if(navigator?.setAppBadge) {
				navigator.setAppBadge();
			}
		} else {
			alert(`DENIED`)
		}
			
	}, [notificationPayload])

	const handleGetFirebaseToken = () => {
		getFirebaseToken().then((firebaseToken: string | undefined) => {
			if (!firebaseToken) {
				return
			}
			localStorage.setItem('token', firebaseToken)
			setToken(firebaseToken)
		});
	};

	// Need this handle FCM token generation when a user manually blocks or allows notification
	useEffect(() => {
		if (window.Notification?.permission === 'granted') {
			handleGetFirebaseToken();
		}
	}, []);

	return (
		<>
			{Notification.permission !== 'granted' && (
				<div className="notification-banner">
					<span>The app needs permission to</span>
					<a
						href="#"
						className="notification-banner-link"
						onClick={handleGetFirebaseToken}
					>
						enable push notifications.
					</a>
				</div>
			)}
			<div>
				<a rel="noopener" href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a rel="noopener" href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				{token && <button onClick={() => {
					if(token) {
					console.log(token)
					navigator.clipboard.writeText(token);
					alert('Copy to clipboard')
					}
					
				}}>
					Copy Token
				</button>}
				
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
