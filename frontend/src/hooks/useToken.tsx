import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types';
import { TOKEN_ISSUER } from '../constants';

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

  const verifyToken = () => {
    if (null == token) return false;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log(decoded, TOKEN_ISSUER);

      console.log(decoded.iss == TOKEN_ISSUER);

      return decoded.iss == TOKEN_ISSUER;
    } catch (error) {
      logout();

      return false;
    }
  };

  const isLoggedIn = null != token && verifyToken();

  return { token, login, logout, isLoggedIn };
}

export default useToken;
