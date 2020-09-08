/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

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

  useEffect(() => {
    if (data.token && data.user) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }
  }, [data]);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    const response = await api.post<{ user: object; token: string }>('/sessions', credentials);

    const { token, user } = response.data;

    setData({
      user,
      token,
    });
  }, []);

  const signOut = useCallback(() => {
    setData({} as AuthData);
  }, []);

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>{children}</AuthContext.Provider>;
};
