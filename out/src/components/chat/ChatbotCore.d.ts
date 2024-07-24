import { APIConfig, ThemeConfig } from '@/types/chatbot';
import { Message } from '@/types/message';
import React from 'react';
declare const ChatbotCore: ({
  messages,
  themeConfig,
  loaderType,
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
  loadingRenderFunction,
}: {
  messages: Message[];
  themeConfig: ThemeConfig;
  loaderType?: number | undefined;
  isMobile: boolean;
  apiConfig: APIConfig;
  botUser: string;
  humanUser: string;
  botMessage: Message | null;
  messagesEndRef: any;
  isAnyMessageLoading: boolean;
  showLinearLoader: boolean;
  setDataForParent?: ((data: any) => void) | undefined;
  onApiResponseCode?: ((bool: boolean) => void) | undefined;
  multimodeRenderFunction?: ((modes: string[]) => JSX.Element) | undefined;
  errorRenderFunction?: ((error: any) => JSX.Element) | undefined;
  sendCustomMessage: (message: string) => void;
  welcomeMessageRenderFunction?:
    | ((sendCustomMessage: (message: string) => void) => JSX.Element | null)
    | undefined;
  botMessageRenderFunction?: ((message: any, input: string) => JSX.Element | null) | undefined;
  userMessageRenderFunction?: ((text: string) => JSX.Element | null) | undefined;
  dataRenderFunction?: ((data: any) => JSX.Element | null) | undefined;
  providerRenderFunction?: ((providers: string[]) => JSX.Element | null) | undefined;
  referenceRenderFunction?: ((reference: any) => JSX.Element | null) | undefined;
  relatedQuestionsRenderFunction?:
    | ((relatedQuestions: any, sendCustomMessage: (message: string) => void) => JSX.Element | null)
    | undefined;
  subqueryRenderFunction?:
    | ((subqueryQuestion: string[], subqueryResponse: string[]) => JSX.Element | null)
    | undefined;
  loadingRenderFunction?:
    | ((
        text: string,
        themeConfig: ThemeConfig,
        subquery_arrays: any,
        type: number,
      ) => JSX.Element | null)
    | undefined;
}) => React.JSX.Element;
export default ChatbotCore;
