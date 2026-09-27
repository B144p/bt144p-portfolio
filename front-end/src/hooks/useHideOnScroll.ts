"use client";

import { useEffect, useState } from "react";

// True while scrolling down, false while scrolling up or near the top.
// `threshold` ignores tiny jitters (trackpad, iOS bounce) so the bar doesn't
// flicker; scroll work is batched to one check per animation frame.
export const useHideOnScroll = (threshold = 8, revealTop = 80): boolean => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (y < revealTop) {
        setHidden(false);
        lastY = y;
      } else if (Math.abs(y - lastY) >= threshold) {
        setHidden(y > lastY);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, revealTop]);

  return hidden;
};
