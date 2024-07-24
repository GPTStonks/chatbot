'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const material_1 = require('@mui/material');
const DefaultRenderers_1 = __importDefault(require('../renderers/DefaultRenderers'));
const LinearBuffer_1 = __importDefault(require('./LinearBuffer'));
const react_1 = __importDefault(require('react'));
const {
  defaultWelcomeMessageRenderFunction,
  defaultBotMessageRenderFunction,
  defaultUserMessageRenderFunction,
  defaultSubqueryRenderFunction,
  defaultLoadingRenderFunction,
} = DefaultRenderers_1.default;
const ChatbotCore = ({
  messages,
  themeConfig,
  loaderType = 1,
  apiConfig,
  isMobile,
  botUser,
  humanUser,
  botMessage,
  messagesEndRef,
  isAnyMessageLoading,
  showLinearLoader,
  sendCustomMessage,
  welcomeMessageRenderFunction = defaultWelcomeMessageRenderFunction,
  botMessageRenderFunction = defaultBotMessageRenderFunction,
  userMessageRenderFunction = defaultUserMessageRenderFunction,
  dataRenderFunction = (data) => null,
  providerRenderFunction = (providers) => null,
  referenceRenderFunction = (reference) => null,
  relatedQuestionsRenderFunction = (relatedQuestions, sendCustomMessage) => null,
  subqueryRenderFunction = defaultSubqueryRenderFunction,
  loadingRenderFunction = defaultLoadingRenderFunction,
}) => {
  var _a, _b, _c, _d, _e, _f;
  const subquery_arrays = {
    subqueryQuestions:
      botMessage === null || botMessage === void 0 ? void 0 : botMessage.subqueryQuestion,
    subqueryResponses:
      botMessage === null || botMessage === void 0 ? void 0 : botMessage.subqueryResponse,
  };
  const getMessage = (text) => {
    if (apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.modelStepTypes) {
      const modelStepTypes = apiConfig.modelStepTypes;
      if (modelStepTypes.hasOwnProperty(text)) {
        return modelStepTypes[text];
      }
    }
    return `Preparing content from ${text}...`;
  };
  return react_1.default.createElement(
    material_1.Box,
    {
      sx: Object.assign(
        {},
        (_b = (_a = themeConfig.components) === null || _a === void 0 ? void 0 : _a.ChatBox) ===
          null || _b === void 0
          ? void 0
          : _b.style,
      ),
    },
    messages.length === 0 && welcomeMessageRenderFunction(sendCustomMessage),
    react_1.default.createElement(
      material_1.List,
      null,
      messages.map((message, index) => {
        var _a,
          _b,
          _c,
          _d,
          _e,
          _f,
          _g,
          _h,
          _j,
          _k,
          _l,
          _m,
          _o,
          _p,
          _q,
          _r,
          _s,
          _t,
          _u,
          _v,
          _w,
          _x,
          _y,
          _z,
          _0,
          _1,
          _2,
          _3,
          _4,
          _5,
          _6,
          _7,
          _8,
          _9,
          _10,
          _11,
          _12;
        return react_1.default.createElement(
          material_1.ListItem,
          {
            key: index,
            sx: {
              display: 'flex',
              flexDirection:
                message.user === botUser
                  ? 'row'
                  : ((_c =
                      (_b =
                        (_a =
                          themeConfig === null || themeConfig === void 0
                            ? void 0
                            : themeConfig.components) === null || _a === void 0
                          ? void 0
                          : _a.MessageBubbleUser) === null || _b === void 0
                        ? void 0
                        : _b.style) === null || _c === void 0
                      ? void 0
                      : _c.flexDirection) || 'row-reverse',
            },
          },
          !isMobile &&
            ((((_e =
              (_d =
                themeConfig === null || themeConfig === void 0
                  ? void 0
                  : themeConfig.components) === null || _d === void 0
                ? void 0
                : _d.Avatar) === null || _e === void 0
              ? void 0
              : _e.showSideUserAvatar) &&
              message.user === humanUser) ||
              (((_g =
                (_f =
                  themeConfig === null || themeConfig === void 0
                    ? void 0
                    : themeConfig.components) === null || _f === void 0
                  ? void 0
                  : _f.Avatar) === null || _g === void 0
                ? void 0
                : _g.showSideBotAvatar) &&
                message.user === botUser)) &&
            react_1.default.createElement(material_1.Avatar, {
              sx: Object.assign(
                Object.assign(
                  {},
                  (_j =
                    (_h =
                      themeConfig === null || themeConfig === void 0
                        ? void 0
                        : themeConfig.components) === null || _h === void 0
                      ? void 0
                      : _h.Avatar) === null || _j === void 0
                    ? void 0
                    : _j.style,
                ),
                { transition: 'opacity 0.5s ease-in-out' },
              ),
              src:
                message.user === botUser
                  ? (_l =
                      (_k =
                        themeConfig === null || themeConfig === void 0
                          ? void 0
                          : themeConfig.components) === null || _k === void 0
                        ? void 0
                        : _k.Avatar) === null || _l === void 0
                    ? void 0
                    : _l.botAvatarUrl
                  : (_o =
                        (_m =
                          themeConfig === null || themeConfig === void 0
                            ? void 0
                            : themeConfig.components) === null || _m === void 0
                          ? void 0
                          : _m.Avatar) === null || _o === void 0
                    ? void 0
                    : _o.userAvatarUrl,
            }),
          isMobile &&
            ((((_q =
              (_p =
                themeConfig === null || themeConfig === void 0
                  ? void 0
                  : themeConfig.components) === null || _p === void 0
                ? void 0
                : _p.Avatar) === null || _q === void 0
              ? void 0
              : _q.showSideUserAvatar) &&
              message.user === humanUser) ||
              (((_s =
                (_r =
                  themeConfig === null || themeConfig === void 0
                    ? void 0
                    : themeConfig.components) === null || _r === void 0
                  ? void 0
                  : _r.Avatar) === null || _s === void 0
                ? void 0
                : _s.showSideBotAvatar) &&
                message.user === botUser)) &&
            react_1.default.createElement(material_1.Avatar, {
              sx: Object.assign(
                Object.assign(
                  {},
                  (_u =
                    (_t =
                      themeConfig === null || themeConfig === void 0
                        ? void 0
                        : themeConfig.components) === null || _t === void 0
                      ? void 0
                      : _t.Avatar) === null || _u === void 0
                    ? void 0
                    : _u.style,
                ),
                {
                  width: '20px',
                  height: '20px',
                  position: 'absolute',
                  top: '0',
                  outline: '1px solid #b8bb26',
                },
              ),
              src:
                message.user === botUser
                  ? (_w =
                      (_v =
                        themeConfig === null || themeConfig === void 0
                          ? void 0
                          : themeConfig.components) === null || _v === void 0
                        ? void 0
                        : _v.Avatar) === null || _w === void 0
                    ? void 0
                    : _w.botAvatarUrl
                  : (_y =
                        (_x =
                          themeConfig === null || themeConfig === void 0
                            ? void 0
                            : themeConfig.components) === null || _x === void 0
                          ? void 0
                          : _x.Avatar) === null || _y === void 0
                    ? void 0
                    : _y.userAvatarUrl,
            }),
          message.user === botUser
            ? react_1.default.createElement(
                material_1.Box,
                {
                  sx: {
                    display: 'flex',
                    flexDirection:
                      ((_z =
                        themeConfig === null || themeConfig === void 0
                          ? void 0
                          : themeConfig.chatLayoutConfig) === null || _z === void 0
                        ? void 0
                        : _z.botMessageStackDirection) || 'column',
                  },
                },
                ((_0 = themeConfig.chatLayoutConfig) === null || _0 === void 0
                  ? void 0
                  : _0.responseHeader) &&
                  react_1.default.createElement(
                    material_1.Box,
                    {
                      sx: {
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1em',
                        marginTop: '15px',
                      },
                    },
                    react_1.default.createElement(material_1.Avatar, {
                      sx: Object.assign(
                        {},
                        (_2 =
                          (_1 =
                            themeConfig === null || themeConfig === void 0
                              ? void 0
                              : themeConfig.components) === null || _1 === void 0
                            ? void 0
                            : _1.Avatar) === null || _2 === void 0
                          ? void 0
                          : _2.style,
                      ),
                      src:
                        (_4 =
                          (_3 =
                            themeConfig === null || themeConfig === void 0
                              ? void 0
                              : themeConfig.components) === null || _3 === void 0
                            ? void 0
                            : _3.Avatar) === null || _4 === void 0
                          ? void 0
                          : _4.botAvatarUrl,
                    }),
                    react_1.default.createElement(
                      material_1.Typography,
                      {
                        variant: 'h6',
                        color:
                          (_7 =
                            (_6 =
                              (_5 =
                                themeConfig === null || themeConfig === void 0
                                  ? void 0
                                  : themeConfig.components) === null || _5 === void 0
                                ? void 0
                                : _5.MessageBubbleBot) === null || _6 === void 0
                              ? void 0
                              : _6.style) === null || _7 === void 0
                            ? void 0
                            : _7.color,
                      },
                      'Response',
                    ),
                  ),
                react_1.default.createElement(
                  material_1.Box,
                  {
                    sx: Object.assign(
                      { display: 'flex', flexDirection: 'column' },
                      (_9 =
                        (_8 =
                          themeConfig === null || themeConfig === void 0
                            ? void 0
                            : themeConfig.components) === null || _8 === void 0
                          ? void 0
                          : _8.MessageBubbleBot) === null || _9 === void 0
                        ? void 0
                        : _9.style,
                    ),
                  },
                  react_1.default.createElement(
                    material_1.Box,
                    { sx: { display: 'flex' } },
                    message.text &&
                      react_1.default.createElement(
                        material_1.Box,
                        {
                          sx: {
                            display: 'flex',
                            flexDirection: message.stream ? 'column' : 'row',
                            justifyContent: message.stream ? 'center' : 'flex-start',
                            alignItems: message.stream ? 'center' : 'flex-start',
                            maxWidth: '100%',
                          },
                        },
                        botMessageRenderFunction(
                          message,
                          (_10 = messages[index - 1]) === null || _10 === void 0
                            ? void 0
                            : _10.text,
                        ),
                      ),
                  ),
                  react_1.default.createElement(
                    material_1.Box,
                    { sx: { display: 'flex' } },
                    message.subqueryQuestion &&
                      message.subqueryResponse &&
                      subqueryRenderFunction(message.subqueryQuestion, message.subqueryResponse),
                  ),
                  react_1.default.createElement(
                    material_1.Box,
                    { sx: { display: 'flex' } },
                    message.providers && providerRenderFunction(message.providers),
                  ),
                  react_1.default.createElement(
                    material_1.Box,
                    { sx: { display: 'flex' } },
                    message.reference && referenceRenderFunction(message.reference),
                  ),
                  (message.streamCompleted || message.stream) &&
                    dataRenderFunction(message.graphData),
                ),
                react_1.default.createElement(
                  material_1.Box,
                  { sx: { display: 'flex' } },
                  message.related &&
                    relatedQuestionsRenderFunction(message.related, sendCustomMessage),
                ),
              )
            : react_1.default.createElement(
                material_1.Box,
                {
                  sx:
                    (_12 =
                      (_11 =
                        themeConfig === null || themeConfig === void 0
                          ? void 0
                          : themeConfig.components) === null || _11 === void 0
                        ? void 0
                        : _11.MessageBubbleUser) === null || _12 === void 0
                      ? void 0
                      : _12.style,
                },
                userMessageRenderFunction(message.text),
              ),
        );
      }),
      botMessage &&
        isAnyMessageLoading &&
        !showLinearLoader &&
        react_1.default.createElement(
          material_1.ListItem,
          { sx: { display: 'flex', flexDirection: 'row' } },
          loadingRenderFunction(
            getMessage(botMessage.text),
            themeConfig,
            subquery_arrays,
            loaderType,
          ),
        ),
      showLinearLoader &&
        react_1.default.createElement(
          material_1.ListItem,
          { sx: { display: 'flex', flexDirection: 'row', maxWidth: isMobile ? '70vw' : '40vw' } },
          react_1.default.createElement(material_1.Avatar, {
            sx: Object.assign(
              { marginRight: '1rem' },
              (_d =
                (_c =
                  themeConfig === null || themeConfig === void 0
                    ? void 0
                    : themeConfig.components) === null || _c === void 0
                  ? void 0
                  : _c.Avatar) === null || _d === void 0
                ? void 0
                : _d.style,
            ),
            src:
              (_f =
                (_e =
                  themeConfig === null || themeConfig === void 0
                    ? void 0
                    : themeConfig.components) === null || _e === void 0
                  ? void 0
                  : _e.Avatar) === null || _f === void 0
                ? void 0
                : _f.botAvatarUrl,
          }),
          react_1.default.createElement(LinearBuffer_1.default, null),
        ),
    ),
    react_1.default.createElement('div', { ref: messagesEndRef }),
    react_1.default.createElement('div', { style: { height: '100px' } }),
  );
};
exports.default = ChatbotCore;
