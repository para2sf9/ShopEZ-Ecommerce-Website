import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { orderAPI } from "../services/api";
import toast from "react-hot-toast";

const statuses = ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/"); return; }
    orderAPI.getAll().then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, [user, navigate]);

  const handleStatusUpdate = async (orderId, orderStatus) => {
    try {
      await orderAPI.updateStatus(orderId, { orderStatus });
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, orderStatus } : o)));
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="page-section">
        <div className="page-container">
          <div className="animate-pulse page-card h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="page-container page-shell">
        <div className="page-shell-header">
          <h1 className="page-shell-title">Manage Orders</h1>
          <p className="page-shell-subtitle">{orders.length} order{orders.length !== 1 ? "s" : ""} total</p>
        </div>

        <div className="page-card overflow-hidden">
          {orders.length === 0 ? (
            <p className="p-8 text-center text-gray-500">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table text-sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="font-mono text-xs text-gray-700">{order._id.slice(-8).toUpperCase()}</td>
                      <td>
                        <p className="font-medium text-gray-800">{order.user?.name || "Guest"}</p>
                        <p className="text-xs text-gray-400">{order.user?.email || order.shippingAddress?.phone || "—"}</p>
                      </td>
                      <td className="text-gray-600">{order.products?.length ?? 0} item{(order.products?.length ?? 0) !== 1 ? "s" : ""}</td>
                      <td className="font-semibold text-gray-800">
                        {order.totalPrice != null ? `₹${order.totalPrice.toLocaleString()}` : "—"}
                      </td>
                      <td>
                        <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="text-gray-500 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary bg-white"
                        >
                          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
