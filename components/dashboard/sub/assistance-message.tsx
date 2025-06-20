import { Markdown } from "./markdown";

export default function AssiantaceMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col max-w-3xl gap-2">
      <Markdown>{message}</Markdown>
    </div>
  );
}
