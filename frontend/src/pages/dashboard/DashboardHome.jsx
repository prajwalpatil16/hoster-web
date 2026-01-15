import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Server, CreditCard, Activity, AlertCircle } from "lucide-react";

export default function DashboardHome() {
    const [stats, setStats] = useState({
        active_services: 0,
        pending_billing: 0,
        alerts: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5001/api/user/dashboard", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { name: "Active Services", value: stats.active_services, icon: Server, color: "text-blue-600", bg: "bg-blue-100" },
        { name: "Monthly Spending", value: `$${stats.pending_billing}`, icon: CreditCard, color: "text-purple-600", bg: "bg-purple-100" },
        { name: "System Status", value: "Optimal", icon: Activity, color: "text-green-600", bg: "bg-green-100" },
        { name: "Active Alerts", value: stats.alerts.length, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                        <div className={`p-4 rounded-xl ${card.bg} ${card.color} mr-4`}>
                            <card.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{card.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            to="/dashboard/services"
                            className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all text-left block"
                        >
                            <p className="font-bold text-gray-900">New Service</p>
                            <p className="text-xs text-gray-500">Deploy a new instance</p>
                        </Link>
                        <Link
                            to="/dashboard/billing"
                            className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all text-left block"
                        >
                            <p className="font-bold text-gray-900">Add Funds</p>
                            <p className="text-xs text-gray-500">Top up your balance</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {stats.alerts.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No recent activity found.</p>
                        ) : (
                            stats.alerts.map((alert, i) => (
                                <div key={i} className="flex items-center text-sm">
                                    <div className="h-2 w-2 rounded-full bg-teal-500 mr-3"></div>
                                    <p className="text-gray-700">{alert.message}</p>
                                    <span className="ml-auto text-gray-400 text-xs">2h ago</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
