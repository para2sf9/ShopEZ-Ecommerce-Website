import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { orderAPI, productAPI } from "../services/api";
import ProductImage from "../components/ProductImage";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const buyNowId = searchParams.get("buyNow");
  const buyNowQty = Number(searchParams.get("qty")) || 1;

  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (buyNowId) {
      productAPI.getById(buyNowId).then((res) => setBuyNowProduct(res.data)).catch(() => toast.error("Product not found"));
    }
  }, [user, buyNowId, navigate]);

  const validItems = items.filter((item) => item.product);
  const orderItems = buyNowProduct
    ? [{ product: buyNowProduct, quantity: buyNowQty }]
    : validItems.map((item) => ({ product: item.product, quantity: item.quantity }));

  const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal > 499 ? 0 : 49;
  const total = subtotal + delivery;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.pincode || !address.phone) {
      toast.error("Please fill all address fields");
      return;
    }
    setLoading(true);
    try {
      if (buyNowProduct) {
        await orderAPI.buyNow({
          productId: buyNowProduct._id,
          quantity: buyNowQty,
          shippingAddress: address,
        });
      } else {
        await orderAPI.create({
          products: orderItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          shippingAddress: address,
        });
      }
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (!buyNowProduct && validItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">No items to checkout</h2>
        <button onClick={() => navigate("/products")} className="mt-4 text-primary hover:underline">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="page-container page-shell">
        <div className="page-shell-header">
          <h1 className="page-shell-title">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 page-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="page-form-label">Street Address</label>
                <input required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="page-form-input outline-none focus:ring-2 focus:ring-primary" placeholder="House no, Street, Area" />
              </div>
              <div>
                <label className="page-form-label">City</label>
                <input required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="page-form-input outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="page-form-label">State</label>
                <input required value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="page-form-input outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="page-form-label">Pincode</label>
                <input required value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="page-form-input outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="page-form-label">Phone</label>
                <input required value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="page-form-input outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-5">Payment Method</h2>
            <div className="space-y-3">
              {["Cash on Delivery", "UPI", "Credit/Debit Card"].map((method, i) => (
                <label key={method} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input type="radio" name="payment" defaultChecked={i === 0} className="accent-primary" />
                  <span className="font-medium text-gray-800">{method}</span>
                </label>
              ))}
            </div>

            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3.5 rounded-xl font-semibold mt-8 disabled:opacity-50">
              {loading ? "Placing Order..." : `Place Order — ₹${total.toLocaleString()}`}
            </button>
          </form>

          <div className="page-card p-6 h-fit lg:sticky lg:top-28">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.product._id} className="flex gap-3 items-start">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                    <ProductImage src={item.product.images?.[0]} alt={item.product.name} fallbackText={item.product.name} category={item.product.category} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2 text-gray-800">{item.product.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold mt-1 text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-4 border-gray-100" />
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium text-gray-800">₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery</span><span className={delivery === 0 ? "text-free" : "font-medium text-gray-800"}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100 text-gray-900"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
