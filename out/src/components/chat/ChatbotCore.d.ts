import { APIConfig, ThemeConfig } from '@/types/chatbot';
import { Message } from '@/types/message';
import React from 'react';
declare const ChatbotCore: ({
  messages,
  themeConfig,
  apiConfig,
  isMobile,
  botUser,
  humanUser,
  botMessage,
  messagesEndRef,
  isAnyMessageLoading,
  showLinearLoader,
  sendCustomMessage,
  welcomeMessageRenderFunction,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  providerRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  subqueryRenderFunction,
}: {
  messages: Message[];
  themeConfig: ThemeConfig;
  isMobile: boolean;
  apiConfig: APIConfig;
  botUser: string;
  humanUser: string;
  botMessage: any;
  messagesEndRef: any;
  isAnyMessageLoading: boolean;
  showLinearLoader: boolean;
  setDataForParent?: ((data: any) => void) | undefined;
  onApiResponseCode?: ((bool: boolean) => void) | undefined;
  multimodeRenderFunction?: ((modes: string[]) => JSX.Element) | undefined;
  errorRenderFunction?: ((error: any) => JSX.Element) | undefined;
  sendCustomMessage: (message: string) => void;
  welcomeMessageRenderFunction: (
    sendCustomMessage: (message: string) => void,
  ) => JSX.Element | null;
  botMessageRenderFunction: (message: any, input: string) => JSX.Element | null;
  userMessageRenderFunction: (text: string) => JSX.Element | null;
  dataRenderFunction: (data: any) => JSX.Element | null;
  providerRenderFunction: (providers: string[]) => JSX.Element | null;
  referenceRenderFunction: (reference: any) => JSX.Element | null;
  relatedQuestionsRenderFunction: (
    relatedQuestions: any,
    sendCustomMessage: (message: string) => void,
  ) => JSX.Element | null;
  subqueryRenderFunction: (
    subqueryQuestion: string[],
    subqueryResponse: string[],
  ) => JSX.Element | null;
}) => React.JSX.Element;
export default ChatbotCore;
