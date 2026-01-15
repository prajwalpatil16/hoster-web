import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Server,
    CreditCard,
    LifeBuoy,
    User,
    LogOut,
    Bell
} from "lucide-react";

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Services', href: '/dashboard/services', icon: Server },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Support', href: '/dashboard/support', icon: LifeBuoy },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function UserDashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <Link to="/" className="text-2xl font-bold text-teal-600">HOSTER</Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-teal-50 text-teal-600"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-teal-600" : "text-gray-400"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-600" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {navigation.find(n => n.href === location.pathname)?.name || "Dashboard"}
                    </h1>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Bell className="h-6 w-6" />
                        </button>
                        <div className="flex items-center space-x-3 border-l pl-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                                {user.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
