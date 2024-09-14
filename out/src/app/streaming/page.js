"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatbotDefaultTheme_1 = __importDefault(require("@/components/chat/ChatbotDefaultTheme"));
const ChatbotWebsocketStreaming_1 = __importDefault(require("@/layouts/ChatbotWebsocketStreaming"));
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const CustomRenderers_1 = require("./CustomRenderers");
const navigation_1 = require("next/navigation");
function Home() {
    const params = (0, navigation_1.useSearchParams)();
    const [initializedChat, setInitializedChat] = react_1.default.useState(false);
    const [chatData, setChatData] = react_1.default.useState(null);
    const [multimodeChat, setMultimodeChat] = (0, react_1.useState)({
        mode1: { url_param: 'agent_mode', value: 'speed', isActivated: false },
        mode2: { url_param: 'agent_mode', value: 'quality', isActivated: true },
    });
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
    const [token, setToken] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const storedToken = localStorage.getItem('userToken');
        setToken(storedToken);
    }, []);
    const chatbotRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (params.has('query')) {
            const encodedQuery = params.get('query');
            if (encodedQuery) {
                const query = decodeURIComponent(encodedQuery);
                console.log('Query:', query);
                setTimeout(() => {
                    if (chatbotRef.current) {
                        chatbotRef.current.handleSendCustomMessage(query);
                    }
                }, 1000);
            }
        }
    }, []);
    const handleButtonClick = () => {
        if (chatbotRef.current) {
            chatbotRef.current.handleSendCustomMessage('Hello from parent!');
        }
    };
    return (react_1.default.createElement("main", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#080808',
        } },
        react_1.default.createElement("div", { style: { width: '20vw', height: '100%' } }),
        react_1.default.createElement(material_1.Button, { onClick: handleButtonClick }, "Send Message to Chatbot"),
        react_1.default.createElement("div", { style: { width: '100%', height: '100%' } },
            react_1.default.createElement(ChatbotWebsocketStreaming_1.default, { ref: chatbotRef, multimodeChat: multimodeChat, multimodeRenderFunction: (modes) => (react_1.default.createElement(material_1.Box, { sx: {
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                    } }, modes.map((mode, index) => (react_1.default.createElement(material_1.Button, { key: index, onClick: () => {
                        const newMultimodeChat = Object.assign({}, multimodeChat);
                        Object.keys(newMultimodeChat).forEach((key) => {
                            newMultimodeChat[key].isActivated = false;
                        });
                        newMultimodeChat[`mode${index + 1}`].isActivated = true;
                        setMultimodeChat(newMultimodeChat);
                        console.log('Multimode chat:', newMultimodeChat);
                    } }, mode))))), preloadedMessages: preloadedMessages, apiConfig: {
                    queryEndpoint: 'ws://localhost:8000/chatws?token=' + token,
                    queryParams: {
                        type: 'type',
                        data: 'result_data',
                        text: 'body',
                        reference: 'reference',
                        related: 'related',
                        stream: 'stream_step',
                        subqueryQuestion: 'subqueries_answered',
                        subqueryResponse: 'subqueries_responses',
                    },
                    modelStepTypes: {
                        world_knowledge: '📈 Navigating Economic Currents...',
                        simple_reflection: 'Wrapping up...',
                        other: 'Preparing content from...',
                    },
                }, themeConfig: themeConfig, setDataForParent: (data) => {
                    setChatData(data);
                }, onApiResponseCode: (bool) => {
                    setInitializedChat(bool);
                }, errorRenderFunction: CustomRenderers_1.ErrorRenderFunction, userMessageRenderFunction: CustomRenderers_1.UserMessageRender, botMessageRenderFunction: CustomRenderers_1.BotMessageRender, providerRenderFunction: CustomRenderers_1.ProviderRender, subqueryRenderFunction: CustomRenderers_1.SubqueryRender, welcomeMessageRenderFunction: CustomRenderers_1.WelcomeMessageRender, loaderType: 3, loadingRenderFunction: CustomRenderers_1.LoadingMessageRender })),
        react_1.default.createElement("div", { style: { width: '20vw', height: '100%' } })));
}
exports.default = Home;
