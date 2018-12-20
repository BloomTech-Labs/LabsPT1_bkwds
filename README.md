# Backwoods App

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Backwoods is an app for adventurers to track trips. This app is capstone project build by a small team of students at [Lambda School](https://lambdaschool.com/).

## Team

In alphabetical order:

|                                    [**Alex Botello**](https://github.com/alexbotello)                                    |                                           [**Andrew Jarrett**](https://github.com/ahrjarrett)                                           |                                    [**John Coronel**](https://github.com/JohnCoronel)                                    |                                           [**Thuy Pham**](https://github.com/iamthuypham)                                            |                                     [**Usman Javed**](https://github.com/ujaved931)                                      |                                      [**Victor Montoya**](https://github.com/victoramontoya)                                       |
| :----------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|     [<img src="https://avatars1.githubusercontent.com/u/16750659?s=80" width="80">](https://github.com/alexbotello)      |             [<img src="https://avatars0.githubusercontent.com/u/15133992?s=80" width="80">](https://github.com/ahrjarrett)              |     [<img src="https://avatars3.githubusercontent.com/u/10173157?s=80" width="80">](https://github.com/JohnCoronel)      |            [<img src="https://avatars2.githubusercontent.com/u/5633434?s=80" width="80">](https://github.com/iamthuypham)            |      [<img src="https://avatars1.githubusercontent.com/u/36476288?s=80" width="80">](https://github.com/ujaved931)       |         [<img src="https://avatars0.githubusercontent.com/u/29212813?s=80" width="80">](https://github.com/victoramontoya)         |
|              [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/alexbotello)              |                      [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ahrjarrett)                      |              [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/JohnCoronel)              |                    [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/iamthuypham)                    |               [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ujaved931)               |                 [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/victoramontoya)                  |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/andrewhjarrett/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/iamthuypham/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/vamontoya/) |

# Table of Contents

Generate by running `Markdown Preview Enhanced: Create TOC`

# Scripts

## Testing

`yarn test`: Run tests (Alex is this correct?)

## Running

From the root directory:
`yarn client`: Runs the frontend client
`yarn server`: Runs the backend server

# Environment Variables

`MONGO_URI`: URL of the development database
`MONGO_URL_PROD`: URL of the production database
`NODE_ENV`: Default is `development`
`JWT_SECRET`: JSON Web Token Secret for OAuth

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

### Redux Form

The best way to manage your form state in Redux.
[View Dependency](https://redux-form.com)

### Redux Thunk

A middleware that allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. This functionality makes it easier to scale and implement features given diverse needs in a growing project.
[View Dependency](https://github.com/reduxjs/redux-thunk)

### Stripe

A powerful, simple, and seamless payment commerce solution (Required by employer).
[View API](https://stripe.com/docs/)

### Styled Components

Has a thriving community and offers the ability to directly style multiple components within a file. The syntax used is familiar to JavaScript and improves code cleanliness and makes it easy to get up and going for those without a lot of css experience. Styled components are also very efficient, improving load time for users.
[View Dependency](https://www.styled-components.com/docs/)

## Backend API

TODO: Create a heading for each model

### Auth Token Payload

TODO: Descript shape of payload and what the fields represent.

### User Routes

TODO: Describe user routes.

### Trip Routes

TODO: Describe trip routes.

# Notes

## Contributing

Currently we're only accepting PRs from immediate members of the team. Feel free to check back later!

## Resources

- [Avoid Merge Conflict](https://team-coder.com/avoid-merge-conflicts/)
- [Wireframes](https://balsamiq.cloud/snv27r3/pw5cimu/r74B7)

## Issues

If something does not work, please [file an issue](https://github.com/Lambda-School-Labs/LabsPT1_Backwoods/issues/new)

## App Usage & User Story

### User Access

Users are not required to sign in to use the app.

Unauthenticated users have limited access to some features.

### Create New Trip

1. Click `Add your first trip` after you sign in OR
2. Go to `Trips` section and click `New Trip`
3. Add your first waypoint and click `Select Location` to save your starting point
4. Let's move!
5. Add new waypoint as you wish

### Track a Trip

1. In `Trips` section, select a trip
2. Get to your starting point and start follow the path
3. When you reach a waypoint, click `I made it`

### Archive and Unarchive

1. Go to `Trips` section and click `Archived Trips`
2. Click `Unarchive` as you wish

### Repeat a Trip

1. Go to your archived trip list
2. Click `Repeat`
3. The app will load all waypoints and you can fill out new date & time

### Pay for Subscription

1. Go to `Billing` section
2. Fill out payment form
3. Select a plan
4. Click `Buy Now`

### Settings

1. Reset your email OR
2. Reset your password
3. Click `Save`

### License

TODO: Add LICENSE.md file, link to it here.
