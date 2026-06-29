import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { orderAPI } from "../services/api";
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign } from "react-icons/fi";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/"); return; }
    orderAPI.getDashboard().then((res) => setStats(res.data));
  }, [user, navigate]);

  if (!stats) {
    return (
      <div className="page-section">
        <div className="page-container">
          <div className="animate-pulse page-card h-64" />
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: FiUsers, color: "bg-blue-500" },
    { label: "Total Products", value: stats.totalProducts, icon: FiShoppingBag, color: "bg-green-500" },
    { label: "Total Orders", value: stats.totalOrders, icon: FiPackage, color: "bg-purple-500" },
    { label: "Revenue", value: `₹${stats.revenue?.toLocaleString()}`, icon: FiDollarSign, color: "bg-orange-500" },
  ];

  return (
    <div className="page-section">
      <div className="page-container page-shell">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 page-shell-header !mb-6">
          <div>
            <h1 className="page-shell-title">Admin Dashboard</h1>
            <p className="page-shell-subtitle">Overview of store performance</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link to="/admin/products/add" className="btn-primary !py-2 !px-4 text-sm">+ Add Product</Link>
            <Link to="/admin/orders" className="btn-secondary !py-2 !px-4 text-sm">Manage Orders</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
          {cards.map((card) => (
            <div key={card.label} className="page-card p-4 sm:p-5">
              <div className={`w-11 h-11 ${card.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                <card.icon size={20} />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="page-card p-5 sm:p-6 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
            <table className="w-full text-sm min-w-[36rem]">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 pr-4 font-semibold">Order ID</th>
                  <th className="pb-3 pr-4 font-semibold">Customer</th>
                  <th className="pb-3 pr-4 font-semibold">Amount</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders?.map((order) => (
                  <tr key={order._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs">{order._id.slice(-8)}</td>
                    <td className="py-3 pr-4">{order.user?.name || "N/A"}</td>
                    <td className="py-3 pr-4 font-medium">₹{order.totalPrice?.toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{order.orderStatus}</span>
                    </td>
                    <td className="py-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
