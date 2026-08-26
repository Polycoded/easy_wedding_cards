import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { thumbUrl, slugify, money } from "../../lib/shop";

export const ProductTile = memo(function ProductTile({ c, isFavorite, onToggleFavorite, testidPrefix = "product-card" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/shop/${slugify(c.id)}`}
        data-testid={`${testidPrefix}-${slugify(c.id)}`}
        className="group block"
      >
      <div className="relative overflow-hidden aspect-[4/3] bg-cream">
        <img
          src={thumbUrl(c.images[0])}
          alt={c.id}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
          className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="hidden absolute inset-0 flex items-center justify-center bg-cream">
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-12 text-taupe/40">
            <rect x="20" y="20" width="160" height="110" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="70" cy="60" r="12" stroke="currentColor" strokeWidth="1.5" />
            <path d="M20 110 L70 75 L100 95 L140 55 L180 85" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(c.id);
            }}
            aria-label="Toggle favorite"
            data-testid={`favorite-${slugify(c.id)}`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/75 backdrop-blur-sm transition-colors duration-300 hover:bg-ivory"
          >
            <Heart size={15} strokeWidth={1.5} className={isFavorite ? "fill-rose text-rose" : "text-espresso"} />
          </button>
        )}
        {c.featured && (
          <span className="absolute left-0 top-4 bg-espresso text-cream px-3 py-1 font-sans text-[0.5rem] uppercase tracking-[0.24em]">
            Featured
          </span>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="transition-transform duration-500 ease-out group-hover:translate-x-1">
          <h3 className="font-serif text-xl md:text-2xl text-espresso leading-none">{c.id}</h3>
          <p className="mt-1.5 font-sans text-[0.55rem] uppercase tracking-[0.2em] text-rose">{c.category}</p>
        </div>
        <p className="font-sans text-xs text-espresso whitespace-nowrap">
          {money(c.price)}
        </p>
      </div>
    </Link>
    </motion.div>
  );
});
