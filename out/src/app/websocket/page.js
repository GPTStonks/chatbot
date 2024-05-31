"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatbotDefaultTheme_1 = __importDefault(require("@/components/chat/ChatbotDefaultTheme"));
const ChatbotWebsocket_1 = __importDefault(require("@/layouts/ChatbotWebsocket"));
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
function Home() {
    const [initializedChat, setInitializedChat] = react_1.default.useState(false);
    const [chatData, setChatData] = react_1.default.useState(null);
    const themeConfig = ChatbotDefaultTheme_1.default;
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
            react_1.default.createElement(ChatbotWebsocket_1.default, { apiConfig: {
                    queryEndpoint: 'ws://localhost:8000/chatws',
                    queryParams: {
                        type: 'type',
                        data: 'result_data',
                        text: 'body',
                        reference: 'reference',
                        related: 'related',
                        stream: 'stream_step',
                    },
                }, themeConfig: themeConfig, setDataForParent: (data) => {
                    setChatData(data);
                }, onApiResponseCode: (bool) => {
                    setInitializedChat(bool);
                }, userMessageRenderFunction: (text) => (react_1.default.createElement(material_1.Box, null,
                    react_1.default.createElement(material_1.Typography, null, text))), botMessageRenderFunction: (message) => (react_1.default.createElement(material_1.Box, { sx: {
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                    } },
                    react_1.default.createElement(material_1.Typography, { sx: {
                            wordWrap: 'break-word',
                        } }, message.text))) })),
        react_1.default.createElement("div", { style: { width: '20vw', height: '100%' } })));
}
exports.default = Home;
