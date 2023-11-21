import { Card } from "@radix-ui/themes";
import { animated, useSpring } from "@react-spring/web";
import "./AnimatedCard.css";

export function CardComponent() {
  // Define the animation for the blue lines
  const animatedStyle = useSpring({
    loop: true,
    to: [{ boxShadow: "0 0 10px 3px blue" }, { boxShadow: "0 0 0 3px blue" }],
    from: { boxShadow: "0 0 0 3px blue" },
    config: { duration: 2000 },
  });

  return (
    <Card>
      <animated.div
        className="grid-background"
        style={animatedStyle}
      ></animated.div>
    </Card>
  );
}
