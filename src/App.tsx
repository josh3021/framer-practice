import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, rgb(250, 133, 30), rgb(132, 61, 163));
`;

const Grid = styled.div`
  width: 50vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 8px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  font-size: 3rem;
  font-weight: bold;
  color: #2e2e2e;
`;

const Button = styled(motion.button)`
  width: 100px;
  height: 40px;
  margin-top: 20px;
  background-color: "white";
  border: none;
  border-radius: 5px;
  font-size: 20px;
  background-color: #0abde3;
  color: white;
  box-shadow: 0 8px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: #59e31a;
    cursor: pointer;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlayVariants: Variants = {
  initial: { background: "rgba(0, 0, 0, 0)" },
  animate: { background: "rgba(0, 0, 0, 0.7)" },
  exit: { background: "rgba(0, 0, 0, 0)" },
};

const boxVariants: Variants = {
  hover: (id: number) => {
    switch (id) {
      case 1:
        return {
          scale: 1.1,
          originX: 1,
          originY: 1,
        };
      case 2:
        return {
          scale: 1.1,
          originX: -0.1,
          originY: 1,
          transition: {
            type: "just",
          },
        };
      case 3:
        return {
          scale: 1.1,
          originX: 1,
          originY: -0.1,
          transition: {
            type: "just",
          },
        };
      case 4:
        return {
          scale: 1.1,
          originX: -0.1,
          originY: -0.1,
          transition: {
            type: "just",
          },
        };
      default:
        return {};
    }
  },
};

function App() {
  const [id, setId] = useState<number | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [btnId, setBtnId] = useState(2);
  const handleSwitchClick = () => {
    setBtnId((prev) => (prev === 2 ? 3 : 2));
  };
  return (
    <Wrapper>
      <Grid>
        <AnimatePresence custom={id}>
          {[1, 2, 3, 4].map((v) => (
            <Box
              custom={hoverId}
              variants={boxVariants}
              whileHover="hover"
              // whileHover={{ scale: 1.1, x: 0 }}
              layoutId={v.toString()}
              key={v}
              onClick={() => setId(v)}
              onHoverStart={() => setHoverId(v)}
              onHoverEnd={() => setHoverId(null)}
              // style={{ originX: "100px" }}
              // layout={"size"}
            >
              {v === btnId && (
                <motion.div
                  style={{
                    backgroundColor: "white",
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    borderRadius: "20px",
                  }}
                  layoutId={`btn`}
                ></motion.div>
              )}
              {v === btnId && (
                <motion.div
                  style={{
                    backgroundColor: "white",
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    borderRadius: "20px",
                  }}
                  layoutId={`btn`}
                ></motion.div>
              )}
            </Box>
          ))}
        </AnimatePresence>
      </Grid>
      <Button onClick={handleSwitchClick}>Switch</Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Box layoutId={id.toString()} style={{ width: 400, height: 200 }}>
              {id}
            </Box>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
