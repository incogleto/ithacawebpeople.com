# Ithacawebpeople.com

![screenshot-image](https://github.com/funkhaus/ithacawebpeople.com/blob/master/.github/images/screenshot.jpg?raw=true)

This is a Vue.js app running on a node + express backend that powers the Ithaca web people dashboard. Changes to the master branch of this repo are automatically deployed to production, running on Heroku.

This project is an open source community effort, anyone interested is encouraged to contribute. Paeticularly those looking to learn about Vue.js, a great place to start would be forking this repo and making some changes.

## Local Setup:

Although this app is both a server and frontend, it's easy to set up locally to develop the client side only without having to deal with all the server pieces. Here are the steps to get up and running locally:

1. `git clone https://github.com/funkhaus/ithacawebpeople.com.git && cd ithacawebpeople.com`
1. `npm install`
1. `npm run dev`

If you only want to work on the client side, you can stop there. Go to `localhost:8080` and you should be able to see the app running. All the data is pulled from the live API so you don't have to deal with a database setup.

When `npm run dev` is running, the app is in watch mode rebuilding both the server and client each time a file is changed. When you are just about ready to deploy or PR changes, you can run `npm run build && npm start` to double check that the app still works as expected after going through the production build process (though in theory there should rarely be a difference).

## Full Server Setup:

If you'd like to run the full server locally with a database, continue onto these steps:

1. Create a `.env` file in the root of the project, follow the `.env.example` file if that's easier
  * `NODE_ENV`: Standard env variable. Can be 'development' or 'production'
  * `BASE_URL`: URL the app expects to be running on, defaults to `https://www.ithacawebpeople.com`. Mostly this is used to point the client side at an API other than its own. If you are doing a full local setup, this should be set to `http://localhost:8080`
  * `DATABASE_URL`: Full postgres URL for the database. If you have created a local db named "ithacawebpeople" for instance, this would likely be set to: postgres://postgres@localhost:5432/ithacawebpeople
  * `MAILGUN_SECRET`: The app uses mailgun to deliver confirmation links when editing events. This is where you would put your mailgun API key. Omitting this will simply bypass the emailing step.
  * `MAILGUN_DOMAIN`: Domain to send mailgun emails from. (Omit to bypass email feature)
  * `JWT_TOKEN_SECRET`: Seed for the server to use when creating JWT auth tokens. This can be set to any string.
2. Once the environment variables are properly set, you can run `npm run dev` to start developing. Any changes to the server or client will trigger an automatic rebuild.
