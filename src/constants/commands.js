export const COMMANDS = [
  { command: 'get NASDAQ index value from 2015-01-01 to 2023-01-01', tags: 'markets' },
  { command: 'get IBEX index value from 2015-01-01 to 2023-01-01', tags: 'markets' },
  { command: 'get future prices', tags: 'forex' },
  { command: 'get last messages about TEF from stocktwits', tags: 'news' },
  { command: 'get the top 3 queries related to Telefonica', tags: 'news' },
  {
    command: 'get company news about TEF from finnhub and from 2023-08-25 to 2023-09-07',
    tags: 'news',
  },
  { command: 'get trending tickers', tags: 'markets' },
  { command: 'get trending articles', tags: 'news' },
  { command: 'get the historical dividends of microsoft', tags: 'markets' },
  { command: 'get balance sheet of TEF', tags: 'markets' },
  { command: 'get most shorted stocks', tags: 'markets' },
  { command: 'get the price target for [ticker]', tags: 'forex' },
  { command: 'get stocks overview for [ticker]', tags: 'markets' },
  { command: 'get the historical performance for ticker AMZN', tags: 'markets' },
  // Non tested commands
  { command: 'get the latest IPOs', tags: 'markets' },
  { command: 'get the best performing ETFs this year', tags: 'markets' },
  { command: 'get historical data of gold prices', tags: 'forex' },
  { command: 'get latest economic indicators', tags: 'news' },
  { command: 'get top dividend yielding stocks', tags: 'markets' },
  { command: 'get the latest bond yield rates', tags: 'forex' },
  { command: 'get the top 5 mutual funds in 2023', tags: 'markets' },
  { command: 'get the latest cryptocurrency news', tags: 'news' },
  { command: 'get the current interest rates of central banks', tags: 'forex' },
  { command: 'get investment strategies for a bear market', tags: 'news' },
];

export const TAGS = ['forex', 'markets', 'news'];
