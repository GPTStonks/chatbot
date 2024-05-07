declare const useChatSocket: (url: string) => {
    sendMessage: (newMessage: string) => void;
    lastMessage: any;
    connectionStatus: string;
};
export default useChatSocket;
