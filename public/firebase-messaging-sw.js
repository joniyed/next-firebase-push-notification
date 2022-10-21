importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAqNuvsSO82ivwpMURJ7mmJfZb1aUI0s6o",
  authDomain: "nagalay-demo.firebaseapp.com",
  projectId: "nagalay-demo",
  storageBucket: "nagalay-demo.appspot.com",
  messagingSenderId: "646059377887",
  appId: "1:646059377887:web:6c91286a870526befa956a",
  measurementId: "G-9MN8GHDYDM"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
