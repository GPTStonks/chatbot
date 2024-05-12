"use strict";
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
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const react_loader_spinner_1 = require("react-loader-spinner");
const LinearBuffer_1 = __importDefault(require("./LinearBuffer"));
const ChatbotCore = ({ messages, themeConfig, isMobile, botUser, humanUser, botMessage, messagesEndRef, isAnyMessageLoading, showLinearLoader, sendCustomMessage, welcomeMessageRenderFunction, botMessageRenderFunction, userMessageRenderFunction, dataRenderFunction, referenceRenderFunction, relatedQuestionsRenderFunction, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const WelcomeMessageRender = (0, react_1.useCallback)(() => {
        return welcomeMessageRenderFunction ? (welcomeMessageRenderFunction) : (react_1.default.createElement(material_1.Box, { sx: {
                position: 'fixed',
                width: '100vw',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            } },
            react_1.default.createElement(material_1.Typography, { variant: "h4", sx: {
                    color: 'white',
                } }, "Welcome! How can I help you today?")));
    }, [welcomeMessageRenderFunction]);
    const BotMessageRender = (0, react_1.useCallback)((message, input) => {
        return botMessageRenderFunction ? (botMessageRenderFunction(message, input)) : (react_1.default.createElement(material_1.Typography, null, message.text));
    }, [botMessageRenderFunction]);
    const UserMessageRender = (0, react_1.useCallback)((text) => {
        return userMessageRenderFunction ? (userMessageRenderFunction(text)) : (react_1.default.createElement(material_1.Typography, { variant: "h4", sx: {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
            } }, text));
    }, [userMessageRenderFunction]);
    const DataRender = (0, react_1.useCallback)((data) => {
        return dataRenderFunction ? dataRenderFunction(data) : null;
    }, [dataRenderFunction]);
    const ReferenceRender = (0, react_1.useCallback)((reference) => {
        return referenceRenderFunction ? referenceRenderFunction(reference) : null;
    }, [referenceRenderFunction]);
    const RelatedQuestionsRender = (0, react_1.useCallback)((relatedQuestions, sendCustomMessage) => {
        return relatedQuestionsRenderFunction
            ? relatedQuestionsRenderFunction(relatedQuestions, sendCustomMessage)
            : null;
    }, [relatedQuestionsRenderFunction]);
    return (react_1.default.createElement(material_1.Box, { sx: Object.assign({}, (_b = (_a = themeConfig.components) === null || _a === void 0 ? void 0 : _a.ChatBox) === null || _b === void 0 ? void 0 : _b.style) },
        messages.length === 0 && WelcomeMessageRender(),
        react_1.default.createElement(material_1.List, null,
            messages.map((message, index) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
                return (react_1.default.createElement(material_1.ListItem, { key: index, sx: {
                        display: 'flex',
                        flexDirection: message.user === botUser
                            ? 'row'
                            : ((_b = (_a = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components.MessageBubbleUser) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.flexDirection) ||
                                'row-reverse',
                    } },
                    !isMobile &&
                        ((((_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Avatar) === null || _d === void 0 ? void 0 : _d.showSideUserAvatar) &&
                            message.user === humanUser) ||
                            (((_f = (_e = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _e === void 0 ? void 0 : _e.Avatar) === null || _f === void 0 ? void 0 : _f.showSideBotAvatar) &&
                                message.user === botUser)) && (react_1.default.createElement(material_1.Avatar // Side avatar (outside of message bubble)
                    , { sx: Object.assign(Object.assign({}, (_h = (_g = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _g === void 0 ? void 0 : _g.Avatar) === null || _h === void 0 ? void 0 : _h.style), { transition: 'opacity 0.5s ease-in-out' }), src: message.user === botUser
                            ? (_k = (_j = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _j === void 0 ? void 0 : _j.Avatar) === null || _k === void 0 ? void 0 : _k.botAvatarUrl
                            : (_m = (_l = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _l === void 0 ? void 0 : _l.Avatar) === null || _m === void 0 ? void 0 : _m.userAvatarUrl })),
                    isMobile &&
                        ((((_p = (_o = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _o === void 0 ? void 0 : _o.Avatar) === null || _p === void 0 ? void 0 : _p.showSideUserAvatar) &&
                            message.user === humanUser) ||
                            (((_r = (_q = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _q === void 0 ? void 0 : _q.Avatar) === null || _r === void 0 ? void 0 : _r.showSideBotAvatar) &&
                                message.user === botUser)) && (react_1.default.createElement(material_1.Avatar // Side avatar (outside of message bubble) for mobile
                    , { sx: Object.assign(Object.assign({}, (_t = (_s = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _s === void 0 ? void 0 : _s.Avatar) === null || _t === void 0 ? void 0 : _t.style), { width: '20px', height: '20px', position: 'absolute', top: '0', outline: '1px solid #b8bb26' }), src: message.user === botUser
                            ? (_v = (_u = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _u === void 0 ? void 0 : _u.Avatar) === null || _v === void 0 ? void 0 : _v.botAvatarUrl
                            : (_x = (_w = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _w === void 0 ? void 0 : _w.Avatar) === null || _x === void 0 ? void 0 : _x.userAvatarUrl })),
                    message.user === botUser ? (react_1.default.createElement(material_1.Box, { sx: {
                            display: 'flex',
                            flexDirection: ((_y = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.chatLayoutConfig) === null || _y === void 0 ? void 0 : _y.botMessageStackDirection) || 'column',
                        } },
                        react_1.default.createElement(material_1.Box, { sx: {
                                display: 'flex',
                            } }, (message.streamCompleted || message.stream) &&
                            ReferenceRender(message.reference)),
                        ((_z = themeConfig.chatLayoutConfig) === null || _z === void 0 ? void 0 : _z.responseHeader) && (react_1.default.createElement(material_1.Box, { sx: {
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1em',
                            } },
                            react_1.default.createElement(material_1.Avatar, { sx: Object.assign({}, (_1 = (_0 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _0 === void 0 ? void 0 : _0.Avatar) === null || _1 === void 0 ? void 0 : _1.style), src: (_3 = (_2 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _2 === void 0 ? void 0 : _2.Avatar) === null || _3 === void 0 ? void 0 : _3.botAvatarUrl }),
                            react_1.default.createElement(material_1.Typography, { variant: "h6", color: (_6 = (_5 = (_4 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _4 === void 0 ? void 0 : _4.MessageBubbleBot) === null || _5 === void 0 ? void 0 : _5.style) === null || _6 === void 0 ? void 0 : _6.color },
                                ' ',
                                "Response",
                                ' '))),
                        react_1.default.createElement(material_1.Box, { sx: Object.assign({ display: 'flex', flexDirection: 'column' }, (_8 = (_7 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _7 === void 0 ? void 0 : _7.MessageBubbleBot) === null || _8 === void 0 ? void 0 : _8.style) },
                            react_1.default.createElement(material_1.Box, { sx: { display: 'flex' } },
                                message.text &&
                                    (message.streamCompleted || !message.stream) &&
                                    BotMessageRender(message, (_9 = messages[index - 1]) === null || _9 === void 0 ? void 0 : _9.text),
                                message.stream && (react_1.default.createElement(material_1.Box, { sx: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        maxWidth: '100%',
                                    } },
                                    react_1.default.createElement(material_1.Typography, null, message.text.replace(/\\n/g, '  \n').replace(/\\/g, ''))))),
                            (message.streamCompleted || message.stream) && DataRender(message.graphData)),
                        react_1.default.createElement(material_1.Box, { sx: {
                                display: 'flex',
                            } }, (message.streamCompleted || message.stream) &&
                            RelatedQuestionsRender(message.related, sendCustomMessage)))) : (react_1.default.createElement(material_1.Box, { sx: (_11 = (_10 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _10 === void 0 ? void 0 : _10.MessageBubbleUser) === null || _11 === void 0 ? void 0 : _11.style }, UserMessageRender(message.text)))));
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
                        botMessage.text == 'world_knowledge' && '🧭 Navigating the Internet...',
                        botMessage.text == 'simple_reflection' && 'Wrapping up...',
                        botMessage.text != 'world_knowledge' && botMessage.text != 'simple_reflection' && (react_1.default.createElement(material_1.Typography, null,
                            " Preparing content from ",
                            botMessage.text,
                            "...")))))),
            showLinearLoader && (react_1.default.createElement(material_1.ListItem, { sx: { display: 'flex', flexDirection: 'row', maxWidth: isMobile ? '70vw' : '40vw' } },
                react_1.default.createElement(material_1.Avatar, { sx: Object.assign({ marginRight: '1rem' }, (_k = (_j = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _j === void 0 ? void 0 : _j.Avatar) === null || _k === void 0 ? void 0 : _k.style), src: (_m = (_l = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _l === void 0 ? void 0 : _l.Avatar) === null || _m === void 0 ? void 0 : _m.botAvatarUrl }),
                react_1.default.createElement(LinearBuffer_1.default, null)))),
        react_1.default.createElement("div", { ref: messagesEndRef }),
        react_1.default.createElement("div", { style: {
                height: '100px',
            } })));
};
exports.default = ChatbotCore;
