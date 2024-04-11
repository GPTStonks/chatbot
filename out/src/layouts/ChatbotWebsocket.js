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
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const react_1 = __importStar(require("react"));
const react_use_websocket_1 = __importStar(require("react-use-websocket"));
const ChatbotCore_1 = __importDefault(require("../components/chat/ChatbotCore"));
const ChatbotInput_1 = __importDefault(require("../components/chat/ChatbotInput"));
const ChatbotWebsocket = ({ className, apiConfig, themeConfig, setDataForParent, onApiResponseCode, botMessageRenderFunction, userMessageRenderFunction, dataRenderFunction, graphicalDataRenderFunction, referenceRenderFunction, relatedQuestionsRenderFunction, errorRenderFunction, }) => {
    var _a, _b, _c, _d;
    const ErrorRender = (0, react_1.useCallback)((error) => {
        return errorRenderFunction ? (errorRenderFunction(error)) : (react_1.default.createElement(material_1.Dialog, { open: true },
            react_1.default.createElement("div", { style: {
                    padding: '20px',
                    fontSize: '20px',
                    textAlign: 'center',
                } },
                "\u26A0\uFE0F ",
                error)));
    }, [errorRenderFunction]);
    const humanUser = 'humanUser';
    const botUser = 'botUser';
    const isMobile = (0, material_1.useMediaQuery)('(max-width:750px)');
    const customTheme = (0, styles_1.createTheme)(themeConfig ? { palette: themeConfig.palette, typography: themeConfig.typography } : {});
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [newMessage, setNewMessage] = (0, react_1.useState)('');
    const [botMessage, setBotMessage] = (0, react_1.useState)(null);
    const messagesEndRef = (0, react_1.useRef)(null);
    const [isAnyMessageLoading, setIsAnyMessageLoading] = (0, react_1.useState)(false);
    const [showLinearLoader, setShowLinearLoader] = (0, react_1.useState)(false);
    const [token, setToken] = (0, react_1.useState)(null);
    const [graphData, setGraphData] = (0, react_1.useState)(null);
    if (!apiConfig.apiQueryEndpoint.startsWith('ws')) {
        throw new Error('apiQueryEndpoint should start with ws:// or wss:// for websocket');
    }
    (0, react_1.useEffect)(() => {
        if (apiConfig.auth) {
            if (!apiConfig.tokenName) {
                throw new Error('tokenName should be provided for auth');
            }
            const fetchedToken = localStorage.getItem(apiConfig.tokenName);
            setToken(fetchedToken);
        }
    }, []);
    const wsUrl = (0, react_1.useMemo)(() => {
        if (apiConfig.auth && token) {
            return `${apiConfig.apiQueryEndpoint}?token=${token}`;
        }
        return apiConfig.apiQueryEndpoint;
    }, [apiConfig.apiQueryEndpoint, apiConfig.auth, token]);
    const { sendMessage, lastMessage, readyState } = (0, react_use_websocket_1.default)(wsUrl);
    const connectionStatus = {
        [react_use_websocket_1.ReadyState.CONNECTING]: 'Connecting',
        [react_use_websocket_1.ReadyState.OPEN]: 'Open',
        [react_use_websocket_1.ReadyState.CLOSING]: 'Closing',
        [react_use_websocket_1.ReadyState.CLOSED]: 'Closed',
        [react_use_websocket_1.ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    const handleSendMessage = () => {
        if (!newMessage.trim())
            return;
        sendMessage(JSON.stringify({ query: newMessage }));
        console.log('newMessage:', newMessage);
        const userMessage = { text: newMessage, user: 'humanUser', loading: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');
    };
    (0, react_1.useEffect)(() => {
        if (onApiResponseCode && messages.length > 0) {
            onApiResponseCode(true);
        }
    }, [messages]);
    (0, react_1.useEffect)(() => {
        if (lastMessage !== null) {
            let messageData = JSON.parse(lastMessage.data);
            let mappedData = {};
            if (apiConfig.queryParams) {
                Object.entries(apiConfig.queryParams).forEach(([key, value]) => {
                    mappedData[key] = messageData[value];
                });
            }
            let body = mappedData.text;
            let type = mappedData.type;
            let data = mappedData.data;
            let related = mappedData.related;
            let reference = mappedData.reference;
            console.log('body:', body);
            console.log('type:', type);
            console.log('data:', data);
            console.log('related:', related);
            console.log('reference:', reference);
            if (setDataForParent) {
                setDataForParent(mappedData);
            }
            if (type === 'data' && data) {
                setGraphData(data);
            }
            let queryLoading = type !== 'data';
            setIsAnyMessageLoading(queryLoading);
            if (queryLoading && type === 'model_step') {
                setBotMessage((prevBotMessage) => ({
                    text: body,
                    user: 'botUser',
                    loading: true,
                }));
            }
            else if (type === 'data') {
                setShowLinearLoader(true);
                setTimeout(() => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            text: body,
                            user: 'botUser',
                            graphData: data,
                            related: related,
                            reference: reference,
                            loading: false,
                        },
                    ]);
                    setShowLinearLoader(false);
                    setBotMessage(null);
                }, 3000);
            }
        }
    }, [lastMessage]);
    (0, react_1.useEffect)(() => {
        scrollToBottom();
    }, [messages, lastMessage, isAnyMessageLoading]);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
            event.preventDefault();
        }
    };
    return (react_1.default.createElement("div", { className: `chatbot-default ${className}`, style: Object.assign({}, themeConfig.style) },
        react_1.default.createElement(styles_1.ThemeProvider, { theme: customTheme },
            react_1.default.createElement(react_1.default.Fragment, null,
                connectionStatus === 'Closed' &&
                    ErrorRender('Connection is closed. Please refresh the page.'),
                react_1.default.createElement(ChatbotCore_1.default, { messages: messages, themeConfig: themeConfig, botUser: botUser, humanUser: humanUser, botMessage: botMessage, messagesEndRef: messagesEndRef, showLinearLoader: showLinearLoader, isAnyMessageLoading: isAnyMessageLoading, isMobile: isMobile, botMessageRenderFunction: botMessageRenderFunction, userMessageRenderFunction: userMessageRenderFunction, dataRenderFunction: dataRenderFunction, graphicalDataRenderFunction: graphicalDataRenderFunction, referenceRenderFunction: referenceRenderFunction, relatedQuestionsRenderFunction: relatedQuestionsRenderFunction, errorRenderFunction: errorRenderFunction })),
            ((_b = (_a = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _a === void 0 ? void 0 : _a.Divider) === null || _b === void 0 ? void 0 : _b.appears) && (react_1.default.createElement(material_1.Divider, { sx: (_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Divider) === null || _d === void 0 ? void 0 : _d.style })),
            react_1.default.createElement(ChatbotInput_1.default, { isMobile: isMobile, newMessage: newMessage, setNewMessage: setNewMessage, handleSendMessage: handleSendMessage, handleKeyDown: handleKeyDown, themeConfig: themeConfig, isAnyMessageLoading: isAnyMessageLoading }))));
};
exports.default = ChatbotWebsocket;