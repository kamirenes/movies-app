import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  exp: number;
  [key: string]: any;
};

const TOKEN_KEY = 'token';
const TOKEN_EXP_KEY = 'token_expiry';

export const storeToken = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const expiry = decoded.exp * 1000;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXP_KEY, expiry.toString());
  } catch (err) {
    console.error('Invalid token format', err);
  }
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXP_KEY);

  if (!token || !expiry) return null;
  if (Date.now() > parseInt(expiry)) {
    removeToken();
    return null;
  }

  return token;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXP_KEY);
};