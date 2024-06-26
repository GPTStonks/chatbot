"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const ArrowUpward_1 = __importDefault(require("@mui/icons-material/ArrowUpward"));
const react_2 = __importDefault(require("react"));
const ChatbotInput = ({ isMobile, themeConfig, newMessage, setNewMessage, handleKeyDown, handleSendMessage, isAnyMessageLoading, multimodeChat, multimodeRenderFunction, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const MultiModeRender = (0, react_1.useCallback)((modes) => {
        return multimodeRenderFunction ? multimodeRenderFunction(modes) : null;
    }, [multimodeRenderFunction]);
    return (react_2.default.createElement(material_1.Box, { sx: Object.assign(Object.assign({}, (_b = (_a = themeConfig.components) === null || _a === void 0 ? void 0 : _a.LowPartBox) === null || _b === void 0 ? void 0 : _b.style), { width: isMobile ? '90vw' : ((_e = (_d = (_c = themeConfig.components) === null || _c === void 0 ? void 0 : _c.LowPartBox) === null || _d === void 0 ? void 0 : _d.style) === null || _e === void 0 ? void 0 : _e.width) || '60%' }) },
        react_2.default.createElement(material_1.Box, { sx: {
                display: 'flex',
                flexDirection: 'column',
                width: isMobile ? '90vw' : ((_h = (_g = (_f = themeConfig.components) === null || _f === void 0 ? void 0 : _f.LowPartBox) === null || _g === void 0 ? void 0 : _g.style) === null || _h === void 0 ? void 0 : _h.width) || '60%',
            } },
            react_2.default.createElement(material_1.TextField, { fullWidth: ((_k = (_j = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _j === void 0 ? void 0 : _j.TextField) === null || _k === void 0 ? void 0 : _k.fullWidth) || true, multiline: true, minRows: 1, maxRows: 2, value: newMessage, onChange: (e) => setNewMessage(e.target.value), onKeyDown: handleKeyDown, size: "small", label: isAnyMessageLoading
                    ? ''
                    : ((_m = (_l = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _l === void 0 ? void 0 : _l.TextField) === null || _m === void 0 ? void 0 : _m.label) || 'Ask our chatbot!', InputProps: {
                    style: Object.assign(Object.assign({}, (_p = (_o = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _o === void 0 ? void 0 : _o.TextField) === null || _p === void 0 ? void 0 : _p.style), { opacity: isAnyMessageLoading ? 0.2 : 1 }),
                    endAdornment: (react_2.default.createElement(material_1.InputAdornment, { position: "end" }, isAnyMessageLoading ? (react_2.default.createElement(material_1.CircularProgress, { size: 24 })) : (react_2.default.createElement(material_1.IconButton, { onClick: handleSendMessage, disabled: isAnyMessageLoading, size: isMobile ? 'small' : 'medium', sx: Object.assign(Object.assign({}, (_r = (_q = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _q === void 0 ? void 0 : _q.Button) === null || _r === void 0 ? void 0 : _r.style), { '&:hover': {
                                backgroundColor: ((_t = (_s = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _s === void 0 ? void 0 : _s.Button) === null || _t === void 0 ? void 0 : _t.hoverBackgroundColor) || '#b8bb26',
                            }, minWidth: 'auto' }) },
                        react_2.default.createElement(ArrowUpward_1.default, { fontSize: isMobile ? 'small' : 'medium' }))))),
                } }),
            multimodeChat &&
                MultiModeRender(Object.values(multimodeChat).map((item) => item.value))),
        ((_v = (_u = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _u === void 0 ? void 0 : _u.Disclaimer) === null || _v === void 0 ? void 0 : _v.appears) && (react_2.default.createElement(material_1.Typography, { sx: themeConfig.components.Disclaimer.style }, ((_x = (_w = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.components) === null || _w === void 0 ? void 0 : _w.Disclaimer) === null || _x === void 0 ? void 0 : _x.text) ||
            'This is an open-source chatbot. Have some fun and enjoy! 🚀'))));
};
exports.default = ChatbotInput;
