import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

interface UserContextInterface {
  user: User | null;
  signInWithGoogle: () => void;
  signOut: () => void;
  loading: boolean;
}

const userContext = createContext<UserContextInterface>({
  user: null,
  signInWithGoogle: () => {},
  signOut: () => {},
  loading: false,
});

export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const value: UserContextInterface = {
    user,
    signInWithGoogle: () => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      setLoading(true);
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          throw new Error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    signOut: () => {
      const auth = getAuth();
      auth.signOut().then(() => {
        setUser(null);
      });
    },
    loading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser);
    return unsubscribe;
  }, []);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
