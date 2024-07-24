'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const material_1 = require('@mui/material');
const react_1 = __importDefault(require('react'));
const react_loader_spinner_1 = require('react-loader-spinner');
const defaultWelcomeMessageRenderFunction = (sendCustomMessage) =>
  react_1.default.createElement(
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
const defaultBotMessageRenderFunction = (message, input) =>
  react_1.default.createElement(
    material_1.Box,
    {
      sx: {
        maxWidth: '100%',
        overflowWrap: 'break-word',
      },
    },
    react_1.default.createElement(material_1.Typography, null, message.text),
  );
const defaultUserMessageRenderFunction = (text) =>
  react_1.default.createElement(
    material_1.Box,
    null,
    react_1.default.createElement(material_1.Typography, null, text),
  );
const defaultSubqueryRenderFunction = (subqueryQuestion, subqueryResponse) =>
  react_1.default.createElement(
    material_1.Box,
    null,
    react_1.default.createElement(
      material_1.Typography,
      { variant: 'h5' },
      subqueryQuestion.join(', '),
    ),
    react_1.default.createElement(
      material_1.Typography,
      { variant: 'h6' },
      subqueryResponse.join(', '),
    ),
  );
const defaultLoadingRenderFunction = (text, themeConfig, subquery_arrays, type = 1) => {
  var _a, _b, _c, _d, _e, _f;
  return react_1.default.createElement(
    material_1.Box,
    { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    react_1.default.createElement(material_1.Avatar, {
      sx: Object.assign(
        { marginRight: '1rem' },
        (_b =
          (_a =
            themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) ===
            null || _a === void 0
            ? void 0
            : _a.Avatar) === null || _b === void 0
          ? void 0
          : _b.style,
      ),
      src:
        (_d =
          (_c =
            themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) ===
            null || _c === void 0
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
              themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) ===
              null || _e === void 0
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
      react_1.default.createElement(material_1.Typography, { sx: { marginLeft: '1rem' } }, text),
    ),
  );
};
const DefaultRenderFunctions = {
  defaultWelcomeMessageRenderFunction,
  defaultBotMessageRenderFunction,
  defaultUserMessageRenderFunction,
  defaultSubqueryRenderFunction,
  defaultLoadingRenderFunction,
};
exports.default = DefaultRenderFunctions;
