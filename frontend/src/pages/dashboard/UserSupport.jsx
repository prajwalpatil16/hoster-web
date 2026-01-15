import { useState, useEffect } from "react";
import { MessageSquare, Plus, Clock, CheckCircle2, ChevronRight } from "lucide-react";

export default function UserSupport() {
    const [tickets, setTickets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const fetchTickets = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/support/tickets", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
            setTickets(await res.json());
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/support/ticket", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ subject, message })
            });
            if (res.ok) {
                setShowModal(false);
                setSubject("");
                setMessage("");
                fetchTickets();
                alert("Support ticket created successfully!");
            } else {
                const errorData = await res.json();
                alert(`Failed to create ticket: ${errorData.error || res.statusText}`);
            }
        } catch (error) {
            console.error("Support ticket error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
                    <p className="text-gray-500 text-sm">Need help? Raise a ticket and our team will get back to you.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {tickets.length === 0 ? (
                        <div className="p-20 text-center">
                            <MessageSquare className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">You don't have any support tickets.</p>
                        </div>
                    ) : (
                        tickets.map((ticket) => (
                            <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${ticket.status === 'open' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                        <MessageSquare className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{ticket.subject}</h4>
                                        <div className="flex items-center mt-1 space-x-3 text-xs text-gray-400 font-medium">
                                            <span className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center capitalize">
                                                <span className={`h-1.5 w-1.5 rounded-full mr-2 ${ticket.status === 'open' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-300" />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Raise Support Ticket</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="e.g., Cannot connect to VPS"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Describe your issue in detail..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 bg-teal-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-teal-700"
                                >
                                    Submit Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
