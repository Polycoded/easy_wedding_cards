import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { ScrollMoment } from "../components/landing/ScrollMoment";
import { Collection } from "../components/landing/Collection";
import { GiftsTeaser } from "../components/landing/GiftsTeaser";
import { FinalCTA } from "../components/landing/FinalCTA";
import { Footer } from "../components/landing/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Landing() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    window.__lenis = lenis;

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollMoment = rootRef.current.querySelector('[data-testid="scroll-moment"]');
        if (!scrollMoment) return undefined;
        const lines = gsap.utils.toArray("[data-gsap-line]", scrollMoment);

        const moment = gsap.timeline({
          scrollTrigger: {
            trigger: scrollMoment,
            start: "top top",
            end: "+=135%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
          },
        });

        moment
          .fromTo(
            lines,
            { autoAlpha: 0.12, y: 90, scale: 0.92, filter: "blur(18px)" },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              stagger: 0.28,
              duration: 1.4,
              ease: "power3.out",
            }
          )
          .to(lines, {
            autoAlpha: 0.18,
            y: -80,
            scale: 1.08,
            filter: "blur(10px)",
            stagger: 0.14,
            duration: 0.9,
            ease: "power2.inOut",
          });

        const collection = rootRef.current.querySelector('[data-gsap-scene="collection"]');
        const collectionHeading = rootRef.current.querySelector("[data-gsap-collection-heading]");

        if (collection && collectionHeading) {
          ScrollTrigger.create({
            trigger: collection,
            start: "top 18%",
            end: "bottom 64%",
            pin: collectionHeading,
            pinSpacing: false,
            anticipatePin: 1,
          });
        }

        return undefined;
      });

      mm.add("(max-width: 767px)", () => {
        const lines = gsap.utils.toArray("[data-gsap-line]", rootRef.current);

        lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            { opacity: 0.12, y: 54, scale: 0.94, filter: "blur(12px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 88%",
                end: "top 34%",
                scrub: 0.8 + index * 0.08,
              },
            }
          );
        });

        return undefined;
      });

      mm.add("(min-width: 1px)", () => {
        const mediaFrames = gsap.utils.toArray("[data-gsap-media]", rootRef.current);
        const heroMedia = rootRef.current.querySelector("[data-gsap-hero-media]");
        const scenes = gsap.utils.toArray("[data-gsap-scene]", rootRef.current);
        const vignette = rootRef.current.querySelector("[data-gsap-vignette]");
        const topBar = rootRef.current.querySelector("[data-gsap-cinema-bar='top']");
        const bottomBar = rootRef.current.querySelector("[data-gsap-cinema-bar='bottom']");

        gsap.set(mediaFrames, { willChange: "clip-path, transform, opacity" });

        scenes.forEach((scene) => {
          if (scene.getAttribute("data-gsap-scene") === "moment") return;

          gsap.fromTo(
            scene,
            { filter: "brightness(0.88) saturate(0.9)" },
            {
              filter: "brightness(1) saturate(1)",
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top 88%",
                end: "top 42%",
                scrub: true,
              },
            }
          );
        });

        mediaFrames.forEach((frame) => {
          const image = frame.querySelector("img");
          if (!image) return;

          gsap.fromTo(
            frame,
            { clipPath: "inset(16% 12%)", autoAlpha: 0.62, scale: 0.94 },
            {
              clipPath: "inset(0% 0%)",
              autoAlpha: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top 92%",
                end: "top 28%",
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            image,
            { scale: 1.24, yPercent: -9 },
            {
              scale: 1.02,
              yPercent: 9,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        if (heroMedia) {
          gsap.timeline({
            scrollTrigger: {
              trigger: heroMedia,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
            .to(heroMedia, { yPercent: 16, scale: 0.94, rotate: -0.65, ease: "none" }, 0);
        }

        if (vignette) {
          gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          })
            .to(vignette, { autoAlpha: 0.28, duration: 0.22, ease: "none" })
            .to(vignette, { autoAlpha: 0.1, duration: 0.22, ease: "none" })
            .to(vignette, { autoAlpha: 0.34, duration: 0.22, ease: "none" })
            .to(vignette, { autoAlpha: 0.16, duration: 0.34, ease: "none" });
        }

        if (topBar && bottomBar) {
          gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          })
            .fromTo([topBar, bottomBar], { scaleY: 0 }, { scaleY: 1, duration: 0.18, ease: "power2.out" })
            .to([topBar, bottomBar], { scaleY: 0.34, duration: 0.28, ease: "power2.inOut" })
            .to([topBar, bottomBar], { scaleY: 0.72, duration: 0.24, ease: "power2.inOut" })
            .to([topBar, bottomBar], { scaleY: 0.2, duration: 0.3, ease: "power2.inOut" });
        }

        ScrollTrigger.refresh();

        return undefined;
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="App bg-ivory" data-testid="landing-page">
      <div
        data-gsap-vignette
        className="pointer-events-none fixed inset-0 z-40 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 38%, rgba(37, 25, 18, 0.24) 78%, rgba(37, 25, 18, 0.42) 100%)",
        }}
      />
      <div
        data-gsap-cinema-bar="top"
        className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-8 origin-top scale-y-0 bg-espresso"
      />
      <div
        data-gsap-cinema-bar="bottom"
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-8 origin-bottom scale-y-0 bg-espresso"
      />
      <Header heroLogo />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <ScrollMoment />
        <Collection />
        <GiftsTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
