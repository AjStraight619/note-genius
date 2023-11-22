import { Card, Flex } from "@radix-ui/themes";
import { animated, useSpring } from "@react-spring/web";
import "./AnimatedCard.css";
import { MyComponent as Chain } from "./Chain";

export function CardComponent() {
  // Define the animation for the blue lines
  const animatedStyle = useSpring({
    loop: true,
    to: [{ boxShadow: "0 0 10px 3px blue" }, { boxShadow: "0 0 0 3px blue" }],
    from: { boxShadow: "0 0 0 3px blue" },
    config: { duration: 2000 },
  });

  const [springs, api] = useSpring(() => ({
    loop: true,
    from: {
      x: 0,
      y: 100,
    },
    to: {
      x: 300,
      y: 100,
    },
    config: { duration: 2000 },
  }));

  const handleMouseEnter = () => {
    api.start({
      from: {
        x: 0,
        y: 100,
      },
      to: [
        {
          x: 100,
          y: 100,
        },
        { config: { duration: 1000 } },
        { x: 100, y: 200 },
      ],
      config: { duration: 1000 },
    });
  };

  const handleMouseLeave = () => {
    api.start({
      from: {
        x: 0,
        y: 0,
      },
    });
  };

  return (
    <Flex gap={"5"}>
      <div>
        <Card>
          <animated.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="grid-background"
            style={animatedStyle}
          >
            <animated.line
              style={{
                height: "1px",
                backgroundColor: "blue",
                width: "20px",

                ...springs,
              }}
            ></animated.line>
          </animated.div>
        </Card>
      </div>
      <div>
        <Chain />
      </div>
    </Flex>
  );
}
