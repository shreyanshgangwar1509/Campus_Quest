import bcrypt from "bcryptjs";
import { getUserByEmail } from "./database"; // Replace with your actual database query function

export async function verifyUser(email, password) {
  const user = await getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  return null;
}
