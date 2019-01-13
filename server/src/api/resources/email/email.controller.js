import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { User } from "../user/user.model"
const { JWT_SECRET } = process.env

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
})

const getPasswordResetURL = (user, token) =>
  `http://localhost:3000/password/reset/${user._id}/${token}`

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "🔥 Password Reset Instructions for Backwoods App 🔥"
  const html = `
  <p>Did you forget the password for your Backwoods account? If so, 
    <a href=${url}/>click here</a> to reset it. If this wasn't you, disregard this message and get outside!
    - Backwoods Customer Support
  </p>`
  return { from, to, subject, html }
}

// Fire the missiles!
export const sendPasswordReset = async (req, res, next) => {
  const { email } = req.params

  let user
  try {
    user = await User.findOne({ email }).exec()
  } catch (err) {
    console.log("No user with that email found:", err)
    next("No user with that email found:", err)
  }

  console.log("USER:", user)

  const token = encodePasswordHashAsToken(user.password, user.createdAt)
  const url = getPasswordResetURL(user, token)
  const emailTemplate = resetPasswordTemplate(user, url)

  const sendEmail = () => {
    transporter.sendMail(emailTemplate, (err, info) => {
      if (err) next(err)
      console.log(`Email sent, info object:`, info)
      console.log(`Email sent, info.response`, info.response)
    })
  }

  sendEmail()
  next()
}

export const encodePasswordHashAsToken = (passwordHash, createdAt) => {
  // secret is passwordHash concatenated with timestamp when user was created:
  const secret = passwordHash + "-" + createdAt
  // should i be using jwt.sign, or jwt.encode here?
  const token = jwt.sign({ password_reset: 12345 }, secret, {
    expiresIn: 3600
  })

  console.log("PW HASH AS SECRET:", passwordHash)
  console.log("SECRET:", secret)
  console.log("JWT TOKEN FROM HASH SECRET:", token)
  console.log("JWT TOKEN DECODED:", jwt.decode(token, passwordHash))

  // Return as an object with passwordHash?
  return token
}

export const receiveNewPassword = (req, res, next) => {
  const { userId, token } = req.params
  const { password } = req.body

  console.log("IN RECEIVE NEW PASSWORD!\n")
  console.log("USER ID: \n", userId)
  console.log("TOKEN: \n", token)
  console.log("NEW PASSWORD: \n", password)
}

// Source: https://www.smashingmagazine.com/2017/11/safe-password-resets-with-json-web-tokens/
// Explanation:

/*
 * To make this token a one-time-use token, I encourage you to 
 * use the user’s current password hash in conjunction with 
 * the user’s created date (in ticks) as the secret key to 
 * generate the JWT. This helps to ensure that if the user’s 
 * password was the target of a previous attack (on an unrelated website),
 * then the user’s created date will make the secret key unique 
 * from the potentially leaked password.

 * With the combination of the user’s password hash and created date, 
 * the JWT will become a one-time-use token, because once the user 
 * has changed their password, it will generate a new password hash 
 * invalidating the secret key that references the old password
 */
