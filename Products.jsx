import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiFilter, FiGrid, FiSliders } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/productSlice";
import { CATEGORIES } from "../constants/categories";

const categories = ["All", ...CATEGORIES.map((c) => c.name)];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, total, pages, loading } = useSelector((state) => state.product);
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "" });

  useEffect(() => {
    const params = { page, limit: 12 };
    if (category) params.category = category;
    if (search) params.search = search;
    if (sort) params.sort = sort;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    dispatch(fetchProducts(params));
  }, [dispatch, category, search, sort, page, filters]);

  const handleCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    params.delete("page");
    setSearchParams(params);
  };

  const handlePage = (p) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", p);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const title = search ? `Results for "${search}"` : category || "All Products";

  return (
    <div className="page-section">
      <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 section-title">{title}</h1>
        <p className="text-gray-500 mt-2 text-sm">{total} products found</p>
      </div>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2.5 bg-white rounded-2xl border border-gray-100 text-sm font-semibold shadow-sm"
      >
        <FiSliders size={16} /> Filters & Sort
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className={`lg:w-72 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 sticky top-28 space-y-6">
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <FiFilter size={18} /> Filters
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const catData = CATEGORIES.find((c) => c.name === cat);
                  const Icon = catData?.icon;
                  return (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      (cat === "All" && !category) || cat === category
                        ? "gradient-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {Icon && <Icon size={15} />}
                    {cat}
                  </button>
                );})}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Price Range</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min ₹" value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl text-sm outline-none input-glow" />
                <input type="number" placeholder="Max ₹" value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl text-sm outline-none input-glow" />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sort By</h3>
              <select
                value={sort}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  if (e.target.value) params.set("sort", e.target.value);
                  else params.delete("sort");
                  setSearchParams(params);
                }}
                className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl text-sm outline-none input-glow bg-white"
              >
                <option value="">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="shimmer rounded-3xl aspect-[3/4]" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
              <FiGrid size={48} className="mx-auto text-gray-200" />
              <p className="text-gray-500 text-lg font-semibold mt-4">No products found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {[...Array(pages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePage(i + 1)}
                      className={`w-11 h-11 rounded-xl font-bold text-sm transition-all duration-300 ${
                        page === i + 1
                          ? "gradient-primary text-white shadow-lg scale-110"
                          : "bg-white text-gray-600 hover:bg-primary/5 border border-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}