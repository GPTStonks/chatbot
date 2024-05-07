'use client';
import { useCallback, useEffect, useState } from 'react';

const useChatSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState<any>(null);

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
        socket.send(JSON.stringify({ query: newMessage }));
        setLastMessage({ text: newMessage, user: 'humanUser' });
      } else {
        console.error('WebSocket is not open. Cannot send message.');
      }
    },
    [socket],
  );

  return { sendMessage, lastMessage, connectionStatus };
};

export default useChatSocket;
