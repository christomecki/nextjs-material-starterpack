## NextJS STARTER PACK

This starter pack is created as a basis for the development of further projects. It contains basic functionalities related to configuration and authentication, allowing for faster application development based on well-written code

## List of functionalities

### This starter pack is a collection of:

  - Mobile & desktop VERSION
  - Auhentication based on cookies
  - Creating account
  - Password strength meter
  - Verifying account by sending email
  - Sending reset-email token to set forgotten password.
  - Sending email, when sign-in assempt failed exist.
  - Info about Last login and Last failed login.
  - Profile functionalities like: Logout from all sessions, change password, delete account.
  - Custom error pages and error boundary.
  - Rare limiting.
  - Tests in JEST and Cypress.

## Used packages

  - mui
  - emotions
  - express-rate-limit
  - cookie
  - emailjs
  - mongodb
  - notistack
  - passport
  - react-hook-form
  - cypress
  - jest

## Database

We used MongoDB to store the site's resources. The database is installed by docker.


## Installation

On the command-line or Terminal, navigate to the root of the directory which you downloaded and run:

* If you have npm: `npm install`
* If you have yarn: `yarn install`

You also need to install database MongoDB. Run `docker-start.cmd`. To see the contents of the database, you can use MongoDB Compass.

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

* Run Jest tests once: `npm test` or `yarn test`
* Run Jest in watch mode (great for TDD): `npm run test:watch` or `yarn test:watch`

## Running CYPRESS tests

Here are a few commands you should now be able to run Cypress tests:

* Open Cypress creator: `npm cypress:open` or `yarn cypress:open`
* Open Cypress e2e tests: `npm e2e` or `yarn e2e`
* Run Cypress e2e headless tests (with video): `npm e2e:headless` or `yarn e2e:headless`
* Open Cypress component tests: `npm component` or `yarn component`
* Run Cypress headless component tests (with video): `npm component:headless` or `yarn component:headless`
