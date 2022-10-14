import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 500vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;

const Box = styled(motion.div)`
  display: grid;
  width: 200px;
  height: 200px;
  grid-template-columns: repeat(2, 1fr);
  background-color: plum;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled(motion.div)`
  width: 800px;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #ef6151, #402ba9);
  border-radius: 30px;
  /* overflow: hidden; */
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 35px;
  place-self: center;
`;

const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 10px;
`;

const boxVariants: Variants = {
  start: {
    scale: 0.5,
    opacity: 0,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 4,
      bounce: 0.5,
      delayChildren: 1,
      staggerChildren: 1,
    },
  },
};

const circleVariants: Variants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const gestureBoxVariants: Variants = {
  hover: { scale: 1.5, rotateZ: 90 },
  // tap: { borderRadius: "100px" },
  drag: {
    backgroundColor: "rgba(230, 126, 34,1.0)",
    transition: { duration: 10 },
  },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZ = useTransform(
    x,
    [-300, 300],
    [
      "linear-gradient(-45deg, #ef6151, #402ba9)",
      "linear-gradient(-45deg, #402ba9, #ef6151)",
    ]
  );
  const { scrollYProgress } = useScroll();

  // useEffect(() => {
  //   scale.onChange((sub) => {
  //     console.log(sub);
  //   });
  // }, [scale]);
  // useEffect(() => {
  //   x.onChange((subscription) => {
  //     console.log(`x: ${subscription}`);
  //   });
  // }, [x]);
  // useEffect(() => {
  //   y.onChange((subscription) => {
  //     console.log(`y: ${subscription}`);
  //   });
  // }, [y]);
  return (
    <Wrapper>
      <ProgressBar style={{ scaleX: scrollYProgress }}></ProgressBar>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
      <BiggerBox ref={biggerBoxRef} style={{ background: rotateZ }}>
        <Box
          drag="x"
          // dragSnapToOrigin
          dragElastic={0}
          dragConstraints={biggerBoxRef}
          variants={gestureBoxVariants}
          // whileHover="hover"
          whileTap="tap"
          whileDrag="drag"
          style={{ x }}
        />
      </BiggerBox>
      <button
        onClick={() => {
          x.set(0);
          y.set(0);
        }}
      >
        Click
      </button>
    </Wrapper>
  );
}

export default App;
