import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface TokenResponse {
  token: string;
}

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for token in query params (for initial login)
    const queryToken = router.query.token as string;
    if (queryToken) {
      setToken(queryToken);
      localStorage.setItem('authToken', queryToken);
      Cookies.set('authToken', queryToken, { expires: 7 }); // Set cookie to expire in 7 days
      router.replace(router.pathname, undefined, { shallow: true }); // Remove token from URL
    } else {
      // If no query token, try to get from localStorage or cookie
      const storedToken = typeof window !== 'undefined' 
        ? localStorage.getItem('authToken') || Cookies.get('authToken')
        : Cookies.get('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [router]);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch('https://hiring.reachinbox.xyz/api/v1/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data: TokenResponse = await response.json();
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
        Cookies.set('authToken', data.token, { expires: 7 });
        return data.token;
      } else {
        // If refresh fails, clear the token and redirect to login
        setToken(null);
        localStorage.removeItem('authToken');
        Cookies.remove('authToken');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      router.push('/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      const refreshInterval = setInterval(() => {
        refreshToken();
      }, 14 * 60 * 1000); // Refresh every 14 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [token, refreshToken]);

  const getToken = useCallback(() => {
    if (!token) {
      router.push('/login');
      return null;
    }
    return token;
  }, [token, router]);

  return { getToken, refreshToken };
};

export default useAuthToken;