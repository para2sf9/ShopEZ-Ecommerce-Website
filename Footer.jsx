import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="page-container footer-newsletter-inner">
          <div className="footer-newsletter-text">
            <h3>Stay in the loop</h3>
            <p>Get exclusive deals and new arrivals in your inbox</p>
          </div>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" />
            <button type="submit">
              <FiSend size={16} />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="page-container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <span>S</span>
              </div>
              <div>
                <span className="footer-logo-name">ShopEZ</span>
                <p className="footer-logo-tag">Shop Smart</p>
              </div>
            </div>
            <p className="footer-desc">
              Your one-stop destination for everything you need. Quality products, best prices, and lightning-fast delivery.
            </p>
            <div className="footer-social">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?category=Groceries">Groceries</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/profile">My Account</Link></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span className="footer-contact-icon"><FiMail size={15} /></span>
                support@shopez.com
              </li>
              <li>
                <span className="footer-contact-icon"><FiPhone size={15} /></span>
                9284327901
              </li>
              <li>
                <span className="footer-contact-icon"><FiMapPin size={15} /></span>
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="page-container footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} ShopEZ. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
