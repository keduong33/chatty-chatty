import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="p-5 flex flex-col">
        <h1 className="text-xl font-bold text-center">
          Chatty Chatty to Learn Langy
        </h1>

        <Button className="w-fit self-center mt-5">
          Start a new conversation
        </Button>
      </main>
    </ThemeProvider>
  );
}

export default App;
