import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiTrendingUp, FiTag } from "react-icons/fi";
import { SECTION_ITEM_COUNT } from "../constants/categories";

const sectionStyles = {
  "Featured Products": { Icon: FiAward, gradient: "from-amber-500 to-orange-500", badge: "Editor's Pick" },
  "Trending Now": { Icon: FiTrendingUp, gradient: "from-red-500 to-pink-500", badge: "Hot Right Now" },
  "New Arrivals": { Icon: FiTag, gradient: "from-violet-500 to-purple-500", badge: "Just Landed" },
};

export default function ProductSection({ title, products, link, isLast }) {
  if (!products?.length) return null;

  const style = sectionStyles[title] || { Icon: FiAward, gradient: "from-primary to-accent", badge: "Shop Now" };
  const displayProducts = products.slice(0, SECTION_ITEM_COUNT);
  const { Icon } = style;

  return (
    <section className={`page-section${isLast ? " page-section-last" : ""}`}>
      <div className="page-container">
        <div className="section-header">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`section-icon bg-gradient-to-br ${style.gradient}`}>
              <Icon size={22} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="section-title">{title}</h2>
                <span className={`section-badge bg-gradient-to-r ${style.gradient}`}>{style.badge}</span>
              </div>
              <p className="section-subtitle">Handpicked just for you</p>
            </div>
          </div>
          {link && (
            <Link to={link} className="section-link">
              View All
              <FiArrowRight size={16} />
            </Link>
          )}
        </div>

        <div className="product-grid">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
