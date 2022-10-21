/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import localforage from "localforage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAqNuvsSO82ivwpMURJ7mmJfZb1aUI0s6o",
  authDomain: "nagalay-demo.firebaseapp.com",
  projectId: "nagalay-demo",
  storageBucket: "nagalay-demo.appspot.com",
  messagingSenderId: "646059377887",
  appId: "1:646059377887:web:6c91286a870526befa956a",
  measurementId: "G-9MN8GHDYDM"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const token = await localforage.getItem("fcm_token");
    console.log("fcm_token tokenInlocalforage", token);
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert("Notificacion");
    });
  },

  init: async function () {
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        console.log("it already exists");
        return false;
      }
      console.log("it is creating it.");
      const messaging = getMessaging(app);
      await Notification.requestPermission();
      getToken(messaging, {
        vapidKey:
          "BP2MZ7owKX7DmWeiqdb89xPelbox_42tZlFb9i8LatK3o0spGq6TC-6mZge_1BBXbWQx9-p-kt7sMFXbLxZ4DIY",
      })
        .then((currentToken) => {
          console.log("current Token", currentToken);
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // save the token in your database
            localforage.setItem("fcm_token", currentToken);
            console.log("fcm_token", currentToken);
          } else {
            // Show permission request UI
            console.log(
              "NOTIFICACION, No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log(
            "NOTIFICACIONAn error occurred while retrieving token . "
          );
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
