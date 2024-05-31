/// <reference types="react" />
declare const ChatbotInput: ({ isMobile, themeConfig, newMessage, setNewMessage, handleKeyDown, handleSendMessage, isAnyMessageLoading, multimodeChat, multimodeRenderFunction, }: {
    isMobile: boolean;
    themeConfig: any;
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleSendMessage: () => void;
    isAnyMessageLoading: boolean;
    multimodeChat: any;
    multimodeRenderFunction: (modes: string[]) => JSX.Element | null;
}) => import("react").JSX.Element;
export default ChatbotInput;
