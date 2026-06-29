import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { CATEGORIES } from "../constants/categories";

export default function CategorySlider() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="section-header">
          <div>
            <h2 className="section-title underline-accent">Shop by Category</h2>
            <p className="section-subtitle">Explore our wide range of products</p>
          </div>
          <Link to="/products" className="section-link hidden sm:inline-flex">
            View All
            <FiArrowRight size={16} />
          </Link>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="category-card group"
            >
              <div className={`category-icon ${cat.bg}`}>
                <cat.icon size={26} className={cat.color} />
              </div>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
