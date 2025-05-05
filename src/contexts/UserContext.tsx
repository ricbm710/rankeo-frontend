import { createContext, useEffect, useState } from "react";
// utils
import { getCurrentUser } from "../utils/dbutils/userOperations";

interface User {
  userId: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// This is like a container for the info I want to persist
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// This is what happens when the App loads for the first time
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
