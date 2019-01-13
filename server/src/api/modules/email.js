import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahrjarrett@gmail.com",
    pass: "1Cat@atime"
  }
})

const mailOptions = {
  from: "ahrjarrett@gmail.com",
  to: "jarrett@ownlocal.com",
  subject: "🔥 sent with nodemailer",
  text: "Whoa nice"
}

// Fire the missiles!
export const sendEmail = () => {
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(error)
    else console.log("Email sent:", info.response)
  })
}
