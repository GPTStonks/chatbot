'use client'
import Chatbot from "@/components/chat/Chatbot";
import { useChatbotDefaultTheme, ChatbotWebsocket } from "../chatbot";
import ApiTextParser from "@/components/chat/ApiTextParser";
import MuiTable from "@/components/MuiTable";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24"

      style={{
        position: 'absolute',
        bottom: '0',
        height: '100vh',
        backgroundColor: '#080808'
      }}>
        <ChatbotWebsocket
          apiConfig={{
            isWebsocket: true,
            auth: false,
            tokenName: "userToken",
            fetchFunction: "",
            apiQueryEndpoint: "ws://localhost:8000/chatws",
            queryParams: {
              'type' : 'type',
              'data' : 'result_data',
              'text' : 'body'
            },
          }}
          themeConfig={useChatbotDefaultTheme}
          messageRenderFunction={(text: string) => <ApiTextParser text={text} />}
          dataRenderFunction={(data: any) => <MuiTable data={data[0]} />}
        />

    </main >
  );
}
