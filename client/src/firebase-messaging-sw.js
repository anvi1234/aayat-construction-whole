
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
 apiKey: "AIzaSyCEk-Dm6MHQyn6hYv06gZL-o1xUxeTZxac",
 authDomain: "aayat-construction.firebaseapp.com",
 databaseURL: "config data from general tab",
 projectId: "aayat-construction",
 storageBucket: "aayat-construction.appspot.com",
 messagingSenderId: "544497226887",
 appId: "1:544497226887:web:257a25b12507b80b045422",
 measurementId: "G-GX38YP3P4Z",
 vapidKey:"BHee-3CmlULtJEWJ2CCcsjNjp6AVgneC-WiRpWB2_FWVbp8GXT0BH4SkGdAmZ9Y8jZqp0Fi0KlT7sdAeedi5bJ8"
});
const messaging = firebase.messaging();

// messaging.onMessage(function(payload) {
//     console.log(
//         "[firebase-messaging-sw.js] Received background message ",
//         payload,
//     );
//     // Customize notification here
//     const notificationTitle = "Background Message Title";
//     const notificationOptions = {
//         body: "Background Message body.",
//         icon: "/itwonders-web-logo.png",
//     };

//     return self.registration.showNotification(
//         notificationTitle,
//         notificationOptions,
//     );
// });
// messaging.onBackgroundMessage(function(payload) {
//     console.log("payload",payload)
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//     body: payload.notification.body,
//     icon:'PATH TO ICON IF ANY',
//     data: { url:payload.data["gcm.notification.onClick"] }, //the url which we gonna use later
//     };
//     return self.registration.showNotification(notificationTitle,notificationOptions);
//     });
//     self.addEventListener('notificationclick', function(event) {
//         console.log("event",event)
//         let url = event.notification.data.url;
//         event.notification.close(); 
//         event.waitUntil(
//         clients.matchAll({type: 'window'}).then( windowClients => {
//         // Check if there is already a window/tab open with the target URL
//         for (var i = 0; i < windowClients.length; i++) {
//         var client = windowClients[i];
//         // If so, just focus it.
//         if (client.url === url && 'focus' in client) {
//         return client.focus();
//         }
//         }
//         // If not, then open the target URL in a new window/tab.
//         if (clients.openWindow) {
//         return clients.openWindow(url);
//         }
//         })
//         );
//         });