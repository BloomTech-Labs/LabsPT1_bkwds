import nodemailer from "nodemailer"
import { User } from "../user/user.model"

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
