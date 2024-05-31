"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
const google_1 = require("next/font/google");
require("./globals.css");
const react_1 = __importDefault(require("react"));
const inter = (0, google_1.Inter)({ subsets: ['latin'] });
exports.metadata = {
    title: 'GPTStonks Chatbot',
    description: 'A fully customizable chatbot for your website.',
};
function RootLayout({ children, }) {
    return (<html lang="en">
      <body className={inter.className}>{children}</body>
    </html>);
}
exports.default = RootLayout;
