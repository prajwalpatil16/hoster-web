import { useState, useEffect } from "react";
import { CreditCard, Download, FileText, CheckCircle2 } from "lucide-react";

export default function UserBilling() {
    const [billing, setBilling] = useState({
        recent_invoices: [],
        active_subscriptions: []
    });
    const [plans, setPlans] = useState([]);
    const [showFundsModal, setShowFundsModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [amount, setAmount] = useState("");
    const [selectedUpgrade, setSelectedUpgrade] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBilling = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/billing/summary", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
            setBilling(await res.json());
        }
    };

    const fetchPlans = async () => {
        const res = await fetch("http://localhost:5001/api/public/plans");
        if (res.ok) {
            const data = await res.json();
            setPlans(data);
            if (data.length > 0) setSelectedUpgrade(data[0].id);
        }
    };

    useEffect(() => {
        fetchBilling();
        fetchPlans();
    }, []);

    const handleAddFunds = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/billing/add-funds", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: parseFloat(amount) })
        });

        if (res.ok) {
            setShowFundsModal(false);
            setAmount("");
            fetchBilling();
            alert("Funds added successfully!");
        } else {
            alert("Failed to add funds. Please try again.");
        }
        setIsSubmitting(false);
    };

    const handleUpgrade = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/billing/upgrade", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ plan_id: selectedUpgrade })
        });

        if (res.ok) {
            setShowUpgradeModal(false);
            fetchBilling();
            alert("Upgrade request sent! Our team will process it shortly.");
        } else {
            alert("Failed to process upgrade request.");
        }
        setIsSubmitting(false);
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Method */}
                <div className="lg:col-span-2 bg-gradient-to-br from-teal-600 to-teal-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-8">Primary Payment Method</h3>
                        <div className="flex items-center space-x-6">
                            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md">
                                <CreditCard className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-mono">•••• •••• •••• 4242</p>
                                <p className="text-sm opacity-80">Visa Classic • Expires 12/26</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowFundsModal(true)}
                            className="mt-10 px-6 py-2 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-colors"
                        >
                            Add Funds
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 p-12 opacity-15">
                        <CreditCard className="h-48 w-48" />
                    </div>
                </div>

                {/* Subscription Summary */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Subscriptions</h3>
                    <div className="space-y-4">
                        {billing.active_subscriptions.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">No active subscriptions.</p>
                        ) : (
                            billing.active_subscriptions.map((sub, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="font-bold text-gray-900">{sub.name}</p>
                                        <p className="text-xs text-gray-500">Auto-renews Monthly</p>
                                    </div>
                                    <p className="font-bold text-teal-600">${sub.price_monthly}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="w-full mt-6 py-3 border-2 border-dashed border-teal-200 text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition-all"
                    >
                        Upgrade Plan
                    </button>
                </div>
            </div>

            {/* Invoices */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Billing History</h3>
                    <button className="text-teal-600 font-bold text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-8 py-4 font-semibold">Invoice ID</th>
                                <th className="px-8 py-4 font-semibold">Date</th>
                                <th className="px-8 py-4 font-semibold">Amount</th>
                                <th className="px-8 py-4 font-semibold">Status</th>
                                <th className="px-8 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {billing.recent_invoices.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-gray-400 italic">No invoices found.</td>
                                </tr>
                            ) : (
                                billing.recent_invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-6 font-mono text-sm text-gray-600">#INV-{inv.id}</td>
                                        <td className="px-8 py-6 text-sm text-gray-700">{new Date(inv.created_at).toLocaleDateString()}</td>
                                        <td className="px-8 py-6 font-bold text-gray-900">${inv.amount}</td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {inv.status === 'paid' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-gray-400 hover:text-teal-600 p-2">
                                                <Download className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Funds Modal */}
            {showFundsModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Add Account Funds</h3>
                            <button onClick={() => setShowFundsModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleAddFunds} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount ($)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="50.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowFundsModal(false)}
                                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 px-4 bg-teal-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-teal-700 shadow-lg shadow-teal-200 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Processing..." : "Confirm Deposit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Upgrade Modal */}
            {showUpgradeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Upgrade Your Plan</h3>
                            <button onClick={() => setShowUpgradeModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleUpgrade} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-3">
                                {plans.map(plan => (
                                    <label key={plan.id} className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedUpgrade === plan.id ? 'border-teal-500 bg-teal-50' : 'border-gray-100 hover:border-teal-200'}`}>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="upgradePlan"
                                                className="hidden"
                                                value={plan.id}
                                                checked={selectedUpgrade === plan.id}
                                                onChange={() => setSelectedUpgrade(plan.id)}
                                            />
                                            <div>
                                                <p className="font-bold text-gray-900">{plan.name}</p>
                                                <p className="text-xs text-gray-500">${plan.price_monthly}/mo</p>
                                            </div>
                                        </div>
                                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedUpgrade === plan.id ? 'border-teal-500 bg-teal-500' : 'border-gray-300'}`}>
                                            {selectedUpgrade === plan.id && <div className="h-2 w-2 rounded-full bg-white"></div>}
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowUpgradeModal(false)}
                                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 px-4 bg-teal-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-teal-700 shadow-lg shadow-teal-200 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Submitting..." : "Confirm Upgrade"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
