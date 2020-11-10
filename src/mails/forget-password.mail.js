const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.API_KEY)

exports.registrationMail = (to) => {
  return sendgrid.send({
    to,
    from: 'nishanth.mailer@gmail.com',
    subject: 'Registration Link from Nishanth',
    html: `Here is your link ${process.env.URL}reset-password?mail=${to}`
  })
}
