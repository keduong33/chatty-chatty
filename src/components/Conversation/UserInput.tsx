import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Mic, SendIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AudioRecorder } from "./AudioRecorder/AudioRecorder";

const audioRecorder = new AudioRecorder();

type ConversationInputs = {
  UserInput: string;
};

function UserInput() {
  const { handleSubmit, setValue, register } = useForm<ConversationInputs>();
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const sendSpeechToAi = useMutation({
    mutationFn: async (speech: string) => {
      return await axios.post<string>("/transcribe-speech", speech);
    },
    retry: 1,
    onSuccess(data) {
      setIsTranscribing(false);
      const text = data.data;
      setValue("UserInput", text.trim());
    },
    onError(error) {
      setIsTranscribing(false);
      console.error("Failed to transcribe", error);
    },
  });

  const stopRecording = async () => {
    setIsRecording(false);
    audioRecorder.stopRecording();
  };

  const startRecording = () => {
    audioRecorder.startRecording();
    setIsRecording(true);
  };

  const deleteRecording = () => {
    stopRecording();
  };

  const transcribeSpeech = async () => {
    setIsTranscribing(true);
    stopRecording();
    //wait for speech to be saved
    await new Promise((f) => setTimeout(f, 1000));
    const speech = await audioRecorder.getSpeech();
    if (speech) {
      console.log("transcribing", speech);
      sendSpeechToAi.mutate(speech);
    } else {
      console.error("No speech found");
    }
    return;
  };

  return (
    <form
      className={`flex w-full justify-between space-x-2 ${
        isTranscribing && "opacity-40 pointer-events-none"
      }`}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      {!isRecording ? (
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={startRecording}
        >
          <Mic className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={deleteRecording}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      {isRecording ? (
        <div className="flex h-10 w-full rounded-md border border-input bg-primary px-3 py-2 text-sm flex-1  items-center ring-offset-background ">
          Recording...
        </div>
      ) : (
        <Input
          {...register("UserInput")}
          placeholder={"Type or Speak"}
          className={`flex-1 `}
        />
      )}

      {!isRecording && (
        <Button type="submit" size="icon" variant="ghost">
          <SendIcon className="h-4 w-4 text-primary" />
        </Button>
      )}
      {isRecording && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={transcribeSpeech}
        >
          <Check className="h-4 w-4 text-primary" />
        </Button>
      )}
    </form>
  );
}

export default UserInput;
