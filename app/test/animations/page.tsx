"use client";
import { animated, useSpring } from "@react-spring/web";

export default function MyComponent() {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    []
  );

  return <animated.div style={props}>Hello World</animated.div>;
}
