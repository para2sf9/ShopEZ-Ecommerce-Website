import { Link } from "react-router-dom";
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones, FiGift, FiPercent, FiZap } from "react-icons/fi";

const features = [
  { icon: FiTruck, label: "Free Delivery", desc: "On orders above ₹499", bg: "bg-emerald-50", color: "text-emerald-600" },
  { icon: FiRefreshCw, label: "Easy Returns", desc: "30-day return policy", bg: "bg-green-50", color: "text-green-600" },
  { icon: FiShield, label: "Secure Payment", desc: "100% secure checkout", bg: "bg-purple-50", color: "text-purple-600" },
  { icon: FiHeadphones, label: "24/7 Support", desc: "Dedicated help center", bg: "bg-orange-50", color: "text-orange-600" },
];

export default function TrustBadges() {
  return (
    <section className="page-section-tight">
      <div className="page-container">
        <div className="trust-grid">
          {features.map((item) => (
            <div key={item.label} className="trust-card">
              <div className={`trust-icon ${item.bg}`}>
                <item.icon size={22} className={item.color} />
              </div>
              <div>
                <p className="trust-label">{item.label}</p>
                <p className="trust-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromoBanners() {
  return (
    <section className="page-section-tight">
      <div className="page-container">
        <div className="promo-grid">
          <div className="promo-card gradient-primary">
            <div className="promo-content">
              <div className="promo-tag">
                <FiGift size={18} />
                <span>Rewards Program</span>
              </div>
              <h3 className="promo-title">Earn ShopCoins</h3>
              <p className="promo-desc">Get 1% back on every purchase. Redeem on your next order!</p>
              <Link to="/register" className="promo-btn promo-btn-light">Join Now — It's Free</Link>
            </div>
          </div>

          <div className="promo-card promo-card-sale">
            <FiZap size={48} className="promo-bg-icon" />
            <div className="promo-content">
              <div className="promo-tag">
                <FiPercent size={18} />
                <span>Limited Time</span>
              </div>
              <h3 className="promo-title">Flash Sale Live!</h3>
              <p className="promo-desc">Extra 20% off on electronics. Ends tonight at midnight.</p>
              <Link to="/products?category=Electronics" className="promo-btn promo-btn-sale">Grab Deals Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandShowcase() {
  const brands = ["Samsung", "Apple", "Nike", "Adidas", "Sony", "IKEA", "Lakme", "Boat"];
  return (
    <section className="page-section-compact">
      <div className="page-container">
        <h2 className="brands-title">Trusted Brands</h2>
        <div className="brands-grid">
          {brands.map((brand) => (
            <Link key={brand} to={`/products?search=${brand}`} className="brand-chip">
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
