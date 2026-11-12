# RestTech Bot — MVP

Telegram bot for HoReCa equipment requests and moderated listings.

## MVP capabilities
- Buyer intake: venue, category, item, condition, budget, city, deadline, contact.
- New / used product catalogue from PostgreSQL or SQLite.
- Seller intake with equipment details and photo file IDs.
- Restaurant fit-out request intake.
- Admin notifications for new leads.
- Russian Telegram interface.

## Run locally
1. Create a bot with @BotFather and copy its token.
2. Copy `.env.example` to `.env` and set `BOT_TOKEN`.
3. Optional: set `ADMIN_CHAT_ID` to the private admin chat/user ID.
4. Install dependencies: `pip install -r requirements.txt`.
5. Run: `python -m app.main`.

SQLite is the default for the lowest-cost local test. For deployment, set `DATABASE_URL` to a PostgreSQL async URL, for example `postgresql+asyncpg://resttech:password@db:5432/resttech`.

## Add catalogue items
Create records in the `products` table. `condition` must be `new` or `used`; `active` must be true. Telegram photo `file_id` can be stored in `photo_file_id`.

## Important
- Never commit `.env` or bot tokens.
- Listings are leads for manual moderation; they are not published automatically.
- The bot does not accept payment or guarantee the condition of third-party equipment.
- FSM storage is in memory in this MVP. Before running multiple replicas or requiring durable conversations, switch to Redis storage.
- Admin product-management commands, contact validation, privacy consent, pagination, and test coverage are planned next.
