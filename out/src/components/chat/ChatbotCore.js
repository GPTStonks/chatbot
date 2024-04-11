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
const ChatbotCore = ({ messages, themeConfig, isMobile, botUser, humanUser, botMessage, messagesEndRef, isAnyMessageLoading, showLinearLoader, botMessageRenderFunction, userMessageRenderFunction, dataRenderFunction, graphicalDataRenderFunction, referenceRenderFunction, relatedQuestionsRenderFunction, errorRenderFunction, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const BotMessageRender = (0, react_1.useCallback)((text) => {
        return botMessageRenderFunction ? (botMessageRenderFunction(text)) : (react_1.default.createElement(material_1.Typography, null, text));
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
    return (react_1.default.createElement(material_1.Box, { sx: Object.assign({}, (_b = (_a = themeConfig.components) === null || _a === void 0 ? void 0 : _a.ChatBox) === null || _b === void 0 ? void 0 : _b.style) },
        react_1.default.createElement(material_1.List, { sx: { width: '100%', margin: 'auto' } },
            messages.map((message, index) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
                return (react_1.default.createElement(material_1.ListItem, { key: index, sx: {
                        display: 'flex',
                        flexDirection: message.user === botUser
                            ? 'row'
                            : ((_b = (_a = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components.MessageBubbleUser) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.flexDirection) ||
                                'row-reverse',
                        marginBottom: '1rem',
                    } },
                    !isMobile && (react_1.default.createElement(material_1.Avatar // Side avatar (outside of message bubble)
                    , { sx: Object.assign(Object.assign({}, (_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Avatar) === null || _d === void 0 ? void 0 : _d.style), { transition: 'opacity 0.5s ease-in-out', visibility: message.user === humanUser
                                ? (_f = (_e = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _e === void 0 ? void 0 : _e.Avatar) === null || _f === void 0 ? void 0 : _f.showSideUserAvatar
                                : (_h = (_g = themeConfig.components) === null || _g === void 0 ? void 0 : _g.Avatar) === null || _h === void 0 ? void 0 : _h.showSideBotAvatar }), src: message.user === botUser
                            ? (_k = (_j = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _j === void 0 ? void 0 : _j.Avatar) === null || _k === void 0 ? void 0 : _k.botAvatarUrl
                            : (_m = (_l = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _l === void 0 ? void 0 : _l.Avatar) === null || _m === void 0 ? void 0 : _m.userAvatarUrl })),
                    isMobile && (react_1.default.createElement(material_1.Avatar // Side avatar (outside of message bubble)
                    , { sx: Object.assign(Object.assign({}, (_p = (_o = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _o === void 0 ? void 0 : _o.Avatar) === null || _p === void 0 ? void 0 : _p.style), { width: '20px', height: '20px', position: 'absolute', top: '0', outline: '1px solid #b8bb26', visibility: message.user === humanUser
                                ? (_r = (_q = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _q === void 0 ? void 0 : _q.Avatar) === null || _r === void 0 ? void 0 : _r.showSideUserAvatar
                                : (_t = (_s = themeConfig.components) === null || _s === void 0 ? void 0 : _s.Avatar) === null || _t === void 0 ? void 0 : _t.showSideBotAvatar }), src: message.user === botUser
                            ? (_v = (_u = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _u === void 0 ? void 0 : _u.Avatar) === null || _v === void 0 ? void 0 : _v.botAvatarUrl
                            : (_x = (_w = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _w === void 0 ? void 0 : _w.Avatar) === null || _x === void 0 ? void 0 : _x.userAvatarUrl })),
                    message.user === botUser ? (react_1.default.createElement(material_1.Box, { sx: {
                            display: 'flex',
                            flexDirection: ((_y = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.chatLayoutConfig) === null || _y === void 0 ? void 0 : _y.botMessageStackDirection) || 'column',
                        } },
                        react_1.default.createElement(material_1.Box, { sx: {
                                display: 'flex',
                            } }, message.reference && ReferenceRender(message.reference)),
                        react_1.default.createElement(material_1.Box, { sx: {
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1em',
                            } },
                            react_1.default.createElement(material_1.Avatar, { sx: Object.assign({}, (_0 = (_z = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _z === void 0 ? void 0 : _z.Avatar) === null || _0 === void 0 ? void 0 : _0.style), src: (_2 = (_1 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _1 === void 0 ? void 0 : _1.Avatar) === null || _2 === void 0 ? void 0 : _2.botAvatarUrl }),
                            react_1.default.createElement(material_1.Typography, { variant: "h6", color: (_5 = (_4 = (_3 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _3 === void 0 ? void 0 : _3.MessageBubbleBot) === null || _4 === void 0 ? void 0 : _4.style) === null || _5 === void 0 ? void 0 : _5.color },
                                ' ',
                                "Response",
                                ' ')),
                        react_1.default.createElement(material_1.Box, { sx: Object.assign({}, (_7 = (_6 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _6 === void 0 ? void 0 : _6.MessageBubbleBot) === null || _7 === void 0 ? void 0 : _7.style) },
                            react_1.default.createElement(material_1.Box, { sx: { display: 'flex', justifyContent: 'left', textAlign: 'left' } },
                                message.text && BotMessageRender(message.text),
                                message.graphData && GraphicalRender(message.graphData) // Button to show graph
                            ),
                            react_1.default.createElement(material_1.Divider, null),
                            message.graphData && DataRender(message.graphData)),
                        react_1.default.createElement(material_1.Box, { sx: {
                                display: 'flex',
                            } }, message.related && RelatedQuestionsRender(message.related)))) : (react_1.default.createElement(material_1.Box, { sx: (_9 = (_8 = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _8 === void 0 ? void 0 : _8.MessageBubbleUser) === null || _9 === void 0 ? void 0 : _9.style }, UserMessageRender(message.text)))));
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
        react_1.default.createElement("div", { ref: messagesEndRef }),
        react_1.default.createElement("div", { style: {
                height: '100px',
            } })));
};
exports.default = ChatbotCore;