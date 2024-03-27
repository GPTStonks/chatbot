'use client'
import Chatbot from "@/components/chat/Chatbot";
import { useChatbotDefaultTheme } from "./chatbot";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">

      <div style={{
        position: 'absolute',
        bottom: '0',
        height: '100vh',

      }}>
        <Chatbot
          apiConfig={{
            apiQueryEndpoint: "http://localhost:8000/process_query_async",
            queryParams: {},
          }}
          themeConfig={useChatbotDefaultTheme}
        />
      </div>

    </main >
  );
}
