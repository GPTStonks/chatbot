declare const useChatSocket: (url: string) => {
    sendMessage: (newMessage: string) => void;
    lastMessage: any;
    connectionStatus: string;
    eventReason: string | null;
};
export default useChatSocket;
