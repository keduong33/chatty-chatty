import { useState } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Button>Test</Button>
    </ThemeProvider>
  );
}

export default App;
