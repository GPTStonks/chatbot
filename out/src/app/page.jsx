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
    return (<main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#080808',
        }}>
      <div style={{ width: '20vw', height: '100%' }}></div>
      <div style={{ width: '60vw', height: '100%' }}>
        <ChatbotHttp_1.default apiConfig={{
            queryEndpoint: 'http://localhost:5000/ask',
            queryParams: {
                type: 'type',
                data: 'result_data',
                text: 'body',
                reference: 'reference',
                related: 'related',
            },
        }} themeConfig={themeConfig} setDataForParent={(data) => {
            setChatData(data);
        }} onApiResponseCode={(bool) => {
            setInitializedChat(bool);
        }} userMessageRenderFunction={(text) => (<material_1.Box>
              <material_1.Typography>{text}</material_1.Typography>
            </material_1.Box>)} botMessageRenderFunction={(message) => (<material_1.Box>
              <material_1.Typography>{message.text}</material_1.Typography>
            </material_1.Box>)} 
    //dataRenderFunction={(data: any) => <div>{data}</div>}
    errorRenderFunction={(error) => <div>{error}</div>}/>
      </div>
      <div style={{ width: '20vw', height: '100%' }}></div>
    </main>);
}
exports.default = Home;
