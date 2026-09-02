import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards, displayUrl, slugify } from "../../lib/shop";
import { Reveal } from "./motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const featuredCards = cards.filter((card) => card.featured).slice(0, 6);
const cinematicCards = [...featuredCards, ...featuredCards];

const Product = ({ card, className = "", duplicate = false }) => (
  <Link
    to={`/shop/${slugify(card.id)}`}
    data-testid={duplicate ? undefined : `product-${slugify(card.id)}`}
    data-collection-card
    aria-hidden={duplicate ? "true" : undefined}
    tabIndex={duplicate ? -1 : undefined}
    className={`group block w-[78vw] shrink-0 sm:w-[52vw] lg:w-[34vw] xl:w-[30vw] ${className}`}
  >
    <div className="relative overflow-hidden aspect-[1344/797] bg-cream shadow-[0_28px_70px_rgba(53,35,25,0.14)]">
      <img
        src={displayUrl(card.images[0])}
        alt={`${card.id} wedding invitation`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
      />
    </div>
    <div className="mt-5 flex items-baseline justify-between">
      <div className="transition-transform duration-500 ease-out group-hover:translate-x-1">
        <h3 className="font-serif text-2xl md:text-3xl text-espresso leading-none">
          {card.id}
        </h3>
        <p className="mt-2 font-sans text-[0.62rem] uppercase tracking-[0.24em] text-taupe">
          {card.category}
        </p>
      </div>
      <span className="hidden sm:inline-flex items-center gap-1.5 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-espresso opacity-0 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
        View Invitation
        <span>&rarr;</span>
      </span>
    </div>
  </Link>
);

export const Collection = () => {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !railRef.current) return undefined;

      const cards = gsap.utils.toArray("[data-collection-card]", sectionRef.current);

      gsap.set(railRef.current, { xPercent: 0, willChange: "transform" });
      gsap.set(cards, {
        autoAlpha: 0,
        y: 120,
        scale: 0.82,
        rotate: (index) => (index % 2 === 0 ? -3.5 : 3.5),
        transformOrigin: "50% 80%",
      });

      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          once: true,
        },
      });

      tweenRef.current = gsap.to(railRef.current, {
        xPercent: -50,
        duration: 34,
        ease: "none",
        repeat: -1,
      });

      gsap.fromTo(
        sectionRef.current.querySelector("[data-collection-cinema]"),
        { clipPath: "inset(14% 6%)", filter: "brightness(0.92) saturate(0.88)" },
        {
          clipPath: "inset(0% 0%)",
          filter: "brightness(1) saturate(1)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            end: "top 24%",
            scrub: true,
          },
        }
      );

      return () => tweenRef.current?.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="collection"
      data-testid="collection-section"
      className="relative overflow-hidden bg-ivory pb-28 md:pb-36"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="max-w-4xl">
          <Reveal as="p" className="font-sans text-[0.68rem] uppercase tracking-[0.34em] text-taupe mb-7">
            The Collection
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="font-serif text-espresso leading-[0.95] tracking-tight text-4xl sm:text-6xl lg:text-7xl"
          >
            Find the one <span className="italic">that feels</span> like you.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-8 font-sans font-light text-base md:text-lg text-taupe max-w-xl leading-relaxed"
          >
            Invitations for celebrations that are intimate, grand, timeless, modern — and
            entirely yours.
          </Reveal>
        </div>

        <div
          data-collection-cinema
          className="relative -mx-5 mt-20 overflow-hidden py-10 sm:-mx-8 md:mt-28 lg:-mx-12"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.resume()}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ivory to-transparent sm:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ivory to-transparent sm:w-36" />
          <div
            ref={railRef}
            className="flex w-max gap-5 px-5 sm:gap-7 sm:px-8 lg:gap-9 lg:px-12"
            aria-label="Featured wedding cards"
          >
            {cinematicCards.map((card, index) => (
              <Product
                key={`${card.id}-${index}`}
                card={card}
                duplicate={index >= featuredCards.length}
              />
            ))}
          </div>
        </div>

        {/* Collection CTA */}
        <Reveal className="mt-24 md:mt-32 flex justify-center">
          <a
            href="/shop"
            data-testid="explore-cards-cta"
            className="group arrow-parent inline-flex items-center gap-4 font-serif text-espresso text-3xl sm:text-4xl lg:text-5xl leading-none"
          >
            <span className="border-b border-espresso/40 pb-2 transition-colors duration-500 group-hover:border-espresso">
              Explore All Wedding Cards
            </span>
            <span className="arrow-move text-2xl sm:text-3xl">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
