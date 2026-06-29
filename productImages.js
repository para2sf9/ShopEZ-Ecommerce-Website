/** Curated Unsplash images — w=600 for fast product cards */
export const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=600&auto=format&fit=crop&q=80`;

export const CATEGORY_IMAGES = {
  Electronics: img("1498049794561-7780e7231661"),
  Fashion: img("1445205170230-053b83016050"),
  Groceries: img("1542838132-92c53300491e"),
  Beauty: img("1596462502278-27bfd403348e"),
  Home: img("1555041469-a586c61ea9bc"),
  Sports: img("1461896836934-ffe247f221ce"),
};

/** Product-specific images for seed data and legacy URL migration */
export const PRODUCT_IMAGES = {
  "Samsung Galaxy S24 Ultra": img("1610945265064-75e218c785e0"),
  "Apple iPhone 15 Pro": img("1695048133142-02a3e7461308"),
  "Sony WH-1000XM5 Headphones": img("1505740420928-5e560c06d30e"),
  "MacBook Air M3": img("1517336714731-489689fd1ca8"),
  "Boat Airdopes 131": img("1590658268037-7582a8d8b177"),
  "Nike Air Max 270": img("1542291026-7eec264c27ff"),
  "Levi's 501 Original Jeans": img("1542272604-787c3835535d"),
  "Puma Essentials Hoodie": img("1556821840-3a63f95609a7"),
  "Zara Cotton Formal Shirt": img("1602810318383-e386cc2a3e9f"),
  "H&M Floral Summer Dress": img("1595777457583-95e059d581b8"),
  "Organic Basmati Rice 5kg": img("1586201375767-7479e2f2377b"),
  "Fortune Sunflower Oil 5L": img("1474979266404-7ea2f90af951"),
  "Tata Tea Gold 1kg": img("1556678150-c1344a527ced"),
  "Aashirvaad Wheat Flour 5kg": img("1509440159596-0249088772ff"),
  "Dabur Honey 500g": img("1587049351690-3424d6d6723d"),
  "Lakme Absolute Matte Lipstick": img("1586495777744-4552f8373a69"),
  "Maybelline Fit Me Foundation": img("1522335781063-353424a82966"),
  "Himalaya Face Wash 150ml": img("1556228720-195a672e8a03"),
  "Fogg Perfume Body Spray": img("1541643600911-5419874dbe32"),
  "Nivea Soft Moisturizing Cream": img("1556228578-8c89e6dff329"),
  "IKEA MALM Bed Frame": img("1505693416388-ac0671785c2"),
  "Philips Air Fryer HD9200": img("1585515320310-ef1ece419113"),
  "Wakefit Memory Foam Cushion": img("1586953208448-b112f062399b"),
  "Milton Dining Set 6 Pieces": img("1578913437554-607526d65752"),
  "Eureka Forbes Vacuum Cleaner": img("1558317750-f2746c0a0174"),
  "Yonex Badminton Racket": img("1626224583764-f3f4d7584f6e"),
  "Adidas Ultraboost 22": img("1608231387042-6842424de179"),
  "SG Cricket Bat English Willow": img("1624526278316-a88d3e57c11c"),
  "Strauss Yoga Mat 6mm": img("1601925264346-be1d5911805e"),
  "Nivia Football Size 5": img("1614632537417-6807da5b6535"),
  mango: img("1553279768-865614fa7f83"),
  "Ratnagiri Mango": img("1553279768-865614fa7f83"),
};

/** Resolve the best image URL for a product */
export function resolveProductImage(url, name = "Product", category = "") {
  const trimmed = typeof url === "string" ? url.trim() : "";

  // Keep valid external URLs (Unsplash, CDN, uploads)
  if (trimmed && !trimmed.includes("fakestoreapi.com") && !trimmed.includes("placehold.co")) {
    return trimmed;
  }

  // Match by exact product name
  if (name && PRODUCT_IMAGES[name]) return PRODUCT_IMAGES[name];

  // Match by keyword in name (e.g. "mango", "MacBook")
  const lower = (name || "").toLowerCase();
  for (const [key, imageUrl] of Object.entries(PRODUCT_IMAGES)) {
    if (key.length > 3 && lower.includes(key.toLowerCase())) return imageUrl;
  }

  // Category default
  if (category && CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category];

  return `https://placehold.co/400x400/e8e0f8/2563eb/png?text=${encodeURIComponent((name || "Product").slice(0, 16))}`;
}
