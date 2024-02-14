import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ConversationInputs } from "../../types/types";
import {
  initialConversation,
  useConversation,
} from "../lib/conversation.store";
import useChat from "./Conversation/useChat";
import { LanguageSelector } from "./LanguageSelector";

const initialTextTemplate = "Hello, how are you doing?";

export function StartConversationDialog() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConversationInputs>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const chat = useChat();

  const startNewConversation = handleSubmit(
    ({ knownLanguage, targetLanguage }) => {
      useConversation.setState({
        ...initialConversation,
        knownLanguage,
        targetLanguage,
      });

      chat.mutate({
        knownLanguage,
        targetLanguage,
        userText: initialTextTemplate,
        userHistory: [],
        aiHistory: [],
      });
    }
  );

  useEffect(() => {
    if (chat.status == "success") {
      const chatHistory = chat.data;
      setDialogOpen(false);
      useConversation.setState({
        userHistory: chatHistory.userHistory,
        aiHistory: chatHistory.aiHistory,
      });
    }
  }, [chat.status]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit self-center">Start a new Conversation</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[300px]">
        <form onSubmit={startNewConversation}>
          <DialogHeader>
            <DialogTitle>Let's Chatty Chatty</DialogTitle>
            <DialogDescription>
              Please let us prepare for your conversation
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="w-full">
              <Label>Language You Know</Label>
              <Controller
                control={control}
                name="knownLanguage"
                render={({ field: { value, onChange } }) => (
                  <LanguageSelector
                    setSelectedLanguage={onChange}
                    selectedLanguage={value}
                  />
                )}
                rules={{
                  required: true,
                }}
              />
              <p
                className={`${
                  !errors.knownLanguage
                    ? "text-transparent"
                    : "text-destructive"
                }`}
              >
                Please pick a language
              </p>
            </div>
            <div className="w-full">
              <Label>Language to Learn</Label>
              <Controller
                control={control}
                name="targetLanguage"
                render={({ field: { value, onChange } }) => (
                  <LanguageSelector
                    setSelectedLanguage={onChange}
                    selectedLanguage={value}
                  />
                )}
                rules={{
                  required: true,
                }}
              />
              <p
                className={`${
                  !errors.targetLanguage
                    ? "text-transparent"
                    : "text-destructive"
                }`}
              >
                Please pick a language
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" isLoading={chat.isPending}>
              Let's go
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
