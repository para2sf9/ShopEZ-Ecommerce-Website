import { Link } from "react-router-dom";

export default function ProfileDropdown({ user, onClose, onLogout }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />
      <div className="nav-profile-dropdown">
        <div className="nav-profile-header">
          <p className="truncate">{user.name}</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
        <Link to="/profile" onClick={onClose} className="nav-profile-link">My Profile</Link>
        <Link to="/orders" onClick={onClose} className="nav-profile-link">My Orders</Link>
        {user.role === "admin" && (
          <Link to="/admin" onClick={onClose} className="nav-profile-link nav-profile-link--admin">Admin Dashboard</Link>
        )}
        <div className="nav-profile-divider" />
        <button type="button" onClick={onLogout} className="nav-profile-logout">Logout</button>
      </div>
    </>
  );
}
