# Backwoods App ![Build Status](https://travis-ci.com/Lambda-School-Labs/LabsPT1_Backwoods.svg?branch=master)

Backwoods is an app that helps adventurers track their trips and travel safely.

This repository contains the collective effort and capstone project of 6 students that graduated from [Lambda School’s Computer Science](https://lambdaschool.com/) program.

## Team

Listed alphabetically:

<!-- prettier-ignore -->
| [**Alex Botello**](https://github.com/alexbotello) | [**Andrew Jarrett**](https://github.com/ahrjarrett) | [**John Coronel**](https://github.com/JohnCoronel) | [**Thuy Pham**](https://github.com/iamthuypham) | [**Usman Javed**](https://github.com/ujaved931) | [**Victor Montoya**](https://github.com/victoramontoya) |
|:------------:|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|
| [<img src="https://avatars1.githubusercontent.com/u/16750659?s=80" width="80">](https://github.com/alexbotello) | [<img src="https://avatars0.githubusercontent.com/u/15133992?s=80" width="80">](https://github.com/ahrjarrett) | [<img src="https://avatars3.githubusercontent.com/u/10173157?s=80" width="80">](https://github.com/JohnCoronel) | [<img src="https://avatars2.githubusercontent.com/u/5633434?s=80" width="80">](https://github.com/iamthuypham) | [<img src="https://avatars1.githubusercontent.com/u/36476288?s=80" width="80">](https://github.com/ujaved931) | [<img src="https://avatars0.githubusercontent.com/u/29212813?s=80" width="80">](https://github.com/victoramontoya) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/alexbotello) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ahrjarrett) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/JohnCoronel) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/iamthuypham) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ujaved931) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/victoramontoya) |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/alexander-botello-025019131/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/andrewhjarrett/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/iamthuypham/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/vamontoya/) |

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick Start](#quick-start)
- [Resources](#resources)
- [Scripts](#scripts)
  - [Testing](#testing)
    - [Backend Tests](#backend-tests)
    - [Frontend Tests](#frontend-tests)
  - [Running](#running)
- [Environment Variables](#environment-variables)
  - [Heroku Variables](#heroku-variables)
  - [Deployment](#deployment)
    - [Frontend Deployment](#frontend-deployment)
    - [Backend Deployment](#backend-deployment)
- [API](#api)
  - [Auth Token Payload](#auth-token-payload)
  - [User Routes](#user-routes)
  - [Trip Routes](#trip-routes)
- [Contributing](#contributing)
- [Issues](#issues)
- [App Usage & User Story](#app-usage--user-story)
  - [User Access](#user-access)
  - [Create New Trip](#create-new-trip)
  - [Track a Trip](#track-a-trip)
  - [Archive and Unarchive](#archive-and-unarchive)
  - [Repeat a Trip](#repeat-a-trip)
  - [Pay for Subscription](#pay-for-subscription)
  - [Settings](#settings)
- [Tech Stack](#tech-stack)
  - [Backend Dependencies](#backend-dependencies)
    - [BcryptJS](#bcryptjs)
    - [Cors](#cors)
    - [Dotenv](#dotenv)
    - [Express](#express)
    - [JSON Web Token](#json-web-token)
    - [Lodash](#lodash)
    - [Mongoose](#mongoose)
  - [Frontend Dependencies](#frontend-dependencies)
    - [Axios](#axios)
    - [Bootstrap](#bootstrap)
    - [Connected React Router](#connected-react-router)
    - [Formik](#formik)
    - [History](#history)
    - [React 16 / ReactDOM](#react-16--reactdom)
    - [React Redux](#react-redux)
    - [React Router](#react-router)
    - [Reactstrap](#reactstrap)
    - [Redux](#redux)
    - [Redux Thunk](#redux-thunk)
    - [Stripe](#stripe)
    - [Styled Components](#styled-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Quick Start

1. Put your environment variables at `/server/.env`
   - Read more in the [Environment Variables section](https://github.com/Lambda-School-Labs/LabsPT1_Backwoods/tree/master#environment-variables)
2. Inside `/server` install all dependencies and spin up the server:
   ```
   $ yarn && yarn dev
   ```
3. Inside `/client` install all dependencies and kick off the frontend:
   ```
   $ yarn && yarn start
   ```

Now just open [http://localhost:3000](http://localhost:3000) to visit the frontend, or query the server endpoints directly at [http://localhost:5000](http://localhost:5000).

# Resources

- [App Wireframes](https://balsamiq.cloud/snv27r3/pw5cimu/r74B7)
- [Avoiding Merge Conflicts](https://team-coder.com/avoid-merge-conflicts/)

# Scripts

## Testing

### Backend Tests

`yarn test`: When run inside the `/server` directory, runs all backend tests

> **Note:** Running tests locally requires a local mongo instance to be running. To start a mongo instance follow these steps:

- `sudo service mongod stop`: This is will clear default port if any previous mongo instances were not properly shutdown
- `sudo mongod --fork --syslog`: This will start a mongo instance running in the background

### Frontend Tests

`yarn test`: When run inside the `/client` directory, runs all frontend tests _(Work in Progress)_

## Running

From the root directory:

`cd client && yarn start`: Runs the frontend client
`cd server && yarn dev`: Runs the backend server

> **Note:** Make sure you delete `node_modules` directories when dependencies change between merges!

# Environment Variables

These reside in the `/server/.env` file, which is not checked into git.

| Variable         | Description                     |
| :--------------- | :------------------------------ |
| `MONGO_URI`      | URL of the development database |
| `MONGO_URL_PROD` | URL of the production database  |
| `NODE_ENV`       | Default is `development`        |
| `JWT_SECRET`     | JSON Web Token Secret           |

> **Note:** The app will crash without these variables defined.

## Heroku Variables

Our Heroku backend lives at https://backwoods-tracker.herokuapp.com.

Make sure you define the `JWT_SECRET`, `MONGO_URI` and `NODE_ENV` variables in the [Heroku Dashboard here](https://dashboard.heroku.com/apps/backwoods-tracker/settings).

## Deployment

The app frontend is deployed on Netlify and the backend is deployed on Heroku.

### Frontend Deployment

- [ ] TODO: John, can you flesh this section out?

### Backend Deployment

Deploying on the backend is easy. The `/server` directory is a git repo whose only remote is our Heroku dyno.

After merging a backend PR into master, navigate to the server folder, _commit your changes there_, then push master to Heroku:

```bash
$ cd server/
$ git remote -v   # make sure remote is heroku -- not origin!
$ git add -A
$ git commit -m "merge changes, deploy to heroku"
$ git push heroku master
```

# API

- [ ] TODO: Create a heading for each model

## Auth Token Payload

- [ ] TODO: Descript shape of payload and what the fields represent.

## User Routes

- [ ] TODO: Describe user routes.

## Trip Routes

- [ ] TODO: Describe trip routes.

# Contributing

Currently we're only accepting PRs from immediate members of the team. Feel free to check back later!

# Issues

If something does not work, please [file an issue](https://github.com/Lambda-School-Labs/LabsPT1_Backwoods/issues/new)

# App Usage & User Story

## User Access

Users are not required to sign in to use the app.

Unauthenticated users have limited access to some features.

## Create New Trip

1. Click `Add your first trip` after you sign in OR
2. Go to `Trips` section and click `New Trip`
3. Add your first waypoint and click `Select Location` to save your starting point
4. Let's move!
5. Add new waypoint as you wish

## Track a Trip

1. In `Trips` section, select a trip
2. Get to your starting point and start follow the path
3. When you reach a waypoint, click `I made it`

## Archive and Unarchive

1. Go to `Trips` section and click `Archived Trips`
2. Click `Unarchive` as you wish

## Repeat a Trip

1. Go to your archived trip list
2. Click `Repeat`
3. The app will load all waypoints and you can fill out new date & time

## Pay for Subscription

1. Go to `Billing` section
2. Fill out payment form
3. Select a plan
4. Click `Buy Now`

## Settings

1. Reset your email OR
2. Reset your password
3. Click `Save`

# Tech Stack

## Backend Dependencies

### BcryptJS

Bcrypt is an adaptive hash function which adjusts the cost of hashing, which means that in the future as computers become more powerful, simply increasing the salt rounds will suffice at keeping Main Course secure due to the amount of processing time that would be required to generate all possible password combinations.
[View Dependency](https://www.npmjs.com/package/bcryptjs)

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers.
[View Dependency](https://github.com/expressjs/cors)

### Dotenv

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
[View Dependency](https://github.com/motdotla/dotenv)

### Express

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability.
[View Dependency](http://expressjs.com/)

### JSON Web Token

JsonWebToken implementation for node.js.
[View Dependency](https://www.npmjs.com/package/jsonwebtoken)

### Lodash

A modern JavaScript utility library delivering modularity, performance & extras. Our backend cherrypicks the `merge` function from this library.
[View Dependency](https://lodash.com/)

### Mongoose

Provides a straight-forward, schema-based solution to model application data with MongoDB. It also offers out of the box perks such as validation.
[View Dependency](https://mongoosejs.com/)

## Frontend Dependencies

### Axios

A lightweight, promise-based HTTP client with an intuitive API that makes interfacing with a REST API simple.
[View Dependency](https://www.npmjs.com/package/react-axios)

### Bootstrap

Twitter framework for the frontend.

### Connected React Router

A Redux binding for React Router v4.
[View Dependency](https://github.com/supasate/connected-react-router)

### Formik

Formik is the new standard for managing React form state, and doesn't use Redux to do it ✨
[View Dependency](https://jaredpalmer.com/formik/docs/api/formik)

### History

A JavaScript library that lets you easily manage session history anywhere JavaScript runs. `history` abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
[View Dependency](https://github.com/ReactTraining/history)

### React 16 / ReactDOM

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
[View Dependency](https://reactjs.org/)

### React Redux

Official React bindings for Redux. Performant and flexible.
[View Dependency](https://github.com/reduxjs/react-redux)

### React Router

DOM bindings for React Router. Declarative routing for React.
[View Dependency](https://www.npmjs.com/package/react-router-dom)

### Reactstrap

Easy to use React Bootstrap 4 components.
[View Dependency](https://github.com/reactstrap/reactstrap)

### Redux

A state management tool making it possible to store the entire state of the application in a single store. This means a unidirectional data flow, and as the application scales we have predictable state updates which subsequently make things easier to test and introduce new features. Redux also has solid documentation and an active community, meaning that as new devs become introduced to the project it's likely that any problems they face would have already been encountered by someone else, thus making solutions easy to find.
[View Dependency](https://redux.js.org/)

### Redux Thunk

A middleware that allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. This functionality makes it easier to scale and implement features given diverse needs in a growing project.
[View Dependency](https://github.com/reduxjs/redux-thunk)

### Stripe

A powerful, simple, and seamless payment commerce solution (Required by employer).
[View API](https://stripe.com/docs/)

### Styled Components

Has a thriving community and offers the ability to directly style multiple components within a file. The syntax used is familiar to JavaScript and improves code cleanliness and makes it easy to get up and going for those without a lot of css experience. Styled components are also very efficient, improving load time for users.
[View Dependency](https://www.styled-components.com/docs/)

## Setup

### Oauth with Google account*
- Go to `firebase.com` and sign in
- Click Go to console
- Add new project with project name and accept the terms
- On left sidebar, click Authentication option
- Click sign-in method tab
- Click Google status to open settings modal
- Toggle button to enable
- Select support email
- Click Save
- Extra step for deployment: under Authorized domains section, add domain of deployed server and diet apps

- From the side menu, click on Gear icon and Project settings
- In General tab, under Project section
- Copy Web API key for `REACT-APP-FIREBASE-API-KEY`
- Copy Project ID to create `REACT-APP-FIREBASE-AUTH-DOMAIN` as `<Project-ID>.firebase app.com`
- Copy Project ID to create `REACT-APP-FIREBASE-DB-URL` as `https://<Project-ID>.firebaseio.com`

*To prevent CORS warning*
- Go to `console.cloud.google.com` and sign in
- On left sidebar, click APIs & services and go to Credentials tab
- Under OAuth 2.0 Client IDs section, click the Web client
- Under Authorized Javascript origins section, add the URI of your local client development, ie. `http://localhost:3000`
- Click Save (edited) 

### Stripe
- Login or create a stripe account at stripe.com
- Under the Developers tab, select the Api keys sub tab.
- Find your Publishable and Secret keys. Use that data as follows.
- .env in client folder `STRIPE_KEY_SERVER_PROD`=Secret Key `STRIPE_KEY_CLIENT_PROD`=Publishable key
- .env in server folder `STRIPE_KEY_SERVER_PROD`= Secret Key