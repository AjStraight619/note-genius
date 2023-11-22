"use client";
export default function MyComponent() {
  return (
    <div className="card-container">
      <Trail />
    </div>
  );
}

import { animated, useTrail } from "@react-spring/web";
import Trail from "./Trail";

function BasicTrail() {
  const items = ["Item 1", "Item 2", "Item 3"];
  const [trail, api] = useTrail(items.length, () => ({
    loop: true,
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    backgroundColor: "white",
  }));

  return (
    <div>
      {trail.map((style, index) => (
        <animated.div key={index} style={style}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
}
