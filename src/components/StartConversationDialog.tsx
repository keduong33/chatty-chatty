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

import { ConversationInputs, Topic } from "../../types/types";
import {
  initialConversation,
  useConversation,
} from "../lib/conversation.store";
import useChat from "./Conversation/useChat";
import { LanguageSelector } from "./LanguageSelector";
import { TopicSelector } from "./TopicSelector";

export function StartConversationDialog() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConversationInputs>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const chat = useChat();

  const startNewConversation = handleSubmit(
    ({ knownLanguage, targetLanguage, topic }) => {
      useConversation.setState({
        ...initialConversation,
        knownLanguage,
        targetLanguage,
      });
      if (topic === Topic.Anything || !topic) {
        setDialogOpen(false);
      } else {
        chat.mutate({
          knownLanguage,
          targetLanguage,
          userText: `Ask 1 question about ${topic}`,
          userHistory: [],
          aiHistory: [],
          startMessage: true,
        });
      }
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

          <div className="grid py-4">
            <div className="w-full space-y-1">
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
            <div className="w-full space-y-1">
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

            <div className="w-full space-y-1">
              <Label>Topic</Label>
              <Controller
                control={control}
                name="topic"
                render={({ field: { value, onChange } }) => (
                  <TopicSelector setTopic={onChange} selectedTopic={value} />
                )}
              />
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
