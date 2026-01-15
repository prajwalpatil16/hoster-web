import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Server,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
  CheckCircle,
  Trash2,
  Lock,
  Globe,
  ChevronRight
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("inquiries");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    if (activeTab === "inquiries" || activeTab === "careers") {
      const res = await fetch("http://localhost:5001/api/contact/admin", { headers });
      if (res.ok) {
        const allMessages = await res.json();
        if (activeTab === "careers") {
          setMessages(allMessages.filter(m => m.source === "careers"));
        } else {
          setMessages(allMessages.filter(m => m.source !== "careers"));
        }
      }
    } else if (activeTab === "users") {
      const res = await fetch("http://localhost:5001/api/admin/users", { headers });
      if (res.ok) setUsers(await res.json());
    } else if (activeTab === "services") {
      const res = await fetch("http://localhost:5001/api/admin/services", { headers });
      if (res.ok) setServices(await res.json());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const markAsRead = async (id) => {
    await fetch(`http://localhost:5001/api/contact/admin/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`http://localhost:5001/api/contact/admin/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const deleteService = async (id) => {
    if (!confirm("Delete this service globally?")) return;
    await fetch(`http://localhost:5001/api/admin/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  /* CMS State */
  const [editingSection, setEditingSection] = useState(null);
  const [editContent, setEditContent] = useState("");

  const openEditModal = async (section) => {
    setEditingSection(section);
    try {
      const res = await fetch(`http://localhost:5001/api/public/content/${section.toLowerCase()}`);
      if (res.ok) {
        const data = await res.json();
        setEditContent(JSON.stringify(data, null, 2));
      } else {
        setEditContent("{}");
      }
    } catch (err) {
      console.error("Failed to fetch content", err);
      setEditContent("{}");
    }
  };

  const saveContent = async () => {
    try {
      const parsed = JSON.parse(editContent);
      const res = await fetch(`http://localhost:5001/api/admin/content/${editingSection.toLowerCase()}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed)
      });

      if (res.ok) {
        alert(`${editingSection} updated successfully!`);
        setEditingSection(null);
      } else {
        alert("Failed to update content");
      }
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-teal-500 flex items-center justify-center font-black text-slate-900 shadow-lg shadow-teal-500/20">H</div>
            <h2 className="text-xl font-bold tracking-tight">HOSTER <span className="text-[10px] bg-slate-800 text-teal-400 px-2 py-0.5 rounded border border-slate-700 ml-1">ADMIN</span></h2>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-4">Main Menu</div>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex w-full items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'inquiries' ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Client Inquiries
          </button>
          <button
            onClick={() => setActiveTab("careers")}
            className={`flex w-full items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'careers' ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Briefcase className="mr-3 h-5 w-5" />
            Career Apps
          </button>

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-10 mb-4 ml-4">Systems</div>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex w-full items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'users' ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="mr-3 h-5 w-5" />
            User Manager
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex w-full items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'services' ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Server className="mr-3 h-5 w-5" />
            Global Services
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex w-full items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === 'content' ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Globe className="mr-3 h-5 w-5" />
            CMS Control
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button onClick={handleLogout} className="flex w-full items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-12 overflow-y-auto relative">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 capitalize tracking-tight">{activeTab === 'inquiries' ? 'Inquiries' : activeTab === 'careers' ? 'Careers' : activeTab}</h1>
            <p className="text-slate-500 mt-2 font-medium">Control center for Hoster platform modules.</p>
          </div>
          <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Live Secure Session</span>
          </div>
        </header>

        {(activeTab === "inquiries" || activeTab === "careers") && (
          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
                <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                  {activeTab === 'careers' ? <Briefcase /> : <MessageSquare />}
                </div>
                <h3 className="text-xl font-bold text-slate-900">No {activeTab} yet</h3>
                <p className="text-slate-500 mt-2">When someone submits through the website, it will appear here.</p>
              </div>
            ) : messages.map((m) => (
              <div key={m.id} className={`bg-white p-8 rounded-3xl shadow-sm border transition-all duration-300 ${m.is_read ? 'border-gray-100 opacity-60' : 'border-teal-200 ring-4 ring-teal-50'}`}>
                <div className="flex justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-xl ${m.source === 'careers' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">{m.name}</h4>
                      <p className="text-sm text-slate-400 font-medium">{m.email} {m.company && <span className="mx-2">•</span>} {m.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${m.source === 'careers' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                      {m.source || 'Contact'}
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">{new Date(m.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                  <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{m.message}</p>
                </div>
                <div className="flex space-x-3">
                  {!m.is_read && (
                    <button onClick={() => markAsRead(m.id)} className="flex items-center px-6 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all active:scale-95">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Archive Read
                    </button>
                  )}
                  <button onClick={() => deleteMessage(m.id)} className="flex items-center px-6 py-2.5 border-2 border-red-50 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-all active:scale-95">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Permanently Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Subscriber</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Email Identity</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Tier</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Registration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-slate-900 flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 mr-3 flex items-center justify-center text-xs">{u.name.charAt(0)}</div>
                      {u.name}
                    </td>
                    <td className="px-8 py-6 text-slate-600 font-medium">{u.email}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-400 font-bold">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.id} className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-teal-200 transition-all hover:shadow-xl hover:shadow-teal-900/5">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <Server className="h-6 w-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${s.status === 'running' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.status}
                  </span>
                </div>
                <h4 className="font-bold text-xl text-slate-900 mb-1">{s.name}</h4>
                <p className="text-[10px] text-teal-600 uppercase font-black tracking-widest mb-6">{s.plan_name}</p>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 font-bold text-[10px] uppercase">Owner</span> <span className="font-bold text-slate-700 text-xs">{s.user_name}</span></div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 font-bold text-[10px] uppercase">Endpoint</span> <span className="font-mono text-slate-700 text-xs">{s.ip_address || 'Unassigned'}</span></div>
                </div>
                <button onClick={() => deleteService(s.id)} className="w-full py-3 bg-white border-2 border-red-50 text-red-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95 shadow-lg shadow-red-900/0 hover:shadow-red-600/20">
                  Terminate Node
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "content" && (
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 text-center shadow-xl shadow-slate-200/50">
            <div className="h-20 w-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-teal-600">
              <Globe className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Active CMS Control</h3>
            <p className="text-slate-500 mb-12 max-w-lg mx-auto font-medium">Dynamically update your landing page content, pricing tiers, and platform metadata without touching the codebase.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Hero', 'Services', 'Pricing', 'FAQ'].map(section => (
                <button
                  key={section}
                  onClick={() => openEditModal(section)}
                  className="p-6 bg-white border-2 border-slate-50 rounded-2xl hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300 font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-xl hover:shadow-teal-900/20"
                >
                  Update {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-slate-900">Edit {editingSection}</h3>
              <button onClick={() => setEditingSection(null)} className="text-slate-400 hover:text-slate-600">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Content JSON</label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-96 font-mono text-sm p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                  spellCheck="false"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingSection(null)}
                  className="px-6 py-2.5 text-slate-600 font-bold text-sm bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveContent}
                  className="px-6 py-2.5 bg-teal-600 text-white font-bold text-sm rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
