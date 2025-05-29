export interface Model {
  id: number;
  name: string;
  capabilities: string[];
  isNew?: boolean;
  isPro?: boolean;
}

export const models: Model[] = [
  {
    id: 0,
    name: "GPT-4o Mini",

    capabilities: ["Vision processing", "Fast responses", "Code generation"],
  },
  {
    id: 1,
    name: "GPT-4.1 Mini",

    capabilities: [
      "Complex problem-solving",
      "Tool usage",
      "Advanced reasoning",
    ],
    isPro: true,
  },
  {
    id: 2,
    name: "Gemini 2.0 Flash",
    capabilities: [
      "Multimodal processing",
      "Fast inference",
      "Factual responses",
    ],
    isNew: true,
  },
];
