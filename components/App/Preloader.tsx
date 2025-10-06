import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroClasses from "@/styles/hero/hero.module.scss";
import styles from "@/styles/app/preloader.module.scss";

export default function Preloader({ isLoaded }: { isLoaded: boolean }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloaderTimeline = useRef<gsap.core.Timeline | null>(null);

  const [animationDone, setAnimationDone] = useState(false);

  const canvasWidth = 272;
  const canvasHeight = 128;

  const redCircle = { x: 0, y: canvasHeight / 2, radius: 64, color: "#eb001bef" };
  const yellowCircle = { x: 0, y: canvasHeight / 2, radius: 64, color: "#f89c1ce2" };

  const initAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const redCircleAnimation = { x: 0 };
    const yellowCircleAnimation = { x: 0 };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    preloaderTimeline.current = gsap.timeline({ paused: true });

    preloaderTimeline.current
      .to(redCircleAnimation, {
        x: -38,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = redCircle.color;
          ctx.beginPath();
          ctx.arc(
            canvasWidth / 2 + redCircleAnimation.x,
            canvasHeight / 2,
            redCircle.radius,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.fillStyle = yellowCircle.color;
          ctx.beginPath();
          ctx.arc(
            canvasWidth / 2 + yellowCircleAnimation.x,
            canvasHeight / 2,
            yellowCircle.radius,
            0,
            Math.PI * 2
          );
          ctx.fill();
        },
      })
      .to(
        yellowCircleAnimation,
        {
          x: 38,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        {},
        {
          duration: 0.4,
          onComplete: () => {
            setAnimationDone(true);
          },
        },
        0.5
      );

    preloaderTimeline.current.play();
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.style.overflowY = "hidden";
    initAnimation();
  }, []);

  useEffect(() => {
    if (isLoaded && animationDone) {
      gsap.to(preloaderRef.current, {
        duration: 0.6,
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
      <div className={styles["inner-container"]}>
        <div className={styles.preloader__center}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
