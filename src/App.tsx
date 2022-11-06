import { useUser } from "./contexts/UserContext";
import { Dashboard } from "./Dashboard";

import { SignIn } from "./SignIn";

import { firebaseConfig } from "./firebase/firebase-config";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {});

export const App = () => {
  const { user } = useUser();

  if (user === null) {
    return <SignIn />;
  }

  return <Dashboard />;
};
