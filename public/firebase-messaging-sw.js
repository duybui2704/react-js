self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true
};

self.addEventListener('fetch', () => {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
});

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const isSupported = firebase.messaging.isSupported();

if (isSupported) {
    messaging.onBackgroundMessage(function (payload) {
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
