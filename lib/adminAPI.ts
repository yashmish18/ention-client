const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ention-backend.onrender.com';

const getAdminToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('adminToken');
    }
    return null;
};

const handleResponse = async (response: Response): Promise<any> => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const adminAPI = {
    getProducts: async () => {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return handleResponse(response);
    },

    getProduct: async (model: string) => {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/products/${model}`, {
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return handleResponse(response);
    },

    createProduct: async (productData: any) => {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(productData)
        });
        return handleResponse(response);
    },

    updateProduct: async (model: string, updateData: any) => {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/products/${model}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(updateData)
        });
        return handleResponse(response);
    },

    deleteProduct: async (model: string) => {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/products/${model}`, {
            method: 'DELETE',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return handleResponse(response);
    },

    initializeProducts: async () => {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/products/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return handleResponse(response);
    }
};

export default adminAPI;
