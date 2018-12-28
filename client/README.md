Welcome to the client-side code for Backwoods Tracker!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Directory Structure](#directory-structure)
  - [src/components](#srccomponents)
    - [src/components/Containers](#srccomponentscontainers)
    - [src/components/Presentational](#srccomponentspresentational)
    - [src/components/forms](#srccomponentsforms)
    - [src/components/hoc](#srccomponentshoc)
    - [src/components/icons](#srccomponentsicons)
    - [src/config](#srcconfig)
    - [src/redux](#srcredux)
      - [What's this types.js file?](#whats-this-typesjs-file)
      - [What's this store.js file?](#whats-this-storejs-file)
    - [src/theme](#srctheme)
      - [GlobalStyles](#globalstyles)
      - [styledComponents](#styledcomponents)
      - [mixins.js](#mixinsjs)
      - [variables](#variables)
- [Redux Form](#redux-form)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Directory Structure

## src/components

This is where our React components live.

Possibly the most important convention is that a component lives in the `Presentational` folder _until it needs access to the Redux store_. At that point you can create a separate Container component that renders the presentational component with the needed state added as props (see below for an example).

Exceptions include higher-order components, Redux forms, and icons/svg (see respective sections below).

**Note** that not all components have migrated to the Presentational directory yet; this is a work in progress.

### src/components/Containers

Have a component that needs access to the Redux store?

1. Create a presentational component, then create a folder in the `Containers` directory.
2. In the `index.js` file, import your presentational component.
3. Pick the parts of state you need with a `mapStateToProps` function
4. Pick the actions you need with a `mapDispatchToProps` function.
5. Pass those functions to `react-redux`'s `connect` function and export your new container.

Now the state/actions you need are now available on props!

For example, here is the `Login` container:

```javascript
import React from "react"
import { connect } from "react-redux"

import { login } from "../../../redux/actions/auth"
import Login from "../../Presentational/Login"

const LoginContainer = props => <Login login={props.login} />

const mapDispatchToProps = { login }

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer)
```

All of the styling and most of the logic regarding lifecycle methods will happen in the presentational component; the container component just renders the presentational `Login` component and passes it the `login` action as a prop.

Don't forget to pass `null` as the first argument to `connect` if you need to give a presentational component an action to dispatch, but don't need to subscribe to a slice of state.

### src/components/Presentational

Most components probably start as a presentational component, and any container component you need will probably have a corresponding presentational component.

**Note** that "presentational" does not mean "only concerned with styles or component hierarchy". Often presentational components contain their own logic for managing their own local state and/or lifecycle events, _unless that state or those lifecycle events care about the Redux store or dispatching Redux actions_.

Unlike the container folder, presentational folders will often have more than just an `index.js` file inside them. These files might include:

- A `styles.js` file that houses any custom styles that apply to this component; a good practice is to colocate the styles with the component to which they apply.
- Any other presentational components that are not used by any other component outside the ones in the current directory. For example, the `Nav/AppNav` component was getting too long, so it was broken into smaller components to make it more readable. These components should be grouped with their parent component _until an external component needs access to them_.

### src/components/forms

Most forms will need to talk to the Redux store at some point; we are using `redux-form` to simplify this relationshihp, so any form that needs to dispatch a Redux action or read from/write to Redux state lives here.

See also the Redux Form section below.

### src/components/hoc

Currently the only HOC in our app is `requireAuth`, a simple way to wrap any component with a check for client-side authentication.

As of 12/27/18, this component has not been thoroughly tested and might need to be made more flexible depending on the use case.

### src/components/icons

It seemed simpler to have a separate directory for any icons or svgs that our app uses; a case could be made for relocating this entire folder to `../Presentational/icons`.

### src/config

Because our client-side code is a Node app until we build and ship it, we have access to `process.env`.

For this reason, I created a config directory to take advantage of this and export from `config/index.js` a `SERVER_URI` variable that our Redux actions read from and that changes depending on whether we're in a dev or prod env.

If you have any variables that might switch depending on context, put them here and make them available as named exports.

### src/redux

**Note:** The "main" file for our store configuration lives in `client/store.js`; if you need to see where a particular slice of state lives, start there! (See the store.js note at the bottom of this node).

The Redux folder handles everything Redux. There are 4 directories, 3 of which are currently in use:

- `actions` - The actions folder contains, as you guessed, our app's actions. It also contains our `types.js` file (see below for more info).
- `reducers` - Our redux reducers. The file name for the actions that apply to which reducer should typically be named the same thing, e.g. `actions/auth.js` and `reducers/auth.js`.
- `helpers` - Any helper function that helps us manage our actions or reducers should live here
- `middleware` - Most middleware configuration currently lives in `client/store.js` (see below). If configuring our middlewares gets any more complex, this folder is where we should move that configuration.

#### What's this types.js file?

The `types.js` exposes as named exports all of our action types, e.g.:

```javascript
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
```

Note that the constant name and string value map directly to each other; this is to give us code completion and ensure that we don't run into bugs that involve typos, which are notoriously difficult to debug.

#### What's this store.js file?

Here's how state is mapped currently:

```javascript
const createRootReducer = history =>
  combineReducers({
    trips: tripReducer,
    auth: authReducer,
    form: formReducer,
    router: connectRouter(history)
  })
```

**Also note** that if you need access to a particular form or to the router, those live under `form` and `router` respectively.

### src/theme

The fun part! This is where we declare our global styles, styled-components, and our theme.

#### GlobalStyles

The `GlobalStyles` component can be added anywhere in our app _**as a sibling**_ to the component in which those styles will take effect, e.g.:

```javascript
<Root>
  <GlobalStyles />
  <App />
</Root>
```

GlobalStyles is a styled component that does not render its children, so in the example above, everything declared in `GlobalStyles` applies to the `App` component, which is its immediate sibling.

This is a good place to declare things like the `font-size` that sets our `rem` units, font-declarations, and any css resets/normalizations that should apply to the entire document.

#### styledComponents

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

/* You can use the media export in a styled-component like so:
 *   ${media.desktop`display: flex;`}
 *   ${media.tablet`display: inline-block;`}
 *   ${media.phone`display: none;`} */
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

#### variables

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
```

To change the value of `primaryDark` everywhere it's used in our app, simply change its value in `variables.js`!

_**Advanced:**_ You can also access **component props** to render styles conditionally, depending on the value/existence of a particular prop. _This is super cool_, and is used in the banner animation (see `animationRule` inside `Presentational/Banner/styles.js` for an example that reads the animation's duration off `props.seconds`).

# Redux Form

Coming soon.
