import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTruck } from "react-icons/fi";
import { fetchCart, updateCartItem, removeFromCart } from "../redux/cartSlice";
import ProductImage from "../components/ProductImage";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="page-section page-shell page-shell--center">
        <div className="page-container">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 btn-primary !p-0 !shadow-lg">
            <FiShoppingBag size={36} className="text-white" />
          </div>
          <h2 className="page-shell-title">Login to view your cart</h2>
          <p className="page-shell-subtitle">Sign in to access your saved items</p>
          <Link to="/login" className="inline-block mt-6 btn-primary">Login Now</Link>
        </div>
      </div>
    );
  }

  const validItems = items.filter((item) => item.product);
  const subtotal = validItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const delivery = subtotal > 499 ? 0 : 49;
  const total = subtotal + delivery;

  const handleQuantity = async (productId, qty) => {
    if (qty < 1) return;
    try { await dispatch(updateCartItem({ productId, quantity: qty })).unwrap(); }
    catch (err) { toast.error(err); }
  };

  const handleRemove = async (productId) => {
    try { await dispatch(removeFromCart(productId)).unwrap(); toast.success("Item removed"); }
    catch (err) { toast.error(err); }
  };

  if (loading) {
    return (
      <div className="page-section">
        <div className="page-container space-y-4">
          {[1, 2].map((i) => <div key={i} className="shimmer rounded-3xl h-32" />)}
        </div>
      </div>
    );
  }

  if (validItems.length === 0) {
    return (
      <div className="page-section page-shell page-shell--center">
        <div className="page-container">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <FiShoppingBag size={36} className="text-gray-300" />
          </div>
          <h2 className="page-shell-title">Your cart is empty</h2>
          <p className="page-shell-subtitle">Discover amazing deals and fill your cart!</p>
          <Link to="/products" className="inline-block mt-6 btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section animate-fadeIn">
      <div className="page-container page-shell">
        <div className="page-shell-header">
          <h1 className="page-shell-title">Shopping Cart</h1>
          <p className="page-shell-subtitle">{validItems.length} items in your cart</p>
        </div>

        <div className="cart-layout">
          <div className="space-y-4">
            {validItems.map((item) => (
              <div key={item.product._id} className="cart-item">
                <div className="cart-item-image">
                  <ProductImage
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    fallbackText={item.product.name}
                    category={item.product.category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="cart-item-body">
                  <h3 className="font-bold text-gray-800 line-clamp-2">{item.product.name}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{item.product.brand}</p>
                  <p className="text-lg font-extrabold text-gray-900 mt-1">₹{item.product.price?.toLocaleString()}</p>
                  <div className="cart-item-footer">
                    <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                      <button type="button" onClick={() => handleQuantity(item.product._id, item.quantity - 1)} className="px-3 py-2 hover:bg-gray-50 transition">
                        <FiMinus size={14} />
                      </button>
                      <span className="px-4 py-2 font-bold text-sm min-w-[2.5rem] text-center">{item.quantity}</span>
                      <button type="button" onClick={() => handleQuantity(item.product._id, item.quantity + 1)} className="px-3 py-2 hover:bg-gray-50 transition">
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <button type="button" onClick={() => handleRemove(item.product._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-total sm:text-right sm:self-start sm:pt-1">
                  <p className="text-xs text-gray-400">Line total</p>
                  <p className="font-extrabold text-gray-900 text-lg">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="cart-summary">
              <h3 className="font-extrabold text-gray-900 text-lg mb-5">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4"><span className="text-gray-500">Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-500 flex items-center gap-1"><FiTruck size={14} /> Delivery</span>
                  <span className={`font-semibold ${delivery === 0 ? "text-green-600" : ""}`}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                </div>
                {subtotal < 499 && (
                  <div className="bg-sky-50 text-sky-700 text-xs font-medium px-3 py-2 rounded-xl">
                    Add ₹{(499 - subtotal).toLocaleString()} more for free delivery!
                  </div>
                )}
                <hr className="border-gray-100" />
                <div className="flex justify-between font-extrabold text-xl pt-1 gap-4">
                  <span>Total</span>
                  <span className="gradient-text">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button type="button" onClick={() => navigate("/checkout")} className="w-full btn-secondary py-3.5 mt-6 flex items-center justify-center gap-2">
                Proceed to Checkout <FiArrowRight size={18} />
              </button>
              <Link to="/products" className="block text-center text-primary text-sm font-semibold mt-4 hover:underline">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
