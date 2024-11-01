import nodemailer from "nodemailer";

console.log(process.env.Email);
console.log(process.env.Password);

async function activation(email, status) {
    const subject = "Account Activation Notice";
    const message = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your account has been activated</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
      }
    
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h2>${status}</h2>
      </div>
    </body>
    </html>
    `;
    
    try {
        const mail = await sendEmail(email, subject, message);
        return mail;
    } catch (error) {
        console.error("Error sending activation notice:", error);
        throw error; 
    }
}

function sendEmail(receiverMail, subject, message) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Email, 
                pass: process.env.Password, 
            },
        });
        const mailConfigs = {
            from: process.env.Email,
            to: receiverMail,
            subject: subject,
            html: message,
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if (error) {
                console.error("Error sending email:", error);
                return reject({ message: "An error has occurred" });
            }
            return resolve({ message: "Email sent successfully", info });
        });
    });
}

export { activation, sendEmail };

