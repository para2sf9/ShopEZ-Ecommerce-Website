import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { orderAPI } from "../services/api";
import ProductImage from "../components/ProductImage";
import { FiPackage, FiClock } from "react-icons/fi";

const statusColors = {
  Placed: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    orderAPI.getMyOrders()
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="page-section">
        <div className="page-container">
          <div className="animate-pulse page-card h-64" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="page-section page-shell page-shell--center">
        <div className="page-container">
          <FiPackage size={56} className="mx-auto text-gray-300" />
          <h2 className="page-shell-title mt-4">No orders yet</h2>
          <p className="page-shell-subtitle">Your order history will appear here</p>
          <Link to="/products" className="inline-block mt-6 btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="page-container page-shell">
        <div className="page-shell-header">
          <h1 className="page-shell-title">My Orders</h1>
          <p className="page-shell-subtitle">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="page-card p-5 sm:p-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <FiClock size={12} />
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus]}`}>
                    {order.orderStatus}
                  </span>
                  <span className="font-bold text-lg text-gray-900">₹{order.totalPrice?.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 overflow-x-auto">
                {order.products?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 min-w-0 sm:min-w-[200px] sm:flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        fallbackText={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity} × ₹{item.price?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
