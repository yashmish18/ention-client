// API Configuration for connecting frontend to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ention-backend.onrender.com';

// Helper function to get auth token
const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Helper function to handle API responses
const handleResponse = async (response: Response): Promise<any> => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

// API client with authentication
const apiClient = {
    // GET request
    get: async (endpoint: string): Promise<any> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        return handleResponse(response);
    },

    // POST request
    post: async (endpoint: string, data: any): Promise<any> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    // PUT request
    put: async (endpoint: string, data: any): Promise<any> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    // DELETE request
    delete: async (endpoint: string): Promise<any> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        return handleResponse(response);
    },

    // File upload
    upload: async (endpoint: string, formData: FormData): Promise<any> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: formData,
        });
        return handleResponse(response);
    },
};

// Auth API functions
export const authAPI = {
    signup: async (userData: any) => apiClient.post('/api/auth/signup', userData),
    login: async (credentials: any) => apiClient.post('/api/auth/login', credentials),
    getCurrentUser: async () => apiClient.get('/api/auth/me'),
    updateProfile: async (data: any) => apiClient.put('/api/auth/profile', data),
    changePassword: async (data: any) => apiClient.put('/api/auth/password', data),
    testEmail: async () => apiClient.get('/api/auth/test-email'),
};

// Checkout API functions
export const checkoutAPI = {
    getAddresses: async (userId: string) => apiClient.get(`/api/checkout/addresses/${userId}`),
    saveAddress: async (addressData: any) => apiClient.post('/api/checkout/addresses', addressData),
    updateAddress: async (addressId: string, addressData: any) => apiClient.put(`/api/checkout/addresses/${addressId}`, addressData),
    deleteAddress: async (addressId: string) => apiClient.delete(`/api/checkout/addresses/${addressId}`),
    createOrder: async (orderData: any) => apiClient.post('/api/checkout/orders', orderData),
    getOrders: async (userId: string) => apiClient.get(`/api/checkout/orders/${userId}`),
    getOrder: async (orderId: string) => apiClient.get(`/api/checkout/orders/${orderId}`),
    cancelOrder: async (orderId: string, reason: string) => apiClient.put(`/api/checkout/orders/${orderId}/cancel`, { reason }),
    updateOrderStatus: async (orderId: string, status: string) => apiClient.put(`/api/checkout/orders/${orderId}/status`, { status }),
    updatePaymentStatus: async (orderId: string, paymentStatus: string, transactionId: string) => apiClient.put(`/api/checkout/orders/${orderId}/payment`, { paymentStatus, transactionId }),
    createPaymentOrder: async (orderData: any) => apiClient.post('/api/checkout/payment/create-order', orderData),
    verifyPayment: async (paymentData: any) => apiClient.post('/api/checkout/payment/verify', paymentData),
    getPaymentMethods: async () => apiClient.get('/api/checkout/payment/methods'),
    checkPincodeServiceability: async (pincode: string) => apiClient.get(`/api/checkout/delivery/pincode/${pincode}`),
    getPincodeDetails: async (pincode: string) => apiClient.get(`/api/checkout/delivery/pincode-details/${pincode}`),
    calculateShipping: async (shippingData: any) => apiClient.post('/api/checkout/delivery/calculate-shipping', shippingData),
    getEstimatedDelivery: async (deliveryData: any) => apiClient.post('/api/checkout/delivery/estimated-delivery', deliveryData),
    validateAddress: async (addressData: any) => apiClient.post('/api/checkout/delivery/validate-address', addressData),
    createWaybill: async (orderId: string) => apiClient.post(`/api/checkout/delivery/create-waybill/${orderId}`, {}),
    trackShipment: async (waybillNumber: string) => apiClient.get(`/api/checkout/delivery/track/${waybillNumber}`),
    healthCheck: async () => apiClient.get('/api/checkout/health'),
};

// Reviews API functions
export const reviewsAPI = {
    getReviews: async (productId: string) => apiClient.get(`/api/reviews?productId=${encodeURIComponent(productId)}`),
    submitReview: async (reviewData: any) => apiClient.post('/api/reviews', reviewData),
};

// Health check
export const healthCheck = async () => apiClient.get('/api/health');

export default apiClient;
