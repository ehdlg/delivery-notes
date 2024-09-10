import { useState } from 'react';

export function useToken() {
  const initialValue: string | null = localStorage.getItem('token') ?? null;
  const [token, setToken] = useState<string | null>(initialValue);

  const logout = () => {
    setToken(null);

    localStorage.removeItem('token');
  };

  const login = (newToken: string) => {
    setToken(newToken);

    localStorage.setItem('token', newToken);
  };

  const isLoggedIn = null != token;

  return { token, login, logout, isLoggedIn };
}

export default useToken;
