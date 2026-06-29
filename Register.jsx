import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../redux/authSlice";
import { FiUser, FiMail, FiLock, FiArrowRight, FiGift, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (error) { toast.error(error); dispatch(clearError()); }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error("Passwords do not match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    const result = await dispatch(register({ name: form.name, email: form.email, password: form.password }));
    if (register.fulfilled.match(result)) {
      toast.success("Account created! Welcome to ShopEZ 🎉");
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-page-banner auth-page-banner--register hidden lg:flex">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="relative z-10 text-center text-white max-w-md">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <FiGift size={36} />
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Join ShopEZ</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Create your account and start earning ShopCoins on every purchase. Exclusive member deals await!
          </p>
          <div className="mt-10 space-y-3 text-left">
            {["Welcome bonus of 100 ShopCoins", "Free delivery on first order", "Early access to flash sales"].map((perk) => (
              <p key={perk} className="flex items-center gap-2 text-white/90 text-sm bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <FiCheck size={16} className="text-accent-light shrink-0" />
                {perk}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-page-form-wrap">
        <div className="auth-page-form animate-scaleIn">
          <div className="page-card page-card--form !shadow-xl">
            <h1 className="text-2xl font-extrabold text-gray-900">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1 mb-8">Join millions of happy shoppers</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="page-form-label">Full Name</label>
                <div className="flex items-center gap-3 border-2 border-gray-100 rounded-2xl px-4 input-glow focus-within:border-primary transition">
                  <FiUser className="text-gray-400 shrink-0" size={18} />
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="flex-1 py-3.5 outline-none bg-transparent text-sm min-w-0" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="page-form-label">Email</label>
                <div className="flex items-center gap-3 border-2 border-gray-100 rounded-2xl px-4 input-glow focus-within:border-primary transition">
                  <FiMail className="text-gray-400 shrink-0" size={18} />
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 py-3.5 outline-none bg-transparent text-sm min-w-0" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="page-form-label">Password</label>
                <div className="flex items-center gap-3 border-2 border-gray-100 rounded-2xl px-4 input-glow focus-within:border-primary transition">
                  <FiLock className="text-gray-400 shrink-0" size={18} />
                  <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="flex-1 py-3.5 outline-none bg-transparent text-sm min-w-0" placeholder="Min 6 characters" />
                </div>
              </div>
              <div>
                <label className="page-form-label">Confirm Password</label>
                <div className="flex items-center gap-3 border-2 border-gray-100 rounded-2xl px-4 input-glow focus-within:border-primary transition">
                  <FiLock className="text-gray-400 shrink-0" size={18} />
                  <input type="password" required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="flex-1 py-3.5 outline-none bg-transparent text-sm min-w-0" placeholder="Confirm password" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                {loading ? "Creating account..." : <>Create Account <FiArrowRight size={18} /></>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
