'use strict';
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
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importStar(require('react'));
const material_1 = require('@mui/material');
const react_loader_spinner_1 = require('react-loader-spinner');
const material_2 = require('@mui/material');
const RenderFunctions = ({
  welcomeMessageRenderFunction,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  providerRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  subqueryRenderFunction,
  loadingRenderFunction,
}) => {
  const WelcomeMessageRender = (0, react_1.useCallback)(
    (sendCustomMessage) => {
      return welcomeMessageRenderFunction
        ? welcomeMessageRenderFunction(sendCustomMessage)
        : react_1.default.createElement(
            material_1.Box,
            {
              sx: {
                position: 'fixed',
                width: '100vw',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              },
            },
            react_1.default.createElement(
              material_1.Typography,
              { variant: 'h4', sx: { color: 'white' } },
              'Welcome! How can I help you today?',
            ),
          );
    },
    [welcomeMessageRenderFunction],
  );
  const BotMessageRender = (0, react_1.useCallback)(
    (message, input) => {
      return botMessageRenderFunction
        ? botMessageRenderFunction(message, input)
        : react_1.default.createElement(material_1.Typography, null, message.text);
    },
    [botMessageRenderFunction],
  );
  const UserMessageRender = (0, react_1.useCallback)(
    (text) => {
      return userMessageRenderFunction
        ? userMessageRenderFunction(text)
        : react_1.default.createElement(
            material_1.Typography,
            {
              variant: 'h4',
              sx: {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
              },
            },
            text,
          );
    },
    [userMessageRenderFunction],
  );
  const DataRender = (0, react_1.useCallback)(
    (data) => {
      return dataRenderFunction ? dataRenderFunction(data) : null;
    },
    [dataRenderFunction],
  );
  const ProviderRender = (0, react_1.useCallback)(
    (providers) => {
      return providerRenderFunction ? providerRenderFunction(providers) : null;
    },
    [providerRenderFunction],
  );
  const ReferenceRender = (0, react_1.useCallback)(
    (reference) => {
      return referenceRenderFunction ? referenceRenderFunction(reference) : null;
    },
    [referenceRenderFunction],
  );
  const RelatedQuestionsRender = (0, react_1.useCallback)(
    (relatedQuestions, sendCustomMessage) => {
      return relatedQuestionsRenderFunction
        ? relatedQuestionsRenderFunction(relatedQuestions, sendCustomMessage)
        : null;
    },
    [relatedQuestionsRenderFunction],
  );
  const SubqueryRender = (0, react_1.useCallback)(
    (subqueryQuestion, subqueryResponse) => {
      return subqueryRenderFunction
        ? subqueryRenderFunction(subqueryQuestion, subqueryResponse)
        : null;
    },
    [subqueryRenderFunction],
  );
  const LoadingMessageRender = (0, react_1.useCallback)(
    (text, themeConfig, subquery_arrays, type = 1) => {
      var _a, _b, _c, _d, _e, _f;
      return loadingRenderFunction
        ? loadingRenderFunction(text, themeConfig, subquery_arrays, type)
        : react_1.default.createElement(
            material_1.Box,
            { display: 'flex', flexDirection: 'row', alignItems: 'center' },
            react_1.default.createElement(material_2.Avatar, {
              sx: Object.assign(
                { marginRight: '1rem' },
                (_b =
                  (_a =
                    themeConfig === null || themeConfig === void 0
                      ? void 0
                      : themeConfig.components) === null || _a === void 0
                    ? void 0
                    : _a.Avatar) === null || _b === void 0
                  ? void 0
                  : _b.style,
              ),
              src:
                (_d =
                  (_c =
                    themeConfig === null || themeConfig === void 0
                      ? void 0
                      : themeConfig.components) === null || _c === void 0
                    ? void 0
                    : _c.Avatar) === null || _d === void 0
                  ? void 0
                  : _d.botAvatarUrl,
            }),
            react_1.default.createElement(
              material_1.Box,
              {
                sx: Object.assign(
                  {},
                  (_f =
                    (_e =
                      themeConfig === null || themeConfig === void 0
                        ? void 0
                        : themeConfig.components) === null || _e === void 0
                      ? void 0
                      : _e.LoaderBot) === null || _f === void 0
                    ? void 0
                    : _f.style,
                ),
              },
              react_1.default.createElement(react_loader_spinner_1.DNA, {
                visible: true,
                height: '60',
                width: '60',
                ariaLabel: 'dna-loading',
                wrapperStyle: {},
                wrapperClass: 'dna-wrapper',
              }),
              react_1.default.createElement(
                material_1.Typography,
                { sx: { marginLeft: '1rem' } },
                text,
              ),
            ),
          );
    },
    [loadingRenderFunction],
  );
  return {
    WelcomeMessageRender,
    BotMessageRender,
    UserMessageRender,
    DataRender,
    ProviderRender,
    ReferenceRender,
    RelatedQuestionsRender,
    SubqueryRender,
    LoadingMessageRender,
  };
};
exports.default = RenderFunctions;
