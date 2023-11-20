// import { animated, useSpring } from "@react-spring/web";

// const DynamicBackgroundCard = ({ title, description }) => {
//   const [hoverStyle, setHoverStyle] = useSpring(() => ({
//     background: "linear-gradient(to right, #fff, #eee)",
//     config: { duration: 300 },
//     strokeDashoffset: 100,
//   }));

//   return (
//     <animated.div
//       onMouseEnter={() => setHoverStyle({
//         background: "linear-gradient(to right, #ddd, #ccc)",
//         strokeDashoffset: 0,
//       })}
//       onMouseLeave={() => setHoverStyle({
//         background: "linear-gradient(to right, #fff, #eee)",
//         strokeDashoffset: 100,
//       })}
//       style={hoverStyle}
//     >
//       <animated.svg style={{ position: 'absolute', left: 0, top: 0 }}>
//         <path
//           d="M10,50 L30,80 L50,20" // Your lightning path
//           stroke="yellow"
//           strokeWidth="2"
//           strokeDasharray="100"
//           style={{ strokeDashoffset: hoverStyle.strokeDashoffset }} // Assign interpolated value directly
//         />
//       </animated.svg>
//     </animated.div>
//   );
// };
