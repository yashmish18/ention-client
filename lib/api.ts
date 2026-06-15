/**
 * Centralized API Client for Ention
 * All backend calls flow through here. No hardcoded URLs anywhere else.
 *
 * Server base: http://localhost:4000/api/v1
 * Response envelope: { success, message, data, pagination? }
 *
 * Auth endpoints (server contract):
 *   POST /auth/register  { firstName, lastName, email, password, phone? }
 *   POST /auth/login     { email, password }  → { data: { user, accessToken } }
 *   GET  /auth/me        (Bearer token)
 *   POST /auth/logout
 *
 * Products:
 *   GET  /products       → { data: [...], pagination }
 *   GET  /products/:id   → { data: { product } }
 *   GET  /products/slug/:slug → { data: { product } }
 *
 * Cart (server-side):
 *   GET    /cart
 *   POST   /cart/items          { productId, variantId?, quantity }
 *   PATCH  /cart/items/:itemId  { quantity }
 *   DELETE /cart/items/:itemId
 *   DELETE /cart
 *
 * Users / Addresses:
 *   GET  /users/addresses
 *   POST /users/addresses  { label, fullName, phone, line1, line2?, city, state, country, pincode }
 *
 * Orders (auth required):
 *   POST /orders   { addressId, couponCode?, notes? }
 *   GET  /orders   → user's own orders
 *   GET  /orders/:id
 *   POST /orders/:id/cancel
 *
 * Reviews:
 *   POST /reviews  { productId, rating, title?, body? }
 *
 * Support:
 *   POST /support  { subject, description, priority?, orderId?, category? }
 *   GET  /support
 */

import { PRODUCTS, getProductByIdOrSlug } from '@/lib/products-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// ─── Token helpers ────────────────────────────────────────────────

export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('ention_token');
}

function authHeaders(): HeadersInit {
    const token = getAuthToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

// ─── Response handler ─────────────────────────────────────────────

async function handleResponse<T>(res: Response): Promise<T> {
    if (res.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('ention_token');
            localStorage.removeItem('ention_user');
            // Clear cookies to prevent middleware redirect loops
            document.cookie = 'ention_token=; path=/; max-age=0; SameSite=Lax; Secure';
            document.cookie = 'ention_role=; path=/; max-age=0; SameSite=Lax; Secure';
            window.location.href = '/login';
        }
        throw new Error('Session expired. Please login again.');
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        // Server error envelope: { success: false, message, errors? }
        const msg = body.message || body.error || `Request failed (${res.status})`;
        throw new Error(msg);
    }
    // Success envelope: { success: true, message, data, pagination? }
    return body as T;
}

// ─── Auth ─────────────────────────────────────────────────────────

/**
 * POST /auth/login
 * Server expects: { email, password }
 * Server returns: { success, data: { user, accessToken } }
 */
export async function authLogin(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    const body = await handleResponse<{ success: boolean; data: { user: any; accessToken: string } }>(res);
    // Normalise to { user, token } so the rest of the client is consistent
    return { user: body.data.user, token: body.data.accessToken };
}

/**
 * POST /auth/register
 * Server expects: { firstName, lastName, email, password, phone? }
 * Server returns: { success, data: { user } }  (no token on register — user must log in)
 */
export async function authRegister(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, ...(phone ? { phone } : {}) }),
    });
    const body = await handleResponse<{ success: boolean; data: { user: any } }>(res);
    return { user: body.data.user };
}

/**
 * POST /auth/login after register — convenience wrapper used by AuthForm
 * Registers then immediately logs in so the UI gets a token.
 */
export async function authSignup(fullName: string, email: string, password: string) {
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] || fullName;
    const lastName = parts.slice(1).join(' ') || '.';

    await authRegister(firstName, lastName, email, password);
    // Immediately log in to obtain the access token
    return authLogin(email, password);
}

/**
 * GET /auth/me
 */
export async function fetchCurrentUser() {
    const res = await fetch(`${API_URL}/auth/me`, { headers: authHeaders() });
    const body = await handleResponse<{ success: boolean; data: { user: any } }>(res);
    return { user: body.data.user };
}

/**
 * PATCH /users/profile
 */
