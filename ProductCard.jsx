import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiShoppingCart, FiZap, FiStar, FiHeart, FiEye, FiTrendingUp } from "react-icons/fi";
import { addToCart } from "../redux/cartSlice";
import ProductImage from "./ProductImage";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.error("Please login to add items to cart"); navigate("/login"); return; }
    setAdding(true);
    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.error("Please login to buy"); navigate("/login"); return; }
    navigate(`/checkout?buyNow=${product._id}&qty=1`);
  };

  const discount = product.discount || (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  return (
    <article className="product-card group">
      <Link to={`/product/${product._id}`} className="product-card-body">
        <div className="product-card-image">
          <ProductImage
            src={product.images?.[0]}
            alt={product.name}
            fallbackText={product.name}
            category={product.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="product-overlay flex items-end justify-center pb-3">
            <span className="flex items-center gap-1.5 bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">
              <FiEye size={13} /> Quick View
            </span>
          </div>

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {discount > 0 && (
              <span className="badge-discount">{discount}% OFF</span>
            )}
            {product.isTrending && (
              <span className="badge-trending">
                <FiTrendingUp size={10} /> Trending
              </span>
            )}
          </div>

          {product.isNewArrival && (
            <span className="absolute top-2.5 right-11 badge-new">NEW</span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlisted(!wishlisted);
              toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
            }}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
              wishlisted ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500"
            }`}
          >
            <FiHeart size={14} className={wishlisted ? "fill-white" : ""} />
          </button>
        </div>

        <div className="product-card-content">
          <p className="product-brand">{product.brand}</p>
          <h3 className="product-name">{product.name}</h3>

          <div className="product-rating">
            <FiStar className="text-amber-500 fill-amber-500" size={12} />
            <span className="font-semibold text-gray-800">{product.rating}</span>
            <span className="text-gray-400">({product.numReviews?.toLocaleString()})</span>
          </div>

          <div className="product-price">
            <span className="price-current">₹{product.price?.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="price-original">₹{product.originalPrice?.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="product-card-actions">
        <button type="button" onClick={handleAddToCart} disabled={adding} className="btn-cart">
          <FiShoppingCart size={15} aria-hidden="true" />
          <span>{adding ? "..." : "Add to Cart"}</span>
        </button>
        <button type="button" onClick={handleBuyNow} className="btn-buy">
          <FiZap size={15} aria-hidden="true" />
          <span>Buy Now</span>
        </button>
      </div>
    </article>
  );
}
