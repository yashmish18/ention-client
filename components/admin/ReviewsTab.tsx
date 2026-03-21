import React from 'react';
import { FaTrash, FaStar } from 'react-icons/fa';

interface Review {
    _id: string;
    name: string;
    productName?: string;
    rating: number;
    text: string;
    createdAt: string;
}

interface ReviewsTabProps {
    reviews: Review[];
    onDeleteReview: (id: string) => void;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews, onDeleteReview }) => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
                <p className="text-xs text-gray-500 font-medium">Moderate verified customer feedback</p>
            </div>
            <div className="bg-[#0FAFCA] text-white px-3 py-1 rounded-full text-xs font-bold">
                {reviews.length} Total
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                    <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                        <th className="px-6 py-4 text-left">Customer</th>
                        <th className="px-6 py-4 text-left">Product</th>
                        <th className="px-6 py-4 text-left">Rating</th>
                        <th className="px-6 py-4 text-left">Review</th>
                        <th className="px-6 py-4 text-left">Date</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <tr key={review._id} className="hover:bg-gray-50/50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900">{review.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-[#0FAFCA] font-semibold">{review.productName || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600 max-w-xs truncate italic">
                                        "{review.text}"
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400 font-bold">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onDeleteReview(review._id)}
                                        className="text-red-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg group"
                                    >
                                        <FaTrash className="h-4 w-4 transform group-hover:scale-110 transition" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                No reviews found yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default ReviewsTab;