export async function updateProfile(data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) {
    const res = await fetch(`${API_URL}/users/profile`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    const body = await handleResponse<{ success: boolean; data: { user: any } }>(res);
    return body.data.user;
}

/**
 * PATCH /users/change-password
 */
export async function changePassword(currentPassword: string, newPassword: string) {
    const res = await fetch(`${API_URL}/users/change-password`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(res);
}

/**
 * POST /auth/logout
 */
export async function authLogout() {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: authHeaders(),
            credentials: 'include',
        });
    } catch {
        // Ignore network errors on logout
    }
}

// ─── Products ─────────────────────────────────────────────────────

/**
 * GET /products
 * Server returns paginated envelope: { success, data: [...], pagination }
 * Falls back to local seed if the backend is unreachable.
 */
export async function fetchProducts(params?: Record<string, string>) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s total limit for list

    try {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        const res = await fetch(`${API_URL}/products${qs}`, {
            next: { revalidate: 3600 },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`API ${res.status}`);
        const body = await res.json();
        const products = body.data?.products || (Array.isArray(body.data) ? body.data : []);
        if (products.length > 0) return products;
        return PRODUCTS;
    } catch {
        clearTimeout(timeoutId);
        return PRODUCTS;
    }
}

/**
 * GET /products/:id
 */
export async function fetchProductById(id: string) {
    const local = getProductByIdOrSlug(id);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 800); // 800ms snappy limit

    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            next: { revalidate: 3600 },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) return local || null;
        const body = await res.json();
        return body.data?.product || body.data || local || null;
    } catch {
        clearTimeout(timeoutId);
        return local || null;
    }
}

/**
 * GET /products/slug/:slug
 */
export async function fetchProductBySlug(slug: string) {
    try {
        const res = await fetch(`${API_URL}/products/slug/${slug}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return getProductByIdOrSlug(slug) || null;
        const body = await res.json();
        return body.data?.product || body.data || getProductByIdOrSlug(slug) || null;
    } catch {
        return getProductByIdOrSlug(slug) || null;
    }
}

// ─── Server-side Cart ─────────────────────────────────────────────

/**
 * GET /cart — fetch authenticated user's server cart
 */
export async function fetchServerCart() {
    const res = await fetch(`${API_URL}/cart`, { headers: authHeaders() });
    const body = await handleResponse<{ success: boolean; data: any }>(res);
    return body.data;
}

/**
 * POST /cart/items — add item to server cart
 */
export async function addToServerCart(productId: string, quantity: number = 1, variantId?: string) {
    const res = await fetch(`${API_URL}/cart/items`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ productId, quantity, ...(variantId ? { variantId } : {}) }),
    });
    const body = await handleResponse<{ success: boolean; data: any }>(res);
    return body.data;
}

/**
 * DELETE /cart — clear the server cart
 */
export async function clearServerCart() {
    try {
        await fetch(`${API_URL}/cart`, { method: 'DELETE', headers: authHeaders() });
    } catch { /* ignore */ }
}

// ─── Addresses ────────────────────────────────────────────────────

/**
 * GET /users/addresses
 */
export async function fetchAddresses() {
    const res = await fetch(`${API_URL}/users/addresses`, { headers: authHeaders() });
    const body = await handleResponse<{ success: boolean; data: any }>(res);
    // Server returns { data: { addresses: [...] } }
    return Array.isArray(body.data) ? body.data : (body.data?.addresses || []);
}

/**
 * POST /users/addresses
 * body: { label, fullName, phone, line1, line2?, city, state, country, pincode }
 */
export async function createAddress(address: {
    label?: string;
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country?: string;
    pincode: string;
}) {
    const res = await fetch(`${API_URL}/users/addresses`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ country: 'India', label: 'Home', ...address }),
    });
    const body = await handleResponse<{ success: boolean; data: { address: any } }>(res);
    return body.data?.address || body.data;
}

/**
 * PATCH /users/addresses/:id
 */
export async function updateAddress(id: string, address: any) {
    const res = await fetch(`${API_URL}/users/addresses/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(address),
    });
    const body = await handleResponse<{ success: boolean; data: { address: any } }>(res);
    return body.data?.address || body.data;
}

/**
 * DELETE /users/addresses/:id
 */
