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
import { Controller, useForm } from "react-hook-form";
import { LanguageSelector, SupportedLanguages } from "./LanguageSelector";

type StartConversationInputs = {
  TargetLanguage: SupportedLanguages;
  KnownLanguage: SupportedLanguages;
};

export function StartConversationDialog() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<StartConversationInputs>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit self-center mt-5">
          Start a new Conversation
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[300px]">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                render={({ field: { value, onBlur, onChange } }) => (
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
                render={({ field: { value, onBlur, onChange } }) => (
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
            <Button type="submit">Let's go</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
