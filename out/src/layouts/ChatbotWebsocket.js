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
const material_1 = require('@mui/material');
const styles_1 = require('@mui/material/styles');
const react_1 = __importStar(require('react'));
const ChatbotCore_1 = __importDefault(require('../components/chat/ChatbotCore'));
const ChatbotInput_1 = __importDefault(require('../components/chat/ChatbotInput'));
const useChatSocket_1 = __importDefault(require('../hooks/useChatSocket'));
const ChatbotWebsocket = ({
  className,
  apiConfig,
  loaderType,
  themeConfig,
  setDataForParent,
  onApiResponseCode,
  sendCustomMessage,
  welcomeMessageRenderFunction,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  providerRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  subqueryRenderFunction,
  errorRenderFunction,
  multimodeChat,
  multimodeRenderFunction,
  loadingRenderFunction,
}) => {
  var _a, _b, _c, _d, _e;
  const ErrorRender = (0, react_1.useCallback)(
    (error) => {
      return errorRenderFunction
        ? errorRenderFunction(error)
        : react_1.default.createElement(
            material_1.Dialog,
            { open: true },
            react_1.default.createElement(
              'div',
              {
                style: {
                  padding: '20px',
                  fontSize: '20px',
                  textAlign: 'center',
                },
              },
              '\u26A0\uFE0F ',
              error,
            ),
          );
    },
    [errorRenderFunction],
  );
  const humanUser = 'humanUser';
  const botUser = 'botUser';
  const isMobile = (0, material_1.useMediaQuery)('(max-width:750px)');
  const customTheme = (0, styles_1.createTheme)(
    themeConfig ? { palette: themeConfig.palette, typography: themeConfig.typography } : {},
  );
  const [messages, setMessages] = (0, react_1.useState)([]);
  const [newMessage, setNewMessage] = (0, react_1.useState)('');
  const [botMessage, setBotMessage] = (0, react_1.useState)(null);
  const messagesEndRef = (0, react_1.useRef)(null);
  const [isAnyMessageLoading, setIsAnyMessageLoading] = (0, react_1.useState)(false);
  const [showLinearLoader, setShowLinearLoader] = (0, react_1.useState)(false);
  const [token, setToken] = (0, react_1.useState)(null);
  const [graphData, setGraphData] = (0, react_1.useState)(null);
  if (
    !((_a = apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.queryEndpoint) ===
      null || _a === void 0
      ? void 0
      : _a.startsWith('ws'))
  ) {
    throw new Error('queryEndpoint should start with ws:// or wss:// for websocket');
  }
  const wsUrl = (0, react_1.useMemo)(() => {
    return apiConfig.queryEndpoint || '';
  }, [apiConfig.queryEndpoint]);
  const { sendMessage, lastMessage, connectionStatus, eventReason } = (0, useChatSocket_1.default)(
    wsUrl !== null && wsUrl !== void 0 ? wsUrl : '',
  );
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(JSON.stringify({ query: newMessage }));
    const userMessage = { text: newMessage, user: humanUser, loading: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage('');
  };
  const handleSendCustomMessage = (message) => {
    if (!message.trim()) return;
    sendMessage(JSON.stringify({ query: message }));
    const userMessage = { text: message, user: humanUser, loading: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
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
          user: botUser,
          loading: true,
        }));
      } else if (type === 'data') {
        setShowLinearLoader(true);
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: body,
              user: botUser,
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
    (_a = messagesEndRef.current) === null || _a === void 0
      ? void 0
      : _a.scrollIntoView({ behavior: 'smooth' });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
      event.preventDefault();
    }
  };
  return react_1.default.createElement(
    'div',
    { className: `chatbot-default ${className}`, style: Object.assign({}, themeConfig.style) },
    react_1.default.createElement(
      styles_1.ThemeProvider,
      { theme: customTheme },
      react_1.default.createElement(
        react_1.default.Fragment,
        null,
        connectionStatus === 'Closed' &&
          ErrorRender(eventReason ? eventReason : 'Connection closed unexpectedly'),
        react_1.default.createElement(ChatbotCore_1.default, {
          messages: messages,
          apiConfig: Object.assign({}, apiConfig),
          themeConfig: themeConfig,
          loaderType: loaderType ? loaderType : 1,
          botUser: botUser,
          humanUser: humanUser,
          botMessage: botMessage,
          messagesEndRef: messagesEndRef,
          showLinearLoader: showLinearLoader,
          isAnyMessageLoading: isAnyMessageLoading,
          isMobile: isMobile,
          sendCustomMessage: handleSendCustomMessage,
          welcomeMessageRenderFunction: welcomeMessageRenderFunction,
          botMessageRenderFunction: botMessageRenderFunction,
          userMessageRenderFunction: userMessageRenderFunction,
          dataRenderFunction: dataRenderFunction,
          providerRenderFunction: providerRenderFunction,
          referenceRenderFunction: referenceRenderFunction,
          relatedQuestionsRenderFunction: relatedQuestionsRenderFunction,
          subqueryRenderFunction: subqueryRenderFunction,
          loadingRenderFunction: loadingRenderFunction,
        }),
      ),
      ((_c =
        (_b = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) ===
          null || _b === void 0
          ? void 0
          : _b.Divider) === null || _c === void 0
        ? void 0
        : _c.appears) &&
        react_1.default.createElement(material_1.Divider, {
          sx:
            (_e =
              (_d =
                themeConfig === null || themeConfig === void 0
                  ? void 0
                  : themeConfig.components) === null || _d === void 0
                ? void 0
                : _d.Divider) === null || _e === void 0
              ? void 0
              : _e.style,
        }),
      react_1.default.createElement(ChatbotInput_1.default, {
        isMobile: isMobile,
        newMessage: newMessage,
        setNewMessage: setNewMessage,
        handleSendMessage: handleSendMessage,
        handleKeyDown: handleKeyDown,
        themeConfig: themeConfig,
        isAnyMessageLoading: isAnyMessageLoading,
        multimodeChat: multimodeChat,
        multimodeRenderFunction: (modes) => {
          var _a;
          return (_a =
            multimodeRenderFunction === null || multimodeRenderFunction === void 0
              ? void 0
              : multimodeRenderFunction(modes)) !== null && _a !== void 0
            ? _a
            : null;
        },
      }),
    ),
  );
};
exports.default = ChatbotWebsocket;
