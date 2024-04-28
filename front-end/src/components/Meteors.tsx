import { FC } from "react";
import "./scss/meteors.scss";

type Props = { number?: number };

export const Meteors: FC<Props> = ({ number = 20 }) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((_el, idx) => (
        <span
          key={"meteor" + idx}
          className="meteor meteor-animation"
          style={{
            right: `${Math.floor(Math.random() * 200) - 100}vw`,
            top: `${Math.floor(Math.random() * 60)}vh`,
            animationDelay: `${Math.random() * 0.6 + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
          }}
        />
      ))}
    </>
  );
};
