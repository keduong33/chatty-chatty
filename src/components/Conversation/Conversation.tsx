import UserInput from "./UserInput";

function Conversation() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm  ">
      <div className="p-3 space-y-3 pb-6">
        {/* <AiChatBubble
          text={"Hello Are you hungry, I have so much food right now"}
        />
        <UserChatBubble
          text={
            "Hi I am so hungry I wanna eat something nice do you have anything nice?"
          }
        /> */}
      </div>

      <div className="flex items-center pb-4 px-2">
        <UserInput />
      </div>
    </div>
  );
}

export default Conversation;
