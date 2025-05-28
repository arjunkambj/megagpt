"use client";

import type { Components } from "react-markdown";

import { Card, CardBody } from "@heroui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { memo, useState } from "react";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";

// Memoized ReactMarkdown component for better performance
const MemoizedReactMarkdown = memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

export default function AssistanceMessage({ message }: { message: string }) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy text: ", err);
    }
  };

  const components: Components = {
    // Custom heading components - matching app's clean typography
    h1: ({ children, ...props }) => (
      <h1
        className="text-2xl font-semibold mt-4 mb-3 text-foreground"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-xl font-semibold mt-4 mb-2 text-foreground"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-lg font-medium mt-3 mb-2 text-foreground" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-base font-medium mt-3 mb-2 text-foreground"
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className="text-sm font-medium mt-2 mb-1 text-foreground" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 className="text-sm font-medium mt-2 mb-1 text-default-600" {...props}>
        {children}
      </h6>
    ),
    // Custom paragraph component - matching app's text styling
    p: ({ children, ...props }) => (
      <p className="mb-3 leading-relaxed text-foreground" {...props}>
        {children}
      </p>
    ),
    // Custom list components - clean and minimal
    ul: ({ children, ...props }) => (
      <ul
        className="list-disc list-inside mb-3 space-y-1 text-foreground ml-4"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="list-decimal list-inside mb-3 space-y-1 text-foreground ml-4"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    // Custom blockquote component - matching app's subtle styling
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-3 border-default-300 pl-4 my-3 text-default-600 bg-default-50 py-2 rounded-r-lg"
        {...props}
      >
        {children}
      </blockquote>
    ),
    // Custom code components - matching app's clean code styling
    code: ({ children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;

      if (isInline) {
        return (
          <code
            className="bg-default-200/60 text-default-900 px-2 py-1 rounded-md text-sm font-mono border border-default-300/50"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => {
      const codeId = Math.random().toString(36).substr(2, 9);
      const codeText =
        typeof children === "string"
          ? children
          : (children as any)?.props?.children || "";
      const isCopied = copiedStates[codeId];

      return (
        <div className="relative my-3 group">
          <pre
            className="bg-[#1a1a1a] text-[#e6edf3] p-4 rounded-lg overflow-x-auto border border-[#1a1a1a] font-mono text-sm leading-relaxed"
            {...props}
          >
            {children}
          </pre>
          {/* Copy button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#e6edf3] p-2 rounded-md border border-[#3a3a3a] transition-all duration-200 flex items-center gap-1.5 text-xs font-medium"
              onClick={() => copyToClipboard(codeText, codeId)}
            >
              {isCopied ? (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      );
    },
    // Custom table components - clean and minimal
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-3">
        <table
          className="min-w-full border-collapse border border-default-200 rounded-lg"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-default-100" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-default-200 px-3 py-2 text-left font-medium text-foreground"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border border-default-200 px-3 py-2 text-foreground"
        {...props}
      >
        {children}
      </td>
    ),
    // Custom link component - matching app's link styling
    a: ({ children, href, ...props }) => (
      <a
        className="text-primary hover:text-primary-600 underline underline-offset-2"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    ),
    // Custom strong and em components
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-default-600" {...props}>
        {children}
      </em>
    ),
    // Custom horizontal rule - minimal and clean
    hr: ({ ...props }) => <hr className="my-4 border-default-200" {...props} />,
  };

  return (
    <Card className="bg-transparent shadow-none">
      <CardBody className="flex w-auto px-0">
        <div className="prose-sm max-w-none">
          <MemoizedReactMarkdown
            components={components}
            rehypePlugins={[
              rehypeKatex,
              [rehypeHighlight, { ignoreMissing: true }],
              rehypeRaw,
            ]}
            remarkPlugins={[remarkGfm, remarkMath]}
          >
            {message}
          </MemoizedReactMarkdown>
        </div>
      </CardBody>
    </Card>
  );
}
