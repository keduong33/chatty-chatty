import { useState } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <LanguageSelector />
      <Button>Test</Button>
    </ThemeProvider>
  );
}

export default App;
