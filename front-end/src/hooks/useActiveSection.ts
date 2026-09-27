"use client";

import { useEffect, useState } from "react";

// Id of the last section whose top has passed the middle of the viewport;
// at the very bottom of the page the last id wins, since a short last
// section (the footer) never reaches the middle. Recomputed from positions
// on every scroll frame rather than from IntersectionObserver enter/leave
// events, so it can't get stuck on the bottom override when scrolling back up.
export const useActiveSection = (ids: readonly string[]): string | undefined => {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }
      const middle = window.innerHeight / 2;
      let current: string | undefined;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= middle) current = id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
};
