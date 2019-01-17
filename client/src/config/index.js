// GENERAL
export const APP_NAME = process.env.REACT_APP_NAME
export const CLIENT_URI = process.env.REACT_APP_CLIENT_URI
export const SERVER_URI = process.env.REACT_APP_SERVER_URI
export const DEV_IMG_URI = process.env.DEV_IMG_URI
export const PROD_IMG_URI = process.env.PROD_IMG_URI

// STRIPE
export const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY
export const STRIPE_KEY_SERVER = process.env.REACT_APP_STRIPE_KEY_SERVER
export const STRIPE_PLAN_ID_TEST = process.env.REACT_APP_STRIPE_PLAN_ID_TEST

// OAUTH
export const FB_APP_ID = process.env.REACT_APP_FB_APP_ID
export const FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL
}
