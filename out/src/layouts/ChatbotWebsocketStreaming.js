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
const useChatSocket_1 = __importDefault(require("../hooks/useChatSocket"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const react_1 = __importStar(require("react"));
const ChatbotCore_1 = __importDefault(require("../components/chat/ChatbotCore"));
const ChatbotInput_1 = __importDefault(require("../components/chat/ChatbotInput"));
const ChatbotWebsocketStreaming = ({ className, apiConfig, themeConfig, sendCustomMessage, welcomeMessageRenderFunction, setDataForParent, onApiResponseCode, botMessageRenderFunction, userMessageRenderFunction, dataRenderFunction, referenceRenderFunction, relatedQuestionsRenderFunction, errorRenderFunction, }) => {
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
    const [streamData, setStreamData] = (0, react_1.useState)('');
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
        return apiConfig.auth && token ? `${apiConfig.apiQueryEndpoint}?token=${token}` : null;
    }, [apiConfig.apiQueryEndpoint, apiConfig.auth, token]);
    const { sendMessage, lastMessage, connectionStatus } = (0, useChatSocket_1.default)(wsUrl !== null && wsUrl !== void 0 ? wsUrl : '');
    const handleSendMessage = () => {
        if (!isAnyMessageLoading && messages.length % 2 == 0 && connectionStatus === 'connected') {
            if (!newMessage.trim())
                return;
            sendMessage(JSON.stringify({ query: newMessage }));
            const userMessage = { text: newMessage, user: humanUser, loading: false };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setNewMessage('');
        }
        else {
            console.log('Some message is still loading or connection is not established.');
        }
    };
    const handleSendCustomMessage = (message) => {
        if (!isAnyMessageLoading && messages.length % 2 == 0) {
            if (!message.trim())
                return;
            sendMessage(JSON.stringify({ query: message }));
            const userMessage = { text: message, user: humanUser, loading: false };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setNewMessage('');
        }
        else {
            console.log('Some message is still loading or connection is not established.');
        }
    };
    (0, react_1.useEffect)(() => {
        if (onApiResponseCode && messages.length > 0) {
            onApiResponseCode(true);
        }
    }, [messages]);
    (0, react_1.useEffect)(() => {
        if (lastMessage !== null) {
            let messageData = lastMessage;
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
            //console.log('data:', mappedData);
            if (setDataForParent) {
                setDataForParent(mappedData);
            }
            if (type === 'data' && data) {
                setGraphData(data);
            }
            let queryLoading = type !== 'data';
            setIsAnyMessageLoading(queryLoading);
            if (type === 'error') {
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages.push({
                        text: body,
                        user: botUser,
                        loading: false,
                    });
                    return updatedMessages;
                });
                setIsAnyMessageLoading(false);
            }
            if (queryLoading && type === 'model_step') {
                setBotMessage(() => ({
                    text: body,
                    user: 'botUser',
                    loading: true,
                }));
            }
            else if (type === 'data') {
                setStreamData('');
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    const lastIndex = updatedMessages.length - 1;
                    if (lastIndex >= 0 && updatedMessages[lastIndex].loading) {
                        //After streaming
                        updatedMessages[lastIndex] = Object.assign(Object.assign({}, updatedMessages[lastIndex]), { text: body, related: related, reference: reference, graphData: data, loading: false, stream: false, streamCompleted: true });
                    }
                    else {
                        //Not streaming
                        updatedMessages.push({
                            text: body,
                            user: botUser,
                            related: related,
                            reference: reference,
                            graphData: data,
                            loading: false,
                            stream: false,
                        });
                    }
                    return updatedMessages;
                });
                setBotMessage(null);
            }
            else if (type === 'stream_step') {
                const accumulatedStreamData = body;
                setStreamData(accumulatedStreamData);
                if (accumulatedStreamData.includes('"response": "') &&
                    !accumulatedStreamData.includes('",')) {
                    const copyMessages = [...messages];
                    if (copyMessages.length % 2 != 0) {
                        copyMessages.push({
                            text: ' ',
                            user: botUser,
                            loading: true,
                            stream: true,
                        });
                    }
                    copyMessages[copyMessages.length - 1].text = accumulatedStreamData
                        .replace('{', '')
                        .replace('}', '')
                        .replace('"response": "', '');
                    setMessages(() => [...copyMessages]);
                    setBotMessage(null);
                }
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
        if (event.key === 'Enter' && !event.shiftKey && !isAnyMessageLoading) {
            if (messages.length == 0 || (messages.length > 0 && messages.length % 2 == 0)) {
                handleSendMessage();
                event.preventDefault();
            }
        }
    };
    return (react_1.default.createElement("div", { className: `chatbot-default ${className}`, style: Object.assign({}, themeConfig.style) },
        react_1.default.createElement(styles_1.ThemeProvider, { theme: customTheme },
            react_1.default.createElement(react_1.default.Fragment, null,
                connectionStatus === 'disconnected' &&
                    ErrorRender('Connection is closed. Please refresh the page.'),
                react_1.default.createElement(ChatbotCore_1.default, { messages: messages, themeConfig: themeConfig, botUser: botUser, humanUser: humanUser, botMessage: botMessage, messagesEndRef: messagesEndRef, showLinearLoader: showLinearLoader, isAnyMessageLoading: isAnyMessageLoading, isMobile: isMobile, sendCustomMessage: handleSendCustomMessage, welcomeMessageRenderFunction: welcomeMessageRenderFunction, botMessageRenderFunction: botMessageRenderFunction, userMessageRenderFunction: userMessageRenderFunction, dataRenderFunction: dataRenderFunction, referenceRenderFunction: referenceRenderFunction, relatedQuestionsRenderFunction: relatedQuestionsRenderFunction })),
            ((_b = (_a = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _a === void 0 ? void 0 : _a.Divider) === null || _b === void 0 ? void 0 : _b.appears) && (react_1.default.createElement(material_1.Divider, { sx: (_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Divider) === null || _d === void 0 ? void 0 : _d.style })),
            react_1.default.createElement(ChatbotInput_1.default, { isMobile: isMobile, newMessage: newMessage, setNewMessage: setNewMessage, handleSendMessage: handleSendMessage, handleKeyDown: handleKeyDown, themeConfig: themeConfig, isAnyMessageLoading: isAnyMessageLoading }))));
};
exports.default = ChatbotWebsocketStreaming;
