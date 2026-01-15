import { useState, useEffect } from "react";
import { Plus, Server, Play, Square, Trash2, ExternalLink } from "lucide-react";

export default function UserServices() {
    const [services, setServices] = useState([]);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");

    const fetchServices = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/user/services", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            setServices(data);
        }
        setLoading(false);
    };

    const fetchPlans = async () => {
        const res = await fetch("http://localhost:5001/api/public/plans");
        if (res.ok) {
            const data = await res.json();
            setPlans(data);
            if (data.length > 0) setSelectedPlan(data[0].id);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchPlans();
    }, []);

    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === "running" ? "stopped" : "running";
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5001/api/user/services/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) fetchServices();
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5001/api/user/services/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) fetchServices();
    };

    const handleDeploy = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/user/services", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newName, plan_id: selectedPlan })
            });
            if (res.ok) {
                setShowModal(false);
                setNewName("");
                fetchServices();
                alert("Service deployed successfully!");
            } else {
                const errorData = await res.json();
                alert(`Deployment failed: ${errorData.error || res.statusText}`);
            }
        } catch (error) {
            console.error("Deployment error:", error);
            alert("An error occurred during deployment. Please check the console.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Your Services</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Deploy New
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading your services...</div>
            ) : services.length === 0 ? (
                <div className="bg-white p-20 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <Server className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">No services yet</h3>
                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                        You haven't deployed any services yet. Start by choosing a plan and launching your first instance.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-xl ${service.status === 'running' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                                    <Server className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{service.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{service.plan_name}</p>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center space-x-12 px-8">
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">IP Address</p>
                                    <p className="text-sm font-mono">{service.ip_address || "Pending..."}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Status</p>
                                    <div className="flex items-center">
                                        <span className={`h-2 w-2 rounded-full mr-2 ${service.status === 'running' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        <p className="text-sm capitalize font-medium">{service.status}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleStatusChange(service.id, service.status)}
                                    title={service.status === 'running' ? "Stop Service" : "Start Service"}
                                    className={`p-2 rounded-lg transition-colors ${service.status === 'running' ? 'hover:bg-amber-50 text-amber-600' : 'hover:bg-green-50 text-green-600'}`}
                                >
                                    {service.status === 'running' ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                </button>
                                <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="View Metrics">
                                    <ExternalLink className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                    title="Delete Service"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Deploy Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Deploy New Service</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleDeploy} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="e.g., My Portfolio"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Plan</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {plans.map(plan => (
                                        <label key={plan.id} className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-teal-500 bg-teal-50' : 'border-gray-100 hover:border-teal-200'}`}>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="plan"
                                                    className="hidden"
                                                    value={plan.id}
                                                    checked={selectedPlan === plan.id}
                                                    onChange={() => setSelectedPlan(plan.id)}
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-900">{plan.name}</p>
                                                    <p className="text-xs text-gray-500">${plan.price_monthly}/mo</p>
                                                </div>
                                            </div>
                                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-teal-500 bg-teal-500' : 'border-gray-300'}`}>
                                                {selectedPlan === plan.id && <div className="h-2 w-2 rounded-full bg-white"></div>}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 bg-teal-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-teal-700 shadow-lg shadow-teal-200"
                                >
                                    Confirm Deployment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
