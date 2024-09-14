"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
require("./styles.css"); // Asegúrate de tener un archivo CSS para los estilos
const data = {
    type: 'model_step',
    body: 'agent',
    subqueries_answered: [
        'Provide a list of memecoins that seem to be less correlated with BTC price action',
    ],
    subqueries_responses: [
        "Based on the information gathered, the latest big crypto movements involve the top 10 cryptocurrencies, with Bitcoin (BTC) leading the pack in terms of market capitalization and growth. Here are some key points regarding Bitcoin and the general trend of BTC:\n\n1. **Bitcoin (BTC)**:\n   - Bitcoin is the original and most well-known cryptocurrency, with a market capitalization of $1.3 trillion.\n   - The price of one Bitcoin has seen significant growth over the years. For example, in May 2016, the price was around $500, while as of July 16, 2024, it was approximately $63,808.\n   - This price increase represents a substantial growth of 12,662% over the specified period.\n\n2. **General Trend of BTC**:\n   - Bitcoin's performance and price movements have a significant impact on the overall cryptocurrency market.\n   - As the leading cryptocurrency, Bitcoin's trends often influence the direction of other cryptocurrencies in the market.\n   - Bitcoin's market capitalization and year-over-year return of 111% indicate its dominance and continued relevance in the crypto space.\n\n3. **Market Caps and Pricing**:\n   - The market capitalization and pricing data for Bitcoin and other cryptocurrencies can be sourced from platforms like CoinMarketCap, providing real-time information on their performance.\n\nIn summary, Bitcoin remains a key player in the cryptocurrency market, with its price movements and market capitalization influencing the broader trends in the industry. The growth and stability of Bitcoin serve as important indicators for investors and traders looking to understand the general trend of cryptocurrencies. [Sources: [Forbes Advisor](https://www.forbes.com/advisor/investing/cryptocurrency/top-10-cryptocurrencies/), [CoinTelegraph](https://cointelegraph.com/news/what-happened-in-crypto-today), [CNBC](https://www.cnbc.com/bitcoin/)]",
    ],
};
const AnimatedText = ({ text }) => {
    const words = text.split(' ');
    return (react_1.default.createElement("div", { style: { display: 'inline-block' } }, words.map((word, index) => (react_1.default.createElement(framer_motion_1.motion.span, { key: index, initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, style: { display: 'inline-block', marginRight: '5px' } }, word)))));
};
function SubqueryComponent() {
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
        } }, data.subqueries_answered.map((query, index) => (react_1.default.createElement("div", { key: index, className: "dialogue-container" },
        react_1.default.createElement("h2", null,
            react_1.default.createElement(AnimatedText, { text: query })),
        react_1.default.createElement("p", null,
            react_1.default.createElement(AnimatedText, { text: data.subqueries_responses[index] })))))));
}
exports.default = SubqueryComponent;
