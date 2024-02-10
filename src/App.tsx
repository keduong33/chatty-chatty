import { StartConversationDialog } from "./components/StartConversationDialog";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="p-5 flex flex-col">
        <h1 className="text-xl font-bold text-center">
          Chatty Chatty to Learn Langy
        </h1>

        <StartConversationDialog />
      </main>
    </ThemeProvider>
  );
}

export default App;
