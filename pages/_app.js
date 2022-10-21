import { useState, useEffect } from "react";
import { firebaseCloudMessaging } from "../firebase/firebase";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  firebaseCloudMessaging.onMessage();
  useEffect(() => {
    firebaseCloudMessaging.init();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
