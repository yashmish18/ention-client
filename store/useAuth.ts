import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Server returns user objects shaped like:
 * { id, email, firstName, lastName, phone?, role: { id, name }, status, ... }
 *
 * JWT decoded in middleware gives: roleName (string)
 *
 * We accept both shapes and normalize access via helpers.
 */
export interface AuthUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    status?: string;

    // Server sends role as object { id, name } from /auth/me
    // or roleName string from JWT decode
    role?: { id?: string; name: string } | string;
    roleName?: string;
    roleId?: string;

    // Legacy compat — older client code may still reference .name
    name?: string;
}

/** Safely extract the display name from the user object */
export function getUserDisplayName(user: AuthUser | null): string {
    if (!user) return 'User';
    if (user.firstName) return user.firstName;
    if (user.name) return user.name.split(' ')[0];
    return user.email?.split('@')[0] || 'User';
}

/** Safely extract the role name string */
export function getUserRoleName(user: AuthUser | null): string {
    if (!user) return '';
    if (user.roleName) return user.roleName;
    if (typeof user.role === 'object' && user.role?.name) return user.role.name;
    if (typeof user.role === 'string') return user.role;
    return '';
}

/** Check if user has admin privileges */
export function isAdmin(user: AuthUser | null): boolean {
    const role = getUserRoleName(user);
    return ['admin', 'super_admin'].includes(role);
}

interface AuthStore {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setAuth: (user: AuthUser, token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
    initialize: () => void;
}

export const useAuth = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: true,

            setAuth: (user, token) => {
                // Also sync to localStorage for the API client's auth header injection
                if (typeof window !== 'undefined') {
                    localStorage.setItem('ention_token', token);
                    localStorage.setItem('ention_user', JSON.stringify(user));
                }
                set({ user, token, isAuthenticated: true, isLoading: false });
            },

            logout: () => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('ention_token');
                    localStorage.removeItem('ention_user');
                }
                set({ user: null, token: null, isAuthenticated: false, isLoading: false });
            },

            setLoading: (loading) => set({ isLoading: loading }),

            initialize: () => {
                if (typeof window === 'undefined') return;

                // If already authenticated and have user data, skip
                const current = get();
                if (current.isAuthenticated && current.token && current.user) return;

                let token = localStorage.getItem('ention_token');
                const userStr = localStorage.getItem('ention_user');
                
                // Fallback to cookie if localStorage is empty (e.g. browser cleared it but kept cookies)
                if (!token) {
                    const cookieMatch = document.cookie.match(/ention_token=([^;]+)/);
                    if (cookieMatch) token = cookieMatch[1];
                }

                if (token && userStr) {
                    try {
                        const user = JSON.parse(userStr);
                        set({ user, token, isAuthenticated: true, isLoading: false });
                    } catch {
                        // Keep token but clear malformed user
                        set({ token, isAuthenticated: true, isLoading: false });
                    }
                } else if (token) {
                    // Token exists but no user object yet - mark as authenticated to allow access
                    // The Header/Navbar will eventually fetch full user data or healer will sync.
                    set({ token, isAuthenticated: true, isLoading: false });
                } else {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'ention-auth-storage',
        }
    )
);
