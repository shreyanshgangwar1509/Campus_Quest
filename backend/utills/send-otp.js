import { sendOtpEmail } from "./mailer";


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store the OTP in a temporary session (could also use a database)
    req.session.otp = otp;
    req.session.email = email;
    req.session.expiration = Date.now() + 5 * 60 * 1000; // 5 minutes expiration

    // Send OTP email
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
