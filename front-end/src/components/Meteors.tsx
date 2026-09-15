import { CSSProperties, FC, useEffect, useState } from "react";
import "./scss/meteors.scss";

type Props = { number?: number };

const randomMeteorStyle = (): CSSProperties => ({
  right: `${Math.floor(Math.random() * 200) - 100}vw`,
  top: `${Math.floor(Math.random() * 60)}vh`,
  animationDelay: `${Math.random() * 0.6 + 0.2}s`,
  animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
});

export const Meteors: FC<Props> = ({ number = 20 }) => {
  // Randomized after mount: random values generated during render would
  // never match between the server's HTML and the browser's hydration.
  const [styles, setStyles] = useState<CSSProperties[]>([]);

  useEffect(() => {
    setStyles(Array.from({ length: number || 20 }, randomMeteorStyle));
  }, [number]);

  return (
    <>
      {styles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className="meteor meteor-animation"
          style={style}
        />
      ))}
    </>
  );
};
