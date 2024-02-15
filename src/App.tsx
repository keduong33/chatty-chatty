import Conversation from "./components/Conversation/Conversation";
import { StartConversationDialog } from "./components/StartConversationDialog";
import { ThemeProvider } from "./components/theme-provider";
import { badgeVariants } from "./components/ui/badge";
import { cn } from "./lib/utils";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="p-5 flex flex-col gap-5 max-w-[500px] mx-auto h-[calc(100vh-60px)]">
        <div className="flex flex-col">
          <a
            className={cn([
              badgeVariants({ variant: "secondary" }),
              "self-end px-5 py-2",
            ])}
            href="https://forms.gle/yzxQHbvBZbuxm3w39"
            target="_blank"
          >
            Feedback
          </a>
          <h1 className="text-xl font-bold text-center">
            Chatty Chatty to Learn Langy
          </h1>

          <a href="https://ke-duong.com/" target="_blank">
            <h2 className="text-sm text-center pt-2 underline underline-offset-1">
              by Ke (David) Duong
            </h2>
          </a>
        </div>

        <StartConversationDialog />

        <Conversation />
      </main>
    </ThemeProvider>
  );
}

export default App;
