import { gsap } from "gsap";

export function initPreloaderAnimation(
  canvas: HTMLCanvasElement,
  setAnimationDone: (done: boolean) => void
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const redCircle = { x: 0, y: height / 2, radius: 64, color: "#eb001bef" };
  const yellowCircle = { x: 0, y: height / 2, radius: 64, color: "#f89c1ce2" };
  const redAnim = { x: 0, radius: redCircle.radius };
  const yellowAnim = { x: 0, radius: yellowCircle.radius };

  const timeline = gsap.timeline({
    paused: true,
    onUpdate: () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = redCircle.color;
      ctx.beginPath();
      ctx.arc(width / 2 + redAnim.x, height / 2, redAnim.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = yellowCircle.color;
      ctx.beginPath();
      ctx.arc(width / 2 + yellowAnim.x, height / 2, yellowAnim.radius, 0, Math.PI * 2);
      ctx.fill();
    },
  });

  timeline
    .to(redAnim, { x: -36, duration: 0.8, ease: "power2.inOut" })
    .to(yellowAnim, { x: 36, duration: 0.8, ease: "power2.inOut" }, 0)
    .to([redAnim, yellowAnim], {
      radius: Math.max(width, height) * 1.2,
      duration: 2,
      ease: "power4.inOut",
      onComplete: () => setAnimationDone(true),
    }, "+=0.3");

  timeline.play();
  return timeline;
}
