import nodemailer from "nodemailer"
import { User } from "../user/user.model"

console.log("REACHED CONTROLLER\n\n\n")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
})

// const mailOptions = {
//   from: "ahrjarrett@gmail.com",
//   to: "jarrett@ownlocal.com",
//   subject: "🔥 sent with nodemailer",
//   text: "Whoa nice"
// }

// Fire the missiles!
export const sendPasswordReset = (req, res, next) => {
  console.log("CALLING SENDPASSWORDRESET")
  const { userId } = req.params
  // const user = User.findById({ _id: userId }).exec()
  const user = {
    _id: "5c3ad7af8986a0672449a98e",
    username: "ahrjarrett",
    email: "ahrjarrett@gmail.com",
    subscribed: false,
    trips: []
  }

  const url = getPasswordResetURL(user)
  const emailTemplate = resetPasswordTemplate(user, url)

  const sendEmail = () => {
    transporter.sendMail(emailTemplate, (err, info) => {
      console.log("calling transporter!")
      if (err) {
        console.log(error)
        res.send(400).json({ error: "done broke" })
      } else {
        console.log(`Email sent:`, info.response)
        res.send(201).json({ sent: true })
      }
    })
  }

  sendEmail()
  next()
}

const getPasswordResetURL = user => {
  return `http://localhost:3000/blah/${user.username}/${user.email}`
}

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "🔥 Password Reset Instructions for Backwoods App 🔥"
  const html = `
  <p>Did you forget the password for your Backwoods account? If so, 
    <a href=${url}/>click here</a> to reset it. If this wasn't you, disregard this message and get outside!
    - Backwoods Customer Support
  </p>
  `

  const emailTemplate = { from, to, subject, html }
  return emailTemplate
}
