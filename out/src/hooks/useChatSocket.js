"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useChatSocket = (url) => {
    const [socket, setSocket] = (0, react_1.useState)(null);
    const [connectionStatus, setConnectionStatus] = (0, react_1.useState)('disconnected');
    const [lastMessage, setLastMessage] = (0, react_1.useState)(null);
    const [eventReason, setEventReason] = (0, react_1.useState)(null);
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
        const handleOpen = () => {
            setConnectionStatus('connected');
            setEventReason(null);
            console.log('Socket connection opened');
        };
        const handleClose = (event) => {
            setConnectionStatus('disconnected');
            setEventReason(event.reason);
            console.log(`Socket connection closed: ${event.reason}`);
        };
        const handleMessage = (event) => {
            const messageData = JSON.parse(event.data);
            setLastMessage(messageData);
        };
        const handleError = (event) => {
            setConnectionStatus('error');
            setEventReason('An error occurred');
            console.log('WebSocket error:', event);
        };
        newSocket.addEventListener('open', handleOpen);
        newSocket.addEventListener('close', handleClose);
        newSocket.addEventListener('message', handleMessage);
        newSocket.addEventListener('error', handleError);
        setSocket(newSocket);
        return () => {
            if (newSocket) {
                newSocket.removeEventListener('open', handleOpen);
                newSocket.removeEventListener('close', handleClose);
                newSocket.removeEventListener('message', handleMessage);
                newSocket.removeEventListener('error', handleError);
                if (newSocket.readyState === WebSocket.OPEN) {
                    newSocket.close();
                }
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
            socket.send(newMessage);
            setLastMessage({ text: newMessage, user: 'humanUser' });
        }
        else {
            console.error('WebSocket is not open. Cannot send message.');
        }
    }, [socket]);
    return { sendMessage, lastMessage, connectionStatus, eventReason };
};
exports.default = useChatSocket;
