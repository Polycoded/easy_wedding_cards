import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { ScrollMoment } from "../components/landing/ScrollMoment";
import { Collection } from "../components/landing/Collection";
import { GiftsTeaser } from "../components/landing/GiftsTeaser";
import { FinalCTA } from "../components/landing/FinalCTA";
import { Footer } from "../components/landing/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
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

  return (
    <div className="App bg-ivory" data-testid="landing-page">
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
