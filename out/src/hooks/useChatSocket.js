"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useChatSocket = (url) => {
    const [socket, setSocket] = (0, react_1.useState)(null);
    const [connectionStatus, setConnectionStatus] = (0, react_1.useState)('disconnected');
    const [lastMessage, setLastMessage] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!url) {
            console.error('WebSocket connection failed: URL is required');
            return;
        }
        let newSocket = null;
        try {
            newSocket = new WebSocket(url);
        }
        catch (error) {
            console.error('WebSocket connection failed:', error);
            return;
        }
        newSocket.addEventListener('open', () => {
            setConnectionStatus('connected');
            console.log('Socket connection opened');
        });
        newSocket.addEventListener('close', () => {
            setConnectionStatus('disconnected');
            console.log('Socket connection closed');
        });
        newSocket.addEventListener('message', (event) => {
            const messageData = JSON.parse(event.data);
            setLastMessage(messageData);
        });
        newSocket.addEventListener('error', (event) => {
            setConnectionStatus('error');
            console.log('WebSocket error:', event);
        });
        setSocket(newSocket);
        return () => {
            if (newSocket && newSocket.readyState === WebSocket.OPEN) {
                newSocket.close();
            }
        };
    }, [url]);
    (0, react_1.useEffect)(() => {
        const closeSocket = () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
        window.addEventListener('beforeunload', closeSocket);
        return () => {
            window.removeEventListener('beforeunload', closeSocket);
        };
    }, [socket]);
    const sendMessage = (0, react_1.useCallback)((newMessage) => {
        if (!newMessage.trim())
            return;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ query: newMessage }));
            setLastMessage({ text: newMessage, user: 'humanUser' });
        }
        else {
            console.error('WebSocket is not open. Cannot send message.');
        }
    }, [socket]);
    return { sendMessage, lastMessage, connectionStatus };
};
exports.default = useChatSocket;
