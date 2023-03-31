import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

// @desc   POST EMAIL
// @Route  POST /api/email
// @access Public
const sendMail = (props) => {
  // controller
  //   const output = `
  //     <p>You have a new Inquiry!</p>
  //     <h3>Contact Details</h3>
  //     <ul>
  //       <li>Name: ${req.body.name}</li>
  //       <li>Email: ${req.body.email}</li>
  //       <li>Phone: ${req.body.phone}</li>
  //     </ul>
  //     <h3>Message (Inquiry)</h3>
  //     <p>${req.body.message}</p>
  //   `

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'frndzorgs@gmail.com', // generated ethereal user
      pass: 'Ase@2023', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: '<frndzorgs@gmail.com>', // sender address
    to: `${props.to}`, // list of receivers
    subject: `${props.subject}`, // Subject line
    // text: 'Test Text', // plain text body
    html: props.output, // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log({ Message: 'Inquiry has been sent!' })
    }
  })
}

export { sendMail }
