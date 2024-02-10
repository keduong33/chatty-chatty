import { useState } from "react";
import { css } from "../styled-system/css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        className={css({ fontSize: "2xl", fontWeight: "bold", color: "red" })}
      >
        Hello, Panda is installed!
      </div>
    </>
  );
}

export default App;
