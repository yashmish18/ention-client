const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function fetchProducts() {
    try {
        const res = await fetch(`${API_URL}/products`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    } catch (error) {
        throw error; // Let the caller handle it
    }
}

export async function fetchProductById(id: string) {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}
