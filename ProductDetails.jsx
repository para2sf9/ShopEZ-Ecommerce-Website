import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiStar, FiShoppingCart, FiZap, FiMinus, FiPlus, FiTruck, FiShield, FiHeart, FiChevronRight } from "react-icons/fi";
import { fetchProductById, clearCurrentProduct } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import ProductImage from "../components/ProductImage";
import { getImageWithFallback } from "../utils/images";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProduct: product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="shimmer rounded-3xl aspect-square" />
          <div className="space-y-4">
            <div className="shimmer h-8 w-3/4 rounded-xl" />
            <div className="shimmer h-6 w-1/2 rounded-xl" />
            <div className="shimmer h-32 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const discount = product.discount || (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  const handleAddToCart = async () => {
    if (!user) { toast.error("Please login first"); navigate("/login"); return; }
    setAdding(true);
    try {
      await dispatch(addToCart({ productId: product._id, quantity })).unwrap();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    if (!user) { toast.error("Please login first"); navigate("/login"); return; }
    navigate(`/checkout?buyNow=${product._id}&qty=${quantity}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <FiChevronRight size={14} />
        <Link to={`/products?category=${product.category}`} className="hover:text-primary transition">{product.category}</Link>
        <FiChevronRight size={14} />
        <span className="text-gray-600 font-medium truncate">{product.name}</span>
      </nav>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-10">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group">
              <ProductImage
                src={product.images?.[selectedImage]}
                alt={product.name}
                fallbackText={product.name}
                category={product.category}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 gradient-warm text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {discount}% OFF
                </span>
              )}
              <button
                onClick={() => { setWishlisted(!wishlisted); toast.success(wishlisted ? "Removed" : "Wishlisted!"); }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  wishlisted ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500"
                }`}
              >
                <FiHeart size={18} className={wishlisted ? "fill-white" : ""} />
              </button>
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i ? "border-primary shadow-lg scale-105" : "border-gray-100 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getImageWithFallback(img, product.name, product.category)}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.target.src = getImageWithFallback("", product.name, product.category); }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.brand}</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl">
                <FiStar className="fill-green-600 text-green-600" size={14} />
                <span className="text-sm font-bold">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-400">({product.numReviews?.toLocaleString()} reviews)</span>
              <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">{product.category}</span>
            </div>

            <div className="flex items-baseline gap-3 mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">₹{product.price?.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice?.toLocaleString()}</span>
                  <span className="gradient-warm text-white text-sm font-bold px-3 py-1 rounded-full">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="text-gray-600 mt-5 leading-relaxed text-sm sm:text-base">{product.description}</p>

            <div className="mt-4">
              <span className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full ${
                product.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
              }`}>
                <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                {product.stock > 0 ? `In Stock — ${product.stock} available` : "Out of Stock"}
              </span>
            </div>

            {product.stock > 0 && (
              <>
                <div className="flex items-center gap-4 mt-6">
                  <span className="text-sm font-bold text-gray-700">Quantity</span>
                  <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2.5 hover:bg-gray-50 transition">
                      <FiMinus size={16} />
                    </button>
                    <span className="px-5 py-2.5 font-bold min-w-[3rem] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-2.5 hover:bg-gray-50 transition">
                      <FiPlus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    <FiShoppingCart size={20} />
                    {adding ? "Adding..." : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 flex items-center justify-center gap-2 btn-secondary py-4"
                  >
                    <FiZap size={20} />
                    Buy Now
                  </button>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { icon: FiTruck, title: "Free Delivery", desc: "Orders above ₹499", highlight: true },
                { icon: FiShield, title: "Warranty", desc: "1 year manufacturer", highlight: false },
              ].map((item) => (
                <div key={item.title} className={`flex items-center gap-3 p-4 rounded-2xl border transition ${item.highlight ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-100 hover:border-primary/20"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.highlight ? "bg-emerald-100" : "bg-primary/10"}`}>
                    <item.icon className={item.highlight ? "text-emerald-600" : "text-primary"} size={18} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${item.highlight ? "text-emerald-700" : "text-gray-800"}`}>{item.title}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
