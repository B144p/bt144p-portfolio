"use client";

import { CSSProperties, FC, useState, useSyncExternalStore } from "react";
import "./scss/meteors.scss";

type Props = { number?: number };

const randomMeteorStyle = (): CSSProperties => ({
  right: `${Math.floor(Math.random() * 200) - 100}vw`,
  top: `${Math.floor(Math.random() * 60)}vh`,
  animationDelay: `${Math.random() * 0.6 + 0.2}s`,
  animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
});

const MeteorField: FC<{ count: number }> = ({ count }) => {
  const [styles] = useState(() => Array.from({ length: count }, randomMeteorStyle));
  return (
    <>
      {styles.map((style, idx) => (
        <span key={"meteor" + idx} className="meteor meteor-animation" style={style} />
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
