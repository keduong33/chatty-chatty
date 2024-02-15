import { useConversation } from "../../lib/conversation.store";
import AiChatBubble from "./AiChatBubble";
import UserChatBubble from "./UserChatBubble";
import UserInput from "./UserInput";

function Conversation() {
  const [userHistory, aiHistory] = useConversation((state) => [
    state.userHistory,
    state.aiHistory,
  ]);

  const aiFirst = userHistory.length < aiHistory.length;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col justify-between">
      <div className="p-3 space-y-3 pb-6 overflow-y-auto">
        {aiFirst ? (
          <>
            {aiHistory.map((text, i) => (
              <>
                <AiChatBubble text={text} key={`ai #${i}`} />
                <UserChatBubble text={userHistory[i]} key={`user #${i}`} />
              </>
            ))}
          </>
        ) : (
          <>
            {userHistory.map((text, i) => (
              <>
                <UserChatBubble text={text} key={`user #${i}`} />
                <AiChatBubble text={aiHistory[i]} key={`ai #${i}`} />
              </>
            ))}
          </>
        )}
      </div>

      <div className="flex items-center pb-4 px-2">
        <UserInput />
      </div>
    </div>
  );
}

export default Conversation;
