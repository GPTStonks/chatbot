'use client'
import { useChatbotDefaultTheme, ChatbotWebsocket } from "../chatbot";

export default function Home() {

  function handleApiResponseCode(statusCode: number) {
    console.log(`API response status code: ${statusCode}`);
  }

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
            'type': 'type',
            'data': 'result_data',
            'text': 'body'
          },
        }}
        themeConfig={useChatbotDefaultTheme}
        onApiResponseCode={handleApiResponseCode}
        errorRenderFunction={(error: string) => <div>{error}</div>}
      />

    </main >
  );
}
