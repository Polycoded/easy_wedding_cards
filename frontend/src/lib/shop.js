import { useState, useEffect, useCallback } from "react";
import cardsData from "../data/cards.json";

export const PAGE_SIZE = 8;
export const WHATSAPP_NUMBER = "9961663010";

export const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' fill='%23ECE4D8'%3E%3Crect width='400' height='500'/%3E%3C/svg%3E";

// Adapt the backend's raw cards.json shape to what the UI expects, and drop the
// virtual "system_options" entry the backend may persist alongside real cards.
const normalizeCard = (c) => ({
  id: String(c.id ?? ""),
  category: c.category ?? "",
  price: Number(c.price) || 0,
  featured: Boolean(c.featured),
  description: c.description ?? "",
  size: c.size ?? "",
  material: c.material ?? "",
  images: Array.isArray(c.images) ? c.images.filter((x) => typeof x === "string" && x) : [],
  variants: Array.isArray(c.variants)
    ? c.variants.map((v) => ({
        name: v.name ?? "",
        size: v.size ?? "",
        material: v.material ?? "",
        price: Number(v.price) || 0,
      }))
    : [],
});

export const cards = (Array.isArray(cardsData) ? cardsData : [])
  .filter((c) => c && typeof c === "object" && c.id !== "system_options" && c.id)
  .map(normalizeCard);

// Thumbnails — low-res, used in the product grid and small preview strips.
const thumbnailModules = require.context(
  "../assets/cards/thumbnails",
  false,
  /\.(png|jpe?g|webp)$/i,
);

// Display images — full quality, used inside the detail view and lightbox.
const displayModules = require.context(
  "../assets/cards/display",
  false,
  /\.(png|jpe?g|webp)$/i,
);

const filenameToThumb = {};
thumbnailModules.keys().forEach((key) => {
  const filename = key.split("/").pop();
  filenameToThumb[filename] = thumbnailModules(key);
});

const filenameToDisplay = {};
displayModules.keys().forEach((key) => {
  const filename = key.split("/").pop();
  filenameToDisplay[filename] = displayModules(key);
});

// Resolve an image path to its low-res thumbnail for listings.
export const thumbUrl = (u) => {
  if (typeof u !== "string") return FALLBACK;
  if (u.startsWith("http") || u.startsWith("data:") || u.startsWith("/")) return u;
  const filename = u.split("/").pop();
  return filenameToThumb[filename] || FALLBACK;
};

// Resolve an image path to its full-quality version for the detail/lightbox.
export const displayUrl = (u) => {
  if (typeof u !== "string") return FALLBACK;
  if (u.startsWith("http") || u.startsWith("data:") || u.startsWith("/")) return u;
  const filename = u.split("/").pop();
  return filenameToDisplay[filename] || FALLBACK;
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
