import { useState, useEffect, useCallback } from "react";
import cardsData from "../data/cards.json";

export const PAGE_SIZE = 8;
export const WHATSAPP_NUMBER = "910000000000"; // placeholder — replace with your number

export const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' fill='%23ECE4D8'%3E%3Crect width='400' height='500'/%3E%3C/svg%3E";

export const cards = Array.isArray(cardsData) ? cardsData : [];

// Bulk-import every card image (display + thumbnails) and build a filename -> hashed URL map.
const assetModules = require.context(
  "../assets/cards",
  true,
  /\.(png|jpe?g|PNG|JPG|webp|WEBP)$/,
);

const filenameToUrl = {};
assetModules.keys().forEach((key) => {
  const filename = key.split("/").pop();
  filenameToUrl[filename] = assetModules(key);
});

// Resolve a JSON image path (e.g. "src/assets/cards/display/the-amara-1.jpeg")
// to a real URL. Falls back to an inline SVG placeholder when missing.
export const imgUrl = (u) => {
  if (typeof u !== "string") return FALLBACK;
  if (u.startsWith("http") || u.startsWith("data:") || u.startsWith("/")) return u;
  const filename = u.split("/").pop();
  return filenameToUrl[filename] || FALLBACK;
};
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const money = (n) => `₹${Number(n).toLocaleString()}`;

export const getCardBySlug = (slug) => cards.find((c) => slugify(c.id) === slug);

export const categoryCounts = () => {
  const map = { All: cards.length };
  for (const c of cards) map[c.category] = (map[c.category] || 0) + 1;
  return map;
};

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
};

const FAV_KEY = "ewc-favorites";
const RECENT_KEY = "ewc-recent";
const RECENT_MAX = 12;

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => read(FAV_KEY, []));
  useEffect(() => write(FAV_KEY, favorites), [favorites]);
  const toggle = useCallback(
    (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [],
  );
  return { favorites, toggle };
}

export const getRecentlyViewed = () => read(RECENT_KEY, []);
export const addRecentlyViewed = (id) => {
  const next = [id, ...getRecentlyViewed().filter((x) => x !== id)].slice(0, RECENT_MAX);
  write(RECENT_KEY, next);
  return next;
};
