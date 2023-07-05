import nodemailer from "nodemailer"

const Sendmail = async(email:string, resetstring:string)=>{
    const resetUrl = `http://localhost:3000/reset/${resetstring}`
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0b4f02f6ef893e",
          pass: "43823122402d53"
        }
      });

    var mailOptions = {
        from: 'austinedavid96@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'password reset ', // Subject line
        text: 'Hello this is a message for you to reset your password', // plaintext body
        html: `<p> click on the link to reset your password <a href=${resetUrl}>reset now</a></p>`
    };

    const ourInfor = await transport.sendMail(mailOptions)
    console.log(ourInfor)
}
export default Sendmail