// Chat configuration
export const CHAT_CONFIG = {
  MAX_TITLE_LENGTH: 50,
  DEFAULT_CHAT_TITLE: "New Chat",
} as const;

// UI configuration
export const UI_CONFIG = {
  MAX_MESSAGE_ROWS: 16,
  MIN_MESSAGE_ROWS: 2,
  LOADING_MESSAGES: {
    CHAT: "Loading chat...",
    AI_THINKING: "MegaGPT is thinking...",
    CHATS: "Loading chats...",
    MESSAGES: "Loading chat...",
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  CHAT_ID_REQUIRED: "Chat ID is required",
  USER_ID_REQUIRED: "User ID is required",
  EMPTY_MESSAGE: "Message content cannot be empty",
  EMPTY_TITLE: "Chat title cannot be empty",
  CHAT_NOT_FOUND: "Chat not found",
  INTERNAL_ERROR: "Internal server error",
} as const;
