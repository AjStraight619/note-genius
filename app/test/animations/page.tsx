"use client";
import { animated, useSpring } from "@react-spring/web";

export default function MyComponent() {
  // Define the spring for the animating lines
  const [lineProps, setLineProps] = useSpring(() => ({
    from: { x1: -100, x2: 100 },
    to: async (next, cancel) => {
      await next({ x1: 100, x2: -100 });
      await next({ x1: -100, x2: 100 });
    },
    config: { duration: 2000 },
    loop: true,
  }));

  // Background grid style
  const gridStyle = {
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 49px, #e5e7eb 50px),
      repeating-linear-gradient(-90deg, transparent, transparent 49px, #e5e7eb 50px)
    `,
  };

  return (
    <div className="h-screen" style={gridStyle}>
      <div className="grid grid-cols-3 gap-4 place-items-center h-full">
        {/* Your cards go here */}
      </div>
      <animated.div
        className="absolute top-0"
        style={{
          height: "2px",
          background: "blue",
          width: "100%",
          transform: lineProps.x1.to((x1) => `translateX(${x1}%)`),
        }}
      />
      <animated.div
        className="absolute top-0"
        style={{
          height: "2px",
          background: "blue",
          width: "100%",
          transform: lineProps.x2.to((x2) => `translateX(${x2}%)`),
        }}
      />
    </div>
  );
}
