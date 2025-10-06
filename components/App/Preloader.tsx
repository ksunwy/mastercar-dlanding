import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { initPreloaderAnimation } from "@/utils/preloaderAnimations";
import styles from "@/styles/app/preloader.module.scss";

export default function Preloader({ isLoaded }: { isLoaded: boolean }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloaderTimeline = useRef<gsap.core.Timeline | null>(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.querySelector("html");
    if (html) html.style.overflowY = "hidden";

    if (canvasRef.current) {
      preloaderTimeline.current = initPreloaderAnimation(canvasRef.current, setAnimationDone);
    }

    return () => {
      if (html) html.style.overflowY = "visible";
    };
  }, []);

  useEffect(() => {
    if (isLoaded && animationDone) {
      gsap.to(preloaderRef.current, {
        duration: 1,
        autoAlpha: 0,
        ease: "power2.out",
        onComplete: () => {
          const html = document.querySelector("html");
          if (html) html.style.overflowY = "visible";
        },
      });
    }
  }, [isLoaded, animationDone]);

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh", display: "block" }} />
    </div>
  );
}
