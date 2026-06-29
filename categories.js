import {
  FiSmartphone,
  FiShoppingBag,
  FiPackage,
  FiStar,
  FiHome,
  FiActivity,
} from "react-icons/fi";

export const CATEGORIES = [
  { name: "Electronics", icon: FiSmartphone, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Fashion", icon: FiShoppingBag, color: "text-pink-600", bg: "bg-pink-50" },
  { name: "Groceries", icon: FiPackage, color: "text-green-600", bg: "bg-green-50" },
  { name: "Beauty", icon: FiStar, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Home", icon: FiHome, color: "text-orange-600", bg: "bg-orange-50" },
  { name: "Sports", icon: FiActivity, color: "text-red-600", bg: "bg-red-50" },
];

/** Navbar + mobile menu — Home first links to main page */
export const NAV_ITEMS = [
  { name: "Home", icon: FiHome, color: "text-blue-600", to: "/" },
  ...CATEGORIES.filter((c) => c.name !== "Home").map((cat) => ({
    name: cat.name,
    icon: cat.icon,
    color: cat.color,
    to: `/products?category=${encodeURIComponent(cat.name)}`,
  })),
];

export const SECTION_ITEM_COUNT = 10;
