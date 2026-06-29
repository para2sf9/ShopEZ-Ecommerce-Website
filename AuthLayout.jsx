import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, sideTitle, sideDesc, perks, children, footerText, footerLink, footerLabel }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Brand panel */}
        <div className="auth-brand">
          <div className="auth-brand-content">
            <Link to="/" className="auth-logo">
              <span className="auth-logo-icon">S</span>
              <div>
                <span className="auth-logo-text">ShopEZ</span>
                <span className="auth-logo-tag">Shop Smart</span>
              </div>
            </Link>

            <div className="auth-brand-body">
              <h2>{sideTitle}</h2>
              <p>{sideDesc}</p>

              {perks && (
                <ul className="auth-perks">
                  {perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
              )}

              <div className="auth-stats">
                <div>
                  <strong>10K+</strong>
                  <span>Products</span>
                </div>
                <div>
                  <strong>3500+</strong>
                  <span>Brands</span>
                </div>
                <div>
                  <strong>24/7</strong>
                  <span>Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <div className="auth-form-wrap">
              <div className="auth-form-header">
                <Link to="/" className="auth-mobile-logo lg:hidden">
                  <span>S</span> ShopEZ
                </Link>
                <h1>{title}</h1>
                <p>{subtitle}</p>
              </div>

              {children}

              <p className="auth-switch">
                {footerText}{" "}
                <Link to={footerLink}>{footerLabel}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
