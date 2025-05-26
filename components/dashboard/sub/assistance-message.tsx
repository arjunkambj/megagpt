import { Card, CardBody } from "@heroui/card";

export default function AssistanceMessage({ message }: { message: string }) {
  return (
    <Card className="bg-transparent shadow-none">
      <CardBody className="flex w-auto px-0">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
      </CardBody>
    </Card>
  );
}
