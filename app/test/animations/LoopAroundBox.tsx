"use client";
import { Card } from "@radix-ui/themes";
import { animated, useTrail } from "@react-spring/web";
import "./AnimatedCard.css";

export default function CardComponent2() {
  // Define the trail animation for each line
  const [trails] = useTrail(4, () => ({
    loop: true,
    from: { transform: "scaleX(0)", transformOrigin: "left" },
    to: { transform: "scaleX(1)" },
    backgroundColor: "indigo",
    config: { duration: 1000 },
  }));

  // Render each line with the appropriate styles
  const lines = trails.map((style, index) => (
    <animated.div key={index} style={{ ...style, ...getLineStyle(index) }} />
  ));

  return (
    <div className="card-container">
      <Card className="grid-background relative">{lines}</Card>
    </div>
  );
}

// Determine the style for each line based on its index
function getLineStyle(index: any) {
  const baseStyle = {
    position: "absolute",
    backgroundColor: "indigo",
  };
  switch (index) {
    case 0: // Top line
      return { ...baseStyle, top: 0, left: 0, right: 0, height: "2px" };
    case 1: // Right line
      return {
        ...baseStyle,
        top: 0,
        right: 0,
        bottom: 0,
        width: "2px",
        transformOrigin: "top",
      };
    case 2: // Bottom line
      return {
        ...baseStyle,
        bottom: 0,
        left: 0,
        right: 0,
        height: "2px",
        transformOrigin: "right",
      };
    case 3: // Left line
      return {
        ...baseStyle,
        top: 0,
        left: 0,
        bottom: 0,
        width: "2px",
        transformOrigin: "bottom",
      };
    default:
      return {};
  }
}
