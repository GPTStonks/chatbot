"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GptstonksChatbotTheme_1 = __importDefault(require("@/components/chat/GptstonksChatbotTheme"));
const ChatbotWebsocketStreaming_1 = __importDefault(require("@/layouts/ChatbotWebsocketStreaming"));
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const MarkdownRender_1 = require("../../components/gptstonks/MarkdownRender");
const MuiTable_1 = __importDefault(require("../../components/gptstonks/MuiTable"));
const References_1 = require("../../components/gptstonks/References");
const RelatedQuestions_1 = require("../../components/gptstonks/RelatedQuestions");
function Home() {
    const [initializedChat, setInitializedChat] = react_1.default.useState(false);
    const [chatData, setChatData] = react_1.default.useState(null);
    const [shownIndex, setShownIndex] = react_1.default.useState(0);
    const themeConfig = GptstonksChatbotTheme_1.default;
    const isMobile = (0, material_1.useMediaQuery)('(max-width:750px)');
    const spaceAround = '20vw';
    const spaceBetween = '60vw';
    return (react_1.default.createElement("main", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#080808',
        } },
        react_1.default.createElement("div", { style: { display: 'flex', width: isMobile ? '0vw' : spaceAround, height: '100%' } }),
        react_1.default.createElement("div", { style: { display: 'flex', width: isMobile ? '96vw' : spaceBetween, height: '100%' } },
            react_1.default.createElement(ChatbotWebsocketStreaming_1.default, { apiConfig: {
                    auth: true,
                    tokenName: 'userToken',
                    fetchFunction: '',
                    apiQueryEndpoint: 'ws://localhost:8000/chatws',
                    queryParams: {
                        type: 'type',
                        data: 'result_data',
                        text: 'body',
                        reference: 'references',
                        related: 'follow_up_questions',
                        stream: 'stream_step',
                    },
                }, themeConfig: themeConfig, setDataForParent: (data) => {
                    setChatData(data);
                }, onApiResponseCode: (bool) => {
                    setInitializedChat(bool);
                }, userMessageRenderFunction: (text) => (react_1.default.createElement(material_1.Box, { sx: { maxWidth: '100%', overflowWrap: 'break-word' } },
                    react_1.default.createElement(material_1.Tooltip, { title: text, placement: "top", arrow: true },
                        react_1.default.createElement(material_1.Typography, { variant: "h4", sx: {
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                textOverflow: 'ellipsis',
                                width: '100%',
                            } }, text)))), botMessageRenderFunction: (message) => (react_1.default.createElement(material_1.Box, { sx: {
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                    } },
                    react_1.default.createElement(MarkdownRender_1.MarkdownRender, { messageDict: message }))), dataRenderFunction: (data) => (react_1.default.createElement(material_1.Box, { sx: {
                        maxWidth: isMobile ? '90vw' : spaceBetween,
                    } },
                    react_1.default.createElement(MuiTable_1.default, { data: data, shownIndex: setShownIndex }))), referenceRenderFunction: (reference) => (react_1.default.createElement(material_1.Box, { sx: {
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                    } },
                    react_1.default.createElement(References_1.References, { references: reference }))), relatedQuestionsRenderFunction: (relatedQuestions, sendCustomMessage) => (react_1.default.createElement(material_1.Box, { sx: {
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                    } },
                    react_1.default.createElement(RelatedQuestions_1.RelatedQuestions, { questions: relatedQuestions, sendCustomMessage: sendCustomMessage }))) })),
        react_1.default.createElement("div", { style: { display: 'flex', width: isMobile ? '0vw' : spaceAround, height: '100%' } })));
}
exports.default = Home;
