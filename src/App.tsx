import { useState } from "react";
import { LanguageSelector } from "./components/LanguageSelector";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <LanguageSelector />
    </>
  );
}

export default App;