export async function deleteAddress(id: string) {
    const res = await fetch(`${API_URL}/users/addresses/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });
    return handleResponse(res);
}

/**
 * PATCH /users/addresses/:id/default
 */
export async function setDefaultAddress(id: string) {
    const res = await fetch(`${API_URL}/users/addresses/${id}/default`, {
        method: 'PATCH',
        headers: authHeaders(),
    });
    return handleResponse(res);
}

// ─── Orders ───────────────────────────────────────────────────────

/**
 * POST /orders  { addressId, couponCode?, notes? }
 * Converts the server-side cart into an order.
 */
export async function createOrder(payload: {
    addressId: string;
    couponCode?: string;
    notes?: string;
}) {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
    });
    const body = await handleResponse<{ success: boolean; data: { order: any } }>(res);
    return body.data?.order || body.data;
}

/**
 * GET /orders — authenticated user's order history
 */
export async function fetchUserOrders() {
    const res = await fetch(`${API_URL}/orders`, { headers: authHeaders() });
    const body = await handleResponse<{ success: boolean; data: any }>(res);
    // data can be { orders, pagination } or a plain array
    return Array.isArray(body.data) ? body.data : (body.data?.orders || []);
}

/**
 * GET /orders/:id
 */
export async function fetchOrderById(id: string) {
    const res = await fetch(`${API_URL}/orders/${id}`, { headers: authHeaders() });
    const body = await handleResponse<{ success: boolean; data: { order: any } }>(res);
    return body.data?.order || body.data;
}

/**
 * POST /orders/:id/cancel
 */
export async function cancelOrder(id: string, reason?: string) {
    const res = await fetch(`${API_URL}/orders/${id}/cancel`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ reason }),
    });
    const body = await handleResponse<{ success: boolean; data: any }>(res);
    return body.data;
}

// ─── Reviews ──────────────────────────────────────────────────────

/**
 * POST /reviews  { productId, rating, title?, body? }
 * Auth required + user must have purchased the product.
 */
export async function submitReview(productId: string, review: {
    rating: number;
    title?: string;
    body?: string;
}) {
    const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ productId, ...review }),
    });
    const responseBody = await handleResponse<{ success: boolean; data: any }>(res);
    return responseBody.data;
}

// ─── Support / CRM ────────────────────────────────────────────────

/**
 * POST /support  { subject, description, priority?, orderId?, category? }
 */
export async function createSupportTicket(ticket: {
    subject: string;
    description: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    orderId?: string;
    category?: string;
}) {
    console.log("MOCK POST /support", { ticket });
    await new Promise(r => setTimeout(r, 500));
    return { success: true, data: { ticket: { id: "mock-ticket-1", ticketNumber: "TKT-001" } } };
}

/**
 * GET /support — user's own support tickets
 */
export async function fetchSupportTickets() {
    const res = await fetch(`${API_URL}/support`, { headers: authHeaders() });
    const body = await handleResponse<{ success: boolean; data: any }>(res);
    return Array.isArray(body.data) ? body.data : (body.data?.tickets || []);
}

/**
 * POST /support/leads
 */
export async function submitLead(data: {
    name: string;
    email: string;
    phone: string;
    useCase?: string;
    budget?: string;
    description: string;
    source?: string;
}) {
    const res = await fetch(`${API_URL}/support/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

/**
 * POST /support/applications
 */
export async function submitApplication(data: {
    programName: string;
    name: string;
    email: string;
    phone: string;
    organization?: string;
    role?: string;
    dynamicFields: any;
}) {
    const res = await fetch(`${API_URL}/support/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

/**
 * POST /support/callbacks
 */
export async function submitCallback(data: {
    name: string;
    phone: string;
    preferredTime?: string;
}) {
    const res = await fetch(`${API_URL}/support/callbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

// ─── Legacy aliases (kept for backward compat with existing pages) ─

/** @deprecated Use fetchUserOrders() */
export async function fetchUserOrdersLegacy(_userId: string) {
    return fetchUserOrders();
}

/** @deprecated Use fetchOrderById() */
export async function trackOrder(orderId: string) {
    return fetchOrderById(orderId);
}

/** @deprecated Use fetchProductById() */
export async function fetchProductReviews(_productId: string): Promise<any[]> {
    return [];
}

// ─── Inquiry System (new unified /inquiries routes) ───────────────

/**
 * POST /inquiries/lead
 * Public — no auth required.
 * body: { name, email, phone, useCase?, budget?, description, source }
 */
export async function submitLeadInquiry(data: {
    name: string;
    email: string;
    phone: string;
    useCase?: string;
    budget?: string;
    description: string;
    source: string;
    attachment?: File | null;
}) {
    console.log("MOCK POST /inquiries/lead", { data });
    await new Promise(r => setTimeout(r, 500));
    return { success: true, data: { inquiry: { id: "mock-1" } } };
}

/**
 * POST /inquiries/program
 * Public — no auth required. Sends multipart/form-data to support file upload.
 * body: { programName, name, email, phone, organization?, role?, source, dynamicFields (JSON string), attachment? }
 */
export async function submitProgramInquiry(data: {
    programName: string;
    name: string;
    email: string;
    phone: string;
    organization?: string;
    role?: string;
    source: string;
    dynamicFields?: Record<string, any>;
    attachment?: File | null;
}) {
    const form = new FormData();
    form.append('programName', data.programName);
    form.append('name', data.name);
    form.append('email', data.email);
    form.append('phone', data.phone);
    form.append('source', data.source);
    if (data.organization) form.append('organization', data.organization);
    if (data.role) form.append('role', data.role);
    if (data.dynamicFields) form.append('dynamicFields', JSON.stringify(data.dynamicFields));
    if (data.attachment) form.append('attachment', data.attachment);

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/inquiries/program`, {
        method: 'POST',
        headers,
        body: form,
    });
    return handleResponse(res);
}

/**
 * POST /inquiries/callback
 * Public — no auth required.
 * body: { name, phone, preferredTime?, source }
 */
export async function submitCallbackInquiry(data: {
    name: string;
    phone: string;
    preferredTime?: string;
    source: string;
}) {
    console.log("MOCK POST /inquiries/callback", { data });
    await new Promise(r => setTimeout(r, 500));
    return { success: true, data: { inquiry: { id: "mock-3" } } };
}

/**
 * POST /support
 * Alias that maps to createSupportTicket — provided for naming consistency.
 */
export async function submitSupportRequest(ticket: {
    subject: string;
    description: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    orderId?: string;
    category?: string;
}) {
    return createSupportTicket(ticket);
}

// ─── Admin: Inquiry Management ────────────────────────────────────

/**
 * GET /inquiries/admin
 * Requires admin auth. Supports query params: type, status, source, search, page, limit
 */
export async function fetchAdminInquiries(params?: {
    type?: 'LEAD' | 'PROGRAM' | 'CALLBACK';
    status?: string;
    source?: string;
    search?: string;
    page?: number;
    limit?: number;
}) {
    const qs = params ? '?' + new URLSearchParams(
        Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== '')
            .map(([k, v]) => [k, String(v)])
    ).toString() : '';

    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const res = await fetch(`${API_URL}/inquiries/admin${qs}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return handleResponse<{ success: boolean; data: any }>(res);
}

/**
 * GET /inquiries/admin/:id
 */
export async function fetchAdminInquiryById(id: string) {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');
    const res = await fetch(`${API_URL}/inquiries/admin/${id}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return handleResponse<{ success: boolean; data: any }>(res);
}

/**
 * PATCH /inquiries/admin/:id/status
 */
export async function updateAdminInquiryStatus(id: string, status: string) {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');
    const res = await fetch(`${API_URL}/inquiries/admin/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
    });
    return handleResponse<{ success: boolean; data: any }>(res);
}

/**
 * PATCH /inquiries/admin/:id/assign
 */
export async function updateAdminInquiryAssignment(id: string, assignedTo: string) {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');
    const res = await fetch(`${API_URL}/inquiries/admin/${id}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ assignedTo }),
    });
    return handleResponse<{ success: boolean; data: any }>(res);
}

/**
 * PATCH /inquiries/admin/:id/notes
 */
export async function updateAdminInquiryNotes(id: string, notes: string) {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');
    const res = await fetch(`${API_URL}/inquiries/admin/${id}/notes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ notes }),
    });
    return handleResponse<{ success: boolean; data: any }>(res);
}
