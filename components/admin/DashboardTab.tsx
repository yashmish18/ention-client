import React from 'react';
import {
    FaDollarSign,
    FaShoppingCart,
    FaUsers,
    FaStar,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface Stats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalReviews: number;
}

interface RevenueData {
    month: string;
    revenue: number;
}

interface ProductSalesData {
    name: string;
    sales: number;
    revenue: number;
    percent?: number;
}

interface DashboardTabProps {
    stats: Stats;
    revenueData: RevenueData[];
    productSalesData: ProductSalesData[];
    COLORS: string[];
}

const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { name, sales, percent } = payload[0].payload;
        return (
            <div className="bg-gray-900 border border-gray-800 text-white p-3 rounded-xl shadow-2xl text-xs font-bold ring-1 ring-white/10">
                <div className="text-[#0FAFCA] mb-1">{name}</div>
                <div className="flex justify-between gap-4 font-black">
                    <span>Units:</span>
                    <span>{sales}</span>
                </div>
                <div className="flex justify-between gap-4 font-black">
                    <span>Share:</span>
                    <span>{(percent * 100).toFixed(1)}%</span>
                </div>
            </div>
        );
    }
    return null;
};

const DashboardTab: React.FC<DashboardTabProps> = ({ stats, revenueData, productSalesData, COLORS }) => {
    const totalSales = productSalesData.reduce((sum, entry) => sum + entry.sales, 0);

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={FaDollarSign} color="bg-emerald-500" change="+12.5%" type="positive" />
                <StatCard title="Orders" value={stats.totalOrders} icon={FaShoppingCart} color="bg-blue-500" change="+8.2%" type="positive" />
                <StatCard title="Customers" value={stats.totalCustomers} icon={FaUsers} color="bg-violet-500" change="+15.3%" type="positive" />
                <StatCard title="Reviews" value={stats.totalReviews} icon={FaStar} color="bg-amber-500" change="+5.7%" type="positive" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Profile */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-gray-800">Financial Growth</h3>
                        <span className="text-xs font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-tighter">Last 6 Months</span>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderRadius: '16px', border: 'none', color: '#fff' }}
                                    itemStyle={{ color: '#0FAFCA', fontWeight: 900 }}
                                    formatter={(v: any) => `₹${v.toLocaleString()}`}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#0FAFCA" strokeWidth={4} dot={{ r: 6, fill: '#0FAFCA', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Product Volume */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-gray-800">Product Performance</h3>
                        <span className="text-xs font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-tighter">By Model</span>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={productSalesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} />
                                <Tooltip
                                    cursor={{ fill: '#f3f4f6' }}
                                    contentStyle={{ backgroundColor: '#111827', borderRadius: '16px', border: 'none', color: '#fff' }}
                                    formatter={(v: any) => `₹${v.toLocaleString()}`}
                                />
                                <Bar dataKey="revenue" fill="#0FAFCA" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Market Distribution */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-10 text-center tracking-tight uppercase">National Sales Distribution</h3>
                <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={productSalesData}
                                    cx="50%" cy="50%"
                                    innerRadius={80}
                                    outerRadius={150}
                                    paddingAngle={8}
                                    dataKey="sales"
                                    stroke="none"
                                >
                                    {productSalesData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-96">
                        {productSalesData.map((entry, idx) => (
                            <div key={entry.name} className="bg-gray-50 p-4 rounded-2xl border-l-8 transition hover:bg-white hover:shadow-lg" style={{ borderLeftColor: COLORS[idx % COLORS.length] }}>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{entry.name}</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-black text-gray-900">{entry.sales}</span>
                                    <span className="text-xs font-bold text-[#0FAFCA]">({((entry.sales / totalSales) * 100).toFixed(1)}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color, change, type }: any) => (
    <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center gap-6 border border-gray-100 transition hover:translate-y-[-4px] duration-300">
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tighter">{value}</p>
            <div className={`flex items-center gap-1 text-[10px] font-black mt-1 ${type === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {type === 'positive' ? <FaArrowUp /> : <FaArrowDown />}
                <span>{change}</span>
            </div>
        </div>
    </div>
);

export default DashboardTab;
