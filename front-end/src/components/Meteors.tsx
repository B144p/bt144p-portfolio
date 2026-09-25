"use client";

import { CSSProperties, FC, useState, useSyncExternalStore } from "react";

const METEOR_CLASSNAME =
  "fixed aspect-square rounded-full bg-slate-500 -translate-x-1/2 -translate-y-1/2 rotate-[270deg] animate-meteor " +
  "before:content-[''] before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-linear-to-r before:from-slate-500 before:to-transparent";

type Props = { number?: number };

const randomMeteorStyle = (): CSSProperties => ({
  right: `${Math.floor(Math.random() * 200) - 100}vw`,
  top: `${Math.floor(Math.random() * 60)}vh`,
  animationDelay: `${Math.random() * 0.6 + 0.2}s`,
  animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
  // rotate steers the fall direction (see meteors.scss's ::before trail +
  // the `meteor` keyframe's translateX — rotating the element also rotates
  // the axis translateX moves along). 270deg is straight down; each meteor
  // leans 0-14deg past that, same direction, like rain caught by a steady
  // crosswind rather than falling perfectly straight.
  rotate: `${270 + Math.random() * 14}deg`,
});

const MeteorField: FC<{ count: number }> = ({ count }) => {
  const [styles] = useState(() => Array.from({ length: count }, randomMeteorStyle));
  return (
    <>
      {styles.map((style, idx) => (
        <span key={"meteor" + idx} className={METEOR_CLASSNAME} style={style} />
      ))}
    </>
  );
};

const subscribeNever = () => () => {};

export const Meteors: FC<Props> = ({ number = 20 }) => {
  // Random positions can't match between the server's HTML and hydration,
  // so the field only renders once mounted in the browser.
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const count = number || 20;
  return mounted ? <MeteorField key={count} count={count} /> : null;
};
