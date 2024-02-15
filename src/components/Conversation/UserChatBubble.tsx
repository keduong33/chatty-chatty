import { ChatBubbleProps } from "./AiChatBubble";

function UserChatBubble({ text }: ChatBubbleProps) {
  return (
    text && (
      <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
        {text}
      </div>
    )
  );
}

export default UserChatBubble;
