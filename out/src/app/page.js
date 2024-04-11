"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatbotDefaultTheme_1 = __importDefault(require("@/components/chat/ChatbotDefaultTheme"));
const ChatbotHttp_1 = __importDefault(require("@/layouts/ChatbotHttp"));
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
            backgroundColor: '#080808',
        } },
        react_1.default.createElement("div", { style: { width: '20vw', height: '100%' } }),
        react_1.default.createElement("div", { style: { width: '60vw', height: '100%' } },
            react_1.default.createElement(ChatbotHttp_1.default, { apiConfig: {
                    auth: false,
                    tokenName: 'userToken',
                    fetchFunction: '',
                    apiQueryEndpoint: 'http://localhost:5000/ask',
                    queryParams: {
                        type: 'type',
                        data: 'result_data',
                        text: 'body',
                        reference: 'reference',
                        related: 'related',
                    },
                }, themeConfig: themeConfig, setDataForParent: (data) => {
                    setChatData(data);
                }, onApiResponseCode: (bool) => {
                    setInitializedChat(bool);
                }, userMessageRenderFunction: (text) => (react_1.default.createElement(material_1.Box, null,
                    react_1.default.createElement(material_1.Typography, null, text))), botMessageRenderFunction: (text) => (react_1.default.createElement(material_1.Box, null,
                    react_1.default.createElement(material_1.Typography, null, text))), 
                //dataRenderFunction={(data: any) => <div>{data}</div>}
                //graphicalDataRenderFunction={(data: any) => <div>{data}</div>}
                errorRenderFunction: (error) => react_1.default.createElement("div", null, error) })),
        react_1.default.createElement("div", { style: { width: '20vw', height: '100%' } })));
}
exports.default = Home;
