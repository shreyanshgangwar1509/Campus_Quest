import nodemailer from "nodemailer";

export async function sendOtpEmail(recipientEmail, otp) {
  // Configure your SMTP settings here
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or another email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Your OTP for Email Verification",
    text: `Your OTP for verification is: ${otp}`,
    html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`,
  };

  return transporter.sendMail(mailOptions);
}
