'use client';
import { useState, useEffect, useCallback } from 'react';

const useChatSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [eventReason, setEventReason] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      console.error('WebSocket connection failed: URL is required');
      return;
    }

    let newSocket: WebSocket | null = null;

    try {
      newSocket = new WebSocket(url);
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return;
    }

    const handleOpen = () => {
      setConnectionStatus('connected');
      setEventReason(null);
      console.log('Socket connection opened');
    };

    const handleClose = (event: CloseEvent) => {
      setConnectionStatus('disconnected');
      setEventReason(event.reason);
      console.log(`Socket connection closed: ${event.reason}`);
    };

    const handleMessage = (event: MessageEvent) => {
      const messageData = JSON.parse(event.data);
      setLastMessage(messageData);
    };

    const handleError = (event: Event) => {
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

  useEffect(() => {
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

  const sendMessage = useCallback(
    (newMessage: string) => {
      if (!newMessage.trim()) return;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(newMessage);
        setLastMessage({ text: newMessage, user: 'humanUser' });
      } else {
        console.error('WebSocket is not open. Cannot send message.');
      }
    },
    [socket],
  );

  return { sendMessage, lastMessage, connectionStatus, eventReason };
};

export default useChatSocket;
