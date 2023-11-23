"use client";
import { Card } from "@radix-ui/themes";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

const Page = () => {
  const [animateBorderCard, setAnimateBorderCard] = useState(false);

  const randomNumToReverse = Math.floor(Math.random() * 10) + 1;
  console.log(randomNumToReverse);
  const [spring, springApi] = useSpring(() => ({
    from: {
      x: -22,
      y: 10,
      rotateZ: 0,
    },
  }));

  const [spring2, springApi2] = useSpring(() => ({
    from: {
      x: -100,
      y: 360,
      rotateZ: 0,
    },
  }));

  const [spring3, springApi3] = useSpring(() => ({
    from: {
      x: 600,
      y: 40,
      rotateZ: 0,
    },
  }));

  useEffect(() => {
    const animate = () => {
      springApi.start({
        from: { x: -22, y: 20, rotateZ: 0 },
        to: async (next) => {
          await next({ x: 100, rotateZ: 0, config: { duration: 1000 } });
          await next({ rotateZ: 90, config: { duration: 50 } });
          await next({ y: 78, config: { duration: 500 } });
          await next({ rotateZ: 0, config: { duration: 50 } });
          await next({ x: 200, config: { duration: 300 } });
        },
        loop: true,
      });
    };

    const animate2 = () => {
      springApi2.start({
        from: {
          x: -100,
          y: 360,
          rotateZ: 0,
        },

        to: async (next) => {
          await next({ x: 100, rotateZ: 0, config: { duration: 1000 } });
          await next({ rotateZ: -90, config: { duration: 50 } });
          await next({ y: 300, config: { duration: 100 } });
          await next({ rotateZ: 0, config: { duration: 50 } });
          await next({ x: 250, config: { duration: 500 } });
        },
        loop: true,
      });
    };

    const animate3 = () => {
      springApi3.start({
        from: {
          x: 600,
          y: 40,
          rotateZ: 0,
        },
        to: async (next) => {
          await next({ x: 260, config: { duration: 2000 } });
          await next({ rotateZ: 270, config: { duration: 400 } });
          await next({ y: 280, config: { duration: 2000 } });
        },
        loop: true,
      });
    };

    animate();
    animate2();
    animate3();
  }, [springApi, springApi2, springApi3]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div
        className="border-dotted rounded-md"
        style={{
          height: "380px",
          width: "500px",
          display: "flex",
          backgroundSize: "20px 20px",
          backgroundImage: `
          linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 0),
          linear-gradient(180deg, rgba(255,255,255,0.2) 1px, transparent 0)
        `,
          backgroundColor: "#000000",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <animated.div
          style={{
            width: "40px",
            height: "3px",
            backgroundImage: `linear-gradient(to right, rgba(0, 123, 255, 0), rgba(0, 123, 255, 1), rgba(0, 123, 255, 0))`,
            zIndex: "30",
            ...spring,
          }}
        />

        <animated.div
          style={{
            width: "40px",
            height: "3px",
            backgroundImage: `linear-gradient(to right, rgba(0, 123, 255, 0), rgba(0, 123, 255, 1), rgba(0, 123, 255, 0))`,
            zIndex: "30",
            ...spring2,
          }}
        />
        <animated.div
          style={{
            width: "40px",
            height: "3px",
            backgroundImage: `linear-gradient(to right, rgba(0, 123, 255, 0), rgba(0, 123, 255, 1), rgba(0, 123, 255, 0))`,
            zIndex: "30",
            ...spring3,
          }}
        />

        <Card
          style={{
            position: "absolute", // Absolute positioning
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the card
            backgroundColor: "#111111",
            width: "220px",
            height: "220px",
          }}
        >
          {/* Card content */}
        </Card>
      </div>
    </div>
  );
};

export default Page;
