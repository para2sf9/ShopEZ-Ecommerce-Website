import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/authSlice";
import { FiMail, FiLock, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-page-banner hidden lg:flex">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
        <div className="relative z-10 text-center text-white max-w-md">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float">
            <FiShoppingBag size={36} />
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Welcome to ShopEZ</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Shop from 3500+ brands across electronics, fashion, groceries and more. Earn rewards on every purchase.
          </p>
          <div className="flex justify-center gap-8 mt-10">
            {["10K+", "3500+", "24/7"].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold">{stat}</p>
                <p className="text-white/50 text-xs mt-1">{["Products", "Brands", "Support"][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-page-form-wrap">
        <div className="auth-page-form animate-scaleIn">
          <div className="text-center mb-6 lg:hidden">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 btn-primary !p-0">
              <span className="text-white font-extrabold text-xl">S</span>
            </div>
          </div>

          <div className="page-card page-card--form !shadow-xl">
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1 mb-8">Login to continue shopping</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="page-form-label">Email</label>
                <div className="flex items-center gap-3 border-2 border-gray-100 rounded-2xl px-4 input-glow focus-within:border-primary transition">
                  <FiMail className="text-gray-400 shrink-0" size={18} />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 py-3.5 outline-none bg-transparent text-sm min-w-0"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="page-form-label">Password</label>
                <div className="flex items-center gap-3 border-2 border-gray-100 rounded-2xl px-4 input-glow focus-within:border-primary transition">
                  <FiLock className="text-gray-400 shrink-0" size={18} />
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="flex-1 py-3.5 outline-none bg-transparent text-sm min-w-0"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Logging in..." : <>Login <FiArrowRight size={18} /></>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
