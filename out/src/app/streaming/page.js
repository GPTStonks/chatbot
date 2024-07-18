'use strict';
'use client';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const ChatbotDefaultTheme_1 = __importDefault(require('@/components/chat/ChatbotDefaultTheme'));
const ChatbotWebsocketStreaming_1 = __importDefault(require('@/layouts/ChatbotWebsocketStreaming'));
const material_1 = require('@mui/material');
const react_1 = __importStar(require('react'));
function Home() {
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
  return react_1.default.createElement(
    'main',
    {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#080808',
      },
    },
    react_1.default.createElement('div', { style: { width: '20vw', height: '100%' } }),
    react_1.default.createElement(
      'div',
      { style: { width: '100%', height: '100%' } },
      react_1.default.createElement(ChatbotWebsocketStreaming_1.default, {
        multimodeChat: multimodeChat,
        multimodeRenderFunction: (modes) =>
          react_1.default.createElement(
            material_1.Box,
            {
              sx: {
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
              },
            },
            modes.map((mode, index) =>
              react_1.default.createElement(
                material_1.Button,
                {
                  key: index,
                  onClick: () => {
                    const newMultimodeChat = Object.assign({}, multimodeChat);
                    Object.keys(newMultimodeChat).forEach((key) => {
                      newMultimodeChat[key].isActivated = false;
                    });
                    newMultimodeChat[`mode${index + 1}`].isActivated = true;
                    setMultimodeChat(newMultimodeChat);
                    console.log('Multimode chat:', newMultimodeChat);
                  },
                },
                mode,
              ),
            ),
          ),
        preloadedMessages: preloadedMessages,
        apiConfig: {
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
        },
        themeConfig: themeConfig,
        errorRenderFunction: (error) =>
          react_1.default.createElement(
            material_1.Box,
            {
              sx: {
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '3px 15px',
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
            },
            react_1.default.createElement(material_1.Typography, null, error),
          ),
        setDataForParent: (data) => {
          setChatData(data);
        },
        onApiResponseCode: (bool) => {
          setInitializedChat(bool);
        },
        userMessageRenderFunction: (text) =>
          react_1.default.createElement(
            material_1.Box,
            null,
            react_1.default.createElement(material_1.Typography, null, text),
          ),
        botMessageRenderFunction: (message) =>
          react_1.default.createElement(
            material_1.Box,
            {
              sx: {
                maxWidth: '100%',
                overflowWrap: 'break-word',
              },
            },
            react_1.default.createElement(material_1.Typography, null, message.text),
          ),
        subqueryRenderFunction: (subqueryQuestion, subqueryResponse) =>
          react_1.default.createElement(
            material_1.Box,
            null,
            react_1.default.createElement(material_1.Typography, null, subqueryQuestion.join(', ')),
            react_1.default.createElement(material_1.Typography, null, subqueryResponse.join(', ')),
          ),
      }),
    ),
    react_1.default.createElement('div', { style: { width: '20vw', height: '100%' } }),
  );
}
exports.default = Home;
