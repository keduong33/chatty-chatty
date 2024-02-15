import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  ConversationHistoryResponse,
  ConversationInputs,
} from "../../../types/types";
import { convertConversationResponse } from "../../lib/utils";

const useChat = () => {
  const mutation = useMutation({
    mutationFn: async (input: ConversationInputs) => {
      const response = await axios.post<ConversationHistoryResponse>(
        "/openai-chat",
        input
      );

      const conversation = convertConversationResponse(response.data);
      return conversation;
    },

    retry: 1,
    onError(e) {
      const error = e as AxiosError;
      switch (error.code) {
        case "429":
          console.warn("Rate limit reached", error.message);
          return;
        default:
          console.warn("Something went wrong", error.message);
      }
    },
  });

  return mutation;
};

export default useChat;
