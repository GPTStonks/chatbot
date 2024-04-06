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
require("@fontsource-variable/exo-2");
require("@fontsource-variable/fira-code");
require("@fontsource/source-sans-pro");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const react_1 = __importStar(require("react"));
const react_loader_spinner_1 = require("react-loader-spinner");
const react_use_websocket_1 = __importStar(require("react-use-websocket"));
const LinearBuffer_1 = __importDefault(require("./LinearBuffer"));
const ChatbotWebsocket = ({ className, apiConfig, themeConfig, onApiResponseCode, messageRenderFunction, dataRenderFunction, graphicalDataRenderFunction, referenceRenderFunction, relatedQuestionsRenderFunction, errorRenderFunction, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
    const MessageRender = (0, react_1.useCallback)((text) => {
        return messageRenderFunction ? messageRenderFunction(text) : react_1.default.createElement(material_1.Typography, null, text);
    }, [messageRenderFunction]);
    const DataRender = (0, react_1.useCallback)((data) => {
        return dataRenderFunction ? dataRenderFunction(data) : null;
    }, [dataRenderFunction]);
    const GraphicalRender = (0, react_1.useCallback)((data) => {
        return graphicalDataRenderFunction ? graphicalDataRenderFunction(data) : null;
    }, [graphicalDataRenderFunction]);
    const ReferenceRender = (0, react_1.useCallback)((reference) => {
        return referenceRenderFunction ? referenceRenderFunction(reference) : null;
    }, [referenceRenderFunction]);
    const RelatedQuestionsRender = (0, react_1.useCallback)((relatedQuestions) => {
        return relatedQuestionsRenderFunction
            ? relatedQuestionsRenderFunction(relatedQuestions)
            : null;
    }, [relatedQuestionsRenderFunction]);
    const ErrorRender = (0, react_1.useCallback)((error) => {
        return errorRenderFunction ? errorRenderFunction(error) : react_1.default.createElement(material_1.Typography, null, error);
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
    if (apiConfig.isWebsocket && !apiConfig.apiQueryEndpoint.startsWith('ws')) {
        throw new Error('apiQueryEndpoint should start with ws:// or wss:// for websocket');
    }
    else if (!apiConfig.isWebsocket && !apiConfig.apiQueryEndpoint.startsWith('http')) {
        throw new Error('apiQueryEndpoint should start with http:// or https:// for fetch');
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
    // If it is not Websocket
    const customFetch = typeof apiConfig.fetchFunction === 'function' ? apiConfig.fetchFunction : fetch;
    const handleFetchMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        if (apiConfig.auth && token) {
            const response = yield customFetch(apiConfig.apiQueryEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query: newMessage }),
            });
            const lastMessage = JSON.parse(yield response.text());
            const botMessage = { text: lastMessage.text, user: 'botUser', loading: false };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        else {
            const response = yield customFetch(apiConfig.apiQueryEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: newMessage }),
            });
            const lastMessage = JSON.parse(yield response.text());
            const botMessage = { text: lastMessage.text, user: 'botUser', loading: false };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    });
    // Is Websocket
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
        if (apiConfig.isWebsocket) {
            sendMessage(JSON.stringify({ query: newMessage }));
        }
        else {
            handleFetchMessage();
        }
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
            /* console.log('body:', body);
                  console.log('type:', type);
                  console.log('data:', data);
                  console.log('related:', related);
                  console.log('reference:', reference); */
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
                            relatedQuestions: related,
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
            react_1.default.createElement(material_1.Box, { className: `chatbot-default ${className}`, sx: Object.assign({}, (_b = (_a = themeConfig.components) === null || _a === void 0 ? void 0 : _a.ChatBox) === null || _b === void 0 ? void 0 : _b.style) },
                connectionStatus === 'Closed' && (react_1.default.createElement("div", null, ErrorRender('Connection is closed. Please refresh the page.'))),
                react_1.default.createElement(material_1.List, { sx: { maxWidth: isMobile ? '100%' : '70%', margin: '0 auto' } },
                    messages.map((message, index) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                        return (react_1.default.createElement(material_1.ListItem, { key: index, sx: {
                                display: 'flex',
                                flexDirection: message.user === botUser ? 'row' : 'row-reverse',
                                marginBottom: '1rem',
                            } },
                            !isMobile && (react_1.default.createElement(material_1.Avatar, { sx: Object.assign(Object.assign({ marginRight: message.user === botUser ? '1rem' : '0', marginLeft: message.user === humanUser ? '1rem' : '0' }, (_b = (_a = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _a === void 0 ? void 0 : _a.Avatar) === null || _b === void 0 ? void 0 : _b.style), { transition: 'opacity 0.5s ease-in-out' }), src: message.user === botUser
                                    ? (_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Avatar) === null || _d === void 0 ? void 0 : _d.botAvatarUrl
                                    : (_f = (_e = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _e === void 0 ? void 0 : _e.Avatar) === null || _f === void 0 ? void 0 : _f.userAvatarUrl })),
                            isMobile && (react_1.default.createElement(material_1.Avatar, { sx: Object.assign(Object.assign({}, (_h = (_g = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _g === void 0 ? void 0 : _g.Avatar) === null || _h === void 0 ? void 0 : _h.style), { width: '20px', height: '20px', position: 'absolute', top: '0', outline: '1px solid #b8bb26' }), src: message.user === botUser
                                    ? (_k = (_j = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _j === void 0 ? void 0 : _j.Avatar) === null || _k === void 0 ? void 0 : _k.botAvatarUrl
                                    : (_m = (_l = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _l === void 0 ? void 0 : _l.Avatar) === null || _m === void 0 ? void 0 : _m.userAvatarUrl })),
                            message.user === botUser ? (react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(material_1.Box, { sx: {
                                        display: 'flex',
                                        maxWidth: isMobile ? '100%' : '70%',
                                    } }, message.reference && ReferenceRender(message.reference)),
                                react_1.default.createElement(material_1.Box, { sx: Object.assign(Object.assign({}, (_p = (_o = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _o === void 0 ? void 0 : _o.MessageBubbleBot) === null || _p === void 0 ? void 0 : _p.style), { maxWidth: isMobile ? '100%' : '70%' }) },
                                    react_1.default.createElement(material_1.Box, { sx: { display: 'flex' } },
                                        message.reference && ReferenceRender(message.reference),
                                        MessageRender(message.text),
                                        message.graphData && GraphicalRender(message.graphData) // Button to show graph
                                    ),
                                    react_1.default.createElement(material_1.Divider, null),
                                    message.graphData && DataRender(message.graphData)),
                                react_1.default.createElement(material_1.Box, { sx: {
                                        display: 'flex',
                                        maxWidth: isMobile ? '100%' : '70%',
                                    } }, message.relatedQuestions && RelatedQuestionsRender(message.relatedQuestions)))) : (react_1.default.createElement(material_1.Box, { sx: (_r = (_q = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _q === void 0 ? void 0 : _q.MessageBubbleUser) === null || _r === void 0 ? void 0 : _r.style }, MessageRender(message.text)))));
                    }),
                    botMessage && isAnyMessageLoading && !showLinearLoader && (react_1.default.createElement(material_1.ListItem, { sx: {
                            display: 'flex',
                            flexDirection: 'row',
                            transition: 'opacity 0.5s ease-in-out',
                        } },
                        react_1.default.createElement(material_1.Avatar, { sx: Object.assign({ marginRight: '1rem' }, (_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Avatar) === null || _d === void 0 ? void 0 : _d.style), src: (_f = (_e = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _e === void 0 ? void 0 : _e.Avatar) === null || _f === void 0 ? void 0 : _f.botAvatarUrl }),
                        react_1.default.createElement(material_1.Box, { sx: Object.assign({}, (_h = (_g = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _g === void 0 ? void 0 : _g.LoaderBot) === null || _h === void 0 ? void 0 : _h.style) },
                            react_1.default.createElement(react_loader_spinner_1.DNA, { visible: true, height: "60", width: "60", ariaLabel: "dna-loading", wrapperStyle: {}, wrapperClass: "dna-wrapper" }),
                            react_1.default.createElement(material_1.Typography, { sx: {
                                    marginLeft: '1rem',
                                } },
                                "Retrieving information from ",
                                botMessage.text,
                                " ...")))),
                    showLinearLoader && (react_1.default.createElement(material_1.ListItem, { sx: { display: 'flex', flexDirection: 'row', maxWidth: isMobile ? '70vw' : '40vw' } },
                        react_1.default.createElement(material_1.Avatar, { sx: Object.assign({ marginRight: '1rem' }, (_k = (_j = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _j === void 0 ? void 0 : _j.Avatar) === null || _k === void 0 ? void 0 : _k.style), src: (_m = (_l = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _l === void 0 ? void 0 : _l.Avatar) === null || _m === void 0 ? void 0 : _m.botAvatarUrl }),
                        react_1.default.createElement(LinearBuffer_1.default, null)))),
                react_1.default.createElement("div", { ref: messagesEndRef })),
            ((_p = (_o = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _o === void 0 ? void 0 : _o.Divider) === null || _p === void 0 ? void 0 : _p.appears) && (react_1.default.createElement(material_1.Divider, { sx: (_r = (_q = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _q === void 0 ? void 0 : _q.Divider) === null || _r === void 0 ? void 0 : _r.style })),
            react_1.default.createElement(material_1.Box, { sx: Object.assign(Object.assign({}, (_t = (_s = themeConfig.components) === null || _s === void 0 ? void 0 : _s.LowPartBox) === null || _t === void 0 ? void 0 : _t.style), { width: isMobile ? '100vw' : ((_w = (_v = (_u = themeConfig.components) === null || _u === void 0 ? void 0 : _u.LowPartBox) === null || _v === void 0 ? void 0 : _v.style) === null || _w === void 0 ? void 0 : _w.width) || '60%' }) },
                react_1.default.createElement(material_1.TextField, { fullWidth: ((_y = (_x = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _x === void 0 ? void 0 : _x.TextField) === null || _y === void 0 ? void 0 : _y.fullWidth) || true, multiline: true, minRows: 1, maxRows: 2, value: newMessage, onChange: (e) => {
                        setNewMessage(e.target.value);
                    }, onKeyDown: handleKeyDown, variant: "outlined", size: "small", label: ((_0 = (_z = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _z === void 0 ? void 0 : _z.TextField) === null || _0 === void 0 ? void 0 : _0.label) || 'Ask our chatbot!', sx: Object.assign({}, (_2 = (_1 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _1 === void 0 ? void 0 : _1.TextField) === null || _2 === void 0 ? void 0 : _2.style) }),
                isAnyMessageLoading ? (react_1.default.createElement(material_1.CircularProgress, { sx: { marginLeft: '1rem' } })) : (react_1.default.createElement(material_1.Button, { variant: "outlined", onClick: handleSendMessage, disabled: isAnyMessageLoading, size: isMobile ? 'small' : 'medium', sx: Object.assign(Object.assign({ marginLeft: '1rem' }, (_4 = (_3 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _3 === void 0 ? void 0 : _3.Button) === null || _4 === void 0 ? void 0 : _4.style), { '&:hover': {
                            backgroundColor: ((_6 = (_5 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _5 === void 0 ? void 0 : _5.Button) === null || _6 === void 0 ? void 0 : _6.hoverBackgroundColor) || '#b8bb26',
                        } }) },
                    react_1.default.createElement(icons_material_1.ArrowUpward, { fontSize: isMobile ? 'small' : 'medium' })))),
            ((_8 = (_7 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _7 === void 0 ? void 0 : _7.Disclaimer) === null || _8 === void 0 ? void 0 : _8.appears) && (react_1.default.createElement(material_1.Typography, { sx: themeConfig.components.Disclaimer.style }, ((_10 = (_9 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _9 === void 0 ? void 0 : _9.Disclaimer) === null || _10 === void 0 ? void 0 : _10.text) ||
                'This is an open-source chatbot. Have some fun and enjoy! 🚀')))));
};
exports.default = ChatbotWebsocket;
