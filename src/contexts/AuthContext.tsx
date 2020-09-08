/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useState } from 'react';

interface AuthData {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: object;
  signIn: (credentials: SignInCredentials) => void;
  signOut: () => void;
}

const TOKEN_KEY = '@GoBarber/token';
const USER_DATA_KEY = '@GoBarber/user_data';

export const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);

    if (!!token && !!userData) {
      return {
        token,
        user: JSON.parse(userData),
      };
    }

    return {} as AuthData;
  });

  const signIn = useCallback((credentials: SignInCredentials) => {
    console.log('sign in');
  }, []);

  const signOut = useCallback(() => {
    console.log('sign out');
  }, []);

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>{children}</AuthContext.Provider>;
};
