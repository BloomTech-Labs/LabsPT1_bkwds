import firebase from "firebase/app"
import "firebase/auth"

import { FirebaseConfig } from "../config/index"
firebase.initializeApp(FirebaseConfig)

export const authRef = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
