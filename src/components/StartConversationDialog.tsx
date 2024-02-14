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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { ConversationData } from "../../types/types";
import { useConversation } from "../lib/conversation.store";
import { convertConversationResponse } from "../lib/utils";
import { LanguageSelector } from "./LanguageSelector";

const initialTextTemplate = "Hello, how are you doing?";

export function StartConversationDialog() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConversationData>();

  const mutation = useMutation({
    mutationFn: async (input: ConversationData) =>
      await axios.post<ConversationData["ChatHistory"]>("/chat", input),

    onSuccess(response) {
      const conversation = convertConversationResponse(response.data);
      useConversation.setState({ ...conversation });
    },
    retry: 1,
    onError(error) {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit(({ KnownLanguage, TargetLanguage }) => {
    mutation.mutate({
      KnownLanguage,
      TargetLanguage,
      UserText: initialTextTemplate,
      ChatHistory: undefined,
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit self-center">Start a new Conversation</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[300px]">
        <form onSubmit={onSubmit}>
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
                name="KnownLanguage"
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
                  !errors.KnownLanguage
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
                name="TargetLanguage"
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
                  !errors.TargetLanguage
                    ? "text-transparent"
                    : "text-destructive"
                }`}
              >
                Please pick a language
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" isLoading={mutation.isPending}>
              Let's go
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
