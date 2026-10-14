const source = (repo, commit, file) => `https://github.com/Akshat180425/${repo}/blob/${commit}/${file}`;
const convo = file => source('Convo', 'ca9200a4a0c3f7ca86c43ec1813fc4783174d991', file);
const ledgerly = file => source('Ledgerly', '98d30cdf2348bd4c029bcbb158aff3fb3060d70a', file);
const tradescope = file => source('TradeScope', '58b1a0d7d1a1a057205bbc3a376f2164cb708ea0', file);

export const caseStudies = {
  convo: {
    headline: 'A conversation has more than one moving part.',
    standfirst: 'Messaging, shared media, and an assistant that knows the application. Convo brings them into one place, with the conversation as the centre of gravity.',
    focus: 'Real-time state & interaction',
    overview: [
      'A chat interface looks simple until the conversation changes. A message is edited after someone replies to it. A friend comes online while another conversation is open. An attachment needs a useful name, a preview, and a way to download it. Convo connects these small interactions across direct and group conversations.',
      'The application combines friend discovery and requests, messaging, shared files, and an in-app AI assistant. The interesting engineering work is in keeping those features connected: the active thread, its unread count, quoted replies, and stored history all describe the same conversation from different angles.',
    ],
    journey: [
      ['Find a connection', 'Discover people, send a friend request, and begin a direct conversation or create a group. Privacy preferences affect which profile details other people can see.'],
      ['Keep a conversation going', 'Send text, images, documents, or recorded audio. Replies preserve context; edits, search, starred messages, and shared-media views make the history easier to revisit.'],
      ['Ask about the application', 'The assistant uses recent conversation context and relevant entries from a curated knowledge collection to help answer questions about Convo.'],
    ],
    flow: [['React & Zustand', 'Conversation and interface state'], ['Express & Socket.IO', 'HTTP actions and live events'], ['MongoDB & Cloudinary', 'Messages, relationships, and files']],
    architecture: 'A send request passes through the HTTP API and creates a stored message before live events notify connected recipients. The sender receives the HTTP response; other clients update either their open conversation or its unread state. File uploads are stored separately from message records, which retain the metadata needed to display the attachment.',
    challenges: [
      { title: 'Changing a message without losing its context', problem: 'An edit affects more than one bubble. A quoted reply may still show the old text, while deleting a message can leave a stale star, reply draft, or editing state behind.', approach: 'The client centralises message-update handling so an edited message and references to it can change together. Deletion also clears related interface state. Direct-chat edits use live events to reach the participants.', tradeoff: 'Live events improve responsiveness, but they do not by themselves guarantee delivery across disconnections. Re-fetching history remains part of recovering the stored conversation.' },
      { title: 'Giving the assistant useful context', problem: 'A general model can produce a fluent answer without knowing how this particular application works.', approach: 'A curated collection describes Convo’s features. Weighted keyword matching uses the question and recent exchanges to select a bounded set of entries, which is added to the model’s context.', tradeoff: 'This is a lightweight retrieval approach. It avoids a separate vector database, but wording that does not overlap with the knowledge entries can still be difficult to retrieve.' },
      { title: 'Handling media as part of the conversation', problem: 'Audio recordings, images, and documents have different upload requirements, yet each should feel like a natural message.', approach: 'The browser records audio through MediaRecorder. Server-side handling normalises audio uploads and treats documents as raw files, while messages keep the names and types needed by the interface. Document downloads check conversation membership.', tradeoff: 'Encoded upload bodies increase request size. Larger files would benefit from a dedicated upload flow and clearer progress and retry states.' },
      { title: 'Keeping privacy rules consistent', problem: 'Profile visibility and read receipts appear in several views. Applying a preference in just one component would leave the rest of the interface inconsistent.', approach: 'Shared server helpers apply everyone, friends, or nobody visibility rules to profile information. Read state is recorded separately from the decision to broadcast a receipt.', tradeoff: 'Visibility rules need to remain consistent as new views and event types are added. A wider permissions test suite would help check both HTTP responses and real-time updates.' },
    ],
    next: 'The next useful improvements would be cursor-based message history, presence that can represent several sessions per person, and a small evaluation set for assistant questions. These would make long conversations and less predictable usage easier to handle.',
    takeaway: 'A messaging application is a collection of relationships between states. The quality of the experience depends on those relationships remaining understandable when something changes.',
    sources: [
      ['Assistant context', convo('backend/src/controllers/message.controller.js#L1582-L1686')],
      ['Client message updates', convo('frontend/src/store/useChatStore.js#L749-L833')],
      ['Knowledge retrieval', convo('backend/src/data/convoKnowledge.js#L248-L320')],
      ['Privacy helpers', convo('backend/src/lib/privacy.js#L50-L90')],
    ],
  },
  ledgerly: {
    headline: 'The numbers should tell the same story.',
    standfirst: 'A personal finance workspace that connects everyday entries to budgets, savings goals, and a clearer picture of where the money goes.',
    focus: 'Financial data & consistency',
    overview: [
      'Recording an expense is only the beginning. The same entry should appear in the ledger, affect the correct monthly budget, contribute to a chart, and survive a filtered export without changing meaning. Ledgerly is built around those connections.',
      'Income, expenses, recurring rules, budgets, and savings goals sit in one workspace. Records are entered manually or generated from a schedule. There is no bank connection: the application helps organise recorded finances, and a savings contribution tracks progress rather than transferring money.',
    ],
    journey: [
      ['See the month in context', 'A dashboard separates the recorded balance from this month’s income and expenses. Six-month cash flow and category breakdowns reveal patterns behind the totals.'],
      ['Work through the ledger', 'Add or correct entries, search by text, and filter by date, type, category, or amount. Export the matching records to CSV or Excel.'],
      ['Plan beyond a single entry', 'Set monthly budgets, record contributions toward savings targets, and create daily, weekly, monthly, or yearly recurring entries.'],
    ],
    flow: [['React & Recharts', 'Ledger, forms, and financial views'], ['Express services', 'Ownership, validation, and calculations'], ['MongoDB', 'Transactions, plans, and goals']],
    architecture: 'The browser sends filters to an authenticated API. A common aggregation pipeline combines income and expenses into one transaction shape, while dedicated services calculate dashboard summaries and process recurring rules. On the client, filters are reflected in the URL and older responses cannot replace the result of a newer request.',
    challenges: [
      { title: 'Keeping a filtered view and its export in agreement', problem: 'A table, a total, and a spreadsheet can disagree if each applies its own version of the filtering rules. Totals also need to describe the full selection, not only the visible page.', approach: 'A shared MongoDB pipeline combines income and expenses, then applies ownership and search filters. The list calculates its page and matching totals together; exports reuse the selection without the pagination limit.', tradeoff: 'Aggregation remains server-side. Exports have an explicit row limit, so very large downloads require a narrower selection rather than silently omitting records.' },
      { title: 'Making account ownership apply everywhere', problem: 'A personal ledger needs ownership checks on edits and exports as well as on the dashboard.', approach: 'The server derives identity from the authenticated session and includes it when selecting, changing, deleting, or exporting records. Exported text is escaped to avoid treating user-entered labels as spreadsheet formulas.', tradeoff: 'Every new endpoint needs the same ownership rules. Keeping those checks consistent matters as more ways of viewing and exporting records are added.' },
      { title: 'Posting a recurring entry only once', problem: 'Repeated or overlapping requests can notice the same due payment. Calendar arithmetic adds another difficulty: a January 31 schedule should not permanently drift after February.', approach: 'Each occurrence has a schedule-and-date key protected by a unique database index. An upsert prevents duplicate inserts, and conditional schedule advancement handles competing requests. Dates are calculated from the original anchor.', tradeoff: 'Due entries are caught up through application requests, with a separate command available for scheduling. Unattended, punctual posting still depends on an operational scheduler.' },
      { title: 'Protecting a goal balance during simultaneous updates', problem: 'Two contributions can overwrite one another if both read a balance and then save a separately calculated replacement.', approach: 'Savings amounts use integer cents and atomic database increments. A withdrawal updates the record only if the same operation finds sufficient funds, and recent contribution history is recorded with it.', tradeoff: 'That history keeps the latest 100 contributions. It is a bounded progress log, separate from the transaction ledger.' },
    ],
    next: 'Currency is currently a display preference: changing the label does not convert existing amounts. A fuller multi-currency model would need exchange rates and per-entry currency information. Reliable unattended recurrence is another natural extension.',
    takeaway: 'Consistency is a feature. A balance, an export, a recurring entry, and a savings contribution become useful when they can be trusted to describe the same underlying records.',
    sources: [
      ['Finance test definitions', ledgerly('backend/test/finance.test.js')],
      ['Recurring schedules', ledgerly('backend/services/recurringService.js#L6-L43')],
      ['Savings contributions', ledgerly('backend/controllers/goalController.js#L16-L30')],
      ['Shared transaction selection', ledgerly('backend/services/transactionService.js#L5-L34')],
    ],
  },
  tradescope: {
    headline: 'Following a trade beyond the Buy button.',
    standfirst: 'An educational paper-trading application that makes the relationship between orders, cash, positions, and performance visible.',
    focus: 'Order execution & accounting',
    overview: [
      'An order is a promise before it becomes a trade. It can reserve funds, wait for a price, execute in several pieces, or become unaffordable when a stop is triggered. TradeScope models these states and the accounting that connects them.',
      'The application uses generated market prices and virtual funds. A visitor can explore simulated equities and model-priced derivatives, place orders, and review portfolio changes. It does not connect to a brokerage or execute real-money trades.',
    ],
    journey: [
      ['Explore a simulated market', 'A new account starts with $100,000 in virtual funds. Price history, an order book, and an order ticket provide context for a simulated decision.'],
      ['Follow the order', 'Market, limit, stop-market, and stop-limit orders have distinct behaviour. Waiting orders can be cancelled; lifecycle events and individual executions explain partial fills.'],
      ['Read the effect on the account', 'Review available cash, holdings, fees, and realised profit. Portfolio equity and investment return remain separate, so adding funds is not mistaken for a trading gain.'],
    ],
    flow: [['Order ticket & API', 'Session-bound, validated intent'], ['Matching & account engine', 'Reservations, executions, and fees'], ['SQLite commit & events', 'Persist, then refresh account views']],
    architecture: 'The server passes validated requests to a JavaScript domain engine and an order-book adapter. SQLite stores a recoverable snapshot alongside ledger and execution records. After a successful transaction, a server-sent event tells the browser to fetch its account again; periodic fetching provides a fallback. Resting orders retain sequence information for restoration after a restart.',
    challenges: [
      { title: 'Accounting for every partial fill', problem: 'An order can execute across several prices. Rounding a fee independently on every piece can make the final ledger disagree with the intended charge.', approach: 'Filled quantity and notional accumulate across executions. Fees are calculated from cumulative notional after subtracting fees already charged. Cash movements use integer cents, and persistence checks that ledger totals reconcile with account cash.', tradeoff: 'Integer-cent cash accounting does not make every model exact. Valuation and cost-basis calculations still use floating-point numbers.' },
      { title: 'Distinguishing available money from committed money', problem: 'An unfilled buy order has not spent cash yet, but those funds should not be promised to another order. A price gap can also make a triggered stop unaffordable.', approach: 'Pending buys reserve principal and expected remaining fees; sells reserve shares. Triggered stops receive another affordability and liquidity check. A rejected order records a reason and releases its reservation.', tradeoff: 'The matching rules operate within synthetic liquidity. They illustrate order behaviour without reproducing the full microstructure of a real exchange.' },
      { title: 'Keeping funding separate from performance', problem: 'A deposit makes an account larger even if no investment has gained value. A simple percentage change in equity would count that deposit as performance.', approach: 'The performance series adjusts for external cash flows and tracks return separately from equity. The portfolio can therefore show both account size and the effect of simulated trading.', tradeoff: 'These are measurements within the simulation. Generated prices and simplified derivative assumptions do not establish a strategy’s real-world performance.' },
      { title: 'Preventing a retry from becoming another trade', problem: 'If a response is lost, the browser cannot immediately know whether the order was placed. Retrying must not create another order.', approach: 'The client keeps an idempotency key while an outcome is uncertain. The API binds it to the account and request content. Matching retries return the saved result; failed persistence rolls back SQL and restores the engine’s earlier state before any refresh event is emitted.', tradeoff: 'The engine uses a single authoritative process with a persistence ownership lock. Horizontal scaling would require a different coordination model.' },
    ],
    next: 'The next questions are about realism and scale: richer market scenarios, more explicit model assumptions, and a deliberate approach to coordinating more than one engine process. Each would need tests around accounting invariants before expanding the interface.',
    takeaway: 'The trade is only one event. Reservations, execution records, fees, and funding-adjusted returns are what make its consequences explainable.',
    sources: [
      ['Accounting and reconciliation', tradescope('backend/src/storage/database.js#L48-L64')],
      ['Order reservations', tradescope('backend/src/domain/engine.js#L90-L127')],
      ['Retry and rollback test definitions', tradescope('tests/api.test.js#L187-L230')],
      ['Transaction boundary', tradescope('backend/src/api/app.js#L62-L77')],
    ],
  },
};
