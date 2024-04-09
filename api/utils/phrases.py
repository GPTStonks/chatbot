import random

phrases = [ "The global economy is absolutely thriving, and there's an electrifying opportunity to dive into the stock market like never before! Let's ride the wave of prosperity together!",
        "Today's the day I'm supercharging my portfolio with some incredibly promising stocks! The future's bright, and the potential for growth is sky-high!",
        "I'm strategically enhancing my portfolio by capitalizing on the gains and pivoting towards even more exciting investment avenues. The journey to wealth continues!",
        "The cryptocurrency world is a treasure trove of innovation and untapped potential. I'm on a thrilling adventure to discover the next big crypto gem!",
        "Investing in real estate is not just smart; it's a game-changer. I'm on the hunt for properties in burgeoning markets, ready to turn dreams into reality!",
        "Bonds are the cornerstone of a savvy investor's portfolio. I'm bolstering my investments with some of the most stable and secure bonds out there. Safety first, but profit assured!",
        "Commodities are my secret weapon against inflation. Gold, oil, you name it—I'm diving into commodities to safeguard and enrich my portfolio!",
        "ETFs are my ticket to a world of diversified, balanced investment. With just one bold move, I'm getting exposure to an entire universe of assets. Exciting times ahead!",
        "Handing over the reins to the pros with mutual funds and watching my investments soar! Top-performing funds are the name of the game, and I'm playing to win.",
        "Options trading is my playground for financial creativity. It's all about strategic moves and flexibility. Ready to boost my portfolio with some high-potential options!",
        "Futures trading is where I predict and profit from the future. Armed with insight and daring, I'm diving into futures for the ultimate financial thrill!",
        "Forex trading is my passport to the dynamic world of currency exchange. I'm navigating the forex waves, ready to make a splash with smart, calculated moves!",
        "CFDs are the cutting-edge of modern investing. Without owning the underlying assets, I'm set to profit from their price movements. The future of finance is here, and I'm in!",
        "Cryptocurrencies are the vanguard of the digital finance revolution. I'm not just participating; I'm eagerly investing in the cryptocurrencies that are shaping our future!",
        "NFTs are transforming the digital landscape, and I'm all in! Investing in unique NFTs is not just exciting; it's a way to support and be part of the digital art revolution!"
]

related_questions = [
    "How does BTC halving affect the market and what are the implications for investors?",
    "What are the key factors to consider when investing in real estate?",
    "How do I choose the right ETFs for my investment portfolio and what are the benefits of diversification?",
    "What are the risks and rewards of options trading, and how can I mitigate potential losses?",
]

references = [
    "https://gptstonks.net/",
    "https://wikipedia.org/wiki/Stock_market",
    "https://www.investopedia.com/terms/s/stockmarket.asp",
    "https://tradingview.com/",
    "https://www.bloomberg.com/markets",
    "https://www.cnbc.com/markets",
    "https://www.reuters.com/finance/markets",
]

def get_random_phrase() -> str:
    return random.choice(phrases)

def generate_related_questions() -> list:
    return related_questions

def generate_reference() -> list:
    return references
