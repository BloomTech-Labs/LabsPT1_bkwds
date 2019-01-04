Welcome to the client-side code for Backwoods Tracker!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Directory Structure](#directory-structure)
  - [src/components](#srccomponents)
    - [src/components/forms](#srccomponentsforms)
    - [src/components/icons](#srccomponentsicons)
    - [src/components/pages](#srccomponentspages)
  - [src/config](#srcconfig)
  - [src/redux](#srcredux)
  - [src/styles](#srcstyles)
    - [src/styles/theme](#srcstylestheme)
      - [GlobalStyles.js](#globalstylesjs)
      - [styledComponents.js](#styledcomponentsjs)
      - [mixins.js](#mixinsjs)
      - [variables.js](#variablesjs)
      - [Advanced theming](#advanced-theming)
  - [src/test](#srctest)
  - [src/utils](#srcutils)
    - [CustomRoute](#customroute)
    - [index.js](#indexjs)
    - [selectors.js](#selectorsjs)
- [Redux](#redux)
  - [Trips](#trips)
  - [Using State](#using-state)
    - [Using State: Example](#using-state-example)
  - [What's this types.js file?](#whats-this-typesjs-file)
  - [What's this store.js file?](#whats-this-storejs-file)
- [Dependencies](#dependencies)
- [TODOs](#todos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Directory Structure

## src/components

This is where our React components live.

Most components will live here as `.js` files. However, there are a few exceptions:

- Forms
- Icons
- Pages

### src/components/forms

All forms live here! This is so we can standardize our form dependencies and form validations in 1 place.

Files:

- `formValidations` :: Our client-side form validations live here. To use validations, import the function(s) you need and hook them up to Formik (as of 1/3/19, Formik has yet to be added. See the `formik` branch for more info).
- `customInputs` :: Usually we want to display validation error messages alongside the offending input element. To prevent code duplication, import the input component you need in the form component you're writing.

### src/components/icons

All icons and svgs live here! These are housed separately to keep from cluttering up our components directory.

### src/components/pages

Pages are different from regular components in that they wrap up a number of smaller components as a larger component that is displayed when the user visits a particular route.

**Note:** Most pages use a `CustomRoute` component that lives in `/src/utils`. This component handles protected routes (see the Routing section below). [View component](https://github.com/Lambda-School-Labs/LabsPT1_Backwoods/blob/master/client/src/utils/CustomRoute.js)

Pages:

1. `Dashboard` :: The Dashboard page is where our app lives. All routes here are mounted on `/app`. To mount a new route, add an object to `dashboardRoutes` with the following format:

```javascript
{
  path: "/your-route",      // Mounts to /app/your-route
  name: "DOMDisplayName",   // React browser extension uses this
  component: YourComponent, // Don't forget to import your component!
  exact: true               // optional, defaults to false
}
```

2. `LandingPage` :: This is mounted on our root route, and allows us to wrap the landing page with different styles/components than the rest of our app. Does little more than render `Pages` (see next).

3. `Pages` :: Mounted on `/pages`. To add a page that does not belong inside the dashboard (for example, a Pricing Page), add an object to `pagesRoutes` with the following format:

```javascript
{
  path: "/pricing",   // Mounts to /pages/pricing
  name: "Pricing",    // React browser extension uses this
  component: Pricing, // Don't forget to import your component!
  exact: true         // optional
},
```

## src/config

Because our client-side code is a Node app until we build and ship it, we have access to `process.env`.

For this reason we added a config directory to take advantage of this and export from `config/index.js` a `SERVER_URI` variable that our Redux actions read from and that changes depending on whether we're in a dev or prod env.

If you have any variables that might switch depending on context, put them here and make them available as named exports.

## src/redux

See also the Redux section below.

**Note:** The "main" file for our store configuration lives in `client/store.js`; if you need to see where a particular slice of state lives, start there! (See the store.js note at the bottom of this node).

The Redux folder handles everything Redux. There are 4 directories, 3 of which are currently in use:

- `actions` - The actions folder contains, as you guessed, our app's actions. It also contains our `types.js` file (see below for more info).
- `reducers` - Our redux reducers. The file name for the actions that apply to which reducer should typically be named the same thing, e.g. `actions/auth.js` and `reducers/auth.js`.
- `helpers` - Any helper function that helps us manage our actions or reducers should live here
- `middleware` - Most middleware configuration currently lives in `client/store.js` (see below). If configuring our middlewares gets any more complex, this folder is where we should move that configuration.

## src/styles

Styled components live here!

If your styles get too big to live in the same file as your component, create a new file in the root of this folder following this naming convention:

`src/styles/YourComponent.styles.js`
maps to:
`src/components/YourComponent.js`

### src/styles/theme

The fun part! This is where we declare our global styles, styled-components, and our theme.

#### GlobalStyles.js

The `GlobalStyles` component can be added anywhere in our app _**as a sibling**_ to the component in which those styles will take effect, e.g.:

```javascript
<Root>
  <GlobalStyles />
  <App />
</Root>
```

GlobalStyles is a styled component that does not render its children, so in the example above, everything declared in `GlobalStyles` applies to the `App` component, which is its immediate sibling.

This is a good place to declare things like the `font-size` that sets our `rem` units, font-declarations, and any css resets/normalizations that should apply to the entire document.

#### styledComponents.js

This is where our cool, reusable components should live! For example, we have a custom `Button` component. If you want to change how our button looks, do that here and it will be applied across our app.

#### mixins.js

Mixins don't make sense in a lot of contexts, but they're perfect for composing/reusing blocks of css! For example, we have a box-shadow mixin that looks like this:

```javascript
export const boxShadowMixin = css`
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
`
```

You can use that mixin anywhere inside a styled-component template string like this:

```javascript
import styled from "styled-components"
import { boxShadowMixin } from "../theme/mixins"
const MyComponentStyles = styled.div`
  // use the mixin like you would any variable in a template string:
  ${boxShadowMixin}
  // renders:
  // box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
  width: 100px;
`
```

We also have a useful `media` mixing that is defined like this:

```javascript
const breakpoints = {
  desktop: 1024,
  tablet: 768,
  phone: 576
}

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label] / 16}em) {
      ${css(...args)};
    }
  `
  return acc
}, {})
```

You can use the `media` mixin in any styled-component like so:

```javascript
import styled from "styled-components"
import { media } from "../theme/mixins"

const MyComponentStyles = styled.div`
  .someDiv {
    ${media.desktop`
      display: flex;
      color: orange;
    `}
    ${media.tablet`display: inline-block;`}
    ${media.phone`display: none;`} */
  }
`
```

#### variables.js

This is where our theme lives! :tada:

A case might be made for renaming this file `theme.js`.

This is where all of our constants are named. Themes in the `styled-components` package are super powerful, and injected via context into our app.

The theme is available anywhere inside our app on `props.theme`. You will _almost always_ access the theme inside the styles for a styled-component.

To use the theme, you need to pass your styled-component a function that takes prop as an argument. This sounds more complicated than it is.

Here's how you will usually use our theme:

```javascript
export const BannerStyles = styled.div`
  .landing-page-banner {
    background-color: ${props => props.theme.primaryDark};
  }
`
```

To change the value of `primaryDark` everywhere it's used in our app, simply change its value in `variables.js`!

#### Advanced theming

You can also access **component props** to render styles conditionally, depending on the value/existence of a particular prop. _This is super cool_, and is used in the banner animation (see `animationRule` inside `Presentational/Banner/styles.js` for an example that reads the animation's duration off `props.seconds`).

## src/test

This is where our frontend tests will live!

## src/utils

This is where we store utility functions that our app's frontend uses.

### CustomRoute

Used by our pages to protect routes on the frontend.

### index.js

Most utility functions will live in this file as named exports. An example is the `makeTaglineIterator` generator, which takes an array of banner taglines and yields the next tagline every time it is called:

```javascript
export function* makeTaglineIterator(taglinesArray) {
  let count = 0
  while (count < Infinity) {
    yield taglinesArray[count++ % taglinesArray.length]
  }
}
```

### selectors.js

These are where our Redux state selectors live as named exports (see Redux selectors section below).

# Redux

Let's talk state!

## Trips

Note: **Trips are stored in an object, not an array.**

Here is an example of how a trip is stored on state:

```javascript
{
    "8wer80-qwer08-er875-ef12d": {
        id: "8wer80-qwer08-er875-ef12d",
        name: "Trip 1",
        // rest of Trip 1
    },
    "e2er79-df9r08-5r875-1fe2d": {
        id: "e2er79-df9r08-5r875-1fe2d",
        name: "Trip 2",
        // rest of Trip 2
    },

    // rest of the trips ...
}
```

There are a couple reasons for this, most notably that object lookup happens in constant as opposed to linear time -- `O(1)` instead of `O(n)`.

2 things to make working with multiple trips easier:

1. The `getTripsArray` function in `selectors.js` takes the entire state and returns an array of trips
2. There is an array of trip IDs that you can loop through to iterate over all trips. For example:

```javascript
// MUTATES STATE, DON'T ACTUALLY DO THIS:
state.trip.tripIds.map(tripid => {
  state.trip.trips[tripid].isArchived = false
})
```

## Using State

Have a component that needs access to the Redux store?

1. Import connect from `react-redux`
2. Import any actions you want your component to call/dispatch (if applicable)
3. Pick the parts of state you need with a `mapStateToProps` function
4. Pick the actions you need with a `mapDispatchToProps` function
5. Pass `mapStateToProps` and `mapDispatchToProps` to the `connect` function, then to the next set of parens pass the component you're connecting
6. Export the connected component

Now the state/actions you need are now available on props!

### Using State: Example

For example, here is a simplified `AppNav` component:

```javascript
import React from "react"
import { connect }

import { login, logout } from "../redux/actions/auth"

const AppNav = ({ logout, isLoggedIn }) => {
  const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)

  return (
    <div>
      {isLoggedIn
        ? <button onClick={logout}>Log out</button>
        : <button onClick={login}>Log in</button>}
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = { login, logout }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav)
```

**Note:** Don't forget to pass `null` as the 1st argument to `connect` if you need to map an action, but don't need your component to subscribe to a slice of state.

## What's this types.js file?

The `types.js` exposes as named exports all of our action types, e.g.:

```javascript
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
```

Note that the constant name and string value map directly to each other; this is to give us code completion and ensure that we don't run into bugs that involve typos, which are notoriously difficult to debug.

## What's this store.js file?

Here's how state is mapped currently:

```javascript
const createRootReducer = history =>
  combineReducers({
    trips: tripReducer,
    auth: authReducer,
    router: connectRouter(history)
  })
```

**Also note** that if you need access to the router, it lives on state under the `router` key. You should consider using React Router's `withRoute` instead unless you're doing something advanced.

# Dependencies

- Redux Form removed (12/29/18)
- Formik added (PR dated 01/04/18)

# TODOs

- [ ] Rename `trips` reducer to just `trip` to avoid confusing `state.trips.trips` access
- [ ] Create `state.trip.tripIds` array that reads the keys on `state.trips.trips` to allow easier looping and other array conveniences

- [ ] Add Redux middleware depending on process.env.NODE_ENV (for example, remove `redux-logger` in prod)
- [ ] Refactor Nav scrollY into variable, or read from a prop (can then make this dynamic based on screen height?)
- [ ] Add PropTypes to all components
- [ ] Add Jest/Enzyme/Sinon and configure frontend tests
- [x] Remove `isSignedUp` from auth state
- [ ] Update Dashboard router to use Redirect.props.to.state (from) to redirect after login
- [ ] Add Pages:
  1. [ ] /login :: Login
  2. [ ] /signup :: Register
- [ ] Fix CustomRoute so it doesn't redirect when valid token exists
