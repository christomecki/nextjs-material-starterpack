## NextJS STARTER PACK

This starter pack was created as a foundation for developing future projects. It contains boilerplate code for basic functionalities related to UI, configuration, and authentication, thus enabling faster application development.

## This starter pack includes:

- Mobile & desktop UI
- Lignt & Dark theme
- MongoDB connection
- Auhentication based on cookies and [iron session](https://github.com/hapijs/iron)
- Account creation
- Password strength meter
- Verifying account by sending email
- Sending reset-email tokens for forgotten passwords
- Alert emails for failed sign-in attempts
- Information about last successful/failed sign-in attempts
- User functionalities such as:
  - Logout from all sessions
  - Password change
  - Account deletion
- Custom error pages and error boundary
- Rare limiting
- Tests in JEST and Cypress.

## Database

We used MongoDB to store the site's resources.

## Installation

On the command-line or Terminal, navigate to the root of the directory which you downloaded and run:

- If you have npm: `npm install`
- If you have yarn: `yarn install`

If you want to run MongoDB run `docker-start.cmd`. To see the contents of the database, you can use MongoDB Compass.

You need to copy the `.env.example` file, rename it as `.env`, and then configure the variables within it.

## Run app

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running JEST tests

Here are a few commands you should now be able to run JEST tests:

- Run Jest tests once: `npm test` or `yarn test`
- Run Jest in watch mode (great for TDD): `npm run test:watch` or `yarn test:watch`

## Running CYPRESS tests

Here are a few commands you should now be able to run Cypress tests:

- Open Cypress creator: `npm cypress:open` or `yarn cypress:open`
- Open Cypress e2e tests: `npm e2e` or `yarn e2e`
- Run Cypress e2e headless tests (with video): `npm e2e:headless` or `yarn e2e:headless`
- Open Cypress component tests: `npm component` or `yarn component`
- Run Cypress headless component tests (with video): `npm component:headless` or `yarn component:headless`
