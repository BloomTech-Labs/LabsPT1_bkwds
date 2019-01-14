import * as firebase from "firebase"

import { FirebaseConfig } from "../config/index"
firebase.initializeApp(FirebaseConfig)

export const authRef = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
