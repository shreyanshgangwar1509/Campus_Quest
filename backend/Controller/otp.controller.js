export default async function handler(req, res) {
  if (req.method === "POST") {
    const { otp } = req.body;

    // Get OTP details from session (or database)
    const storedOtp = req.session.otp;
    const email = req.session.email;
    const expiration = req.session.expiration;

    if (!storedOtp || Date.now() > expiration) {
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    if (parseInt(otp) === storedOtp) {
      // Mark user as verified in the database if needed
      req.session.otp = null; // Clear OTP after successful verification
      return res.status(200).json({ message: "OTP verified successfully." });
    } else {
      return res.status(400).json({ message: "Invalid OTP." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
