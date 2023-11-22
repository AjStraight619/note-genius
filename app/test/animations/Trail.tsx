"use client";
import { animated, useTrail } from "@react-spring/web";

export default function Trail() {
  const trails = useTrail(2, {
    loop: true,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div>
      {trails.map((props, idx) => (
        <animated.div key={idx} style={props}>
          Hello World
        </animated.div>
      ))}
    </div>
  );
}
