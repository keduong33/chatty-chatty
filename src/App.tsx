import Conversation from "./components/Conversation/Conversation";
import { StartConversationDialog } from "./components/StartConversationDialog";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="p-5 flex flex-col gap-5 max-w-[500px] mx-auto h-[calc(100vh-100px)]">
        <h1 className="text-xl font-bold text-center">
          Chatty Chatty to Learn Langy
        </h1>

        <StartConversationDialog />

        <Conversation />
      </main>
    </ThemeProvider>
  );
}

export default App;
