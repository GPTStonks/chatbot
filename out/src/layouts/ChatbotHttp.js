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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const react_1 = __importStar(require("react"));
const ChatbotCore_1 = __importDefault(require("../components/chat/ChatbotCore"));
const ChatbotInput_1 = __importDefault(require("../components/chat/ChatbotInput"));
const ChatbotHttp = ({ className, apiConfig, themeConfig, setDataForParent, welcomeMessageRenderFunction, botMessageRenderFunction, userMessageRenderFunction, dataRenderFunction, referenceRenderFunction, relatedQuestionsRenderFunction, }) => {
    var _a, _b, _c, _d;
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
    if (!apiConfig.queryEndpoint.startsWith('http')) {
        throw new Error('queryEndpoint should start with http:// or https:// for fetch');
    }
    if (apiConfig.needsJWT && !apiConfig.token) {
        throw new Error('token is required for JWT authentication');
    }
    else if (!apiConfig.needsJWT && apiConfig.token) {
        console.warn('token is not required for non-JWT authentication');
    }
    else if (apiConfig.needsJWT && apiConfig.token) {
        setToken(localStorage.getItem(apiConfig.token));
    }
    const handleFetchMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        if (apiConfig.needsJWT && apiConfig.token && token) {
            const response = yield fetch(apiConfig.queryEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query: newMessage }),
            });
            let messageData = yield response.json();
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
            /* console.log('body:', body);
            console.log('type:', type);
            console.log('data:', data);
            console.log('related:', related);
            console.log('reference:', reference); */
            if (setDataForParent) {
                setDataForParent(mappedData);
            }
            const botMessage = {
                text: body,
                user: botUser,
                data: data,
                reference: reference,
                related: related,
                loading: false,
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        else {
            const response = yield fetch(apiConfig.queryEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: newMessage }),
            });
            let messageData = yield response.json();
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
            /* console.log('body:', body);
            console.log('type:', type);
            console.log('data:', data);
            console.log('related:', related);
            console.log('reference:', reference); */
            if (setDataForParent) {
                setDataForParent(mappedData);
            }
            const botMessage = {
                text: body,
                user: botUser,
                data: data,
                reference: reference,
                related: related,
                loading: false,
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    });
    const handleSendMessage = () => {
        handleFetchMessage();
        const userMessage = { text: newMessage, user: humanUser, loading: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');
    };
    const handleSendCustomMessage = (message) => {
        setNewMessage(message);
        handleFetchMessage();
        const userMessage = { text: message, user: humanUser, loading: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');
    };
    (0, react_1.useEffect)(() => {
        scrollToBottom();
    }, [messages, isAnyMessageLoading]);
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
            react_1.default.createElement(ChatbotCore_1.default, { messages: messages, themeConfig: themeConfig, botUser: botUser, humanUser: humanUser, botMessage: botMessage, messagesEndRef: messagesEndRef, showLinearLoader: showLinearLoader, isAnyMessageLoading: isAnyMessageLoading, isMobile: isMobile, sendCustomMessage: handleSendCustomMessage, welcomeMessageRenderFunction: welcomeMessageRenderFunction, botMessageRenderFunction: botMessageRenderFunction, userMessageRenderFunction: userMessageRenderFunction, dataRenderFunction: dataRenderFunction, referenceRenderFunction: referenceRenderFunction, relatedQuestionsRenderFunction: relatedQuestionsRenderFunction }),
            ((_b = (_a = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _a === void 0 ? void 0 : _a.Divider) === null || _b === void 0 ? void 0 : _b.appears) && (react_1.default.createElement(material_1.Divider, { sx: (_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Divider) === null || _d === void 0 ? void 0 : _d.style })),
            react_1.default.createElement(ChatbotInput_1.default, { isMobile: isMobile, newMessage: newMessage, setNewMessage: setNewMessage, handleSendMessage: handleSendMessage, handleKeyDown: handleKeyDown, themeConfig: themeConfig, isAnyMessageLoading: isAnyMessageLoading }))));
};
exports.default = ChatbotHttp;
