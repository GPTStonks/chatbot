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
    return (<main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#080808',
        }}>
      <div style={{ width: '20vw', height: '100%' }}></div>
      <div style={{ width: '100%', height: '100%' }}>
        <ChatbotWebsocket_1.default apiConfig={{
            queryEndpoint: 'ws://localhost:8000/chatws',
            queryParams: {
                type: 'type',
                data: 'result_data',
                text: 'body',
                reference: 'reference',
                related: 'related',
                stream: 'stream_step',
            },
        }} themeConfig={themeConfig} setDataForParent={(data) => {
            setChatData(data);
        }} onApiResponseCode={(bool) => {
            setInitializedChat(bool);
        }} userMessageRenderFunction={(text) => (<material_1.Box>
              <material_1.Typography>{text}</material_1.Typography>
            </material_1.Box>)} botMessageRenderFunction={(message) => (<material_1.Box sx={{
                maxWidth: '100%',
                overflowWrap: 'break-word',
            }}>
              <material_1.Typography sx={{
                wordWrap: 'break-word',
            }}>
                {message.text}
              </material_1.Typography>
            </material_1.Box>)}/>
      </div>
      <div style={{ width: '20vw', height: '100%' }}></div>
    </main>);
}
exports.default = Home;
