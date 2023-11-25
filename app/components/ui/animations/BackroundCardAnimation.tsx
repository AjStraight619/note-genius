"use client";
import { Card } from "@radix-ui/themes";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

export const BackgroundCardAnimation = () => {
  const [animateBorderCard, setAnimateBorderCard] = useState(false);

  const randomNumToReverse = Math.floor(Math.random() * 10) + 1;
  console.log(randomNumToReverse);
  const [spring, springApi] = useSpring(() => ({
    from: {
      x: -22,
      y: 10,
      rotateZ: 0,
      width: 60,
    },
  }));

  const [spring2, springApi2] = useSpring(() => ({
    from: {
      x: -100,
      y: 360,
      rotateZ: 0,
      width: 40,
    },
  }));

  const [spring3, springApi3] = useSpring(() => ({
    from: {
      x: 600,
      y: 40,
      rotateZ: 0,
      width: 40,
    },
  }));

  useEffect(() => {
    const animate = () => {
      springApi.start({
        from: { x: -22, y: 20, rotateZ: 0, width: 40 },

        to: async (next) => {
          await next({
            x: 100,
            rotateZ: 0,
            config: { duration: 1000 },
          });
          await next({ rotateZ: 90, config: { duration: 50 } });
          await next({ y: 40, config: { duration: 200 } });
          await next({ rotateZ: 0, config: { duration: 50 } });
          await next({ x: 200, config: { duration: 800 } });
        },
        loop: true,
      });
    };

    const animate2 = () => {
      springApi2.start({
        from: {
          x: -50,
          y: 200,
          rotateZ: 0,
        },

        to: async (next) => {
          await next({ x: -20, rotateZ: 0, config: { duration: 400 } });
          await next({ rotateZ: -90, config: { duration: 50 } });
          await next({ y: 260, config: { duration: 500 } });
          await next({ rotateZ: 0, config: { duration: 50 } });
          await next({ x: 160, config: { duration: 1000 } });
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
          await next({ x: 160, config: { duration: 2000 } });
          await next({
            rotateZ: -90,
            config: { duration: 200 },
          });
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
    <>
      <div
        className="border-dotted rounded-xl"
        style={{
          height: "300px",
          width: "300px",
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
            height: "5px", // Increased height for a more pronounced rounded effect
            borderRadius: "2.5px", // Half of the height to make it fully round
            backgroundImage: `linear-gradient(to right, rgba(75, 0, 130, 0), rgba(75, 0, 130, 1), rgba(75, 0, 130, 0))`,
            zIndex: "30",
            ...spring,
          }}
        />

        <animated.div
          style={{
            height: "5px",
            borderRadius: "2.5px",
            backgroundImage: `linear-gradient(to right, rgba(75, 0, 130, 0), rgba(75, 0, 130, 1), rgba(75, 0, 130, 0))`,
            zIndex: "30",
            ...spring2,
          }}
        />

        <animated.div
          style={{
            height: "5px",
            borderRadius: "2.5px",
            backgroundImage: `linear-gradient(to right, rgba(75, 0, 130, 0), rgba(75, 0, 130, 1), rgba(75, 0, 130, 0))`,
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

            width: "220px",
            height: "220px",
            marginBottom: "10px",
          }}
        ></Card>
      </div>
    </>
  );
};
