import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", street: "", city: "", state: "", pincode: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    authAPI.getProfile().then((res) => {
      const p = res.data;
      setForm({
        name: p.name || "",
        phone: p.phone || "",
        street: p.address?.street || "",
        city: p.address?.city || "",
        state: p.address?.state || "",
        pincode: p.address?.pincode || "",
      });
    });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.updateProfile({
        name: form.name,
        phone: form.phone,
        address: { street: form.street, city: form.city, state: form.state, pincode: form.pincode },
      });
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="page-section">
      <div className="page-container page-shell">
        <div className="page-shell-header">
          <h1 className="page-shell-title">My Profile</h1>
          <p className="page-shell-subtitle">Manage your account and delivery details</p>
        </div>

        <div className="page-card page-card--form">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0 btn-primary !p-0 !rounded-full">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{user.name}</h2>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              {user.role === "admin" && (
                <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="page-form-label">Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="page-form-input" />
            </div>
            <div>
              <label className="page-form-label">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="page-form-input" />
            </div>
            <div>
              <label className="page-form-label">Street Address</label>
              <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="page-form-input" />
            </div>
            <div className="page-form-grid-2">
              <div>
                <label className="page-form-label">City</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="page-form-input" />
              </div>
              <div>
                <label className="page-form-label">State</label>
                <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="page-form-input" />
              </div>
            </div>
            <div>
              <label className="page-form-label">Pincode</label>
              <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="page-form-input" />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-50">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
