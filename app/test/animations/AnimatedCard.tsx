"use client";
import { Card } from "@radix-ui/themes";
import { animated, useChain, useSpring, useSpringRef } from "@react-spring/web";
import "./AnimatedCard.css";
import { MyComponent as Chain } from "./Chain";

export function CardComponent() {
  // const [defaultSpring, defaultApi] = useSpring(() => ({
  //   from: { width: "0%", x: 0, y: 0 },
  // }));

  const topRef = useSpringRef();
  const rightRef = useSpringRef();
  const bottomRef = useSpringRef();
  const leftRef = useSpringRef();

  // Define springs for each side of the box
  const topSpring = useSpring({
    loop: true,
    ref: topRef,
    from: { width: "0%" },
    to: { width: "100%" },
  });
  const rightSpring = useSpring({
    loop: true,
    ref: rightRef,
    from: { height: "0%" },
    to: { height: "100%" },
  });
  const bottomSpring = useSpring({
    loop: true,
    ref: bottomRef,
    from: { left: "0%", width: "100%" },
    to: async (next) => {
      // Move left to 100% while reducing width to 0%
      await next({ width: "0%", left: "100%" });
      // Reset to initial state instantly
      await next({ width: "100%", left: "0%" });
    },
  });
  const leftSpring = useSpring({
    loop: true,
    ref: leftRef,
    from: { bottom: "0%", height: "100%" },
    to: async (next) => {
      // Move bottom to 100% while reducing height to 0%
      await next({ height: "0%", bottom: "100%" });
      // Reset to initial state instantly
      await next({ height: "100%", bottom: "0%" });
    },
  });

  // Chain the animations
  useChain([topRef, rightRef, bottomRef, leftRef], [0, 0.2, 0.7, 1.2]);

  // useEffect(() => {
  //   defaultApi.start({
  //     loop: true,
  //     from: { width: "0%" },
  //     to: [
  //       { width: "100%", x: 300 },
  //       {
  //         width: "0%",
  //       },
  //     ],

  //     config: { duration: 6000 },
  //   });
  // }, [defaultApi]);

  // const [springs, api] = useSpring(() => ({
  //   from: {
  //     x: 0,
  //     y: 0,
  //   },
  //   to: {
  //     x: 300,
  //     y: 100,
  //   },
  //   config: { duration: 2000 },
  // }));

  // const handleMouseEnter = () => {
  //   api.start({
  //     to: [
  //       {
  //         x: 100,
  //         y: 100,
  //       },
  //       { config: { duration: 1000 } },
  //     ],
  //     config: { duration: 1000 },
  //   });
  // };

  // const handleMouseLeave = () => {
  //   api.set({});
  // };

  return (
    <>
      <div>
        <Card className="grid-background relative">
          <animated.div
            style={{
              ...topSpring,
              position: "absolute",
              top: 0,
              left: 0,
              height: "2px",
              backgroundColor: "indigo",
            }}
          />
          <animated.div
            style={{
              ...rightSpring,
              position: "absolute",
              top: 0,
              right: 0,
              width: "2px",
              backgroundColor: "indigo",
            }}
          />
          <animated.div
            style={{
              ...bottomSpring,
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "2px",
              backgroundColor: "indigo",
            }}
          />
          <animated.div
            style={{
              ...leftSpring,
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "2px",
              backgroundColor: "indigo",
            }}
          />
        </Card>
      </div>
      <div>
        <Chain />
      </div>
    </>
  );
}
