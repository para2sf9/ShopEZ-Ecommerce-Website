const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=600&auto=format&fit=crop&q=80`;

const PLACEHOLDER = (text, w = 400, h = 400) =>
  `https://placehold.co/${w}x${h}/e8e0f8/2563eb/png?text=${encodeURIComponent(text)}`;

export const FALLBACK_IMAGE = PLACEHOLDER("ShopEZ");

export const CATEGORY_IMAGES = {
  Electronics: img("1498049794561-7780e7231661"),
  Fashion: img("1445205170230-053b83016050"),
  Groceries: img("1542838132-92c53300491e"),
  Beauty: img("1596462502278-27bfd403348e"),
  Home: img("1555041469-a586c61ea9bc"),
  Sports: img("1461896836934-ffe247f221ce"),
};

const KEYWORD_IMAGES = [
  ["mango", img("1553279768-865614fa7f83")],
  ["macbook", img("1517336714731-489689fd1ca8")],
  ["iphone", img("1695048133142-02a3e7461308")],
  ["samsung", img("1610945265064-75e218c785e0")],
  ["headphone", img("1505740420928-5e560c06d30e")],
  ["earbud", img("1590658268037-7582a8d8b177")],
  ["nike", img("1542291026-7eec264c27ff")],
  ["jeans", img("1542272604-787c3835535d")],
  ["shirt", img("1602810318383-e386cc2a3e9f")],
  ["dress", img("1595777457583-95e059d581b8")],
  ["hoodie", img("1556821840-3a63f95609a7")],
  ["rice", img("1586201375767-7479e2f2377b")],
  ["oil", img("1474979266404-7ea2f90af951")],
  ["tea", img("1556678150-c1344a527ced")],
  ["honey", img("1587049351690-3424d6d6723d")],
  ["lipstick", img("1586495777744-4552f8373a69")],
  ["foundation", img("1522335781063-353424a82966")],
  ["face wash", img("1556228720-195a672e8a03")],
  ["perfume", img("1541643600911-5419874dbe32")],
  ["moistur", img("1556228578-8c89e6dff329")],
  ["bed", img("1505693416388-ac0671785c2")],
  ["air fryer", img("1585515320310-ef1ece419113")],
  ["cushion", img("1586953208448-b112f062399b")],
  ["dining", img("1578913437554-607526d65752")],
  ["vacuum", img("1558317750-f2746c0a0174")],
  ["badminton", img("1626224583764-f3f4d7584f6e")],
  ["cricket", img("1624526278316-a88d3e57c11c")],
  ["yoga", img("1601925264346-be1d5911805e")],
  ["football", img("1614632537417-6807da5b6535")],
];

export function resolveImage(src, name = "Product", category = "") {
  const trimmed = typeof src === "string" ? src.trim() : "";
  if (trimmed && !trimmed.includes("fakestoreapi.com") && !trimmed.includes("placehold.co")) {
    return trimmed;
  }

  const lower = (name || "").toLowerCase();
  for (const [keyword, url] of KEYWORD_IMAGES) {
    if (lower.includes(keyword)) return url;
  }

  if (category && CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category];
  return PLACEHOLDER(name.slice(0, 18));
}

export function getProductImage(product, index = 0) {
  const images = product?.images;
  const src = Array.isArray(images) ? images[index] : images;
  return resolveImage(src, product?.name, product?.category);
}

export function getImageWithFallback(src, fallbackText = "Product", category = "") {
  return resolveImage(src, fallbackText, category);
}

export { PLACEHOLDER };
