import ChatHistory from "./sub/ChatHistory";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <ChatHistory />
    </div>
  );
}
