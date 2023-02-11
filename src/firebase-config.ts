import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getToken, onMessage } from 'firebase/messaging';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';
import { isBrowser } from 'react-device-detect';

const firebaseConfig = {
    apiKey: 'AIzaSyDEhpio8NaSYClEi7kB8zj7mDuLqyqqIpQ',
    authDomain: 'vfc-ndt.firebaseapp.com',
    projectId: 'vfc-ndt',
    storageBucket: 'vfc-ndt.appspot.com',
    messagingSenderId: '393388576958',
    appId: '1:393388576958:web:8e1f168547bd790c52ceef',
    measurementId: 'G-FD90CY57FD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authGoogle = getAuth(app);

const messaging = getMessaging(app);
export default { authGoogle, messaging };

export const requestForToken = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./firebase-messaging-sw.js')
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
                getToken(messaging, { vapidKey: 'BOPLF2YEykedc9Tx7gcNsfAzQCBkCCqEPZspJqlJ-howaI0YDpKfKwscApaekgUfhhwkBQPy0gvbr0Il9dCq7gQ', serviceWorkerRegistration: registration })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.log('current token for client: ', currentToken);
                            // Track the token -> client mapping, by sending to backend server
                            // show on the UI that permission is secured
                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                            // shows on the UI that permission is required 
                        }
                    }).catch((err) => {
                        console.log('An error occurred while retrieving token. ', err);
                        // catch error while creating client token
                    });
            })
            .catch(function (err) {
                console.log('Service worker registration failed, error:', err);
            });
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });



