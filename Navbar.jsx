import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiGift } from "react-icons/fi";
import { logout } from "../redux/authSlice";
import { NAV_ITEMS } from "../constants/categories";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate("/");
  };

  const searchForm = (variant) => (
    <form
      onSubmit={handleSearch}
      className={`navbar-search-form navbar-search-form--${variant}`}
    >
      <div className="navbar-search">
        <FiSearch size={18} className="navbar-search-icon" aria-hidden="true" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            variant === "desktop"
              ? "Search for products, brands and more..."
              : "Search products..."
          }
          className="navbar-search-input"
          aria-label="Search products"
        />
        <button
          type="submit"
          className={`navbar-search-btn${variant === "mobile" ? " navbar-search-btn--icon" : ""}`}
          aria-label={variant === "mobile" ? "Search" : undefined}
        >
          <FiSearch size={16} aria-hidden="true" />
          {variant === "desktop" && "Search"}
        </button>
      </div>
    </form>
  );

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="navbar-promo">
        Free delivery on orders above ₹499 &nbsp;|&nbsp; Use code SHOPEZ10 for 10% off
      </div>

      <div className="page-container navbar-main">
        <div className="navbar-row">
          <Link to="/" className="navbar-brand group">
            <div className="navbar-brand-logo">
              <span>S</span>
            </div>
            <div className="navbar-brand-text">
              <span className="navbar-brand-name">ShopEZ</span>
              <span className="navbar-brand-tag">Shop Smart</span>
            </div>
          </Link>

          {searchForm("desktop")}

          <div className="navbar-actions">
            <Link to="/products" className="nav-action nav-action--hidden-lg">
              <span className="nav-action-icon">
                <FiGift size={20} />
              </span>
              <span className="nav-action-label">Offers</span>
            </Link>

            <div className="nav-dropdown-wrap">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="nav-action"
                aria-label={user ? "Account menu" : "Login"}
                aria-expanded={profileOpen}
              >
                <span className="nav-action-icon">
                  <FiUser size={20} />
                </span>
                <span className="nav-action-label nav-action-label--hidden-mobile">
                  {user ? user.name?.split(" ")[0] : "Login"}
                </span>
              </button>
              {profileOpen && (
                <>
                  <div className="nav-dropdown-backdrop" onClick={() => setProfileOpen(false)} />
                  <div className="nav-dropdown" role="menu">
                    {user ? (
                      <>
                        <div className="nav-dropdown-header">
                          <p className="nav-dropdown-name">{user.name}</p>
                          <p className="nav-dropdown-email">{user.email}</p>
                        </div>
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="nav-dropdown-link" role="menuitem">My Profile</Link>
                        <Link to="/orders" onClick={() => setProfileOpen(false)} className="nav-dropdown-link" role="menuitem">My Orders</Link>
                        {user.role === "admin" && (
                          <Link to="/admin" onClick={() => setProfileOpen(false)} className="nav-dropdown-link nav-dropdown-link--accent" role="menuitem">Admin Dashboard</Link>
                        )}
                        <hr className="nav-dropdown-divider" />
                        <button type="button" onClick={handleLogout} className="nav-dropdown-link nav-dropdown-link--danger" role="menuitem">Logout</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setProfileOpen(false)} className="nav-dropdown-link" role="menuitem">Login</Link>
                        <Link to="/register" onClick={() => setProfileOpen(false)} className="nav-dropdown-link nav-dropdown-link--accent" role="menuitem">Create Account</Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            <Link to="/cart" className="nav-action">
              <span className="nav-action-icon">
                <FiShoppingCart size={20} />
              </span>
              <span className="nav-action-label nav-action-label--hidden-mobile">Cart</span>
              {cartCount > 0 && (
                <span className="nav-action-badge">{cartCount}</span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-action nav-action--mobile-only"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="nav-action-icon">
                {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </span>
            </button>
          </div>
        </div>

        {searchForm("mobile")}
      </div>

      <div className="navbar-categories">
        <div className="page-container navbar-categories-inner">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="navbar-category-link"
            >
              <item.icon size={15} className={item.color} />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu page-container">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="navbar-mobile-menu-link"
            >
              <item.icon size={18} className={item.color} />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
