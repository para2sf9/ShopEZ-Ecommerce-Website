import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import CategorySlider from "../components/CategorySlider";
import ProductSection from "../components/ProductSection";
import TrustBadges, { PromoBanners, BrandShowcase } from "../components/PromoSection";
import { fetchFeatured, fetchTrending, fetchNewArrivals } from "../redux/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { featured, trending, newArrivals } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchFeatured());
    dispatch(fetchTrending());
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <CategorySlider />
      <TrustBadges />
      <PromoBanners />
      <ProductSection title="Featured Products" products={featured} link="/products" />
      <ProductSection title="Trending Now" products={trending} link="/products?sort=rating" />
      <ProductSection title="New Arrivals" products={newArrivals} link="/products" isLast />
      <BrandShowcase />
    </div>
  );
}
