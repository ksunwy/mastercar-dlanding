import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface UseCustomCursorProps {
  videoContainerRef: React.RefObject<HTMLDivElement | null>;
  shouldShowCursor: (e: MouseEvent) => boolean;
  cursorText: string;
  cursorSvg?: string;
  xOffset?: number;
  yOffset?: number;
}

export const useCustomCursor = ({
  videoContainerRef,
  shouldShowCursor,
  cursorText,
  cursorSvg = "",
  xOffset = 60,
  yOffset = 40,
}: UseCustomCursorProps) => {
  const [showCustomCursor, setShowCustomCursor] = useState<boolean>(false);
  const customCursorRef = useRef<HTMLElement | null>(null);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      const shouldShow = shouldShowCursor(e);
      setShowCustomCursor(shouldShow);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      isMounted.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      if (customCursorRef.current && document.body.contains(customCursorRef.current)) {
        try {
          document.body.removeChild(customCursorRef.current);
        } catch (error) {
          console.error("Failed to remove custom cursor:", error);
        }
        customCursorRef.current = null;
      }
    };
  }, [shouldShowCursor]);

  useEffect(() => {
    if (!showCustomCursor) {
      if (customCursorRef.current && document.body.contains(customCursorRef.current)) {
        gsap.to(customCursorRef.current, {
          width: 0,
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (customCursorRef.current && document.body.contains(customCursorRef.current)) {
              try {
                document.body.removeChild(customCursorRef.current);
              } catch (error) {
                console.error("Failed to remove custom cursor:", error);
              }
              customCursorRef.current = null;
            }
          },
        });
      }
      return;
    }

    if (!customCursorRef.current) {
      customCursorRef.current = document.createElement("div");
      customCursorRef.current.className = "custom-video-cursor";
      const existingContent = customCursorRef.current.querySelector("span");
      if (!existingContent) {
        customCursorRef.current.innerHTML = `${cursorSvg}<span>${cursorText}</span>`;
      }
      document.body.appendChild(customCursorRef.current);
      gsap.set(customCursorRef.current, { width: 0, height: 0, opacity: 0 });
      gsap.to(customCursorRef.current, {
        width: "auto",
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    const updateCustomCursorPosition = (e: MouseEvent) => {
      if (customCursorRef.current && document.body.contains(customCursorRef.current)) {
        gsap.to(customCursorRef.current, {
          x: e.clientX + xOffset,
          y: e.clientY + yOffset,
          duration: 0.1,
        });
      }
    };

    window.addEventListener("mousemove", updateCustomCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCustomCursorPosition);
    };
  }, [showCustomCursor, xOffset, yOffset]);

  useEffect(() => {
    if (customCursorRef.current && document.body.contains(customCursorRef.current)) {
      const existingText = customCursorRef.current.querySelector("span");
      if (existingText) {
        existingText.textContent = cursorText;
      } else {
        customCursorRef.current.innerHTML = `${cursorSvg}<span>${cursorText}</span>`;
      }
    }
  }, [cursorText, cursorSvg]);

  return {
    hideCursor: () => {
      if (customCursorRef.current && document.body.contains(customCursorRef.current)) {
        gsap.to(customCursorRef.current, {
          opacity: 0,
          width: 0,
          height: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    showCursor: () => {
      if (customCursorRef.current && document.body.contains(customCursorRef.current)) {
        gsap.to(customCursorRef.current, {
          opacity: 1,
          width: "auto",
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
  };
};