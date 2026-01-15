import { useState, useEffect } from "react";
import { User, Mail, Shield, Save } from "lucide-react";

export default function UserProfile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: "",
        created_at: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5001/api/user/profile", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                setProfile(await res.json());
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/user/profile", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: profile.name })
        });
        if (res.ok) alert("Profile updated!");
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-teal-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6">
                        <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
                            <div className="h-full w-full rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 text-3xl font-bold">
                                {profile.name?.charAt(0)}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        disabled
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg cursor-not-allowed"
                                        value={profile.email}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Account Role</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        disabled
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg capitalize cursor-not-allowed"
                                        value={profile.role}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                                <input
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg cursor-not-allowed"
                                    value={new Date(profile.created_at).toLocaleDateString()}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-bold shadow-sm"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
