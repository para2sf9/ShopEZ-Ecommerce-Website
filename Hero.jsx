import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const banners = [
  {
    title: "Mega Electronics Sale",
    subtitle: "Up to 70% off on smartphones, laptops & more",
    cta: "Shop Electronics",
    link: "/products?category=Electronics",
    gradient: "from-violet-900 via-purple-800 to-indigo-900",
    accent: "#a78bfa",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=80",
    tag: "Hot Deal",
  },
  {
    title: "Fashion Fiesta",
    subtitle: "Trending styles at unbeatable prices",
    cta: "Explore Fashion",
    link: "/products?category=Fashion",
    gradient: "from-rose-900 via-pink-800 to-fuchsia-900",
    accent: "#f9a8d4",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80",
    tag: "New Season",
  },
  {
    title: "Grocery Essentials",
    subtitle: "Fresh groceries delivered to your doorstep",
    cta: "Order Now",
    link: "/products?category=Groceries",
    gradient: "from-emerald-900 via-teal-800 to-cyan-900",
    accent: "#6ee7b7",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
    tag: "Daily Needs",
  },
  {
    title: "Beauty & Wellness",
    subtitle: "Skincare, makeup and personal care deals",
    cta: "Shop Beauty",
    link: "/products?category=Beauty",
    gradient: "from-fuchsia-900 via-purple-800 to-violet-900",
    accent: "#e879f9",
    image: "https://images.unsplash.com/photo-1596462502278-27bfd403348e?w=600&auto=format&fit=crop&q=80",
    tag: "Self Care",
  },
  {
    title: "Sports & Fitness",
    subtitle: "Gear up for your active lifestyle",
    cta: "Shop Sports",
    link: "/products?category=Sports",
    gradient: "from-orange-900 via-red-800 to-rose-900",
    accent: "#fb923c",
    image: "https://images.unsplash.com/photo-1461896836934-ffe247f221ce?w=600&auto=format&fit=crop&q=80",
    tag: "Stay Active",
  },
];

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="page-container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          observer
          observeParents
          className="hero-swiper"
        >
          {banners.map((banner, i) => (
            <SwiperSlide key={i}>
              <div className={`hero-slide bg-gradient-to-br ${banner.gradient}`}>
                <div className="hero-slide-overlay" />
                <div
                  className="hero-slide-glow"
                  style={{ background: banner.accent }}
                />

                <div className="hero-slide-layout">
                  <div className="hero-slide-content animate-slideUp">
                    <span className="hero-slide-tag text-white">
                      <FiZap size={12} />
                      {banner.tag}
                    </span>
                    <h1 className="hero-slide-title text-white">{banner.title}</h1>
                    <p className="hero-slide-subtitle text-white/80">{banner.subtitle}</p>
                    <div className="hero-slide-actions">
                      <Link to={banner.link} className="hero-slide-btn-primary group">
                        {banner.cta}
                        <FiArrowRight
                          className="group-hover:translate-x-1 transition-transform"
                          size={18}
                        />
                      </Link>
                      <Link to="/products" className="hero-slide-btn-secondary text-white">
                        View All
                      </Link>
                    </div>
                  </div>

                  <div className="hero-slide-media">
                    <div className="hero-slide-media-inner">
                      <div className="hero-slide-media-glow" />
                      <img
                        src={banner.image}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="hero-slide-discount">
                  <div className="hero-slide-discount-card">
                    <p>Up to</p>
                    <p className="hero-slide-discount-value">70%</p>
                    <p>Off</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
