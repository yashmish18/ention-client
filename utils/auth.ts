import { authAPI } from '@/lib/api';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  image?: string;
  avatar?: string;
}

// Get user from JWT token
export function getUserFromToken(): User | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      username: payload.username
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getUserFromToken() !== null;
}

// Login function
export async function login(credentials: any): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await authAPI.login(credentials);
    const { token } = response;

    // Store token
    localStorage.setItem('token', token);

    // Store user info
    const user = getUserFromToken();
    if (user?.name) {
      localStorage.setItem('userName', user.name);
    }

    // Dispatch auth change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('authChanged'));
    }

    return { success: true, user: user || undefined };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Signup function
export async function signup(userData: any): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await authAPI.signup(userData);
    const { token } = response;

    // Store token
    localStorage.setItem('token', token);

    // Store user info
    const user = getUserFromToken();
    if (user?.name) {
      localStorage.setItem('userName', user.name);
    }

    return { success: true, user: user || undefined };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Logout function
export function logout(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');

  // Dispatch auth change event
  window.dispatchEvent(new Event('authChanged'));
}

// Get current user info from API
export async function getCurrentUser(): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await authAPI.getCurrentUser();
    return { success: true, user: response.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Check if token is expired
export function isTokenExpired(): boolean {
  const user = getUserFromToken();
  if (!user) return true;
  return false;
}

// Refresh token
export async function refreshToken(): Promise<{ success: boolean; token?: string }> {
  const token = localStorage.getItem('token');
  return token ? { success: true, token } : { success: false };
}