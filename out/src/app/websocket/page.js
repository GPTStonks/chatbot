"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatbot_1 = require("../chatbot");
const react_1 = __importDefault(require("react"));
function Home() {
    const [initializedChat, setInitializedChat] = react_1.default.useState(false);
    return (react_1.default.createElement("main", { className: "flex min-h-screen flex-col items-center justify-center p-24", style: {
            position: 'absolute',
            bottom: '0',
            height: '100vh',
            backgroundColor: '#080808',
        } },
        react_1.default.createElement(chatbot_1.ChatbotWebsocket, { apiConfig: {
                isWebsocket: true,
                auth: false,
                tokenName: 'userToken',
                fetchFunction: '',
                apiQueryEndpoint: 'ws://localhost:8000/chatws',
                queryParams: {
                    type: 'type',
                    data: 'result_data',
                    text: 'body',
                },
            }, themeConfig: chatbot_1.useChatbotDefaultTheme, onApiResponseCode: (bool) => {
                setInitializedChat(bool);
            }, dataRenderFunction: (data) => react_1.default.createElement("div", null, data), graphicalDataRenderFunction: (data) => react_1.default.createElement("div", null, data), referenceRenderFunction: (reference) => react_1.default.createElement("div", null, reference), relatedQuestionsRenderFunction: (relatedQuestions) => (react_1.default.createElement("div", null, relatedQuestions)), errorRenderFunction: (error) => react_1.default.createElement("div", null, error) })));
}
exports.default = Home;
