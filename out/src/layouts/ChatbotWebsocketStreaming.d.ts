import { ChatbotProps } from '@/types/chatbot';
import React from 'react';
declare const ChatbotWebsocketStreaming: React.ForwardRefExoticComponent<
  ChatbotProps &
    React.RefAttributes<{
      handleSendCustomMessage: (message: string) => void;
    }>
>;
export default ChatbotWebsocketStreaming;
