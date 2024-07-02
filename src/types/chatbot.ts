import { Palette, Typography } from './styles';
import { Components } from './component';
import { Message } from './message';

export interface APIConfig {
  queryEndpoint: string;
  queryParams?: Record<string, any>;
  needsJWT?: boolean; // If the API needs a JWT token for HTTP requests
  token?: string; // JWT token name (only if needsJWT is true)
}

export interface MultimodeChat {
  [key: string]: {
    url_param: string;
    value: string;
    isActivated?: boolean;
  };
}

export interface ChatLayoutConfig {
  chatOrientation?: 'horizontal' | 'vertical';
  avatarPosition?: 'left' | 'right' | 'top' | 'bottom';
  mobileLayout?: {
    hideAvatar?: boolean;
    messageMaxWidth?: string;
  };
  infiniteScroll?: boolean;
  botMessageStackDirection?: 'row' | 'column';
  responseHeader?: boolean;
}

export interface ThemeConfig {
  style?: React.CSSProperties;
  palette?: Palette;
  typography?: Typography;
  components?: Components;
  chatLayoutConfig?: ChatLayoutConfig;
}

export interface ChatbotProps {
  className?: string;
  style?: React.CSSProperties;
  apiConfig: APIConfig;
  themeConfig: ThemeConfig;
  preloadedMessages?: Message[];
  multimodeChat?: MultimodeChat;
  sendCustomMessage?: (text: string) => void;
  welcomeMessageRenderFunction?: (sendCustomMessage: any) => JSX.Element;
  setDataForParent?: (data: any) => void;
  onApiResponseCode?: (bool: boolean) => void;
  multimodeRenderFunction?: (modes: string[]) => JSX.Element;
  userMessageRenderFunction?: (text: string) => JSX.Element;
  botMessageRenderFunction?: (message: Message, input?: string) => JSX.Element;
  dataRenderFunction?: (data: any) => JSX.Element;
  providerRenderFunction?: (providers: string[]) => JSX.Element;
  referenceRenderFunction?: (reference: string[]) => JSX.Element;
  relatedQuestionsRenderFunction?: (
    relatedQuestions: string[],
    sendCustomMessage: any,
  ) => JSX.Element;
  errorRenderFunction?: (error: any) => JSX.Element;
}
