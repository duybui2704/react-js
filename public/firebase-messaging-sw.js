// self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
// self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDEhpio8NaSYClEi7kB8zj7mDuLqyqqIpQ',
    authDomain: 'vfc-ndt.firebaseapp.com',
    projectId: 'vfc-ndt',
    storageBucket: 'vfc-ndt.appspot.com',
    messagingSenderId: '393388576958',
    appId: '1:393388576958:web:8e1f168547bd790c52ceef',
    measurementId: 'G-FD90CY57FD'
};

self.addEventListener('fetch', () => {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
});

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const isSupported = firebase.messaging.isSupported();

if (isSupported) {
    messaging.onBackgroundMessage(function(payload) {
        console.log('Received background message ', payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon
        };
        return self.registration.showNotification(
            notificationTitle,
            notificationOptions
        );
    });
} else {
    console.log('not Support');
}