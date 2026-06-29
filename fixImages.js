import { resolveProductImage } from "../data/productImages.js";

export function fixImageUrl(url, productName = "Product", category = "") {
  return resolveProductImage(url, productName, category);
}

export function fixProductImages(product) {
  if (!product) return product;
  const obj = product.toObject ? product.toObject() : { ...product };
  const category = obj.category || "";

  if (!Array.isArray(obj.images) || obj.images.length === 0) {
    obj.images = [resolveProductImage("", obj.name, category)];
  } else {
    obj.images = obj.images.map((img) => resolveProductImage(img, obj.name, category));
  }

  return obj;
}

export function fixProductsList(products) {
  return products.map((p) => fixProductImages(p));
}

export function fixCartResponse(cart) {
  if (!cart) return cart;
  const obj = cart.toObject ? cart.toObject() : { ...cart };
  if (Array.isArray(obj.items)) {
    obj.items = obj.items.map((item) => {
      if (item.product && typeof item.product === "object") {
        return { ...item, product: fixProductImages(item.product) };
      }
      return item;
    });
  }
  return obj;
}
