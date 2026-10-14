// Results were run against these GitHub revisions on 14 October 2026.
export const projectEvidence = {
  convo: {
    revision: 'ca9200a4a0c3f7ca86c43ec1813fc4783174d991',
    repository: 'Convo',
    note: 'Screenshots from the repository’s existing capture set. These show the messaging interface and theme preview; the source walkthrough below covers the broader current feature set.',
    result: 'Source walkthrough',
    summary: 'The conversation store, message controller, and retrieval service were inspected at the linked revision. No automated test count or latency benchmark is claimed for this study.',
    checks: ['HTTP persistence and live Socket.IO notifications', 'Conversation state, shared media, and attachment metadata', 'Curated knowledge retrieval for the assistant'],
    command: null,
    frames: [
      ['convo-inbox.webp', 'Choose a conversation', 'Contacts sit beside a quiet empty state. Selecting a person gives the thread its context before the first message is composed.'],
      ['convo-chat.webp', 'Read and reply in context', 'An open conversation keeps received and sent messages distinct while retaining the contact list and composer in the same workspace.'],
      ['convo-settings.webp', 'Preview a different atmosphere', 'The theme selector includes a sample conversation, so a visual preference can be evaluated before returning to the chat.'],
    ],
  },
  ledgerly: {
    revision: '98d30cdf2348bd4c029bcbb158aff3fb3060d70a',
    repository: 'Ledgerly',
    note: 'Repository screenshots with example financial records. Figures illustrate the interface and are not personal financial disclosures.',
    result: '19 / 19 tests passed',
    summary: 'Backend integration tests run against an isolated, temporary MongoDB database on 14 October 2026. No tests were skipped. This is a correctness check, not a load or latency benchmark.',
    checks: ['Session security, account isolation, and export consistency', 'Concurrent savings contributions and recurring-payment idempotency', 'Budgets, calendar boundaries, analytics, and input validation'],
    command: 'cd backend\nnpm ci\nnpm test',
    frames: [
      ['ledgerly-dashboard.webp', 'Begin with the whole picture', 'Balance, cash flow, spending categories, and savings goals give the same ledger several useful perspectives.'],
      ['ledgerly-transactions.webp', 'Move from a total to its entries', 'A unified transaction list makes individual income and expenses inspectable, with filtering and export controls nearby.'],
      ['ledgerly-analytics.webp', 'Look for a pattern over time', 'Daily activity, category breakdowns, and a longer trend turn records into questions about how spending changes.'],
    ],
  },
  tradescope: {
    revision: '58b1a0d7d1a1a057205bbc3a376f2164cb708ea0',
    repository: 'TradeScope',
    note: 'A paper-trading demonstration with sample holdings, a pending limit order, and an option position. All funds, prices, orders, and returns are simulated.',
    result: '39 / 39 tests passed',
    summary: 'The published revision was tested in an isolated source snapshot on 14 October 2026. No tests were skipped. Screens were captured from the local development version on 14–15 October, which includes newer navigation. The suite checks trading and account behaviour, not real-market performance or production throughput.',
    checks: ['Account isolation, CSRF protection, and idempotent order retries', 'Cash reservations, order expiry, fees, and settlement', 'SQLite persistence, rollback, concurrent withdrawals, and performance accounting'],
    command: 'npm ci\nnpm test',
    frames: [
      ['tradescope-market.webp', 'Read the simulated market', 'A price chart, order book, and order ticket bring market context and the proposed execution together.'],
      ['tradescope-portfolio.webp', 'See the effect on the account', 'Sample holdings make allocation, available cash, and unrealized gains or losses visible in the portfolio.'],
      ['tradescope-orders.webp', 'Follow the order lifecycle', 'Filled market orders sit beside pending limit orders, making the difference between an instruction and an execution explicit.'],
      ['tradescope-derivatives.webp', 'Inspect a model-priced contract', 'A sample call option shows its strike, premium, expiry, and current position value. These are simulated European options, with no brokerage connection.'],
    ],
  },
};
