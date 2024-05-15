"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatbotDefaultTheme_1 = __importDefault(require("@/components/chat/ChatbotDefaultTheme"));
const ChatbotWebsocketStreaming_1 = __importDefault(require("@/layouts/ChatbotWebsocketStreaming"));
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
function Home() {
    const [initializedChat, setInitializedChat] = react_1.default.useState(false);
    const [chatData, setChatData] = react_1.default.useState(null);
    const themeConfig = ChatbotDefaultTheme_1.default;
    const preloadedMessages = [
        {
            text: 'Hello! How can I help you today?',
            user: 'humanUser',
        },
        {
            text: 'Hello!',
            user: 'botUser',
        },
    ];
    const token = localStorage.getItem('userToken');
    return (react_1.default.createElement("main", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#080808',
        } },
        react_1.default.createElement("div", { style: { width: '20vw', height: '100%' } }),
        react_1.default.createElement("div", { style: { width: '100%', height: '100%' } },
            react_1.default.createElement(ChatbotWebsocketStreaming_1.default, { preloadedMessages: preloadedMessages, apiConfig: {
                    queryEndpoint: 'ws://localhost:8000/chatws?token=' + token,
                    queryParams: {
                        type: 'type',
                        data: 'result_data',
                        text: 'body',
                        reference: 'reference',
                        related: 'related',
                        stream: 'stream_step',
                    },
                }, themeConfig: themeConfig, errorRenderFunction: (error) => (react_1.default.createElement(material_1.Box, { sx: {
                        position: 'fixed',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '3px 15px',
                        zIndex: 1000,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    } },
                    react_1.default.createElement(material_1.Typography, null, error))), setDataForParent: (data) => {
                    setChatData(data);
                }, onApiResponseCode: (bool) => {
                    setInitializedChat(bool);
                }, userMessageRenderFunction: (text) => (react_1.default.createElement(material_1.Box, null,
                    react_1.default.createElement(material_1.Typography, null, text))), botMessageRenderFunction: (message) => (react_1.default.createElement(material_1.Box, { sx: {
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                    } },
                    react_1.default.createElement(material_1.Typography, null, message.text))) })),
        react_1.default.createElement("div", { style: { width: '20vw', height: '100%' } })));
}
exports.default = Home;
