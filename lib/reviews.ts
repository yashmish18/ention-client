export interface Review {
    id: string;
    rating: number;
    comment: string;
    images?: string[];
    createdAt: string;
    user?: {
        name: string;
    };
}


// Review API functions
export async function fetchReviews(productId: string): Promise<Review[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://ention-backend.onrender.com'}/api/reviews?productId=${encodeURIComponent(productId)}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const data = await res.json();
    return data.reviews || [];
}

export async function submitReview(formData: FormData): Promise<Review> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://ention-backend.onrender.com'}/api/reviews`, {
        method: 'POST',
        body: formData
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit review');
    }
    return (await res.json()).review;
}
