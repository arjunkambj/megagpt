# AI Chat App Setup Guide

This is a complete AI chat application built with Next.js, Convex, and the Vercel AI SDK.

## Features

- ✅ Real-time AI chat with OpenAI GPT-4o-mini
- ✅ Message history persistence
- ✅ Chat management (create, delete, view history)
- ✅ User authentication with Convex Auth
- ✅ Responsive UI with HeroUI components
- ✅ Sidebar with chat history
- ✅ Streaming responses
- ✅ Auto-generated chat titles

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url_here

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Auth (if using Convex Auth)
AUTH_SECRET=your_auth_secret_here
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set up Convex

```bash
# Initialize Convex (if not already done)
npx convex dev

# Push schema to Convex
npx convex deploy
```

### 4. Run the Development Server

```bash
pnpm dev
```

## Project Structure

### Database Schema (`convex/schema.ts`)

- `users` - User authentication data
- `chats` - Chat sessions with titles and metadata
- `messages` - Individual messages in chats

### API Routes

- `/api/chat` - Main chat endpoint for streaming AI responses

### Key Components

- `Chat.tsx` - Main chat interface
- `PromptInput.tsx` - Message input component
- `ChatHistory.tsx` - Sidebar chat history
- `UserMessage.tsx` / `AssistanceMessage.tsx` - Message display components

### Convex Functions

- `chat.ts` - Chat CRUD operations
- `message.ts` - Message CRUD operations
- `user.ts` - User management

## How It Works

1. **New Chat**: User starts from dashboard (`/chat`) and creates a new chat
2. **Message Flow**:
   - User types message → saved to database
   - Sent to OpenAI API → streaming response
   - AI response → saved to database
3. **History**: All messages persist and load when revisiting chats
4. **Chat Management**: Users can view, delete, and navigate between chats

## Usage

1. Navigate to `/chat` to start a new conversation
2. Type your message and press Enter
3. View chat history in the sidebar
4. Click on any previous chat to continue the conversation
5. Use the menu (three dots) to delete chats

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: HeroUI, Tailwind CSS
- **Backend**: Convex (database + real-time)
- **AI**: Vercel AI SDK + OpenAI
- **Auth**: Convex Auth
- **State**: Jotai (for sidebar state)

The app is now fully functional with complete chat history, message persistence, and a polished user interface!
