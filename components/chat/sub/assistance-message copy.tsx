import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";
import "prism-themes/themes/prism-vsc-dark-plus.css"; // VS Code Dark+ theme
import remarkGfm from "remark-gfm";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

export default function AssistanceMessage({ message }: { message: string }) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy code:", err);
    }
  };

  const CodeBlock = ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const language = match ? match[1] : "";
    const codeString = String(children).replace(/\n$/, "");

    return (
      <div className="relative group">
        <Button
          isIconOnly
          className="absolute top-2 right-2  z-10"
          size="sm"
          title="Copy code"
          onPress={() => {
            copyToClipboard(codeString);
            addToast({
              title: "Code copied to clipboard",
              color: "success",
            });
          }}
        >
          {copiedCode === codeString ? (
            <Icon icon="solar:copy-line-duotone" />
          ) : (
            <Icon icon="solar:copy-line-duotone" />
          )}
        </Button>
        <pre className={className} {...props}>
          <code className={className}>{children}</code>
        </pre>
      </div>
    );
  };

  const InlineCode = ({ children, ...props }: any) => (
    <code
      className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  );

  return (
    <div className="flex overflow-x-hidden flex-col gap-2">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl  font-bold mt-6 mb-4 border-b border-gray-700 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl text-black font-semibold  mt-5 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg text-black font-medium  mt-4 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base  text-black font-medium  mt-3 mb-2">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm text-black font-medium mt-2 mb-1">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs text-black font-medium mt-2 mb-1">
              {children}
            </h6>
          ),
          pre: CodeBlock,
          code: ({ inline, ...props }: any) =>
            inline ? <InlineCode {...props} /> : <code {...props} />,
          p: ({ children }) => (
            <p className="leading-relaxed mb-3 text-lg">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside  mb-3 space-y-3">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside  mb-3 space-y-3">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2  italic mb-3">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border border-gray-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-700 px-3 py-2 bg-gray-800 text-gray-200 font-semibold text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-700 px-3 py-2 text-gray-300">
              {children}
            </td>
          ),
        }}
        rehypePlugins={[rehypePrism]}
        remarkPlugins={[remarkGfm]}
      >
        {message}
      </ReactMarkdown>
    </div>
  );
}
