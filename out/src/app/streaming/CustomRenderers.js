"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingMessageRender = exports.ErrorRenderFunction = exports.ProviderRender = exports.SubqueryRender = exports.UserMessageRender = exports.BotMessageRender = exports.WelcomeMessageRender = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_loader_spinner_1 = require("react-loader-spinner");
const Loading_1 = __importDefault(require("./test/Loading"));
const WelcomeMessageRender = (sendCustomMessage) => (react_1.default.createElement(material_1.Box, { sx: {
        position: 'fixed',
        width: '100vw',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    } },
    react_1.default.createElement(material_1.Typography, { variant: "h4", sx: { color: 'white' } }, "Welcome! How can I help you today?")));
exports.WelcomeMessageRender = WelcomeMessageRender;
const BotMessageRender = (message, input) => (react_1.default.createElement(material_1.Box, { sx: {
        maxWidth: '100%',
        overflowWrap: 'break-word',
    } },
    react_1.default.createElement(material_1.Typography, null, message.text)));
exports.BotMessageRender = BotMessageRender;
const UserMessageRender = (text) => (react_1.default.createElement(material_1.Box, null,
    react_1.default.createElement(material_1.Typography, null, text)));
exports.UserMessageRender = UserMessageRender;
const SubqueryRender = (subqueryQuestion, subqueryResponse) => (react_1.default.createElement(material_1.Box, null,
    react_1.default.createElement(material_1.Typography, null, subqueryQuestion.join(', ')),
    react_1.default.createElement(material_1.Typography, null, subqueryResponse.join(', '))));
exports.SubqueryRender = SubqueryRender;
const ProviderRender = (providers) => (react_1.default.createElement(material_1.Box, null,
    react_1.default.createElement(material_1.Typography, null, providers.join(', '))));
exports.ProviderRender = ProviderRender;
const ErrorRenderFunction = (error) => (react_1.default.createElement(material_1.Box, { sx: {
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '3px 15px',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    } },
    react_1.default.createElement(material_1.Typography, null, error)));
exports.ErrorRenderFunction = ErrorRenderFunction;
const LoadingMessageRender = (text, themeConfig, subquery_arrays, type = 1) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    if (type === 1) {
        return (react_1.default.createElement(material_1.Box, { display: "flex", flexDirection: "row", alignItems: "center" },
            react_1.default.createElement(material_1.Avatar, { sx: Object.assign({ marginRight: '1rem' }, (_b = (_a = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _a === void 0 ? void 0 : _a.Avatar) === null || _b === void 0 ? void 0 : _b.style), src: (_d = (_c = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _c === void 0 ? void 0 : _c.Avatar) === null || _d === void 0 ? void 0 : _d.botAvatarUrl }),
            react_1.default.createElement(material_1.Box, { sx: Object.assign({}, (_f = (_e = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _e === void 0 ? void 0 : _e.LoaderBot) === null || _f === void 0 ? void 0 : _f.style) },
                react_1.default.createElement(react_loader_spinner_1.DNA, { visible: true, height: "60", width: "60", ariaLabel: "dna-loading", wrapperStyle: {}, wrapperClass: "dna-wrapper" }),
                react_1.default.createElement(material_1.Typography, { sx: { marginLeft: '1rem' } }, text))));
    }
    else if (type === 2) {
        return (react_1.default.createElement(material_1.Box, { display: "flex", flexDirection: "row", alignItems: "center" },
            react_1.default.createElement(material_1.Avatar, { sx: Object.assign({ marginRight: '1rem' }, (_h = (_g = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _g === void 0 ? void 0 : _g.Avatar) === null || _h === void 0 ? void 0 : _h.style), src: (_k = (_j = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _j === void 0 ? void 0 : _j.Avatar) === null || _k === void 0 ? void 0 : _k.botAvatarUrl }),
            react_1.default.createElement(material_1.Box, { sx: Object.assign({}, (_m = (_l = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _l === void 0 ? void 0 : _l.LoaderBot) === null || _m === void 0 ? void 0 : _m.style) },
                react_1.default.createElement(react_loader_spinner_1.MutatingDots, { visible: true, height: "60", width: "60", color: "#4fa94d", secondaryColor: "#4fa94d", radius: "12.5", ariaLabel: "mutating-dots-loading", wrapperStyle: {}, wrapperClass: "" }),
                react_1.default.createElement(material_1.Typography, { sx: { marginLeft: '1rem' } }, text))));
    }
    else {
        return (react_1.default.createElement(material_1.Box, { display: "flex", flexDirection: "row", alignItems: "center" },
            react_1.default.createElement(material_1.Avatar, { sx: Object.assign({ marginRight: '1rem' }, (_p = (_o = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _o === void 0 ? void 0 : _o.Avatar) === null || _p === void 0 ? void 0 : _p.style), src: (_r = (_q = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _q === void 0 ? void 0 : _q.Avatar) === null || _r === void 0 ? void 0 : _r.botAvatarUrl }),
            react_1.default.createElement(material_1.Box, { sx: Object.assign({}, (_t = (_s = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _s === void 0 ? void 0 : _s.LoaderBot) === null || _t === void 0 ? void 0 : _t.style) },
                react_1.default.createElement(Loading_1.default, null))));
    }
};
exports.LoadingMessageRender = LoadingMessageRender;
