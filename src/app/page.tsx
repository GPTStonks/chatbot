import Chatbot from "@/components/chat/Chatbot";
import { useChatbotDefaultTheme } from "./chatbot";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div style={{
        position: 'absolute',
        bottom: '0',
      }}>
        <Chatbot
          apiConfig={{
            apiQueryEndpoint: "http://localhost:8000/ask/",
            queryParams: {
              query: "",
            },
          }}
          themeConfig={useChatbotDefaultTheme}
        />
      </div>

    </main >
  );
}
