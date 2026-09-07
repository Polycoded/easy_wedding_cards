import { motion, useReducedMotion } from "framer-motion";
import { IMAGES } from "../../data/landing";

const EASE = [0.22, 1, 0.36, 1];

export const Hero = () => {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: EASE },
    },
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen w-full bg-ivory overflow-hidden"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 min-h-screen relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen items-center gap-10 lg:gap-8 pt-28 pb-20 lg:py-0">
          {/* Typography */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.p
                variants={item}
                className="font-sans text-[0.68rem] uppercase tracking-[0.34em] text-rose mb-8"
              >
                Easy Wedding Cards
              </motion.p>

              <motion.h1
                variants={item}
                className="font-serif text-espresso leading-[0.92] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
              >
                Some things
                <br />
                deserve <span className="italic text-rose">more</span>
                <br />
                than a message.
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-9 font-serif italic text-2xl md:text-3xl text-taupe leading-snug max-w-md"
              >
                For the people you love, on the day you'll never forget.
              </motion.p>

              <motion.p
                variants={item}
                className="mt-6 font-sans font-light text-sm md:text-base text-taupe/90 max-w-sm leading-relaxed"
              >
                The first glimpse of your wedding begins with the invitation.
              </motion.p>

              <motion.div variants={item} className="mt-11">
                <a
                  href="/shop"
                  data-testid="hero-shop-cta"
                  className="group arrow-parent inline-flex items-center gap-3 border border-espresso px-8 py-4 font-sans text-[0.72rem] uppercase tracking-[0.24em] text-espresso transition-colors duration-500 hover:bg-espresso hover:border-espresso hover:text-cream"
                >
                  Shop Wedding Cards
                  <span className="arrow-move">&rarr;</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Photograph */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.05 }}
              className="relative lg:-mr-12 xl:-mr-20"
            >
              <div data-gsap-hero-media className="relative overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[5/6]">
                <motion.img
                  src={IMAGES.hero}
                  alt="A luxury wedding invitation suite on warm ivory linen in soft daylight"
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  loading="eager"
                />
              </div>
              <p className="mt-4 font-sans text-[0.6rem] uppercase tracking-[0.28em] text-taupe/70">
                The Amara — Ivory &middot; Embossed
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[0.58rem] uppercase tracking-[0.3em] text-taupe/70">
          Scroll
        </span>
        <span className="h-10 w-px bg-taupe/40 overflow-hidden relative">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-espresso"
          />
        </span>
      </motion.div>
    </section>
  );
};
