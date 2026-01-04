import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const deleteMessage = async (id) => {
    const token = localStorage.getItem("admin_token");

    await fetch(`http://127.0.0.1:5000/api/contact/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const markAsRead = async (id) => {
    const token = localStorage.getItem("admin_token");

    await fetch(
      `http://127.0.0.1:5000/api/contact/admin/${id}/read`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, is_read: true } : m
      )
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch("http://127.0.0.1:5000/api/contact/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/admin/login");
          return;
        }
        return res.json();
      })
      .then((data) => setMessages(data));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Contact Messages
        </h1>

        {messages.length === 0 && (
          <p className="text-gray-500">No messages yet.</p>
        )}

        <div className="space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border bg-white p-6 shadow-sm transition ${
                m.is_read
                  ? "opacity-70"
                  : "border-teal-500 shadow-md"
              }`}
            >
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {m.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {m.email}
                  </p>
                </div>

                {!m.is_read && (
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                    New
                  </span>
                )}
              </div>

              {/* MESSAGE */}
              <p className="mt-4 text-gray-700 leading-relaxed">
                {m.message}
              </p>

              {/* ACTIONS */}
              <div className="mt-6 flex gap-4">
                {!m.is_read && (
                  <button
                    onClick={() => markAsRead(m.id)}
                    className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition"
                  >
                    Mark as read
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(m.id)}
                  className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
