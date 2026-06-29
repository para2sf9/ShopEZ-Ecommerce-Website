import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { productAPI } from "../services/api";
import toast from "react-hot-toast";

const categories = ["Electronics", "Fashion", "Groceries", "Beauty", "Home", "Sports"];

export default function AddProduct() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", description: "", category: "Electronics", brand: "",
    price: "", originalPrice: "", stock: "", discount: "0",
    isFeatured: false, isTrending: false, isNewArrival: false,
    images: "",
  });

  if (!user || user.role !== "admin") { navigate("/"); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...form,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice) || undefined,
        stock: Number(form.stock),
        discount: Number(form.discount),
        images: form.images ? form.images.split(",").map((s) => s.trim()) : [],
      };
      await productAPI.create(data);
      toast.success("Product added!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "page-form-input focus:ring-2 focus:ring-primary outline-none";

  return (
    <div className="page-section">
      <div className="page-container page-shell">
        <div className="page-shell-header">
          <h1 className="page-shell-title">Add New Product</h1>
          <p className="page-shell-subtitle">Fill in the details below to list a new product</p>
        </div>

        <form onSubmit={handleSubmit} className="page-card page-card--form space-y-5">
          <div>
            <label className="page-form-label">Product Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass} />
          </div>

          <div>
            <label className="page-form-label">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3}
              className={`${inputClass} resize-y min-h-[5rem]`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="page-form-label">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="page-form-label">Brand</label>
              <input type="text" required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="page-form-label">Price (₹)</label>
              <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className="page-form-label">Original Price (₹)</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="page-form-label">Stock</label>
              <input type="number" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className="page-form-label">Discount (%)</label>
              <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className="page-form-label">Image URLs (comma separated)</label>
            <input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })}
              className={inputClass}
              placeholder="https://images.unsplash.com/photo-1553279768-865614fa7f83?w=600&auto=format&fit=crop" />
          </div>

          <div className="flex flex-wrap gap-5 pt-1">
            {["isFeatured", "isTrending", "isNewArrival"].map((key) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} className="accent-primary w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">{key.replace("is", "")}</span>
              </label>
            ))}
          </div>

          <button type="submit" disabled={loading}
            className="w-full btn-primary py-3.5 rounded-xl font-semibold disabled:opacity-50 mt-2">
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
