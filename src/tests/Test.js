import Chatbot from '@/components/chat/Chatbot';
import { useChatbotDefaultTheme } from './chatbot';

export const Test = () => {
  return (
    <Chatbot
      theme={useChatbotDefaultTheme}
      apiConfig={{
        apiQueryEndpoint: 'http://localhost:8000/ask/',
        queryParams: {
          query: '',
        },
      }}
    />
  );
};
export default Test;
