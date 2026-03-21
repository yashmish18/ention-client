import React from 'react';
import { FaEye } from 'react-icons/fa';

interface Order {
    _id: string;
    id: string;
    user?: {
        name: string;
        email: string;
    };
    products?: any[];
    payment?: {
        amount: number;
    };
    status: string;
    createdAt: string;
}

interface OrdersTabProps {
    orders: Order[];
    onUpdateOrderStatus: (id: string, status: string) => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders, onUpdateOrderStatus }) => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Order Management</h2>
                <p className="text-xs text-gray-500 font-medium">Fulfillment and tracking center</p>
            </div>
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {orders.length} Active
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                    <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                        <th className="px-6 py-4 text-left">Order ID</th>
                        <th className="px-6 py-4 text-left">Customer</th>
                        <th className="px-6 py-4 text-left">Items</th>
                        <th className="px-6 py-4 text-left">Revenue</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Date</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50 font-medium">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50/50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs select-all">#{order.id}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900">{order.user?.name || 'N/A'}</div>
                                    <div className="text-[10px] text-gray-400 font-semibold">{order.user?.email || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs text-gray-500 uppercase font-black">
                                        {order.products?.length || 0} Products
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-black text-green-600">
                                        ₹{order.payment?.amount ? (order.payment.amount / 100).toLocaleString() : 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={order.status || 'pending'}
                                        onChange={(e) => onUpdateOrderStatus(order._id, e.target.value)}
                                        className={`text-[10px] font-black uppercase border-none rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#0FAFCA] cursor-pointer transition ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400 font-bold">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-[#0FAFCA] hover:text-[#007e9e] p-2 hover:bg-cyan-50 rounded-lg group transition">
                                        <FaEye className="h-4 w-4 transform group-hover:scale-110 transition" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                No orders discovered in the database.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default OrdersTab;
