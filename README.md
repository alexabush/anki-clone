# Clone of popular Anki app.
Flashcard app enhanced with a spaced repetition algorithm.

Each time a question is answered, you rate its difficulty. A Priority Queue-based algorithm is then applied that will show that card with more or less frequency based on how difficult it has been rated in the the past.

## Up and Running
1. Install npm, node, postgresql, and sequalize
2. In root project directory, run `npm i` to initialize server.
3. Run `cd client && npm i` to initialize client.
4. Run `npx sequelize db:create` to create database.
5. Run `npx sequelize db:migrate` to create database tables.

## Run Project

Start Scripts:
`npm run dev`: start both server and client
`npm run server`: start server only
`npm run client`: start client only

## Technologies
Backend Technologies:
1. Express
2. Sequelize
3. Postgres

Frontend Technologies:
1. Create React App
2. React Router
3. React Bootstrap