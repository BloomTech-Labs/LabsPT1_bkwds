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

const getPasswordResetURL = user =>
  `http://localhost:3000/reset_password/${user._id}/${user.email}`

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
  }

  console.log("USER:", user)
  const url = getPasswordResetURL(user)
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

export const encodePasswordHashAsToken = async (req, res, next) => {
  const { userId } = req.params

  let user
  try {
    user = await User.findById(userId).exec()
  } catch (err) {
    console.error("No user by that ID was found", err)
  }

  const token = jwt.sign({ hash: user.password }, JWT_SECRET, {
    expiresIn: 3600
  }) // Expires in 1 hour

  console.log("PW HASH:", user.password)
  console.log("JWT TOKEN FROM HASH:", token)
  console.log("JWT TOKEN DECODED:", jwt.decode(token))

  next()
}
