import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { QwenChatData } from "../../../backend/functions/hf-chat.mts";
import { ConversationInputs } from "../../../types/types";
import { convertConversationResponse } from "../../lib/utils";

const useChat = () => {
  const mutation = useMutation({
    mutationFn: async (input: ConversationInputs) => {
      const response = await axios.post<QwenChatData["1"]>("/chat", input);

      const conversation = convertConversationResponse(response.data);
      return conversation;
    },

    retry: 1,
    onError(error) {
      console.error(error);
    },
  });

  return mutation;
};

export default useChat;
